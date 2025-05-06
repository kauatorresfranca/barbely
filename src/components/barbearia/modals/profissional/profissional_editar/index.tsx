import { useState } from 'react'
import * as S from './styles'
import { Funcionario } from '../../../../../models/funcionario'
import { authFetch } from '../../../../../utils/authFetch'
import api from '../../../../../services/api'

interface Props {
    closeModal: () => void
    profissional: Funcionario | null
}

const EditarProfissionalModal = ({ closeModal, profissional }: Props) => {
    const [isEditing, setIsEditing] = useState(false)
    const [nome, setNome] = useState(profissional?.nome || '')

    function Editar() {
        setIsEditing(true)
    }

    function cancelarEdicao() {
        setNome(profissional?.nome || '')
        setIsEditing(false)
    }

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            closeModal()
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!profissional) return

        try {
            const response = await authFetch(`${api.baseURL}/funcionarios/${profissional.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome,
                }),
            })
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${await response.text()}`)
            }
            closeModal()
        } catch (err: any) {
            console.error('Erro ao atualizar profissional:', {
                message: err.message,
                response: err.response ? await err.response.text() : 'No response',
                status: err.response?.status,
            })
        }
    }

    return (
        <S.Overlay onClick={handleOverlayClick}>
            <S.Modal>
                <S.CloseButton onClick={closeModal}>×</S.CloseButton>
                <h2>Editar Profissional</h2>
                {profissional ? (
                    <>
                        {isEditing ? (
                            <form onSubmit={handleSubmit}>
                                <S.inputGroup>
                                    <label htmlFor="nome_profissional">Nome do Profissional</label>
                                    <input
                                        type="text"
                                        id="nome_profissional"
                                        name="nome"
                                        placeholder="Nome do Profissional"
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                        required
                                    />
                                </S.inputGroup>
                                <S.ButtonGroup>
                                    <S.CancelButton onClick={cancelarEdicao}>
                                        Cancelar
                                    </S.CancelButton>
                                    <S.ModalButton type="submit">Salvar</S.ModalButton>
                                </S.ButtonGroup>
                            </form>
                        ) : (
                            <>
                                <p>
                                    <strong>Nome:</strong> {profissional.nome}
                                </p>
                                <S.ModalButton onClick={Editar}>Editar Profissional</S.ModalButton>
                            </>
                        )}
                    </>
                ) : (
                    <p>Nenhum profissional selecionado.</p>
                )}
            </S.Modal>
        </S.Overlay>
    )
}

export default EditarProfissionalModal
