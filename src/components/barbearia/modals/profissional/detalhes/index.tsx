import React, { useState, useEffect } from 'react'
import { Funcionario } from '../../../../../models/funcionario'
import { authFetch } from '../../../../../utils/authFetch'
import * as S from './styles'
import api from '../../../../../services/api'

interface DetalhesProps {
    profissional: Funcionario | null
    onClose: () => void
    onDelete: (profissional: Funcionario) => void
}

const DetalhesProfissionalModal: React.FC<DetalhesProps> = ({
    profissional,
    onClose,
    onDelete,
}) => {
    const [isEditing, setIsEditing] = useState(false)
    const [nome, setNome] = useState(profissional?.nome || '')
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    useEffect(() => {
        if (profissional) {
            setNome(profissional.nome || '')
        }
    }, [profissional])

    const handleEdit = () => {
        setIsEditing(true)
        setErrorMessage(null)
    }

    const handleCancel = () => {
        setIsEditing(false)
        if (profissional) {
            setNome(profissional.nome || '')
        }
        setErrorMessage(null)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!profissional) return

        try {
            const token = sessionStorage.getItem('access_token_barbearia')
            const response = await authFetch(`${api.baseURL}/funcionarios/${profissional.id}/`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome,
                }),
            })

            if (response.ok) {
                setIsEditing(false)
                // Atualizar o estado local se necessário (depende da lógica do componente pai)
                setErrorMessage(null)
            } else {
                const errorText = await response.text()
                setErrorMessage(`Erro ao atualizar profissional: ${errorText}`)
            }
        } catch (err) {
            console.error('Erro ao atualizar profissional:', err)
            setErrorMessage('Ocorreu um erro ao atualizar o profissional. Tente novamente.')
        }
    }

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    if (!profissional) return null

    return (
        <S.Overlay onClick={handleOverlayClick}>
            <S.Modal>
                <S.CloseButton onClick={onClose}>×</S.CloseButton>
                <h2>Detalhes do Profissional</h2>
                <S.InfoSection>
                    <h3>Informações</h3>
                    {isEditing ? (
                        <form onSubmit={handleSubmit}>
                            {errorMessage && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}
                            <S.InputGroup>
                                <label htmlFor="nome_profissional">Nome do Profissional</label>
                                <input
                                    type="text"
                                    id="nome_profissional"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    placeholder="Nome do Profissional"
                                    required
                                />
                            </S.InputGroup>
                            <S.ButtonGroup>
                                <S.CancelButton type="button" onClick={handleCancel}>
                                    Cancelar
                                </S.CancelButton>
                                <S.Button type="submit">Salvar</S.Button>
                            </S.ButtonGroup>
                        </form>
                    ) : (
                        <>
                            <p>
                                <i className="ri-user-line"></i> Nome:{' '}
                                <strong>{profissional.nome}</strong>
                            </p>
                            <S.Button onClick={handleEdit}>Editar Profissional</S.Button>
                        </>
                    )}
                </S.InfoSection>
                <S.ProfissionalDeleteSection>
                    <h3>Excluir Profissional</h3>
                    <p>
                        Esta ação é irreversível e apagará todos os dados do profissional
                        relacionados à sua barbearia, como agendamentos associados.
                    </p>
                    <S.DeleteButton
                        onClick={() => onDelete(profissional)}
                        style={{ marginTop: '10px' }}
                    >
                        <i className="ri-delete-bin-line"></i>
                        Excluir Profissional
                    </S.DeleteButton>
                </S.ProfissionalDeleteSection>
            </S.Modal>
        </S.Overlay>
    )
}

export default DetalhesProfissionalModal
