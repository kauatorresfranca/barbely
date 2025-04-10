import * as S from './styles'
import { useState } from 'react'

interface Props {
    closeModal: () => void
    onSuccess: () => void
}

const CriarProfissionalModal = ({ closeModal, onSuccess }: Props) => {
    const [nome, setNome] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            closeModal()
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const token = sessionStorage.getItem('access_token')
            console.log("Token enviado:", token)
            const response = await fetch('http://localhost:8000/api/funcionarios/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ nome }),
            })

            if (response.ok) {
                onSuccess() // callback pra atualizar a lista
                closeModal()
            } else {
                console.error('Erro ao adicionar profissional')
            }
        } catch (error) {
            console.error('Erro:', error)
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
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Adicionando...' : 'Adicionar Profissional'}
                    </button>
                </S.Form>
            </S.Modal>
        </S.Overlay>
    )
}

export default CriarProfissionalModal
