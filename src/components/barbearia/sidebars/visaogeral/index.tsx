import { useState, useEffect, useRef, useCallback } from 'react'
import { format } from 'date-fns'
import GraficoVendas from '../../gradico_vendas'
import * as S from './styles'
import { ClipLoader } from 'react-spinners' // Importe o ClipLoader
import api from '../../../../services/api'

// Custom hook to animate counting up
const useCountUp = (endValue: number, duration: number = 500) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
        let start = 0
        const increment = endValue / (duration / 16)
        const step = () => {
            start += increment
            if (start >= endValue) {
                setCount(endValue)
                return
            }
            setCount(Math.ceil(start))
            requestAnimationFrame(step)
        }
        setCount(0)
        requestAnimationFrame(step)
    }, [endValue, duration])

    return count
}

const Overview = () => {
    const hoje = new Date()
    const hojeISO = hoje.toISOString().split('T')[0]

    const [filter, setFilter] = useState('essa semana')
    const [inicio, setInicio] = useState(() => {
        const novaData = new Date()
        novaData.setDate(novaData.getDate() - 7)
        return novaData.toISOString().split('T')[0]
    })
    const [fim, setFim] = useState(hojeISO)
    const [metrics, setMetrics] = useState({
        faturamento: 0,
        total_custos: 0,
        total_lucro: 0,
        clientes_atendidos: 0,
        ticket_medio: 0,
        agendamentos: 0,
        clientes_novos: 0,
    })
    const [isLoading, setIsLoading] = useState(true) // Começa como true para aguardar a primeira requisição
    const [hasError, setHasError] = useState(false) // Novo estado para rastrear erros
    const [showDateInputs, setShowDateInputs] = useState(false)
    const dateInputsRef = useRef<HTMLDivElement>(null)

    // Animated values for each metric
    const animatedFaturamento = useCountUp(isLoading ? 0 : metrics.faturamento)
    const animatedTotalCustos = useCountUp(isLoading ? 0 : metrics.total_custos)
    const animatedTotalLucro = useCountUp(isLoading ? 0 : metrics.total_lucro)
    const animatedClientesAtendidos = useCountUp(isLoading ? 0 : metrics.clientes_atendidos)
    const animatedTicketMedio = useCountUp(isLoading ? 0 : metrics.ticket_medio)
    const animatedAgendamentos = useCountUp(isLoading ? 0 : metrics.agendamentos)
    const animatedClientesNovos = useCountUp(isLoading ? 0 : metrics.clientes_novos)

    // Function to set dates based on filter
    const setDatesFromFilter = (filterValue: string) => {
        const today = new Date()
        const startDate = new Date()

        switch (filterValue) {
            case 'hoje':
                setInicio(today.toISOString().split('T')[0])
                setFim(today.toISOString().split('T')[0])
                break
            case 'ontem':
                startDate.setDate(today.getDate() - 1)
                setInicio(startDate.toISOString().split('T')[0])
                setFim(startDate.toISOString().split('T')[0])
                break
            case 'essa semana':
                startDate.setDate(today.getDate() - 7)
                setInicio(startDate.toISOString().split('T')[0])
                setFim(today.toISOString().split('T')[0])
                break
            case 'esse mes':
                startDate.setDate(1)
                setInicio(startDate.toISOString().split('T')[0])
                setFim(today.toISOString().split('T')[0])
                break
            case 'esse ano':
                startDate.setMonth(0, 1)
                setInicio(startDate.toISOString().split('T')[0])
                setFim(today.toISOString().split('T')[0])
                break
            default:
                break
        }
    }

    // Fetch metrics function
    const fetchMetrics = useCallback(async () => {
        setIsLoading(true)
        setHasError(false) // Reseta o estado de erro antes de nova tentativa
        const token = sessionStorage.getItem('access_token_barbearia')
        try {
            const response = await fetch(
                `${api.baseURL}/barbearias/overview/?inicio=${inicio}&fim=${fim}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            )
            const data = await response.json()
            console.log('valor recebido do back:', data)
            if (response.ok) {
                setMetrics(data)
            } else {
                console.error('Erro:', data.error)
                setHasError(true) // Marca erro se a resposta não for ok
            }
        } catch {
            console.error('Erro ao buscar métricas')
            setHasError(true) // Marca erro em caso de falha na requisição
        } finally {
            setIsLoading(false)
        }
    }, [inicio, fim])

    // Update dates and fetch metrics when filter changes (except for custom)
    useEffect(() => {
        if (filter !== 'custom') {
            setDatesFromFilter(filter)
            fetchMetrics() // Fetch metrics for predefined filters
        }
        if (filter === 'custom') {
            setShowDateInputs(true)
        } else {
            setShowDateInputs(false)
        }
    }, [filter, fetchMetrics])

    // Handle custom date selection and fetch metrics
    const handleCustomDateChange = () => {
        if (inicio && fim && inicio <= fim) {
            setFilter('custom')
            setShowDateInputs(false)
            fetchMetrics() // Fetch metrics only when "Filtrar" is clicked
        }
    }

    // Format the date range for display
    const formatDateRange = (start: string, end: string) => {
        const startDate = new Date(start)
        const endDate = new Date(end)
        const startFormatted = format(startDate, 'MMM d')
        const endFormatted = format(endDate, 'MMM d, yyyy')
        return `${startFormatted} - ${endFormatted}`
    }

    // Handle click outside to close date inputs
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dateInputsRef.current && !dateInputsRef.current.contains(event.target as Node)) {
                setShowDateInputs(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    // Handle opening date inputs and set filter to custom
    const handleOpenDateInputs = () => {
        setFilter('custom')
        setShowDateInputs(true)
    }

    // Format monetary values
    const formatMonetaryValue = (value: number) => {
        return `R$ ${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
    }

    // Verifica se há dados válidos para exibir
    const hasValidData = Object.values(metrics).some((value) => value !== 0)

    // Renderiza o conteúdo condicionalmente
    if (isLoading || !hasValidData || hasError) {
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
            <S.Header>
                <h2>Visão Geral</h2>
                <p className="subtitle">
                    Veja um resumo das principais informações e atividades recentes da sua
                    barbearia.
                </p>
            </S.Header>
            <S.Filtro>
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="hoje">Hoje</option>
                    <option value="ontem">Ontem</option>
                    <option value="essa semana">Essa Semana</option>
                    <option value="esse mes">Esse Mês</option>
                    <option value="esse ano">Esse Ano</option>
                    <option value="custom">Período Personalizado</option>
                </select>
                <S.DateRange onClick={handleOpenDateInputs}>
                    <span>Período:</span> {formatDateRange(inicio, fim)}
                </S.DateRange>
                {showDateInputs && (
                    <S.DateInputsWrapper ref={dateInputsRef}>
                        <S.InputGroup>
                            <label>Início</label>
                            <input
                                type="date"
                                value={inicio}
                                onChange={(e) => setInicio(e.target.value)}
                                max={fim}
                            />
                        </S.InputGroup>
                        <S.InputGroup>
                            <label>Fim</label>
                            <input
                                type="date"
                                value={fim}
                                onChange={(e) => setFim(e.target.value)}
                                min={inicio}
                                max={hojeISO}
                            />
                        </S.InputGroup>
                        <button onClick={handleCustomDateChange}>Filtrar</button>
                    </S.DateInputsWrapper>
                )}
            </S.Filtro>
            <S.FirstLine>
                <S.Card>
                    <i className="ri-line-chart-line"></i>
                    <div className="valor">
                        <h3>Faturamento</h3>
                        <p>{formatMonetaryValue(animatedFaturamento)}</p>
                    </div>
                </S.Card>
                <S.Card>
                    <i className="ri-refund-2-line"></i>
                    <div className="valor">
                        <h3>Total de Custos</h3>
                        <p>{formatMonetaryValue(animatedTotalCustos)}</p>
                    </div>
                </S.Card>
                <S.Card>
                    <i className="ri-coins-fill"></i>
                    <div className="valor">
                        <h3>Total de Lucro</h3>
                        <p>{formatMonetaryValue(animatedTotalLucro)}</p>
                    </div>
                </S.Card>
                <S.Card>
                    <i className="ri-user-follow-fill"></i>
                    <div className="valor">
                        <h3>Clientes Atendidos</h3>
                        <p>{animatedClientesAtendidos}</p>
                    </div>
                </S.Card>
                <S.Card>
                    <i className="ri-swap-line"></i>
                    <div className="valor">
                        <h3>Ticket Médio</h3>
                        <p>{formatMonetaryValue(animatedTicketMedio)}</p>
                    </div>
                </S.Card>
            </S.FirstLine>
            <S.SecondLine>
                <S.GraficoContainer>
                    <GraficoVendas inicio={inicio} fim={fim} />
                </S.GraficoContainer>
                <S.Services>
                    <S.Card id="secondline">
                        <i className="ri-calendar-schedule-line"></i>
                        <div className="valor">
                            <h3>Agendamentos</h3>
                            <p>{animatedAgendamentos}</p>
                        </div>
                    </S.Card>
                    <S.Card id="secondline">
                        <i className="ri-user-add-line"></i>
                        <div className="valor">
                            <h3>Clientes Novos</h3>
                            <p>{animatedClientesNovos}</p>
                        </div>
                    </S.Card>
                </S.Services>
            </S.SecondLine>
        </S.Container>
    )
}

export default Overview
