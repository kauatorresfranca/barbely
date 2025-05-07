import { useCallback, useEffect, useRef, useState } from 'react'
import { Cliente } from '../../../../models/cliente'
import * as S from './styles'
import { authFetch } from '../../../../utils/authFetch'
import { ClipLoader } from 'react-spinners'
import api from '../../../../services/api'
import { Agendamento } from '../../../../models/Agendamento'

interface MeusAgendamentosModalProps {
    onClose: () => void
    cliente: Cliente | null
}

const MeusAgendamentosModal = ({ onClose, cliente }: MeusAgendamentosModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null)
    const [todosAgendamentos, setTodosAgendamentos] = useState<Agendamento[]>([])
    const [agendamentosVisiveis, setAgendamentosVisiveis] = useState<Agendamento[]>([])
    const [mostrarTodos, setMostrarTodos] = useState(false)
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
                const agendamentos = Array.isArray(data) ? data : data.results || []
                setTodosAgendamentos(agendamentos)
                setAgendamentosVisiveis(agendamentos.slice(0, 5)) // Mostra apenas os 5 primeiros
                setError(null)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erro desconhecido.')
            } finally {
                setLoading(false)
            }
        }

        fetchAgendamentos()
    }, [cliente])

    // Atualizar agendamentos visíveis quando mostrarTodos mudar
    useEffect(() => {
        setAgendamentosVisiveis(mostrarTodos ? todosAgendamentos : todosAgendamentos.slice(0, 3))
    }, [mostrarTodos, todosAgendamentos])

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

            // Atualizar ambas as listas localmente
            const atualizarAgendamentos = (prev: Agendamento[]): Agendamento[] =>
                prev.map((agendamento) =>
                    agendamento.id === id
                        ? { ...agendamento, status: 'CANCELADO' as const }
                        : agendamento,
                )
            setTodosAgendamentos(atualizarAgendamentos)
            setAgendamentosVisiveis(atualizarAgendamentos)
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

    // Lidar com clique em "Ver Todos"
    const handleVerTodos = () => {
        setMostrarTodos(true)
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
                <S.ModalBody>
                    {loading && <ClipLoader color="#00c1fe" size={32} speedMultiplier={1} />}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {!loading && !error && agendamentosVisiveis.length === 0 && (
                        <p className="empty">Nenhum agendamento encontrado.</p>
                    )}
                    {agendamentosVisiveis.map((agendamento) => (
                        <S.AgendamentoItem key={agendamento.id}>
                            <div>
                                <p>
                                    {agendamento.servico_nome} - {agendamento.servico_duracao} min
                                </p>
                                <p>
                                    Data:{' '}
                                    {formatarDataHora(agendamento.data, agendamento.hora_inicio)}
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
                    {todosAgendamentos.length > 5 && !mostrarTodos && (
                        <S.ModalButton onClick={handleVerTodos}>Ver Todos</S.ModalButton>
                    )}
                </S.ModalBody>
            </S.ModalContent>
        </S.ModalOverlay>
    )
}

export default MeusAgendamentosModal
