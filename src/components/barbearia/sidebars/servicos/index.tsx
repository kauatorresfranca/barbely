import { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'
import { authFetch } from '../../../../utils/authFetch'
import { Servico } from '../../../../models/servico'
import CriarServicoModal from '../../modals/servicos/servico_criar'
import EditarServicoModal from '../../modals/servicos/servico_editar'
import * as S from './styles'
import api from '../../../../services/api'

const Servicos = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [editModalIsOpen, setEditModalIsOpen] = useState(false)
    const [servicos, setServicos] = useState<Servico[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    const openModal = () => setModalIsOpen(true)
    const closeModal = () => setModalIsOpen(false)

    const openEditModal = () => setEditModalIsOpen(true)
    const closeEditModal = () => setEditModalIsOpen(false)

    const fetchServicos = async () => {
        setIsLoading(true)
        setHasError(false)
        try {
            const token = sessionStorage.getItem('access_token_barbearia')
            const response = await authFetch(`${api.baseURL}/servicos/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (response.ok) {
                const data = await response.json()
                setServicos(data)
            } else {
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

    const handleDelete = async (id: number) => {
        const confirm = window.confirm('Deseja realmente deletar este serviço?')
        if (!confirm) return

        try {
            const token = sessionStorage.getItem('access_token_barbearia')
            const response = await authFetch(`${api.baseURL}/servicos/${id}/`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (response.ok) {
                setServicos((prev) => prev.filter((s) => s.id !== id))
            } else {
                console.error('Erro ao deletar serviço')
            }
        } catch (error) {
            console.error('Erro:', error)
        }
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

                {isLoading ? (
                    <S.LoadingContainer>
                        <ClipLoader color="#00c1fe" size={32} speedMultiplier={1} />
                    </S.LoadingContainer>
                ) : hasError ? (
                    <S.Message>Erro ao carregar os serviços. Tente novamente.</S.Message>
                ) : servicos.length === 0 ? (
                    <S.Message>Você ainda não tem serviços cadastrados.</S.Message>
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
                                            onClick={openEditModal}
                                        ></i>
                                        <i
                                            className="ri-delete-bin-line delete"
                                            onClick={() => handleDelete(servico.id)}
                                        ></i>
                                    </S.IconsGroup>
                                </S.ListItem>
                            ))}
                        </S.List>
                        <p className="servicos_length">{servicos.length} Serviços</p>
                    </>
                )}
            </S.Container>

            {modalIsOpen && <CriarServicoModal closeModal={closeModal} onSuccess={fetchServicos} />}
            {editModalIsOpen && <EditarServicoModal closeModal={closeEditModal} />}
        </>
    )
}

export default Servicos
