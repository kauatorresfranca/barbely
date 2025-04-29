import { useState, useEffect } from 'react'
import { formatInTimeZone, toZonedTime } from 'date-fns-tz'
import { addDays, subDays, isSameDay } from 'date-fns'
import { ClipLoader } from 'react-spinners'
import { authFetch } from '../../../../utils/authFetch'
import { Agendamento } from '../../../cliente/modals/meus_agendamentos'
import DetalhesModal from '../../modals/agendamentos/Detalhes'
import StatusModal from '../../modals/agendamentos/status'
import CriarAgendamentoModal from '../../modals/agendamentos/criar'
import * as S from './styles'
import api from '../../../../services/api'

// Define types for data models
type Funcionario = {
    id: number
    nome: string
}

type Servico = {
    id: number
    nome: string
    duracao_minutos: number
}

type NovoAgendamento = {
    cliente_email: string
    cliente_nome: string
    funcionario: string
    servico: string
    data: string
    hora_inicio: string
}

const fusoHorario = 'America/Sao_Paulo'
const hoje = formatInTimeZone(new Date(), fusoHorario, 'yyyy-MM-dd')

const gerarHoras = (intervalo: number): string[] => {
    const horas: string[] = []
    const inicio = 8 * 60
    const fim = 20 * 60

    for (let minutos = inicio; minutos <= fim; minutos += intervalo) {
        const h = Math.floor(minutos / 60)
            .toString()
            .padStart(2, '0')
        const m = (minutos % 60).toString().padStart(2, '0')
        horas.push(`${h}:${m}`)
    }

    return horas
}

