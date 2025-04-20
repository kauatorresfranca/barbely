import { useState, useEffect } from 'react'
import GraficoVendas from '../../gradico_vendas'
import * as S from './styles'

const Overview = () => {
    const hoje = new Date().toISOString().split('T')[0]
    const novaData = new Date()
    novaData.setDate(novaData.getDate() - 7)
    const umaSemanaAtras = novaData.toISOString().split('T')[0]

    const [inicio, setInicio] = useState(umaSemanaAtras)
    const [fim, setFim] = useState(hoje)
    const [metrics, setMetrics] = useState({
        faturamento: 0,
        total_custos: 0,
        total_lucro: 0,
        clientes_atendidos: 0,
        ticket_medio: 0,
        agendamentos: 0,
        clientes_novos: 0,
    })

    const fetchMetrics = async () => {
        const token = sessionStorage.getItem('access_token_barbearia')
        try {
            const response = await fetch(
                `http://localhost:8000/api/barbearias/overview/?inicio=${inicio}&fim=${fim}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            )
            const data = await response.json()
            if (response.ok) {
                setMetrics(data)
            } else {
                console.error('Erro:', data.error)
            }
        } catch {
            console.error('Erro ao buscar métricas')
        }
    }

    useEffect(() => {
        fetchMetrics()
    }, [inicio, fim])

    const handleFilter = () => {
        fetchMetrics()
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
                <S.InputsContainer>
                    <S.InputGroup>
                        <p>Início</p>
                        <input
                            type="date"
                            value={inicio}
                            onChange={(e) => setInicio(e.target.value)}
                        />
                    </S.InputGroup>
                    <S.InputGroup>
                        <p>Fim</p>
                        <input type="date" value={fim} onChange={(e) => setFim(e.target.value)} />
                    </S.InputGroup>
                </S.InputsContainer>
                <button onClick={handleFilter}>Filtrar</button>
            </S.Filtro>
            <S.FirstLine>
                <S.Card>
                    <i className="ri-line-chart-line"></i>
                    <div className="valor">
                        <h3>Faturamento</h3>
                        <p>
                            R${' '}
                            {Number(metrics.faturamento).toLocaleString('pt-BR', {
                                minimumFractionDigits: 2,
                            })}
                        </p>
                    </div>
                </S.Card>
                <S.Card>
                    <i className="ri-refund-2-line"></i>
                    <div className="valor">
                        <h3>Total de Custos</h3>
                        <p>
                            R${' '}
                            {Number(metrics.total_custos).toLocaleString('pt-BR', {
                                minimumFractionDigits: 2,
                            })}
                        </p>
                    </div>
                </S.Card>
                <S.Card>
                    <i className="ri-coins-fill"></i>
                    <div className="valor">
                        <h3>Total de Lucro</h3>
                        <p>
                            R${' '}
                            {Number(metrics.total_lucro).toLocaleString('pt-BR', {
                                minimumFractionDigits: 2,
                            })}
                        </p>
                    </div>
                </S.Card>
                <S.Card>
                    <i className="ri-user-follow-fill"></i>
                    <div className="valor">
                        <h3>Clientes Atendidos</h3>
                        <p>{metrics.clientes_atendidos}</p>
                    </div>
                </S.Card>
                <S.Card>
                    <i className="ri-swap-line"></i>
                    <div className="valor">
                        <h3>Ticket Médio</h3>
                        <p>
                            R${' '}
                            {Number(metrics.ticket_medio).toLocaleString('pt-BR', {
                                minimumFractionDigits: 2,
                            })}
                        </p>
                    </div>
                </S.Card>
            </S.FirstLine>
            <S.SecondLine>
                <S.GraficoContainer>
                    <GraficoVendas />
                </S.GraficoContainer>
                <S.Services>
                    <S.Card id="secondline">
                        <i className="ri-calendar-schedule-line"></i>
                        <div className="valor">
                            <h3>Agendamentos</h3>
                            <p>{metrics.agendamentos}</p>
                        </div>
                    </S.Card>
                    <S.Card id="secondline">
                        <i className="ri-user-add-line"></i>
                        <div className="valor">
                            <h3>Clientes Novos</h3>
                            <p>{metrics.clientes_novos}</p>
                        </div>
                    </S.Card>
                </S.Services>
            </S.SecondLine>
        </S.Container>
    )
}

export default Overview
