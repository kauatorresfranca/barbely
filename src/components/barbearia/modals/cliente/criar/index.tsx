import React, { useState, useRef } from 'react'
import { IMaskInput } from 'react-imask'
import { authFetch } from '../../../../../utils/authFetch'
import * as S from './styles'
import api from '../../../../../services/api'

interface ClienteEditProps {
    closeModal: () => void
}

const ClienteNew: React.FC<ClienteEditProps> = ({ closeModal }) => {
    const [nome, setNome] = useState('')
    const [telefone, setTelefone] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [imagem, setImagem] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            closeModal()
        }
    }

    const handleImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
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

        setErrorMessage(null)
        setSuccessMessage(null)

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

        if (!senha) {
            setErrorMessage('A senha é obrigatória.')
            return
        }

        const barbeariaId = sessionStorage.getItem('barbearia_token')
        if (!barbeariaId) {
            setErrorMessage('Barbearia não autenticada.')
            return
        }

        const formData = new FormData()
        formData.append('user.nome', nome)
        formData.append('user.telefone', telefone)
        formData.append('user.email', email)
        formData.append('user.password', senha)
        formData.append('barbearia', barbeariaId)
        if (imagem) {
            formData.append('imagem', imagem)
        }

        try {
            console.log('Criando cliente com FormData:', formData)
            const response = await authFetch(`${api.baseURL}/clientes/`, {
                method: 'POST',
                body: formData,
            })

            if (response.ok) {
                const responseData = await response.json()
                setSuccessMessage(
                    `Cliente criado com sucesso: ${responseData.user.nome} (${responseData.user.telefone})`,
                )
                setTimeout(() => {
                    closeModal()
                }, 2000)
            } else {
                const errorText = await response.text()
                console.error('Erro na resposta:', errorText)
                if (errorText.includes('cliente user with this email already exists')) {
                    setErrorMessage('Este email já está em uso. Por favor, escolha outro.')
                } else if (errorText.includes('Cliente user with this telefone already exists')) {
                    setErrorMessage('Este telefone já está em uso. Por favor, escolha outro.')
                } else {
                    setErrorMessage(`Erro ao criar cliente: ${errorText}`)
                }
            }
        } catch (err: any) {
            console.error('Erro ao criar cliente:', {
                message: err.message,
                response: err.response ? await err.response.text() : 'Sem resposta',
                status: err.response?.status,
            })
            setErrorMessage('Ocorreu um erro ao criar o cliente. Tente novamente.')
        }
    }

    return (
        <S.Overlay onClick={handleOverlayClick}>
            <S.Modal>
                <S.CloseButton onClick={closeModal}>×</S.CloseButton>
                <h2>Criar Cliente</h2>
                <form onSubmit={handleSubmit}>
                    {errorMessage && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}
                    {successMessage && <S.SuccessMessage>{successMessage}</S.SuccessMessage>}
                    <S.InputGroup>
                        <label>Foto do Cliente</label>
                        <S.ImagePreview
                            onClick={handleImageClick}
                            style={{ cursor: 'pointer', marginBottom: '16px', textAlign: 'center' }}
                        >
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Prévia da imagem"
                                    style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px', objectFit: 'cover' }}
                                />
                            ) : (
                                <i className="ri-user-3-fill" style={{ fontSize: '80px', color: '#fff' }} />
                            )}
                        </S.ImagePreview>
                        <input
                            type="file"
                            id="imagem_cliente"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                        />
                    </S.InputGroup>
                    <S.InputGroup>
                        <label>Nome</label>
                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder="Nome do Cliente"
                            required
                        />
                    </S.InputGroup>
                    <S.InputGroup>
                        <label>Telefone</label>
                        <IMaskInput
                            mask="(00) 00000-0000"
                            type="text"
                            value={telefone}
                            onAccept={(value: string | undefined) => setTelefone(value || '')}
                            placeholder="(00) 00000-0000"
                            required
                        />
                    </S.InputGroup>
                    <S.InputGroup>
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                        />
                    </S.InputGroup>
                    <S.InputGroup>
                        <label>Senha</label>
                        <input
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            placeholder="Senha"
                            required
                        />
                    </S.InputGroup>
                    <S.Button type="submit">Criar Cliente</S.Button>
                </form>
            </S.Modal>
        </S.Overlay>
    )
}

export default ClienteNew
