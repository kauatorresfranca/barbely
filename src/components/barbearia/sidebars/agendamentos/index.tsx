import { useState, useEffect } from 'react'
import { formatInTimeZone, toZonedTime } from 'date-fns-tz'
import { addDays, subDays } from 'date-fns'

import { authFetch } from '../../../../utils/authFetch'
import { Agendamento } from '../../../cliente/modals/meus_agendamentos'
import DetalhesModal from '../../modals/agendamentos/Detalhes'
import StatusModal from '../../modals/agendamentos/status'
import CriarAgendamentoModal from '../../modals/agendamentos/criar'

import * as S from './styles'

const fusoHorario = 'America/Sao_Paulo'
const hoje = formatInTimeZone(new Date(), fusoHorario, 'yyyy-MM-dd')

const gerarHoras = (intervalo: number) => {
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

const AgendaGrafico = () => {
    const [dataSelecionada, setDataSelecionada] = useState<string>(hoje)
    const [agendamentos, setAgendamentos] = useState<Agendamento[]>([])
    const [funcionarios, setFuncionarios] = useState<Funcionario[]>([])
    const [servicos, setServicos] = useState<Servico[]>([])
    const [carregando, setCarregando] = useState<boolean>(false)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [statusModalIsOpen, setStatusModalIsOpen] = useState(false)
    const [createModalIsOpen, setCreateModalIsOpen] = useState(false)
    const [selectedAgendamento, setSelectedAgendamento] = useState<Agendamento | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [authError, setAuthError] = useState<string | null>(null)
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

    const formatarData = (data: string) => {
        return formatInTimeZone(toZonedTime(data, fusoHorario), fusoHorario, 'dd/MM/yyyy')
    }

    const mudarDia = (direcao: 'anterior' | 'proximo') => {
        const dataAtual = toZonedTime(dataSelecionada, fusoHorario)
        const novaData = direcao === 'anterior' ? subDays(dataAtual, 1) : addDays(dataAtual, 1)
        setDataSelecionada(formatInTimeZone(novaData, fusoHorario, 'yyyy-MM-dd'))
    }

    const openModal = (agendamento: Agendamento) => {
        setSelectedAgendamento(agendamento)
        setModalIsOpen(true)
    }

    const closeModal = () => {
        setModalIsOpen(false)
        setSelectedAgendamento(null)
    }

    const openStatusModal = (agendamento: Agendamento) => {
        setSelectedAgendamento(agendamento)
        setStatusModalIsOpen(true)
    }

    const closeStatusModal = () => {
        setStatusModalIsOpen(false)
        setSelectedAgendamento(null)
        setError(null)
    }

    const openCreateModal = () => {
        setCreateModalIsOpen(true)
    }

    const closeCreateModal = () => {
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

    const buscarFuncionarios = async () => {
        try {
            const token = sessionStorage.getItem('access_token_barbearia')
            if (!token) {
                throw new Error('Você precisa estar logado para acessar os funcionários.')
            }

            const res = await authFetch('http://localhost:8000/api/funcionarios/', {
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
        } catch (err: any) {
            console.error('Erro ao buscar funcionários:', err)
            setAuthError(err.message || 'Erro ao buscar funcionários')
        }
    }

    const buscarServicos = async () => {
        try {
            const token = sessionStorage.getItem('access_token_barbearia')
            if (!token) {
                throw new Error('Você precisa estar logado para acessar os serviços.')
            }

            const res = await authFetch('http://localhost:8000/api/servicos/', {
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
        } catch (err: any) {
            console.error('Erro ao buscar serviços:', err)
            setAuthError(err.message || 'Erro ao buscar serviços')
        }
    }

    const buscarAgendamentos = async (data: string) => {
        try {
            setCarregando(true)
            const token = sessionStorage.getItem('access_token_barbearia')
            if (!token) {
                throw new Error('Você precisa estar logado para acessar os agendamentos.')
            }

            const res = await authFetch(
                `http://localhost:8000/api/barbearia/agendamentos/?data=${data}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                },
            )

            if (!res.ok) {
                if (res.status === 401) {
                    throw new Error('Sessão expirada. Por favor, faça login novamente.')
                }
                throw new Error('Falha ao buscar agendamentos')
            }

            const dados: Agendamento[] = await res.json()
            if (dados.length === 0) {
                console.log('Nenhum agendamento encontrado para a data selecionada.')
            }
            setAgendamentos(dados)
        } catch (err: any) {
            console.error('Erro ao buscar agendamentos:', err)
            setAuthError(err.message || 'Erro ao buscar agendamentos')
        } finally {
            setCarregando(false)
        }
    }

    const validateNovoAgendamento = () => {
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

    const criarAgendamento = async () => {
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
                    const errorMessages = Object.values(erroData).flat().join(' ')
                    throw new Error(errorMessages || 'Falha ao criar agendamento')
                }
                throw new Error('Falha ao criar agendamento')
            }

            const novoAgendamentoData: Agendamento = await res.json()
            setAgendamentos([...agendamentos, novoAgendamentoData])
            closeCreateModal()
        } catch (err: any) {
            console.error('Erro ao criar agendamento:', err)
            setError(err.message || 'Erro ao criar agendamento')
        } finally {
            setCriandoAgendamento(false)
        }
    }

    const atualizarStatusAgendamento = async (
        agendamentoId: number,
        novoStatus: Agendamento['status'],
    ) => {
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
                if (res.status === 401) {
                    throw new Error('Sessão expirada. Por favor, faça login novamente.')
                }
                const erroData = await res.json()
                throw new Error(erroData.error || 'Falha ao atualizar o status do agendamento')
            }

            const updatedAgendamento: Agendamento = await res.json()
            console.log('Agendamento atualizado:', updatedAgendamento)

            setAgendamentos((prev) =>
                prev.map((agendamento) =>
                    agendamento.id === agendamentoId
                        ? { ...agendamento, status: novoStatus }
                        : agendamento,
                ),
            )

            closeStatusModal()
        } catch (err: any) {
            console.error('Erro ao atualizar status:', err)
            setError(err.message || 'Erro ao atualizar o status')
        }
    }

    useEffect(() => {
        buscarFuncionarios()
        buscarServicos()
        buscarAgendamentos(dataSelecionada)
    }, [dataSelecionada])

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

    const handleRedirectToLogin = () => {
        const slug = sessionStorage.getItem('barbearia_slug') || 'default-slug'
        window.location.href = `/barbearia/${slug}/login`
    }

    return (
        <S.Container>
            <h2>Meus Agendamentos</h2>
            <p className="subtitle">
                Visualize e acompanhe os horários marcados pelos seus clientes, com todos os
                detalhes.
            </p>
            {authError && (
                <S.ErrorMessage>
                    {authError}{' '}
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
                        <S.DateDisplay>
                            {dataSelecionada === hoje ? 'HOJE' : formatarData(dataSelecionada)}
                        </S.DateDisplay>
                        <S.ArrowButton className="avançarDia" onClick={() => mudarDia('proximo')}>
                            <i className="ri-arrow-right-double-line"></i>
                        </S.ArrowButton>
                    </S.DateNavigator>
                    <button onClick={() => buscarAgendamentos(dataSelecionada)}>Atualizar</button>
                </S.Filtro>
                <S.CriarAgendamento onClick={openCreateModal}>Criar Agendamento</S.CriarAgendamento>
            </S.MeusAgendamentosHeader>
            {carregando ? (
                <p>Carregando agendamentos...</p>
            ) : (
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
                                                                    {agendamento.servico_duracao}{' '}
                                                                    min
                                                                </p>
                                                            </div>
                                                        </S.AgendamentoInfo>
                                                        <div
                                                            style={{ display: 'flex', gap: '8px' }}
                                                        >
                                                            <S.Button
                                                                onClick={() =>
                                                                    openModal(agendamento)
                                                                }
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
            )}

            {/* Modais */}
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
