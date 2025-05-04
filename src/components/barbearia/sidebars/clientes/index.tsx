import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { Cliente } from '../../../../models/cliente'
import { authFetch } from '../../../../utils/authFetch'
import ClienteEdit from '../../modals/cliente/editar'
import * as S from './styles'
import api from '../../../../services/api'
import ClienteNew from '../../modals/cliente/criar'

const Clientes = () => {
    const [clientes, setClientes] = useState<Cliente[]>([])
    const [filteredClientes, setFilteredClientes] = useState<Cliente[]>([])
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [modalEditIsOpen, setModalEditIsOpen] = useState<boolean>(false)
    const [modalCriarIsOpen, setModalCriarIsOpen] = useState<boolean>(false)
    const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        const token = sessionStorage.getItem('access_token_barbearia')
        const barbeariaData =
            sessionStorage.getItem('barbearia') || sessionStorage.getItem('barbearia_token')
        let barbeariaId: number | null = null

        try {
            if (barbeariaData) {
                const parsedData = JSON.parse(barbeariaData)
                barbeariaId = parsedData.id || parseInt(barbeariaData, 10)
            }
        } catch (e) {
            console.error('Erro ao parsear barbeariaData:', e)
        }

        if (!token || !barbeariaId) {
            setHasError(true)
            setIsLoading(false)
            navigate('/login')
            return
        }

        authFetch(`${api.baseURL}/clientes/barbearia/${barbeariaId}/`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                if (res.status === 401) {
                    throw new Error('Sessão expirada. Por favor, faça login novamente.')
                }
                if (!res.ok) {
                    throw new Error(`Erro ao buscar clientes: ${res.status} ${res.statusText}`)
                }
                return res.json()
            })
            .then((data) => {
                console.log('Clientes carregados:', data)
                setClientes(data)
                setFilteredClientes(data)
            })
            .catch((err: Error) => {
                console.error('Erro na requisição:', err)
                setHasError(true)
                setErrorMessage(err.message)
                if (err.message.includes('Sessão expirada')) {
                    sessionStorage.removeItem('access_token_barbearia')
                    navigate('/login')
                }
            })
            .finally(() => setIsLoading(false))
    }, [navigate])

    useEffect(() => {
        const filtered = clientes.filter((cliente) => {
            const nome = cliente?.user?.nome || ''
            const telefone = (cliente?.user?.telefone || '').replace(/[()-/\s]/g, '')
            const normalizedSearchTerm = searchTerm.replace(/[()-/\s]/g, '')
            return (
                nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                telefone.toLowerCase().includes(normalizedSearchTerm.toLowerCase())
            )
        })
        setFilteredClientes(filtered)
    }, [searchTerm, clientes])

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    const handleOpenModalCriar = () => {
        setModalCriarIsOpen(true)
    }

    const handleCloseModalCriar = () => {
        setModalCriarIsOpen(false)
    }

    const handleOpenModalEdit = (cliente: Cliente) => {
        setSelectedCliente(cliente)
        setModalEditIsOpen(true)
    }

    const handleCloseModalEdit = () => {
        setSelectedCliente(null)
        setModalEditIsOpen(false)
    }

    const handleDeleteCliente = async (cliente: Cliente) => {
        const confirmDelete = window.confirm(
            `Tem certeza que deseja deletar o cliente ${cliente.user?.nome || 'desconhecido'}?`,
        )
        if (!confirmDelete) return

        try {
            console.log(
                `Tentando deletar cliente ID: ${cliente.id}, Barbearia: ${cliente.barbearia}`,
            )
            const response = await authFetch(`${api.baseURL}/clientes/${cliente.id}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (response.status === 404) {
                throw new Error('Cliente não encontrado ou não pertence à sua barbearia.')
            }
            if (response.status === 401) {
                throw new Error('Sessão expirada. Por favor, faça login novamente.')
            }
            if (!response.ok) {
                throw new Error(
                    `Erro ao deletar cliente: ${response.status} ${response.statusText}`,
                )
            }

            setClientes((prev) => prev.filter((c) => c.id !== cliente.id))
            setFilteredClientes((prev) => prev.filter((c) => c.id !== cliente.id))
            setErrorMessage(null)
        } catch (err: unknown) {
            console.error('Erro ao deletar cliente:', err)
            const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido'
            setErrorMessage(errorMessage)
            setHasError(true)
            if (errorMessage.includes('Sessão expirada')) {
                sessionStorage.removeItem('access_token_barbearia')
                navigate('/login')
            }
        }
    }

    return (
        <S.Container>
            <h2>Meus Clientes</h2>
            <p className="subtitle">
                Acesse a lista de clientes cadastrados na sua barbearia e veja o histórico de
                agendamentos.
            </p>
            <S.Head>
                <S.SearchAndAdd>
                    <input
                        type="text"
                        placeholder="Buscar por nome ou telefone..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <button onClick={handleOpenModalCriar}>+ Novo Cliente</button>
                </S.SearchAndAdd>
                {filteredClientes.length > 0 && (
                    <S.FieldNames>
                        <p>Nome</p>
                        <p>Celular</p>
                        <p>Ações</p>
                    </S.FieldNames>
                )}
            </S.Head>

            {isLoading ? (
                <S.LoadingContainer>
                    <ClipLoader color="#00c1fe" size={32} speedMultiplier={1} />
                </S.LoadingContainer>
            ) : hasError ? (
                <S.Message>
                    {errorMessage || 'Erro ao carregar os clientes. Tente novamente.'}
                </S.Message>
            ) : clientes.length === 0 ? (
                <S.Message>Você ainda não tem clientes cadastrados.</S.Message>
            ) : (
                <S.List>
                    {filteredClientes.length > 0 ? (
                        filteredClientes.map((cliente) => (
                            <S.ListItem key={cliente.id}>
                                <p>{cliente.user?.nome || 'Nome indisponível'}</p>
                                <p>{cliente.user?.telefone || 'Telefone indisponível'}</p>
                                <S.IconGroup>
                                    <i
                                        className="ri-edit-2-line edit"
                                        title="Editar Cliente"
                                        onClick={() => handleOpenModalEdit(cliente)}
                                    ></i>
                                    <i
                                        className="ri-delete-bin-line delete"
                                        title="Apagar Cliente"
                                        onClick={() => handleDeleteCliente(cliente)}
                                    ></i>
                                </S.IconGroup>
                            </S.ListItem>
                        ))
                    ) : (
                        <S.Message>
                            {searchTerm
                                ? `Nenhum cliente encontrado com o nome ou telefone "${searchTerm}"`
                                : 'Nenhum cliente encontrado'}
                        </S.Message>
                    )}
                </S.List>
            )}
            {modalCriarIsOpen && <ClienteNew closeModal={handleCloseModalCriar} />}
            {modalEditIsOpen && (
                <ClienteEdit cliente={selectedCliente} closeModal={handleCloseModalEdit} />
            )}
            {!isLoading && !hasError && (
                <p className="cliente_length">{filteredClientes.length} Clientes</p>
            )}
        </S.Container>
    )
}

export default Clientes
