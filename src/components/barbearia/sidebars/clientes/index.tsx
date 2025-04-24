import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Cliente } from '../../../../models/cliente'
import { authFetch } from '../../../../utils/authFetch'
import ClienteDetail from '../../modals/cliente/cliente_detail'
import ClienteEdit from '../../modals/cliente/editar'

import * as S from './styles'

const Clientes = () => {
    const [clientes, setClientes] = useState<Cliente[]>([])
    const [filteredClientes, setFilteredClientes] = useState<Cliente[]>([])
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [loading, setLoading] = useState(true)
    const [erro, setErro] = useState<string | null>(null)
    const [modalDetailsIsOpen, setModalDetailsIsOpen] = useState<boolean>(false)
    const [modalEditIsOpen, setModalEditIsOpen] = useState<boolean>(false)
    const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        const token = sessionStorage.getItem('access_token_barbearia')
        const barbeariaData = sessionStorage.getItem('barbearia')
        const barbeariaToken = sessionStorage.getItem('barbearia_token')

        console.log('Token:', token)
        console.log('Barbearia Data:', barbeariaData)
        console.log('Barbearia Token:', barbeariaToken)

        let barbeariaId: number | null = null
        try {
            if (barbeariaData) {
                const parsedData = JSON.parse(barbeariaData)
                barbeariaId = parsedData.id
            } else if (barbeariaToken) {
                barbeariaId = parseInt(barbeariaToken, 10)
            }
        } catch (e) {
            console.error('Erro ao parsear barbeariaData:', e)
        }

        console.log('Barbearia ID:', barbeariaId)

        if (!token || !barbeariaId) {
            setErro('Token ou ID da barbearia ausente. Por favor, faça login novamente.')
            setLoading(false)
            navigate('/clientes/login') // Redirecionar para login se token ou barbeariaId estiverem ausentes
            return
        }

        authFetch(`http://localhost:8000/api/clientes/barbearia/${barbeariaId}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                console.log('Resposta da API /api/clientes/barbearia:', res.status, res.statusText)
                if (res.status === 401) {
                    throw new Error('Sessão expirada. Por favor, faça login novamente.')
                }
                if (!res.ok) {
                    throw new Error(`Erro ao buscar clientes: ${res.status} ${res.statusText}`)
                }
                return res.json()
            })
            .then((data) => {
                console.log('Clientes recebidos:', data)
                setClientes(data)
                setFilteredClientes(data)
            })
            .catch((err: Error) => {
                // Explicitly type err as Error
                console.error('Erro na requisição:', err)
                setErro(err.message)
                if (err.message.includes('Sessão expirada')) {
                    sessionStorage.removeItem('access_token_barbearia')
                    navigate('/clientes/login')
                }
            })
            .finally(() => setLoading(false))
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

    const handleOpenModalDetails = (cliente: Cliente) => {
        setSelectedCliente(cliente)
        setModalDetailsIsOpen(true)
    }

    const handleOpenModalEdit = (cliente: Cliente) => {
        setSelectedCliente(cliente)
        setModalEditIsOpen(true)
    }

    const handleCloseModalEdit = () => {
        setSelectedCliente(null)
        setModalEditIsOpen(false)
    }

    const handleCloseModalDetails = () => {
        setSelectedCliente(null)
        setModalDetailsIsOpen(false)
    }

    const handleDeleteCliente = async (cliente: Cliente) => {
        const confirmDelete = window.confirm(
            `Tem certeza que deseja deletar o cliente ${cliente.user?.nome || 'desconhecido'}?`,
        )
        if (!confirmDelete) return

        const token = sessionStorage.getItem('access_token_barbearia')
        if (!token) {
            setErro('Token ausente. Por favor, faça login novamente.')
            navigate('/clientes/login')
            return
        }

        try {
            const response = await authFetch(`http://localhost:8000/api/clientes/${cliente.id}/`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (response.status === 401) {
                throw new Error('Sessão expirada. Por favor, faça login novamente.')
            }
            if (!response.ok) {
                throw new Error(
                    `Erro ao deletar cliente: ${response.status} ${response.statusText}`,
                )
            }

            // Atualizar os estados removendo o cliente deletado
            setClientes((prev) => prev.filter((c) => c.id !== cliente.id))
            setFilteredClientes((prev) => prev.filter((c) => c.id !== cliente.id))
        } catch (err: unknown) {
            // Use 'unknown' to satisfy TS1196
            console.error('Erro ao deletar cliente:', err)
            const errorMessage = err instanceof Error ? err.message : String(err)
            setErro(errorMessage)
            if (errorMessage.includes('Sessão expirada')) {
                sessionStorage.removeItem('access_token_barbearia')
                navigate('/login')
            }
        }
    }

    if (loading) return <S.Container>Carregando...</S.Container>
    if (erro) return <S.Container>Erro: {erro}</S.Container>

    return (
        <S.Container>
            <h2>Meus Clientes</h2>
            <p className="subtitle">
                Acesse a lista de clientes cadastrados na sua barbearia e veja o histórico de
                agendamentos.
            </p>
            <S.Head>
                {clientes.length <= 0 ? (
                    <p className="empty">Você ainda não tem clientes cadastrados</p>
                ) : (
                    <>
                        <S.Search>
                            <input
                                type="text"
                                placeholder="Buscar por nome ou telefone..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </S.Search>
                        {filteredClientes.length > 0 && (
                            <S.FieldNames>
                                <p>Nome</p>
                                <p>Celular</p>
                                <p>Ações</p>
                            </S.FieldNames>
                        )}
                    </>
                )}
            </S.Head>
            <S.List>
                {filteredClientes.length > 0
                    ? filteredClientes.map((cliente) => (
                          <S.ListItem key={cliente.id}>
                              <p>{cliente.user?.nome || 'Nome indisponível'}</p>
                              <p>{cliente.user?.telefone || 'Telefone indisponível'}</p>
                              <S.IconGroup>
                                  <i
                                      title="Detalhes do Cliente"
                                      className="ri-info-card-line details"
                                      onClick={() => handleOpenModalDetails(cliente)}
                                  ></i>
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
                    : clientes.length > 0 && (
                          <p className="empty">
                              {searchTerm
                                  ? `Nenhum cliente encontrado com o nome ou telefone "${searchTerm}"`
                                  : 'Nenhum cliente encontrado'}
                          </p>
                      )}
                <p className="cliente_length">{filteredClientes.length} Clientes</p>
            </S.List>
            {modalDetailsIsOpen && (
                <ClienteDetail cliente={selectedCliente} closeModal={handleCloseModalDetails} />
            )}
            {modalEditIsOpen && (
                <ClienteEdit cliente={selectedCliente} closeModal={handleCloseModalEdit} />
            )}
        </S.Container>
    )
}

export default Clientes
