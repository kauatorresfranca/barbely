import { useState } from 'react'
import * as S from './styles'
import api from '../../../../../services/api'

interface Props {
    closeModal: () => void
    onSuccess: () => void
}

const CriarProfissionalModal = ({ closeModal, onSuccess }: Props) => {
    const [nome, setNome] = useState('')
    const [imagem, setImagem] = useState<File | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            closeModal()
        }
    }

    const handleImagemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImagem(e.target.files[0])
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setErrorMessage(null)

        try {
            const token = sessionStorage.getItem('access_token_barbearia')
            if (!token) {
                throw new Error('Sessão expirada. Por favor, faça login novamente.')
            }

            const formData = new FormData()
            formData.append('nome', nome)
            if (imagem) {
                formData.append('imagem', imagem)
            }

            const response = await fetch(`${api.baseURL}/funcionarios/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            })

            if (response.ok) {
                onSuccess()
                closeModal()
            } else {
                const errorText = await response.text()
                console.error('Erro ao adicionar profissional:', errorText)
                setErrorMessage(`Erro ao adicionar profissional: ${errorText}`)
            }
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
                    <S.inputGroup>
                        <label htmlFor="imagem_profissional">Foto do Profissional</label>
                        <input
                            type="file"
                            id="imagem_profissional"
                            name="imagem"
                            accept="image/*"
                            onChange={handleImagemChange}
                        />
                    </S.inputGroup>
                    {errorMessage && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Adicionando...' : 'Adicionar Profissional'}
                    </button>
                </S.Form>
            </S.Modal>
        </S.Overlay>
    )
}

export default CriarProfissionalModal
