import { useCallback, useEffect, useRef, useState } from 'react'

import { Cliente } from '../../../../models/cliente'

import * as S from './styles'
import { authFetch } from '../../../../utils/authFetch'
import { ClipLoader } from 'react-spinners'
import api from '../../../../services/api'

// Tipo ajustado para o modelo do backend
export type Agendamento = {
    id: number
    cliente: number
    cliente_nome: string
    funcionario: number
    servico: number
    servico_nome: string
    servico_duracao: number
    data: string
    hora_inicio: string
    status: 'CONFIRMADO' | 'CANCELADO' | 'EXPIRADO' | 'CONCLUIDO'
    criado_em: string
}

interface MeusAgendamentosModalProps {
    onClose: () => void
    cliente: Cliente | null
}

const MeusAgendamentosModal = ({ onClose, cliente }: MeusAgendamentosModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null)
    const [agendamentos, setAgendamentos] = useState<Agendamento[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose()
            }
        },
        [onClose],
    )

    // Buscar agendamentos
    useEffect(() => {
        const fetchAgendamentos = async () => {
            if (!cliente?.id) {
                setError('Usuário não encontrado.')
                setLoading(false)
                return
            }

            try {
                const token = sessionStorage.getItem('access_token_cliente')
                if (!token) {
                    setError('Token de autenticação não encontrado.')
                    setLoading(false)
                    return
                }

                console.log('Cliente ID:', cliente.id) // Depuração
                const response = await authFetch(
                    `${api.baseURL}/clientes/agendamentos/?cliente_id=${cliente.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                )

                if (!response.ok) {
                    throw new Error(`Erro ao buscar agendamentos: ${response.status}`)
                }

                const data = await response.json()
                console.log('Resposta da API /api/barbearia/agendamentos/:', data) // Depuração
                // Suporta lista direta ou paginada
                setAgendamentos(Array.isArray(data) ? data : data.results || [])
                setError(null)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erro desconhecido.')
            } finally {
                setLoading(false)
            }
        }

        fetchAgendamentos()
    }, [cliente])

    // Cancelar agendamento
    const handleCancel = async (id: number) => {
        if (!window.confirm('Deseja cancelar este agendamento?')) {
            return
        }

        try {
            const token = sessionStorage.getItem('access_token_cliente')
            if (!token) {
                throw new Error('Token de autenticação não encontrado.')
            }

            const response = await authFetch(`${api.baseURL}/agendamentos/${id}/cancelar/`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })

            if (!response.ok) {
                throw new Error('Erro ao cancelar agendamento.')
            }

            // Atualizar a lista localmente
            setAgendamentos((prev) =>
                prev.map((agendamento) =>
                    agendamento.id === id ? { ...agendamento, status: 'CANCELADO' } : agendamento,
                ),
            )
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Erro ao cancelar.')
        }
    }

    // Formatar data e hora
    const formatarDataHora = (data: string, hora: string) => {
        const [ano, mes, dia] = data.split('-')
        const horaFormatada = hora.slice(0, 5) // Remove segundos
        return `${dia}/${mes}/${ano} - ${horaFormatada}`
    }

    // Formatar status para exibição
    const formatarStatus = (status: Agendamento['status']) => {
        switch (status) {
            case 'CONFIRMADO':
                return 'Confirmado'
            case 'CANCELADO':
                return 'Cancelado'
            case 'EXPIRADO':
                return 'Expirado'
            case 'CONCLUIDO':
                return 'Concluído'
            default:
                return status
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
        if (modalRef.current) {
            modalRef.current.focus()
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [handleKeyDown])

    return (
        <S.ModalOverlay>
            <S.ModalContent ref={modalRef} tabIndex={-1}>
                <S.CloseButton onClick={onClose} aria-label="Fechar modal">
                    ×
                </S.CloseButton>
                <h2>Meus Agendamentos</h2>
                {agendamentos ? (
                    <S.ModalBody>
                        {loading && <p>Carregando agendamentos...</p>}
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        {!loading && !error && agendamentos.length === 0 && (
                            <p className="empty">Nenhum agendamento encontrado.</p>
                        )}
                        {agendamentos.map((agendamento) => (
                            <S.AgendamentoItem key={agendamento.id}>
                                <div>
                                    <p>
                                        {agendamento.servico_nome} - {agendamento.servico_duracao}{' '}
                                        min
                                    </p>
                                    <p>
                                        Data:{' '}
                                        {formatarDataHora(
                                            agendamento.data,
                                            agendamento.hora_inicio,
                                        )}
                                    </p>
                                    <p>Status: {formatarStatus(agendamento.status)}</p>
                                </div>
                                {agendamento.status === 'CONFIRMADO' && (
                                    <S.CancelButton
                                        onClick={() => handleCancel(agendamento.id)}
                                        aria-label={`Cancelar agendamento de ${agendamento.servico_nome}`}
                                    >
                                        Cancelar
                                    </S.CancelButton>
                                )}
                            </S.AgendamentoItem>
                        ))}
                        {agendamentos.length > 0 && <S.ModalButton>Ver Todos</S.ModalButton>}
                    </S.ModalBody>
                ) : (
                    <ClipLoader color="#00c1fe" size={32} speedMultiplier={1} />
                )}
            </S.ModalContent>
        </S.ModalOverlay>
    )
}

export default MeusAgendamentosModal
