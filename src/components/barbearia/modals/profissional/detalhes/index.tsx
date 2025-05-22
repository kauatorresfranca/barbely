import React, { useState, useEffect } from 'react'
import { IMaskInput } from 'react-imask'
import { Funcionario } from '../../../../../models/funcionario'
import { authFetch } from '../../../../../utils/authFetch'
import * as S from './styles'
import api from '../../../../../services/api'
import user from '../../../../../assets/images/user.png' // Importar imagem padrão

interface DetalhesProps {
    profissional: Funcionario | null
    onClose: () => void
    onDelete: (profissional: Funcionario) => void
    onSuccess: () => void
}

const DetalhesProfissionalModal: React.FC<DetalhesProps> = ({
    profissional,
    onClose,
    onDelete,
    onSuccess,
}) => {
    const [isEditing, setIsEditing] = useState(false)
    const [nome, setNome] = useState(profissional?.nome || '')
    const [email, setEmail] = useState(profissional?.email || '')
    const [telefone, setTelefone] = useState(profissional?.telefone || '')
    const [imagem, setImagem] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    useEffect(() => {
        if (profissional) {
            setNome(profissional.nome || '')
            setEmail(profissional.email || '')
            setTelefone(profissional.telefone || '')
            setImagem(null)
            setErrorMessage(null)
            if (profissional.fotoPerfil) {
                const fotoPerfil = profissional.fotoPerfil
                const isFullUrl = fotoPerfil.startsWith('http') || fotoPerfil.startsWith('https')
                const imageUrl = isFullUrl ? fotoPerfil : `${api.baseURL}${fotoPerfil}`
                setPreview(imageUrl)
            } else {
                setPreview(user) // Usar imagem padrão se não houver foto
            }
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
            setEmail(profissional.email || '')
            setTelefone(profissional.telefone || '')
            setPreview(profissional.fotoPerfil ? `${api.baseURL}${profissional.fotoPerfil}` : user)
            setImagem(null)
        }
        setErrorMessage(null)
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setErrorMessage('A imagem não pode exceder 5MB.')
                return
            }
            if (!file.type.startsWith('image/')) {
                setErrorMessage('O arquivo deve ser uma imagem válida.')
                return
            }
            setImagem(file)
            setPreview(URL.createObjectURL(file))
            setErrorMessage(null)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!profissional) {
            setErrorMessage('Profissional inválido.')
            return
        }

        const telefoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/
        if (telefone && !telefoneRegex.test(telefone)) {
            setErrorMessage('O telefone deve estar no formato (XX) XXXXX-XXXX.')
            return
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (email && !emailRegex.test(email)) {
            setErrorMessage('Email inválido.')
            return
        }

        try {
            const token = sessionStorage.getItem('access_token_barbearia')
            const formData = new FormData()
            formData.append('nome', nome)
            if (email) formData.append('email', email)
            if (telefone) formData.append('telefone', telefone)
            if (imagem) formData.append('imagem', imagem)

            const response = await authFetch(`${api.baseURL}/funcionarios/${profissional.id}/`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            })

            if (response.status === 401) {
                throw new Error('Sessão expirada. Por favor, faça login novamente.')
            }
            if (!response.ok) {
                const errorText = await response.text()
                if (errorText.includes('funcionario with this email already exists')) {
                    throw new Error('Este email já está em uso. Por favor, escolha outro.')
                }
                if (errorText.includes('funcionario with this telefone already exists')) {
                    throw new Error('Este telefone já está em uso. Por favor, escolha outro.')
                }
                throw new Error(`Erro ao atualizar profissional: ${errorText}`)
            }

            setIsEditing(false)
            setErrorMessage(null)
            onSuccess()
        } catch (err) {
            console.error('Erro ao atualizar profissional:', err)
            setErrorMessage(
                err instanceof Error ? err.message : 'Ocorreu um erro ao atualizar o profissional.',
            )
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
                <S.ProfissionalInfo>
                    <S.ProfissionalImage>
                        {preview ? (
                            <img
                                src={preview}
                                alt="Foto do profissional"
                                onError={(e) => {
                                    console.error('Erro ao carregar imagem:', preview)
                                    e.currentTarget.src = user
                                }}
                            />
                        ) : (
                            <i className="ri-user-3-fill"></i>
                        )}
                    </S.ProfissionalImage>
                    <div>
                        <h3>{profissional.nome}</h3>
                        <p>Status do profissional: Ativo</p>
                        <p>ID do profissional: {profissional.id}</p>
                        <p>Profissional desde: {new Date().toLocaleDateString('pt-BR')}</p>
                    </div>
                </S.ProfissionalInfo>

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
                        <S.InputGroup>
                            <label htmlFor="email_profissional">Email</label>
                            <input
                                type="email"
                                id="email_profissional"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                            />
                        </S.InputGroup>
                        <S.InputGroup>
                            <label htmlFor="telefone_profissional">Telefone</label>
                            <IMaskInput
                                mask="(00) 00000-0000"
                                type="text"
                                id="telefone_profissional"
                                value={telefone}
                                onAccept={(value) => setTelefone(value)}
                                placeholder="(00) 00000-0000"
                            />
                        </S.InputGroup>
                        <S.InputGroup>
                            <label htmlFor="imagem_profissional">Foto do Profissional</label>
                            {preview && (
                                <S.ImagePreview>
                                    <img
                                        src={preview}
                                        alt="Prévia da imagem"
                                        onError={(e) => {
                                            console.error('Erro ao carregar prévia:', preview)
                                            e.currentTarget.src = user
                                        }}
                                    />
                                </S.ImagePreview>
                            )}
                            <input
                                type="file"
                                id="imagem_profissional"
                                accept="image/*"
                                onChange={handleImageChange}
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
                                <strong>{profissional.nome}</strong>
                            </p>
                            <p>
                                <i className="ri-mail-line"></i> Email:{' '}
                                <strong>{profissional.email || 'Email indisponível'}</strong>
                            </p>
                            <p>
                                <i className="ri-phone-line"></i> Telefone:{' '}
                                <strong>
                                    {profissional.telefone || 'Telefone indisponível'}
                                </strong>
                            </p>
                            <p>
                                <i className="ri-briefcase-line"></i> Total de serviços:{' '}
                                <strong>0</strong>
                            </p>
                            <S.Button onClick={handleEdit}>Editar dados do profissional</S.Button>
                        </S.InfoSection>
                        <S.StatsSection>
                            <h3>Estatísticas do profissional</h3>
                            <p>-</p>
                        </S.StatsSection>
                        <S.HistorySection>
                            <h3>Histórico</h3>
                            <S.HistoryContainer>
                                <i className="ri-history-fill"></i>
                                <S.HistoryContent>
                                    <div>
                                        <h4>Sexta-feira, 02/05</h4>
                                        <p className="horario">09:00 - 10:00</p>
                                    </div>
                                    <S.HistoryInfos>
                                        <S.Info>
                                            <h4>Cliente</h4>
                                            <p>João Silva</p>
                                        </S.Info>
                                        <S.Info>
                                            <h4>Serviço</h4>
                                            <p>Corte de cabelo</p>
                                        </S.Info>
                                    </S.HistoryInfos>
                                </S.HistoryContent>
                            </S.HistoryContainer>
                        </S.HistorySection>
                        <S.ProfissionalDeleteSection>
                            <h3>Excluir Profissional</h3>
                            <p>
                                Esta ação é irreversível e apagará todos os dados do profissional
                                relacionados à sua barbearia, como agendamentos associados.
                            </p>
                            <S.DeleteButton onClick={() => onDelete(profissional)}>
                                <i className="ri-delete-bin-line"></i>
                                Excluir Profissional
                            </S.DeleteButton>
                        </S.ProfissionalDeleteSection>
                    </>
                )}
            </S.Modal>
        </S.Overlay>
    )
}

export default DetalhesProfissionalModal
