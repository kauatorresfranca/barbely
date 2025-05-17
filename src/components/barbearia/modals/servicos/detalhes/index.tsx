import React, { useState, useEffect } from 'react'
import { Servico } from '../../../../../models/servico'
import { authFetch } from '../../../../../utils/authFetch'
import * as S from './styles'
import api from '../../../../../services/api'

interface DetalhesProps {
    servico: Servico | null
    onClose: () => void
    onDelete: (servico: Servico) => void
    // Removido onEdit da interface, pois não é mais necessário
}

const DetalhesServicoModal: React.FC<DetalhesProps> = ({ servico, onClose, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [nome, setNome] = useState(servico?.nome || '')
    const [preco, setPreco] = useState(servico?.preco.toString() || '')
    const [duracao, setDuracao] = useState(servico?.duracao_minutos.toString() || '')
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    useEffect(() => {
        if (servico) {
            setNome(servico.nome || '')
            setPreco(servico.preco.toString() || '')
            setDuracao(servico.duracao_minutos.toString() || '')
        }
    }, [servico])

    const handleEdit = () => {
        setIsEditing(true)
        setErrorMessage(null)
    }

    const handleCancel = () => {
        setIsEditing(false)
        if (servico) {
            setNome(servico.nome || '')
            setPreco(servico.preco.toString() || '')
            setDuracao(servico.duracao_minutos.toString() || '')
        }
        setErrorMessage(null)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!servico) return

        // Validação de entrada
        const parsedPreco = parseFloat(preco)
        const parsedDuracao = parseInt(duracao)
        if (isNaN(parsedPreco) || parsedPreco < 0) {
            setErrorMessage('O valor do serviço deve ser um número positivo.')
            return
        }
        if (isNaN(parsedDuracao) || parsedDuracao <= 0) {
            setErrorMessage('A duração do serviço deve ser um número positivo.')
            return
        }

        try {
            const token = sessionStorage.getItem('access_token_barbearia')
            const response = await authFetch(`${api.baseURL}/servicos/${servico.id}/`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome,
                    preco: parsedPreco,
                    duracao_minutos: parsedDuracao,
                }),
            })

            if (response.ok) {
                const updatedServico = await response.json()
                // Simular atualização local (idealmente, o componente pai deve ser notificado)
                if (servico) {
                    servico.nome = updatedServico.nome
                    servico.preco = updatedServico.preco
                    servico.duracao_minutos = updatedServico.duracao_minutos
                }
                setIsEditing(false)
                setErrorMessage(null)
            } else {
                const errorText = await response.text()
                setErrorMessage(`Erro ao atualizar serviço: ${errorText}`)
            }
        } catch (err) {
            console.error('Erro ao atualizar serviço:', err)
            setErrorMessage('Ocorreu um erro ao atualizar o serviço. Tente novamente.')
        }
    }

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    if (!servico) return null

    return (
        <S.Overlay onClick={handleOverlayClick}>
            <S.Modal>
                <S.CloseButton onClick={onClose}>×</S.CloseButton>
                <h2>Detalhes do Serviço</h2>
                <S.InfoSection>
                    <h3>Informações</h3>
                    {isEditing ? (
                        <form onSubmit={handleSubmit}>
                            {errorMessage && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}
                            <S.InputGroup>
                                <label htmlFor="nome_servico">Nome do Serviço</label>
                                <input
                                    type="text"
                                    id="nome_servico"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    placeholder="Nome do Serviço"
                                    required
                                />
                            </S.InputGroup>
                            <S.InputGroup>
                                <label htmlFor="valor_servico">Valor do Serviço</label>
                                <input
                                    type="number"
                                    id="valor_servico"
                                    value={preco}
                                    onChange={(e) => setPreco(e.target.value)}
                                    placeholder="Valor do Serviço"
                                    step="0.01"
                                    min="0"
                                    required
                                />
                            </S.InputGroup>
                            <S.InputGroup>
                                <label htmlFor="duracao_servico">Duração do Serviço (min)</label>
                                <input
                                    type="number"
                                    id="duracao_servico"
                                    value={duracao}
                                    onChange={(e) => setDuracao(e.target.value)}
                                    placeholder="Duração do Serviço"
                                    min="1"
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
                            <p>
                                <i className="ri-service-line"></i> Nome:{' '}
                                <strong>{servico.nome}</strong>
                            </p>
                            <p>
                                <i className="ri-money-dollar-circle-line"></i> Valor:{' '}
                                <strong>R$ {Number(servico.preco).toFixed(2)}</strong>
                            </p>
                            <p>
                                <i className="ri-time-line"></i> Duração:{' '}
                                <strong>{servico.duracao_minutos} min</strong>
                            </p>
                            <S.Button onClick={handleEdit}>Editar Serviço</S.Button>
                        </>
                    )}
                </S.InfoSection>
                <S.ServicoDeleteSection>
                    <h3>Excluir Serviço</h3>
                    <p>
                        Esta ação é irreversível e apagará todos os dados do serviço relacionados à
                        sua barbearia, como agendamentos associados.
                    </p>
                    <S.DeleteButton onClick={() => onDelete(servico)} style={{ marginTop: '10px' }}>
                        <i className="ri-delete-bin-line"></i>
                        Excluir Serviço
                    </S.DeleteButton>
                </S.ServicoDeleteSection>
            </S.Modal>
        </S.Overlay>
    )
}

export default DetalhesServicoModal
