import { useEffect, useState } from 'react'
import { authFetch } from '../../../../utils/authFetch'
import { Servico } from '../../../../models/servico'
import CriarServicoModal from '../../modals/servicos/criar'
import DetalhesServicoModal from '../../modals/servicos/detalhes'
import DeleteConfirmationModal from '../../modals/confirmar_delecao/index'
import * as S from './styles'
import api from '../../../../services/api'

const Servicos = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
    const [detalhesModalIsOpen, setDetalhesModalIsOpen] = useState(false)
    const [servicos, setServicos] = useState<Servico[]>([])
    const [filteredServicos, setFilteredServicos] = useState<Servico[]>([])
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)
    const [selectedServico, setSelectedServico] = useState<Servico | null>(null)
    const [servicoToDelete, setServicoToDelete] = useState<Servico | null>(null)

    const openModal = () => setModalIsOpen(true)
    const closeModal = () => setModalIsOpen(false)

    const openDeleteModal = (servico: Servico) => {
        setServicoToDelete(servico)
        setDeleteModalIsOpen(true)
    }

    const closeDeleteModal = () => {
        setServicoToDelete(null)
        setDeleteModalIsOpen(false)
    }

    const openDetalhesModal = (servico: Servico) => {
        setSelectedServico(servico)
        setDetalhesModalIsOpen(true)
    }

    const closeDetalhesModal = () => {
        setSelectedServico(null)
        setDetalhesModalIsOpen(false)
    }

    const fetchServicos = async () => {
        setIsLoading(true)
        setHasError(false)
        try {
            const token = sessionStorage.getItem('access_token_barbearia')
            if (!token) {
                throw new Error('Você precisa estar logado para acessar os serviços.')
            }

            const response = await authFetch(`${api.baseURL}/servicos/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })

            if (response.ok) {
                const data = await response.json()
                setServicos(data)
                setFilteredServicos(data)
            } else {
                if (response.status === 401) {
                    throw new Error('Sessão expirada. Por favor, faça login novamente.')
                }
                console.error('Erro ao buscar serviços')
                setHasError(true)
            }
        } catch (error) {
            console.error('Erro:', error)
            setHasError(true)
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async () => {
        if (!servicoToDelete) return

        try {
            const token = sessionStorage.getItem('access_token_barbearia')
            if (!token) {
                throw new Error('Você precisa estar logado para deletar serviços.')
            }

            const response = await authFetch(`${api.baseURL}/servicos/${servicoToDelete.id}/`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (response.ok) {
                setServicos((prev) => prev.filter((s) => s.id !== servicoToDelete.id))
                setFilteredServicos((prev) => prev.filter((s) => s.id !== servicoToDelete.id))
                closeDeleteModal()
            } else {
                console.error('Erro ao deletar serviço')
            }
        } catch (error) {
            console.error('Erro:', error)
        }
    }

    const handleRedirectToLogin = () => {
        const slug = sessionStorage.getItem('barbearia_slug') || 'default-slug'
        window.location.href = `/barbearia/${slug}/login`
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value
        setSearchTerm(term)
        const filtered = servicos.filter((servico) =>
            servico.nome.toLowerCase().includes(term.toLowerCase()),
        )
        setFilteredServicos(filtered)
    }

    useEffect(() => {
        fetchServicos()
    }, [])

    return (
        <>
            <S.Container>
                <h2>Serviços</h2>
                <p className="subtitle">
                    Cadastre e edite os serviços oferecidos, incluindo valores, duração e
                    descrições.
                </p>
                <S.ServiceHeader>
                    <S.SearchAndAdd>
                        <input
                            type="text"
                            placeholder="Pesquisar por serviço..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <button onClick={openModal}>+ Novo Serviço</button>
                    </S.SearchAndAdd>
                    {filteredServicos.length > 0 && (
                        <S.FieldNames>
                            <p>Nome</p>
                            <p>Valor</p>
                            <p>Duração</p>
                        </S.FieldNames>
                    )}
                </S.ServiceHeader>

                {hasError && (
                    <S.Message>
                        Erro ao carregar os serviços.{' '}
                        <span
                            style={{ color: '#3399ff', cursor: 'pointer' }}
                            onClick={handleRedirectToLogin}
                        >
                            Fazer login
                        </span>{' '}
                        ou tente novamente.
                    </S.Message>
                )}

                {isLoading ? (
                    <S.LoadingContainer>
                        <S.Message>Carregando serviços...</S.Message>
                    </S.LoadingContainer>
                ) : (
                    <>
                        <S.List>
                            {filteredServicos.length > 0 ? (
                                filteredServicos.map((servico) => (
                                    <S.ListItem
                                        key={servico.id}
                                        onClick={() => openDetalhesModal(servico)}
                                    >
                                        <i className="ri-scissors-fill tesoura"></i>
                                        <h4>{servico.nome}</h4>
                                        <p>R$ {Number(servico.preco).toFixed(2)}</p>
                                        <p>{servico.duracao_minutos} min</p>
                                        <i className="ri-arrow-right-s-line flecha"></i>
                                    </S.ListItem>
                                ))
                            ) : (
                                <S.Message>
                                    {searchTerm
                                        ? `Nenhum serviço encontrado com "${searchTerm}"`
                                        : 'Você ainda não tem serviços cadastrados.'}
                                </S.Message>
                            )}
                        </S.List>
                        <p className="servicos_length">
                            {filteredServicos.length > 1
                                ? `${filteredServicos.length} Serviços`
                                : `${filteredServicos.length} Serviço`}
                        </p>
                    </>
                )}
            </S.Container>

            {modalIsOpen && <CriarServicoModal closeModal={closeModal} onSuccess={fetchServicos} />}
            {deleteModalIsOpen && servicoToDelete && (
                <DeleteConfirmationModal
                    isOpen={deleteModalIsOpen}
                    itemName={`o serviço ${servicoToDelete.nome}`}
                    onConfirm={handleDelete}
                    onClose={closeDeleteModal}
                />
            )}
            {detalhesModalIsOpen && selectedServico && (
                <DetalhesServicoModal
                    servico={selectedServico}
                    onClose={closeDetalhesModal}
                    onDelete={openDeleteModal}
                />
            )}
        </>
    )
}

export default Servicos
