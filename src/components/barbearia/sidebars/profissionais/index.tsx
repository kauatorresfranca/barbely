import { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'
import { authFetch } from '../../../../utils/authFetch'
import { Funcionario } from '../../../../models/funcionario'
import CriarProfissionalModal from '../../modals/profissional/criar'
import DetalhesProfissionalModal from '../../modals/profissional/detalhes' // Nova modal
import DeleteConfirmationModal from '../../modals/confirmar_delecao/index'
import * as S from './styles'
import api from '../../../../services/api'

const Profissionais = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
    const [detalhesModalIsOpen, setDetalhesModalIsOpen] = useState(false)
    const [profissionais, setProfissionais] = useState<Funcionario[]>([])
    const [filteredProfissionais, setFilteredProfissionais] = useState<Funcionario[]>([])
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)
    const [selectedProfissional, setSelectedProfissional] = useState<Funcionario | null>(null)
    const [profissionalToDelete, setProfissionalToDelete] = useState<Funcionario | null>(null)

    const openModal = () => setModalIsOpen(true)
    const closeModal = () => setModalIsOpen(false)

    const openDeleteModal = (profissional: Funcionario) => {
        setProfissionalToDelete(profissional)
        setDeleteModalIsOpen(true)
    }

    const closeDeleteModal = () => {
        setProfissionalToDelete(null)
        setDeleteModalIsOpen(false)
    }

    const openDetalhesModal = (profissional: Funcionario) => {
        setSelectedProfissional(profissional)
        setDetalhesModalIsOpen(true)
    }

    const closeDetalhesModal = () => {
        setSelectedProfissional(null)
        setDetalhesModalIsOpen(false)
    }

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
                setProfissionais(data)
                setFilteredProfissionais(data)
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

    const handleDelete = async () => {
        if (!profissionalToDelete) return

        try {
            const token = sessionStorage.getItem('access_token_barbearia')
            const response = await authFetch(
                `${api.baseURL}/funcionarios/${profissionalToDelete.id}/`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            )

            if (response.ok) {
                setProfissionais((prev) => prev.filter((f) => f.id !== profissionalToDelete.id))
                setFilteredProfissionais((prev) =>
                    prev.filter((f) => f.id !== profissionalToDelete.id),
                )
                closeDeleteModal()
            } else {
                console.error('Erro ao deletar profissional')
            }
        } catch (error) {
            console.error('Erro:', error)
        }
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value
        setSearchTerm(term)
        const filtered = profissionais.filter((profissional) =>
            profissional.nome.toLowerCase().includes(term.toLowerCase()),
        )
        setFilteredProfissionais(filtered)
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
                    <S.SearchAndAdd>
                        <input
                            type="text"
                            placeholder="Pesquisar por profissional..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <button onClick={openModal}>+ Novo Profissional</button>
                    </S.SearchAndAdd>
                    {filteredProfissionais.length > 0 && (
                        <S.FieldNames>
                            <p>Nome</p>
                        </S.FieldNames>
                    )}
                </S.ServiceHeader>

                {isLoading ? (
                    <S.LoadingContainer>
                        <ClipLoader color="#00c1fe" size={32} speedMultiplier={1} />
                    </S.LoadingContainer>
                ) : hasError ? (
                    <S.Message>Erro ao carregar os profissionais. Tente novamente.</S.Message>
                ) : profissionais.length === 0 ? (
                    <S.Message>Você ainda não tem profissionais cadastrados.</S.Message>
                ) : (
                    <>
                        <S.List>
                            {filteredProfissionais.length > 0 ? (
                                filteredProfissionais.map((profissional) => (
                                    <S.ListItem
                                        key={profissional.id}
                                        onClick={() => openDetalhesModal(profissional)}
                                    >
                                        <p>{profissional.nome}</p>
                                        <i className="ri-arrow-right-s-line"></i>
                                    </S.ListItem>
                                ))
                            ) : (
                                <S.Message>
                                    {searchTerm
                                        ? `Nenhum profissional encontrado com "${searchTerm}"`
                                        : 'Você ainda não tem profissionais cadastrados.'}
                                </S.Message>
                            )}
                        </S.List>
                        <p className="profissionais_length">
                            {filteredProfissionais.length > 1
                                ? `${filteredProfissionais.length} Profissionais`
                                : `${filteredProfissionais.length} Profissional`}
                        </p>
                    </>
                )}
            </S.Container>

            {modalIsOpen && (
                <CriarProfissionalModal closeModal={closeModal} onSuccess={fetchFuncionarios} />
            )}
            {deleteModalIsOpen && profissionalToDelete && (
                <DeleteConfirmationModal
                    isOpen={deleteModalIsOpen}
                    itemName={`o profissional ${profissionalToDelete.nome}`}
                    onConfirm={handleDelete}
                    onClose={closeDeleteModal}
                />
            )}
            {detalhesModalIsOpen && selectedProfissional && (
                <DetalhesProfissionalModal
                    profissional={selectedProfissional}
                    onClose={closeDetalhesModal}
                    onDelete={openDeleteModal}
                />
            )}
        </>
    )
}

export default Profissionais
