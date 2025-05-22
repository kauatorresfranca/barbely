import { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'
import { authFetch } from '../../../../utils/authFetch'
import { Funcionario } from '../../../../models/funcionario'
import CriarProfissionalModal from '../../modals/profissional/criar'
import DetalhesProfissionalModal from '../../modals/profissional/detalhes'
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
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
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

    const getFotoPerfilUrl = (fotoPerfil: string | null): string | null => {
        if (!fotoPerfil) return null
        const isFullUrl = fotoPerfil.startsWith('http') || fotoPerfil.startsWith('https')
        return isFullUrl ? fotoPerfil : `${api.baseURL}${fotoPerfil}`
    }

    const fetchFuncionarios = async () => {
        setIsLoading(true)
        setHasError(false)
        setErrorMessage(null)
        try {
            const token = sessionStorage.getItem('access_token_barbearia')
            if (!token) {
                throw new Error('Sessão expirada. Por favor, faça login novamente.')
            }
            const response = await authFetch(`${api.baseURL}/funcionarios/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
            if (response.status === 401) {
                throw new Error('Sessão expirada. Por favor, faça login novamente.')
            }
            if (!response.ok) {
                throw new Error(
                    `Erro ao buscar profissionais: ${response.status} ${response.statusText}`,
                )
            }
            const data = await response.json()
            setProfissionais(data)
            setFilteredProfissionais(data)
        } catch (error) {
            console.error('Erro:', error)
            setHasError(true)
            setErrorMessage(error instanceof Error ? error.message : 'Erro desconhecido')
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
                        'Content-Type': 'application/json',
                    },
                },
            )

            if (response.status === 404) {
                throw new Error('Profissional não encontrado.')
            }
            if (response.status === 401) {
                throw new Error('Sessão expirada. Por favor, faça login novamente.')
            }
            if (!response.ok) {
                throw new Error(
                    `Erro ao deletar profissional: ${response.status} ${response.statusText}`,
                )
            }

            setProfissionais((prev) => prev.filter((f) => f.id !== profissionalToDelete.id))
            setFilteredProfissionais((prev) => prev.filter((f) => f.id !== profissionalToDelete.id))
            closeDeleteModal()
        } catch (error) {
            console.error('Erro ao deletar profissional:', error)
            setHasError(true)
            setErrorMessage(error instanceof Error ? error.message : 'Erro desconhecido')
        }
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value
        setSearchTerm(term)
        const filtered = profissionais.filter((profissional) => {
            const nome = profissional.nome || ''
            const email = profissional.email || ''
            const telefone = (profissional.telefone || '').replace(/[()-/\s]/g, '')
            const normalizedSearchTerm = term.replace(/[()-/\s]/g, '')
            return (
                nome.toLowerCase().includes(term.toLowerCase()) ||
                email.toLowerCase().includes(term.toLowerCase()) ||
                telefone.toLowerCase().includes(normalizedSearchTerm.toLowerCase())
            )
        })
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
                <S.Head>
                    <S.SearchAndAdd>
                        <input
                            type="text"
                            placeholder="Buscar por nome, email ou telefone..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <button onClick={openModal}>+ Novo Profissional</button>
                    </S.SearchAndAdd>
                    {filteredProfissionais.length > 0 && (
                        <S.FieldNames>
                            <p>Nome</p>
                            <p>Telefone</p>
                            <p>Status</p>
                        </S.FieldNames>
                    )}
                </S.Head>

                {isLoading ? (
                    <S.LoadingContainer>
                        <ClipLoader color="#00c1fe" size={32} speedMultiplier={1} />
                    </S.LoadingContainer>
                ) : hasError ? (
                    <S.Message>
                        {errorMessage || 'Erro ao carregar os profissionais. Tente novamente.'}
                    </S.Message>
                ) : profissionais.length === 0 ? (
                    <S.Message>Você ainda não tem profissionais cadastrados.</S.Message>
                ) : (
                    <>
                        <S.ProfissionalList>
                            {filteredProfissionais.length > 0 ? (
                                filteredProfissionais.map((profissional) => (
                                    <S.ProfissionalItem
                                        key={profissional.id}
                                        onClick={() => openDetalhesModal(profissional)}
                                    >
                                        <S.ProfissionalImage>
                                            {getFotoPerfilUrl(profissional.imagem) ? (
                                                <img
                                                    src={getFotoPerfilUrl(profissional.imagem)!}
                                                    alt="Foto do profissional"
                                                />
                                            ) : null}
                                            <i
                                                className="ri-user-3-fill"
                                                style={{
                                                    display: getFotoPerfilUrl(
                                                        profissional.imagem,
                                                    )
                                                        ? 'none'
                                                        : 'block',
                                                }}
                                            ></i>
                                        </S.ProfissionalImage>
                                        <S.ProfissionalNameContainer>
                                            <h4>{profissional.nome || 'Nome indisponível'}</h4>
                                            <p>{profissional.email || 'Email indisponível'}</p>
                                        </S.ProfissionalNameContainer>
                                        <p>
                                            {profissional.telefone || 'Telefone indisponível'}
                                        </p>
                                        <p className="status">Ativo</p>
                                        <i className="ri-arrow-right-s-line arrow"></i>
                                    </S.ProfissionalItem>
                                ))
                            ) : (
                                <S.Message>
                                    {searchTerm
                                        ? `Nenhum profissional encontrado com "${searchTerm}"`
                                        : 'Você ainda não tem profissionais cadastrados.'}
                                </S.Message>
                            )}
                        </S.ProfissionalList>
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
                    onSuccess={fetchFuncionarios}
                />
            )}
        </>
    )
}

export default Profissionais
