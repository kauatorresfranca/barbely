import React, { useState, useEffect } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { Cliente } from '../../../../../models/cliente'
import { authFetch } from '../../../../../utils/authFetch'
import * as S from './styles'
import api from '../../../../../services/api'
import { IMaskInput } from 'react-imask'
import { colors } from '../../../../../../styles'

interface ClienteEditProps {
    cliente: Cliente | null
    closeModal: () => void
}

const ClienteEdit: React.FC<ClienteEditProps> = ({ cliente, closeModal }) => {
    const [nome, setNome] = useState(cliente?.user?.nome || '')
    const [telefone, setTelefone] = useState(cliente?.user?.telefone || '')
    const [email, setEmail] = useState(cliente?.user?.email || '')
    const [isEditing, setIsEditing] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [preview, setPreview] = useState<string | null>(null)

    useEffect(() => {
        if (cliente?.fotoPerfil) {
            const fotoPerfil = cliente.fotoPerfil
            const isFullUrl = fotoPerfil.startsWith('http') || fotoPerfil.startsWith('https')
            const imageUrl = isFullUrl ? fotoPerfil : `${api.baseURL}${fotoPerfil}`
            setPreview(imageUrl)
        } else {
            setPreview(null)
        }
    }, [cliente])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!cliente || !cliente.barbearia) return

        const telefoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/
        if (!telefoneRegex.test(telefone)) {
            setErrorMessage('O telefone deve estar no formato (XX) XXXXX-XXXX.')
            return
        }

        try {
            const response = await authFetch(`${api.baseURL}/clientes/${cliente.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: {
                        nome,
                        telefone,
                        email,
                    },
                    barbearia: cliente.barbearia,
                }),
            })
            if (!response.ok) {
                const errorText = await response.text()
                if (errorText.includes('cliente user with this email already exists')) {
                    setErrorMessage('Este email já está em uso. Por favor, escolha outro.')
                } else {
                    throw new Error(`Erro na requisição: ${errorText}`)
                }
                return
            }
            setErrorMessage(null)
            closeModal()
        } catch (err: any) {
            console.error('Erro ao atualizar cliente:', {
                message: err.message,
                response: err.response ? await err.response.text() : 'No response',
                status: err.response?.status,
            })
            if (!errorMessage) {
                setErrorMessage('Ocorreu um erro ao atualizar o cliente. Tente novamente.')
            }
        }
    }

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            closeModal()
        }
    }

    function Editar() {
        setIsEditing(true)
        setErrorMessage(null)
    }

    function cancelarEdicao() {
        setNome(cliente?.user?.nome || '')
        setTelefone(cliente?.user?.telefone || '')
        setEmail(cliente?.user?.email || '')
        setIsEditing(false)
        setErrorMessage(null)
    }

    return (
        <S.Overlay onClick={handleOverlayClick}>
            <S.Modal>
                <S.CloseButton onClick={closeModal}>×</S.CloseButton>
                <S.ProfileHeader>
                    <S.ImageWrapper aria-label="Foto de perfil do cliente">
                        {preview ? (
                            <S.ProfileImage
                                src={preview}
                                alt="Foto de Perfil"
                                onError={() => {
                                    console.error('Erro ao carregar imagem:', preview)
                                    setPreview(null)
                                }}
                            />
                        ) : (
                            <FaUserCircle size={80} color={colors.texto} />
                        )}
                    </S.ImageWrapper>
                    <S.UserName>{cliente?.user?.nome || 'Usuário'}</S.UserName>
                </S.ProfileHeader>
                {cliente ? (
                    <>
                        {isEditing ? (
                            <form onSubmit={handleSubmit}>
                                {errorMessage && <p>{errorMessage}</p>}
                                <S.inputGroup>
                                    <label htmlFor="nome_cliente">Nome do Cliente</label>
                                    <input
                                        type="text"
                                        id="nome_cliente"
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                        placeholder="Nome do Cliente"
                                        required
                                    />
                                </S.inputGroup>
                                <S.inputGroup>
                                    <label htmlFor="telefone_cliente">Telefone</label>
                                    <IMaskInput
                                        mask="(00) 00000-0000"
                                        type="text"
                                        id="telefone_cliente"
                                        value={telefone}
                                        onChange={(e) => setTelefone(e.target.value)}
                                        placeholder="(00) 00000-0000"
                                        required
                                    />
                                </S.inputGroup>
                                <S.inputGroup>
                                    <label htmlFor="email_cliente">Email</label>
                                    <input
                                        type="email"
                                        id="email_cliente"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email"
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
                                <S.InfoClientList>
                                    <p>
                                        <strong>Nome:</strong> {cliente.user.nome}
                                    </p>
                                    <p>
                                        <strong>Email:</strong> {cliente.user.email}
                                    </p>
                                    <p>
                                        <strong>Telefone:</strong> {cliente.user.telefone}
                                    </p>
                                    <p>
                                        <strong>Cliente desde:</strong>{' '}
                                        {cliente.user.date_joined
                                            ? new Date(cliente.user.date_joined).toLocaleDateString(
                                                  'pt-BR',
                                              )
                                            : 'Não informado'}
                                    </p>
                                </S.InfoClientList>
                                <S.ModalButton onClick={Editar}>Editar Cliente</S.ModalButton>
                            </>
                        )}
                    </>
                ) : (
                    <p>Nenhum cliente selecionado.</p>
                )}
            </S.Modal>
        </S.Overlay>
    )
}

export default ClienteEdit
