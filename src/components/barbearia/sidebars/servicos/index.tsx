import { useEffect, useState } from 'react'
import { authFetch } from '../../../../utils/authFetch'
import { Servico } from '../../../../models/servico'
import CriarServicoModal from '../../modals/servicos/servico_criar'
import EditarServicoModal from '../../modals/servicos/servico_editar'
import DeleteConfirmationModal from '../../modals/confirmar_delecao/index'
import * as S from './styles'
import api from '../../../../services/api'

const Servicos = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [editModalIsOpen, setEditModalIsOpen] = useState(false)
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
    const [servicos, setServicos] = useState<Servico[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)
    const [selectedServico, setSelectedServico] = useState<Servico | null>(null)
    const [servicoToDelete, setServicoToDelete] = useState<Servico | null>(null)

    const openModal = () => setModalIsOpen(true)
    const closeModal = () => setModalIsOpen(false)

    const openEditModal = (servico: Servico) => {
        setSelectedServico(servico)
        setEditModalIsOpen(true)
    }
    const closeEditModal = () => {
        setSelectedServico(null)
        setEditModalIsOpen(false)
    }

    const openDeleteModal = (servico: Servico) => {
        setServicoToDelete(servico)
        setDeleteModalIsOpen(true)
    }

    const closeDeleteModal = () => {
        setServicoToDelete(null)
        setDeleteModalIsOpen(false)
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
                    <button onClick={openModal}>+ Novo Serviço</button>
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
                        <S.Head>
                            <p>Nome</p>
                            <p>Valor</p>
                            <p>Duração</p>
                            <p>Ações</p>
                        </S.Head>
                        <S.List>
                            {servicos.map((servico) => (
                                <S.ListItem key={servico.id}>
                                    <p>{servico.nome}</p>
                                    <p>R$ {Number(servico.preco).toFixed(2)}</p>
                                    <p>{servico.duracao_minutos} min</p>
                                    <S.IconsGroup>
                                        <i
                                            className="ri-edit-2-line edit"
                                            onClick={() => openEditModal(servico)}
                                        ></i>
                                        <i
                                            className="ri-delete-bin-line delete"
                                            onClick={() => openDeleteModal(servico)}
                                        ></i>
                                    </S.IconsGroup>
                                </S.ListItem>
                            ))}
                        </S.List>
                        <p className="servicos_length">
                            {servicos.length > 1
                                ? `${servicos.length} Serviços`
                                : `${servicos.length} Serviço`}{' '}
                        </p>
                    </>
                )}
            </S.Container>

            {modalIsOpen && <CriarServicoModal closeModal={closeModal} onSuccess={fetchServicos} />}
            {editModalIsOpen && selectedServico && (
                <EditarServicoModal closeModal={closeEditModal} servico={selectedServico} />
            )}
            {deleteModalIsOpen && servicoToDelete && (
                <DeleteConfirmationModal
                    isOpen={deleteModalIsOpen}
                    itemName={`o serviço ${servicoToDelete.nome}`}
                    onConfirm={handleDelete}
                    onClose={closeDeleteModal}
                />
            )}
        </>
    )
}

export default Servicos