const AgendaGrafico = () => {
    const [dataSelecionada, setDataSelecionada] = useState<string>(hoje)
    const [agendamentos, setAgendamentos] = useState<Agendamento[]>([])
    const [funcionarios, setFuncionarios] = useState<Funcionario[]>([])
    const [servicos, setServicos] = useState<Servico[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [hasError, setHasError] = useState<boolean>(false)
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
    const [statusModalIsOpen, setStatusModalIsOpen] = useState<boolean>(false)
    const [createModalIsOpen, setCreateModalIsOpen] = useState<boolean>(false)
    const [selectedAgendamento, setSelectedAgendamento] = useState<Agendamento | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [criandoAgendamento, setCriandoAgendamento] = useState<boolean>(false)

    const [novoAgendamento, setNovoAgendamento] = useState<NovoAgendamento>({
        cliente_email: '',
        cliente_nome: '',
        funcionario: '',
        servico: '',
        data: hoje,
        hora_inicio: '08:00',
    })

    const intervalo = 30
    const horas = gerarHoras(intervalo)
    const alturaPorMinuto = 1.5
    const totalMinutos = (20 - 8) * 60
    const alturaTimeline = totalMinutos * alturaPorMinuto

    const formatarData = (data: string): string => {
        const selectedDate = toZonedTime(data, fusoHorario)
        const today = toZonedTime(hoje, fusoHorario)
        const yesterday = subDays(today, 1)
        const tomorrow = addDays(today, 1)

        if (isSameDay(selectedDate, today)) {
            return 'HOJE'
        } else if (isSameDay(selectedDate, yesterday)) {
            return 'ONTEM'
        } else if (isSameDay(selectedDate, tomorrow)) {
            return 'AMANHÃ'
        }
        return formatInTimeZone(selectedDate, fusoHorario, 'dd/MM/yyyy')
    }

    const mudarDia = (direcao: 'anterior' | 'proximo'): void => {
        const dataAtual = toZonedTime(dataSelecionada, fusoHorario)
        const novaData = direcao === 'anterior' ? subDays(dataAtual, 1) : addDays(dataAtual, 1)
        setDataSelecionada(formatInTimeZone(novaData, fusoHorario, 'yyyy-MM-dd'))
    }

    const openModal = (agendamento: Agendamento): void => {
        setSelectedAgendamento(agendamento)
        setModalIsOpen(true)
    }

    const closeModal = (): void => {
        setModalIsOpen(false)
        setSelectedAgendamento(null)
    }

    const openStatusModal = (agendamento: Agendamento): void => {
        setSelectedAgendamento(agendamento)
        setStatusModalIsOpen(true)
    }

    const closeStatusModal = (): void => {
        setStatusModalIsOpen(false)
        setSelectedAgendamento(null)
        setError(null)
    }

    const openCreateModal = (): void => {
        setCreateModalIsOpen(true)
    }

    const closeCreateModal = (): void => {
        setCreateModalIsOpen(false)
        setError(null)
        setNovoAgendamento({
            cliente_email: '',
            cliente_nome: '',
            funcionario: '',
            servico: '',
            data: hoje,
            hora_inicio: '08:00',
        })
    }

    const buscarFuncionarios = async (): Promise<boolean> => {
        try {
            const token = sessionStorage.getItem('access_token_barbearia')
            if (!token) {
                throw new Error('Você precisa estar logado para acessar os funcionários.')
            }

            const res = await authFetch(`${api.baseURL}/funcionarios/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })

            if (!res.ok) {
                if (res.status === 401) {
                    throw new Error('Sessão expirada. Por favor, faça login novamente.')
                }
                throw new Error('Falha ao buscar funcionários')
            }

            const dados: Funcionario[] = await res.json()
            setFuncionarios(dados)
            return true
        } catch (err: unknown) {
            const error = err as Error
            console.error('Erro ao buscar funcionários:', error)
            setHasError(true)
            return false
        }
    }

    const buscarServicos = async (): Promise<boolean> => {
        try {
            const token = sessionStorage.getItem('access_token_barbearia')
            if (!token) {
                throw new Error('Você precisa estar logado para acessar os serviços.')
            }

            const res = await authFetch(`${api.baseURL}/servicos/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })

            if (!res.ok) {
                if (res.status === 401) {
                    throw new Error('Sessão expirada. Por favor, faça login novamente.')
                }
                throw new Error('Falha ao buscar serviços')
            }

            const dados: Servico[] = await res.json()
            setServicos(dados)
            return true
        } catch (err: unknown) {
            const error = err as Error
            console.error('Erro ao buscar serviços:', error)
            setHasError(true)
            return false
        }
    }

    const buscarAgendamentos = async (data: string): Promise<boolean> => {
        try {
            const token = sessionStorage.getItem('access_token_barbearia')
            if (!token) {
                throw new Error('Você precisa estar logado para acessar os agendamentos.')
            }

            const res = await authFetch(`${api.baseURL}/barbearia/agendamentos/?data=${data}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })

            if (!res.ok) {
                if (res.status === 401) {
                    throw new Error('Sessão expirada. Por favor, faça login novamente.')
                }
                throw new Error('Falha ao buscar agendamentos')
            }

            const dados: Agendamento[] = await res.json()
            setAgendamentos(dados)
            return true
        } catch (err: unknown) {
            const error = err as Error
            console.error('Erro ao buscar agendamentos:', error)
            setHasError(true)
            return false
        }
    }

    const validateNovoAgendamento = (): string | null => {
        if (!novoAgendamento.cliente_email) {
            return 'O e-mail do cliente é obrigatório.'
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(novoAgendamento.cliente_email)) {
            return 'Por favor, insira um e-mail válido.'
        }
        if (!novoAgendamento.cliente_nome) {
            return 'O nome do cliente é obrigatório.'
        }
        if (!novoAgendamento.funcionario) {
            return 'Selecione um funcionário.'
        }
        if (!novoAgendamento.servico) {
            return 'Selecione um serviço.'
        }
        if (!novoAgendamento.data) {
            return 'Selecione uma data.'
        }
        if (!novoAgendamento.hora_inicio) {
            return 'Selecione uma hora de início.'
        }
        return null
    }

    const criarAgendamento = async (): Promise<void> => {
        try {
            const validationError = validateNovoAgendamento()
            if (validationError) {
                setError(validationError)
                return
            }

            setCriandoAgendamento(true)
            setError(null)
            const token = sessionStorage.getItem('access_token_barbearia')
            if (!token) {
                throw new Error('Você precisa estar logado para criar agendamentos.')
            }

            const payload = {
                cliente_email: novoAgendamento.cliente_email,
                cliente_nome: novoAgendamento.cliente_nome,
                funcionario: parseInt(novoAgendamento.funcionario),
                servico: parseInt(novoAgendamento.servico),
                data: novoAgendamento.data,
                hora_inicio: novoAgendamento.hora_inicio,
                status: 'CONFIRMADO',
            }

            const res = await authFetch('http://localhost:8000/api/barbearia/agendamentos/criar/', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })

            if (!res.ok) {
                const erroData = await res.json()
                if (res.status === 401) {
                    throw new Error('Sessão expirada. Por favor, faça login novamente.')
                }
                if (res.status === 403) {
                    throw new Error('Apenas contas de barbearia podem criar agendamentos.')
                }
                if (res.status === 400 && erroData) {
                    if (erroData.non_field_errors) {
                        throw new Error(erroData.non_field_errors[0])
                    }
                    const errorMessages = Object.values<string[]>(erroData).flat().join(' ')
                    throw new Error(errorMessages || 'Falha ao criar agendamento')
                }
                throw new Error('Falha ao criar agendamento')
            }

            const novoAgendamentoData: Agendamento = await res.json()
            setAgendamentos([...agendamentos, novoAgendamentoData])
            closeCreateModal()
        } catch (err: unknown) {
            const error = err as Error
            console.error('Erro ao criar agendamento:', error)
            setError(error.message || 'Erro ao criar agendamento')
        } finally {
            setCriandoAgendamento(false)
        }
    }

    const atualizarStatusAgendamento = async (
        agendamentoId: number,
        novoStatus: Agendamento['status'],
    ): Promise<void> => {
        try {
            setError(null)
            const token = sessionStorage.getItem('access_token_barbearia')
            if (!token) {
                throw new Error('Você precisa estar logado para atualizar o status.')
            }

            const res = await authFetch(
                `http://localhost:8000/api/agendamentos/${agendamentoId}/`,
                {
                    method: 'PATCH',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ status: novoStatus }),
                },
            )

            if (!res.ok) {
                const erroData = await res.json()
                throw new Error(erroData.error || 'Falha ao atualizar o status do agendamento')
            }

            setAgendamentos((prev) =>
                prev.map((agendamento) =>
                    agendamento.id === agendamentoId
                        ? { ...agendamento, status: novoStatus }
                        : agendamento,
                ),
            )

            closeStatusModal()
        } catch (err: unknown) {
            const error = err as Error
            console.error('Erro ao atualizar status:', error)
            setError(error.message || 'Erro ao atualizar o status')
        }
    }

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            setIsLoading(true)
            setHasError(false)
            try {
                const [funcionariosSuccess, servicosSuccess, agendamentosSuccess] =
                    await Promise.all([
                        buscarFuncionarios(),
                        buscarServicos(),
                        buscarAgendamentos(dataSelecionada),
                    ])
                if (!funcionariosSuccess || !servicosSuccess || !agendamentosSuccess) {
                    setHasError(true)
                }
            } catch (err: unknown) {
                const error = err as Error
                console.error('Erro ao carregar dados:', error)
                setHasError(true)
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [dataSelecionada])

    const formatarStatus = (status: Agendamento['status']): string => {
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

    const handleRedirectToLogin = (): void => {
        const slug = sessionStorage.getItem('barbearia_slug') || 'default-slug'
        window.location.href = `/barbearia/${slug}/login`
    }

    const hasValidData = funcionarios.length > 0 && servicos.length > 0

    if (isLoading || hasError || !hasValidData) {
        return (
            <S.Container>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                    }}
                >
                    <ClipLoader color="#00c1fe" size={32} speedMultiplier={1} />
                </div>
            </S.Container>
        )
    }

    return (
        <S.Container>
            <h2>Meus Agendamentos</h2>
            <p className="subtitle">
                Visualize e acompanhe os horários marcados pelos seus clientes, com todos os
                detalhes.
            </p>
            {error && (
                <S.ErrorMessage>
                    {error}{' '}
                    <span
                        style={{ color: '#3399ff', cursor: 'pointer' }}
                        onClick={handleRedirectToLogin}
                    >
                        Fazer login
                    </span>
                </S.ErrorMessage>
            )}
            <S.MeusAgendamentosHeader>
                <S.Filtro>
                    <S.DateNavigator>
                        <S.ArrowButton className="voltarDia" onClick={() => mudarDia('anterior')}>
                            <i className="ri-arrow-left-double-line"></i>
                        </S.ArrowButton>
                        <S.DateDisplay>{formatarData(dataSelecionada)}</S.DateDisplay>
                        <S.ArrowButton className="avançarDia" onClick={() => mudarDia('proximo')}>
                            <i className="ri-arrow-right-double-line"></i>
                        </S.ArrowButton>
                    </S.DateNavigator>
                    <button onClick={() => buscarAgendamentos(dataSelecionada)}>Atualizar</button>
                </S.Filtro>
                <S.CriarAgendamento onClick={openCreateModal}>Criar Agendamento</S.CriarAgendamento>
            </S.MeusAgendamentosHeader>
            <S.HorariosContainer>
                <S.FuncionariosHeader>
                    {funcionarios.map((funcionario) => (
                        <S.FuncionarioTitle key={funcionario.id}>
                            {funcionario.nome}
                        </S.FuncionarioTitle>
                    ))}
                </S.FuncionariosHeader>
                <S.TimelinesContainer>
                    <S.Horarios>
                        {horas.map((hora) => {
                            const [h, m] = hora.split(':').map(Number)
                            const minutosDesde8h = (h - 8) * 60 + m
                            const top = minutosDesde8h * alturaPorMinuto

                            return (
                                <S.Hora key={hora} style={{ top: `${top}px` }}>
                                    {hora}
                                </S.Hora>
                            )
                        })}
                    </S.Horarios>
                    <S.Timelines>
                        {funcionarios.map((funcionario) => (
                            <S.Timeline
                                key={funcionario.id}
                                style={{ height: `${alturaTimeline}px` }}
                            >
                                <S.AgendamentosArea>
                                    {horas.map((hora) => {
                                        const [h, m] = hora.split(':').map(Number)
                                        const minutosDesde8h = (h - 8) * 60 + m
                                        const top = minutosDesde8h * alturaPorMinuto

                                        return (
                                            <S.LinhaHora
                                                key={`linha-${hora}-${funcionario.id}`}
                                                top={top}
                                            />
                                        )
                                    })}
                                    {agendamentos
                                        .filter(
                                            (agendamento) =>
                                                agendamento.funcionario === funcionario.id,
                                        )
                                        .map((agendamento) => {
                                            const [h, m] = agendamento.hora_inicio
                                                .split(':')
                                                .map(Number)
                                            const minutosDesde8h = (h - 8) * 60 + m
                                            const top = minutosDesde8h * alturaPorMinuto

                                            return (
                                                <S.AgendamentoBlock
                                                    key={agendamento.id}
                                                    style={{ top: `${top}px` }}
                                                >
                                                    <S.AgendamentoInfo
                                                        hora={agendamento.hora_inicio}
                                                        status={agendamento.status}
                                                    >
                                                        <p className="status">
                                                            {formatarStatus(agendamento.status)}
                                                        </p>
                                                        <div>
                                                            <p className="cliente">
                                                                {agendamento.cliente_nome}
                                                            </p>
                                                            <p className="servico">
                                                                {agendamento.servico_nome} -{' '}
                                                                {agendamento.servico_duracao} min
                                                            </p>
                                                        </div>
                                                    </S.AgendamentoInfo>
                                                    <div style={{ display: 'flex', gap: '8px' }}>
                                                        <S.Button
                                                            onClick={() => openModal(agendamento)}
                                                        >
                                                            Detalhes
                                                        </S.Button>
                                                        <S.Button
                                                            onClick={() =>
                                                                openStatusModal(agendamento)
                                                            }
                                                        >
                                                            Alterar Status
                                                        </S.Button>
                                                    </div>
                                                </S.AgendamentoBlock>
                                            )
                                        })}
                                </S.AgendamentosArea>
                            </S.Timeline>
                        ))}
                    </S.Timelines>
                </S.TimelinesContainer>
            </S.HorariosContainer>

            {/* Modals */}
            <DetalhesModal
                isOpen={modalIsOpen}
                onClose={closeModal}
                agendamento={selectedAgendamento}
                formatarStatus={formatarStatus}
            />
            <StatusModal
                isOpen={statusModalIsOpen}
                onClose={closeStatusModal}
                agendamento={selectedAgendamento}
                setAgendamento={setSelectedAgendamento}
                error={error}
                onUpdate={atualizarStatusAgendamento}
                formatarStatus={formatarStatus}
            />
            <CriarAgendamentoModal
                isOpen={createModalIsOpen}
                onClose={closeCreateModal}
                novoAgendamento={novoAgendamento}
                setNovoAgendamento={setNovoAgendamento}
                funcionarios={funcionarios}
                servicos={servicos}
                horas={horas}
                error={error}
                criandoAgendamento={criandoAgendamento}
                onCreate={criarAgendamento}
            />
        </S.Container>
    )
}

export default AgendaGrafico
