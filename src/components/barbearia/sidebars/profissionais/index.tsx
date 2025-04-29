import { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'
import { authFetch } from '../../../../utils/authFetch'
import { Funcionario } from '../../../../models/funcionario'
import CriarProfissionalModal from '../../modals/profissional/profissional_criar'
import EditarProfissionalModal from '../../modals/profissional/profissional_editar'
import * as S from './styles'
import api from '../../../../services/api'

const Profissionais = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [editModalIsOpen, setEditModalIsOpen] = useState(false)
    const [funcionarios, setFuncionarios] = useState<Funcionario[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    const openModal = () => setModalIsOpen(true)
    const closeModal = () => setModalIsOpen(false)

    const openEditModal = () => setEditModalIsOpen(true)
    const closeEditModal = () => setEditModalIsOpen(false)

    const fetchFuncionarios = async () => {
        setIsLoading(true)
        setHasError(false)
        try {
            const token = sessionStorage.getItem('access_token_barbearia')
            const response = await authFetch(`${api.baseURL}/funcionarios/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (response.ok) {
                const data = await response.json()
                setFuncionarios(data)
            } else {
                console.error('Erro ao buscar profissionais')
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
        const confirm = window.confirm('Deseja realmente deletar este profissional?')
        if (!confirm) return

        try {
            const token = sessionStorage.getItem('access_token_barbearia')
            const response = await authFetch(`${api.baseURL}/funcionarios/${id}/`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (response.ok) {
                setFuncionarios((prev) => prev.filter((f) => f.id !== id))
            } else {
                console.error('Erro ao deletar profissional')
            }
        } catch (error) {
            console.error('Erro:', error)
        }
    }

    useEffect(() => {
        fetchFuncionarios()
    }, [])

    return (
        <>
            <S.Container>
                <h2>Profissionais</h2>
                <p className="subtitle">
                    Adicione, edite ou remova os profissionais que fazem parte da sua equipe.
                </p>
                <S.ServiceHeader>
                    <button onClick={openModal}>+ Novo Profissional</button>
                </S.ServiceHeader>

                {isLoading ? (
                    <S.LoadingContainer>
                        <ClipLoader color="#00c1fe" size={32} speedMultiplier={1} />
                    </S.LoadingContainer>
                ) : hasError ? (
                    <S.Message>Erro ao carregar os profissionais. Tente novamente.</S.Message>
                ) : funcionarios.length === 0 ? (
                    <S.Message>Você ainda não tem profissionais cadastrados.</S.Message>
                ) : (
                    <>
                        <S.Head>
                            <p>Nome</p>
                            <p>Ações</p>
                        </S.Head>
                        <S.List>
                            {funcionarios.map((func) => (
                                <S.ListItem key={func.id}>
                                    <p>{func.nome}</p>
                                    <S.IconsGroup>
                                        <i
                                            className="ri-edit-2-line edit"
                                            onClick={openEditModal}
                                        ></i>
                                        <i
                                            className="ri-delete-bin-line delete"
                                            onClick={() => handleDelete(func.id)}
                                        ></i>
                                    </S.IconsGroup>
                                </S.ListItem>
                            ))}
                        </S.List>
                        <p className="profissionais_length">{funcionarios.length} Profissionais</p>
                    </>
                )}
            </S.Container>

            {modalIsOpen && (
                <CriarProfissionalModal closeModal={closeModal} onSuccess={fetchFuncionarios} />
            )}
            {editModalIsOpen && <EditarProfissionalModal closeModal={closeEditModal} />}
        </>
    )
}

export default Profissionais
