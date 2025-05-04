import { useState } from 'react'
import * as S from './styles'
import { Servico } from '../../../../../models/servico'
import { authFetch } from '../../../../../utils/authFetch'
import api from '../../../../../services/api'

interface Props {
    closeModal: () => void
    servico: Servico
}

const EditarServicoModal = ({ closeModal, servico }: Props) => {
    const [isEditing, setIsEditing] = useState(false)
    const [nome, setNome] = useState(servico?.nome || '')
    const [preco, setPreco] = useState(servico?.preco || '')
    const [duracao, setDuracao] = useState(servico?.duracao_minutos || '')

    function Editar() {
        setIsEditing(true)
    }

    function cancelarEdicao() {
        setNome(servico?.nome || '')
        setPreco(servico?.preco || '')
        setDuracao(servico?.duracao_minutos || '')
        setIsEditing(false)
    }

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            closeModal()
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!servico) return

        const token = sessionStorage.getItem('access_token_barbearia')
        try {
            await authFetch(`${api.baseURL}/servicos/${servico.id}/`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome,
                    preco,
                    duracao_minutos: duracao,
                }),
            })
            closeModal()
        } catch (err) {
            console.error('Erro ao atualizar serviço:', err)
        }
    }

    return (
        <S.Overlay onClick={handleOverlayClick}>
            <S.Modal>
                <S.CloseButton onClick={closeModal}>×</S.CloseButton>
                <h2>Editar Serviço</h2>
                {isEditing ? (
                    <form onSubmit={handleSubmit}>
                        <S.inputGroup>
                            <label htmlFor="nome_servico">Nome do Serviço</label>
                            <input
                                type="text"
                                id="nome_servico"
                                name="nome"
                                placeholder="Nome do Serviço"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                            />
                        </S.inputGroup>
                        <S.inputGroup>
                            <label htmlFor="valor_servico">Valor do Serviço</label>
                            <input
                                type="text"
                                id="valor_servico"
                                name="valor"
                                placeholder="Valor do Serviço"
                                value={preco}
                                onChange={(e) => setPreco(e.target.value)}
                                required
                            />
                        </S.inputGroup>
                        <S.inputGroup>
                            <label htmlFor="duracao_servico">Duração do Serviço</label>
                            <input
                                type="text"
                                id="duracao_servico"
                                name="duracao"
                                placeholder="Duração do Serviço"
                                value={duracao}
                                onChange={(e) => setDuracao(e.target.value)}
                                required
                            />
                        </S.inputGroup>
                        <S.ButtonGroup>
                            <S.CancelButton onClick={cancelarEdicao}>Cancelar</S.CancelButton>
                            <S.ModalButton type="submit">Salvar</S.ModalButton>
                        </S.ButtonGroup>
                    </form>
                ) : (
                    <>
                        <S.InfoList>
                            <S.InfoItem>
                                <strong>Serviço:</strong> {servico?.nome || 'Não informado'}
                            </S.InfoItem>
                            <S.InfoItem>
                                <strong>Duração:</strong>{' '}
                                {servico?.duracao_minutos || 'Não informado'}
                            </S.InfoItem>
                            <S.InfoItem>
                                <strong>Preço:</strong> {servico?.preco || 'Não informado'}
                            </S.InfoItem>
                        </S.InfoList>
                        <S.ModalButton onClick={Editar}>Editar Serviço</S.ModalButton>
                    </>
                )}
            </S.Modal>
        </S.Overlay>
    )
}

export default EditarServicoModal
