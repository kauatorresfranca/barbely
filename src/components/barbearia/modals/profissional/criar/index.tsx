import { useState, useRef } from 'react'
import { IMaskInput } from 'react-imask'
import { authFetch } from '../../../../../utils/authFetch'
import * as S from './styles'
import api from '../../../../../services/api'

interface Props {
    closeModal: () => void
    onSuccess: () => void
}

const CriarProfissionalModal = ({ closeModal, onSuccess }: Props) => {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('')
    const [imagem, setImagem] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
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

    const handleImagemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        setIsLoading(true)
        setErrorMessage(null)

        if (!nome) {
            setErrorMessage('O nome é obrigatório.')
            setIsLoading(false)
            return
        }

        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setErrorMessage('Email inválido.')
            setIsLoading(false)
            return
        }

        if (telefone && !/^\(\d{2}\) \d{5}-\d{4}$/.test(telefone)) {
            setErrorMessage('O telefone deve estar no formato (XX) XXXXX-XXXX.')
            setIsLoading(false)
            return
        }

        try {
            const token = sessionStorage.getItem('access_token_barbearia')
            if (!token) {
                throw new Error('Sessão expirada. Por favor, faça login novamente.')
            }

            const formData = new FormData()
            formData.append('nome', nome)
            if (email) formData.append('email', email)
            if (telefone) formData.append('telefone', telefone)
            if (imagem) formData.append('imagem', imagem)

            const response = await authFetch(`${api.baseURL}/funcionarios/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            })

            if (!response.ok) {
                const errorText = await response.text()
                if (errorText.includes('funcionario with this email already exists')) {
                    throw new Error('Este email já está em uso. Por favor, escolha outro.')
                }
                if (errorText.includes('funcionario with this telefone already exists')) {
                    throw new Error('Este telefone já está em uso. Por favor, escolha outro.')
                }
                throw new Error(`Erro ao adicionar profissional: ${errorText}`)
            }

            onSuccess()
            closeModal()
        } catch (error) {
            console.error('Erro:', error)
            setErrorMessage(error instanceof Error ? error.message : 'Erro desconhecido')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <S.Overlay onClick={handleOverlayClick}>
            <S.Modal>
                <S.CloseButton onClick={closeModal}>×</S.CloseButton>
                <h2>Adicionar Profissional</h2>
                <S.Form onSubmit={handleSubmit}>
                    {errorMessage && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}
                    <S.InputGroup>
                        <label htmlFor="imagem_profissional">Foto do Profissional</label>
                        <S.ImagePreview onClick={handleImageClick} style={{ cursor: 'pointer' }}>
                            {preview ? (
                                <img src={preview} alt="Prévia da imagem" />
                            ) : (
                                <i className="ri-user-3-fill" style={{ fontSize: '80px', color: '#fff' }} />
                            )}
                        </S.ImagePreview>
                        <input
                            type="file"
                            id="imagem_profissional"
                            name="imagem"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleImagemChange}
                            style={{ display: 'none' }}
                        />
                    </S.InputGroup>
                    <S.InputGroup>
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
                    </S.InputGroup>
                    <S.InputGroup>
                        <label htmlFor="email_profissional">Email</label>
                        <input
                            type="email"
                            id="email_profissional"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </S.InputGroup>
                    <S.InputGroup>
                        <label htmlFor="telefone_profissional">Telefone</label>
                        <IMaskInput
                            mask="(00) 00000-0000"
                            type="text"
                            id="telefone_profissional"
                            name="telefone"
                            placeholder="(00) 00000-0000"
                            value={telefone}
                            onAccept={(value) => setTelefone(value)}
                        />
                    </S.InputGroup>
                        <S.Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Adicionando...' : 'Adicionar Profissional'}
                        </S.Button>
                </S.Form>
            </S.Modal>
        </S.Overlay>
    )
}

export default CriarProfissionalModal
