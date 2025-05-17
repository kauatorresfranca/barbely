import api from '../../../../../services/api'
import * as S from './styles'

interface Props {
    closeModal: () => void
    onSuccess: () => Promise<void>
}

const CriarServicoModal = ({ closeModal, onSuccess }: Props) => {
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            closeModal()
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const nome = formData.get('nome_servico') as string
        const preco = parseFloat(formData.get('preco_servico') as string)
        const duracao = parseInt(formData.get('duracao_servico') as string)

        const token = sessionStorage.getItem('access_token_barbearia')

        try {
            const response = await fetch(`${api.baseURL}/servicos/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    nome,
                    preco,
                    duracao_minutos: duracao,
                }),
            })

            if (response.ok) {
                await onSuccess()
                closeModal()
            } else {
                const errorData = await response.json()
                console.error('Erro ao criar serviço:', errorData)
            }
        } catch (error) {
            console.error('Erro:', error)
        }
    }

    return (
        <S.Overlay onClick={handleOverlayClick}>
            <S.Modal>
                <S.CloseButton onClick={closeModal}>×</S.CloseButton>
                <h2>Adicionar Serviço</h2>
                <S.Form onSubmit={handleSubmit}>
                    <S.inputGroup>
                        <label htmlFor="nome_servico">Nome do Serviço</label>
                        <input
                            type="text"
                            id="nome_servico"
                            name="nome_servico"
                            placeholder="Nome do Serviço"
                            required
                        />
                    </S.inputGroup>
                    <S.inputGroup>
                        <label htmlFor="preco_servico">Preço do Serviço</label>
                        <div className="input-wrapper">
                            <input
                                type="text"
                                id="preco_servico"
                                name="preco_servico"
                                placeholder="Preço do serviço"
                                required
                            />
                        </div>
                    </S.inputGroup>
                    <S.inputGroup>
                        <label htmlFor="duracao_servico">Duração do serviço (minutos)</label>
                        <div className="input-wrapper">
                            <input
                                type="text"
                                id="duracao_servico"
                                name="duracao_servico"
                                placeholder="Duração do serviço"
                                required
                            />
                        </div>
                    </S.inputGroup>
                    <button type="submit">Adicionar Serviço</button>
                </S.Form>
            </S.Modal>
        </S.Overlay>
    )
}

export default CriarServicoModal
