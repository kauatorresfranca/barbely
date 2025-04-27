import React, { useState } from 'react'
import { Cliente } from '../../../../../models/cliente'
import { authFetch } from '../../../../../utils/authFetch'
import * as S from './styles'

interface ClienteEditProps {
    cliente: Cliente | null
    closeModal: () => void
}

const ClienteEdit: React.FC<ClienteEditProps> = ({ cliente, closeModal }) => {
    const [nome, setNome] = useState(cliente?.user?.nome || '')
    const [telefone, setTelefone] = useState(cliente?.user?.telefone || '')
    const [isEditing, setIsEditing] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!cliente) return

        const token = sessionStorage.getItem('access_token_barbearia')
        try {
            await authFetch(`http://localhost:8000/api/clientes/${cliente.id}/`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: {
                        nome,
                        telefone,
                    },
                }),
            })
            closeModal()
        } catch (err) {
            console.error('Erro ao atualizar cliente:', err)
        }
    }

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            closeModal()
        }
    }

    return (
        <S.Overlay onClick={handleOverlayClick}>
            <S.Modal>
                <S.CloseButton onClick={closeModal}>×</S.CloseButton>
                <h2>Editar Cliente</h2>
                {cliente ? (
                    <form onSubmit={handleSubmit}>
                        <label>
                            Nome:
                            <input
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </label>
                        <label>
                            Telefone:
                            <input
                                type="text"
                                value={telefone}
                                onChange={(e) => setTelefone(e.target.value)}
                            />
                        </label>
                        <S.ButtonContainer>
                            {isEditing ? (
                                <>
                                    <S.CancelButton
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                    >
                                        Cancelar
                                    </S.CancelButton>
                                    <S.Button type="submit">Salvar</S.Button>
                                </>
                            ) : (
                                <S.ButtonEdit onClick={() => setIsEditing(true)}>
                                    Editar Cliente
                                </S.ButtonEdit>
                            )}
                        </S.ButtonContainer>
                    </form>
                ) : (
                    <p>Nenhum cliente selecionado.</p>
                )}
            </S.Modal>
        </S.Overlay>
    )
}

export default ClienteEdit
