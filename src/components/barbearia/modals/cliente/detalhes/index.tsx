import React, { useState, useEffect } from 'react'
import { Cliente } from '../../../../../models/cliente'
import { authFetch } from '../../../../../utils/authFetch'
import * as S from './styles'
import api from '../../../../../services/api'
import { IMaskInput } from 'react-imask'

interface DetalhesProps {
    cliente: Cliente | null
    onClose: () => void
    onDelete?: (cliente: Cliente) => void
}

const Detalhes: React.FC<DetalhesProps> = ({ cliente, onClose, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [nome, setNome] = useState(cliente?.user?.nome || '')
    const [telefone, setTelefone] = useState(cliente?.user?.telefone || '')
    const [email, setEmail] = useState(cliente?.user?.email || '')
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

    const handleEdit = () => {
        setIsEditing(true)
        setErrorMessage(null)
    }

    const handleCancel = () => {
        setIsEditing(false)
        setNome(cliente?.user?.nome || '')
        setTelefone(cliente?.user?.telefone || '')
        setEmail(cliente?.user?.email || '')
        setErrorMessage(null)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!cliente || !cliente.barbearia) {
            setErrorMessage('Cliente ou barbearia inválidos.')
            return
        }

        const telefoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/
        if (!telefoneRegex.test(telefone)) {
            setErrorMessage('O telefone deve estar no formato (XX) XXXXX-XXXX.')
            return
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            setErrorMessage('Email inválido.')
            return
        }

        try {
            console.log('Atualizando cliente:', {
                nome,
                telefone,
                email,
                barbearia: cliente.barbearia,
            })
            const response = await authFetch(`${api.baseURL}/barbearia/clientes/${cliente.id}/`, {
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

            if (response.ok) {
                const updatedCliente = await response.json()
                if (cliente && cliente.user) {
                    cliente.user.nome = nome
                    cliente.user.telefone = telefone
                    cliente.user.email = email
                }
                setErrorMessage(null)
                setIsEditing(false)
            } else {
                const errorText = await response.text()
                console.error('Erro na resposta:', errorText)
                if (errorText.includes('cliente user with this email already exists')) {
                    setErrorMessage('Este email já está em uso. Por favor, escolha outro.')
                } else if (errorText.includes('Cliente user with this telefone already exists')) {
                    setErrorMessage('Este telefone já está em uso. Por favor, escolha outro.')
                } else {
                    setErrorMessage(`Erro ao atualizar cliente: ${errorText}`)
                }
            }
        } catch (err: any) {
            console.error('Erro ao atualizar cliente:', {
                message: err.message,
                response: err.response ? await err.response.text() : 'Sem resposta',
                status: err.response?.status,
            })
            setErrorMessage('Ocorreu um erro ao atualizar o cliente. Tente novamente.')
        }
    }

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    if (!cliente || !cliente.user) return null

    return (
        <S.Overlay onClick={handleOverlayClick}>
            <S.Modal>
                <S.CloseButton onClick={onClose}>×</S.CloseButton>
                <h2>Detalhes do Cliente</h2>
                <S.ClientInfo>
                    <S.ClienteImage>
                        {preview ? (
                            <img src={preview} alt="Foto do cliente" />
                        ) : (
                            <i className="ri-user-3-fill"></i>
                        )}
                    </S.ClienteImage>
                    <div>
                        <h3>{cliente.user?.nome}</h3>
                        <p>ID do cliente: {cliente.id}</p>
                        <p>
                            Cliente desde:{' '}
                            {new Date(cliente.user.date_joined).toLocaleDateString('pt-BR')}
                        </p>
                        <S.Button onClick={handleEdit}>Editar dados do cliente</S.Button>
                    </div>
                </S.ClientInfo>

                {isEditing ? (
                    <form onSubmit={handleSubmit}>
                        {errorMessage && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}
                        <S.InputGroup>
                            <label htmlFor="nome_cliente">Nome do Cliente</label>
                            <input
                                type="text"
                                id="nome_cliente"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                placeholder="Nome do Cliente"
                                required
                            />
                        </S.InputGroup>
                        <S.InputGroup>
                            <label htmlFor="telefone_cliente">Telefone</label>
                            <IMaskInput
                                mask="(00) 00000-0000"
                                type="text"
                                id="telefone_cliente"
                                value={telefone}
                                onAccept={(value) => setTelefone(value)}
                                placeholder="(00) 00000-0000"
                                required
                            />
                        </S.InputGroup>
                        <S.InputGroup>
                            <label htmlFor="email_cliente">Email</label>
                            <input
                                type="email"
                                id="email_cliente"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
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
                        <S.InfoSection>
                            <h3>Informações</h3>
                            <p>
                                <i className="ri-user-line"></i> Nome:{' '}
                                <strong>{cliente.user.nome}</strong>
                            </p>
                            <p>
                                <i className="ri-phone-line"></i> Celular:{' '}
                                <strong>{cliente.user.telefone || 'Telefone indisponível'}</strong>
                            </p>
                            <p>
                                <i className="ri-mail-line"></i> Email:{' '}
                                <strong>{cliente.user.email}</strong>
                            </p>
                            <p>
                                <i className="ri-money-dollar-circle-line"></i> Saldo do cliente:{' '}
                                <strong>R$ 0,00</strong>
                            </p>
                        </S.InfoSection>
                        <S.StatsSection>
                            <h3>Estatísticas do cliente</h3>
                            <p>-</p>
                        </S.StatsSection>
                        <S.HistorySection>
                            <h3>Histórico</h3>
                            <S.HistoryContainer>
                                <i className="ri-history-fill"></i>
                                <S.HistoryContent>
                                    <div>
                                        <h4>Sexta-feira, 02/05</h4>
                                        <p className="horario">09:00 - 19:00</p>
                                    </div>
                                    <S.HistoryInfos>
                                        <S.Info>
                                            <h4>Barbeiro</h4>
                                            <p>Chocolate</p>
                                        </S.Info>
                                        <S.Info>
                                            <h4>Serviço</h4>
                                            <p>Corte de cabelo</p>
                                        </S.Info>
                                    </S.HistoryInfos>
                                </S.HistoryContent>
                            </S.HistoryContainer>
                        </S.HistorySection>
                        <S.ClienteDeleteSection>
                            <h3>Excluir cliente</h3>
                            <p>
                                Esta ação é irreversível e apagará todos os dados do cliente
                                relacionados à sua barbearia, como valores recebidos e históricos de
                                atendimento.
                            </p>
                            {onDelete && (
                                <S.DeleteButton
                                    onClick={() => onDelete(cliente)}
                                    style={{ marginTop: '10px' }}
                                >
                                    <i className="ri-delete-bin-line"></i>
                                    Excluir cliente
                                </S.DeleteButton>
                            )}
                        </S.ClienteDeleteSection>
                    </>
                )}
            </S.Modal>
        </S.Overlay>
    )
}

export default Detalhes
