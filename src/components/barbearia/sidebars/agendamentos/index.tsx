import { useState, useEffect } from 'react'
import { formatInTimeZone, toZonedTime } from 'date-fns-tz'
import { addDays, subDays } from 'date-fns'

import { authFetch } from '../../../../utils/authFetch'
import { Agendamento } from '../../../cliente/modals/meus_agendamentos'

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

const AgendaGrafico = () => {
    const [dataSelecionada, setDataSelecionada] = useState<string>(hoje)
    const [agendamentos, setAgendamentos] = useState<Agendamento[]>([])
    const [funcionarios, setFuncionarios] = useState<Funcionario[]>([])
    const [carregando, setCarregando] = useState<boolean>(false)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [statusModalIsOpen, setStatusModalIsOpen] = useState(false)
    const [selectedAgendamento, setSelectedAgendamento] = useState<Agendamento | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [authError, setAuthError] = useState<string | null>(null) // Novo estado para erros de autenticação

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

            console.log('Status da resposta:', res.status)
            const respostaTexto = await res.text()
            console.log('Resposta da API:', respostaTexto)

            if (!res.ok) {
                if (res.status === 401) {
                    throw new Error('Sessão expirada. Por favor, faça login novamente.')
                }
                throw new Error('Falha ao buscar agendamentos')
            }

            try {
                const dados: Agendamento[] = JSON.parse(respostaTexto)
                if (dados.length === 0) {
                    console.log('Nenhum agendamento encontrado para a data selecionada.')
                }
                setAgendamentos(dados)
            } catch (jsonError) {
                console.error('Erro ao analisar JSON:', jsonError)
                throw new Error('Resposta da API não é um JSON válido')
            }
        } catch (err: any) {
            console.error('Erro ao buscar agendamentos:', err)
            setAuthError(err.message || 'Erro ao buscar agendamentos')
        } finally {
            setCarregando(false)
        }
    }

    const atualizarStatusAgendamento = async (
        agendamentoId: number,
        novoStatus: Agendamento['status'],
    ) => {
        try {
            setError(null)
            const token = sessionStorage.getItem('access_token_barbearia')
            console.log('Tokens no sessionStorage antes da requisição:', {
                access_token: sessionStorage.getItem('access_token_barbearia'),
                refresh_token: sessionStorage.getItem('refresh_token_barbearia'),
            })
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

            // Atualizar o estado local
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
        buscarAgendamentos(dataSelecionada)
    }, [dataSelecionada])

    // Função para formatar o status para exibição
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

    // Função para redirecionar para a página de login
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

            {/* Modal de Detalhes */}
            {modalIsOpen && selectedAgendamento && (
                <S.Overlay>
                    <S.Modal>
                        <S.CloseButton onClick={closeModal}>×</S.CloseButton>
                        <h2>Detalhes do Agendamento</h2>
                        <S.ModalContent>
                            <S.InfoItem>
                                <S.InfoLabel>Cliente</S.InfoLabel>
                                <S.InfoValue>{selectedAgendamento.cliente_nome}</S.InfoValue>
                            </S.InfoItem>
                            <S.InfoItem>
                                <S.InfoLabel>Serviço</S.InfoLabel>
                                <S.InfoValue>{selectedAgendamento.servico_nome}</S.InfoValue>
                            </S.InfoItem>
                            <S.InfoItem>
                                <S.InfoLabel>Horário</S.InfoLabel>
                                <S.InfoValue>
                                    {selectedAgendamento.hora_inicio.slice(0, 5)}
                                </S.InfoValue>
                            </S.InfoItem>
                            <S.InfoItem>
                                <S.InfoLabel>Duração</S.InfoLabel>
                                <S.InfoValue>{`${selectedAgendamento.servico_duracao} minutos`}</S.InfoValue>
                            </S.InfoItem>
                            <S.InfoItem>
                                <S.InfoLabel>Status</S.InfoLabel>
                                <S.InfoValue status={selectedAgendamento.status}>
                                    {formatarStatus(selectedAgendamento.status)}
                                </S.InfoValue>
                            </S.InfoItem>
                        </S.ModalContent>
                    </S.Modal>
                </S.Overlay>
            )}

            {/* Modal de Alteração de Status */}
            {statusModalIsOpen && selectedAgendamento && (
                <S.Overlay>
                    <S.Modal>
                        <S.CloseButton onClick={closeStatusModal}>×</S.CloseButton>
                        <h2>Alterar Status do Agendamento</h2>
                        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
                        <S.ModalContent>
                            <S.InfoItem>
                                <S.InfoLabel>Cliente</S.InfoLabel>
                                <S.InfoValue>{selectedAgendamento.cliente_nome}</S.InfoValue>
                            </S.InfoItem>
                            <S.InfoItem>
                                <S.InfoLabel>Serviço</S.InfoLabel>
                                <S.InfoValue>{selectedAgendamento.servico_nome}</S.InfoValue>
                            </S.InfoItem>
                            <S.InfoItem>
                                <S.InfoLabel>Status Atual</S.InfoLabel>
                                <S.InfoValue status={selectedAgendamento.status}>
                                    {formatarStatus(selectedAgendamento.status)}
                                </S.InfoValue>
                            </S.InfoItem>
                            <S.InfoItem>
                                <S.InfoLabel>Novo Status</S.InfoLabel>
                                <S.Select
                                    value={selectedAgendamento.status}
                                    onChange={(e) =>
                                        setSelectedAgendamento({
                                            ...selectedAgendamento,
                                            status: e.target.value as Agendamento['status'],
                                        })
                                    }
                                >
                                    <option value="CONFIRMADO">Confirmado</option>
                                    <option value="CANCELADO">Cancelado</option>
                                    <option value="EXPIRADO">Expirado</option>
                                    <option value="CONCLUIDO">Concluído</option>
                                </S.Select>
                            </S.InfoItem>
                            <S.SubmitButton
                                onClick={() =>
                                    atualizarStatusAgendamento(
                                        selectedAgendamento.id,
                                        selectedAgendamento.status,
                                    )
                                }
                            >
                                Salvar Alteração
                            </S.SubmitButton>
                        </S.ModalContent>
                    </S.Modal>
                </S.Overlay>
            )}
        </S.Container>
    )
}

export default AgendaGrafico
