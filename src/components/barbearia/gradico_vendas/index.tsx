import { useState, useEffect } from 'react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Legend,
} from 'recharts'
import { colors } from '../../../../styles'
import * as S from './styles'
import api from '../../../services/api'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface GraficoVendasProps {
    inicio: string // Formato: YYYY-MM-DD
    fim: string // Formato: YYYY-MM-DD
}

interface DataPoint {
    dia: string // Formato: DD/MM/YYYY (for display)
    valor: number
}

const GraficoVendas = ({ inicio, fim }: GraficoVendasProps) => {
    const [data, setData] = useState<DataPoint[]>([])
    const [isLoading, setIsLoading] = useState(false)

    // Função para gerar todos os dias no período
    const generateDateRange = (start: string, end: string): { display: string; raw: string }[] => {
        const startDate = new Date(start)
        const endDate = new Date(end)
        const dates: { display: string; raw: string }[] = []

        for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
            const displayDate = date.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            }) // Formato: DD/MM/YYYY
            const rawDate = date.toISOString().split('T')[0] // Formato: YYYY-MM-DD
            dates.push({ display: displayDate, raw: rawDate })
        }

        return dates
    }

    useEffect(() => {
        const fetchVendas = async () => {
            setIsLoading(true)
            const token = sessionStorage.getItem('access_token_barbearia')

            if (!token) {
                console.error('Token de acesso não encontrado.')
                const dateRange = generateDateRange(inicio, fim)
                const chartData: DataPoint[] = dateRange.map(({ display }) => ({
                    dia: display,
                    valor: 0,
                }))
                setData(chartData)
                setIsLoading(false)
                return
            }

            try {
                const response = await fetch(
                    `${api.baseURL}/barbearias-overview/?grafico=vendas&inicio=${inicio}&fim=${fim}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    },
                )
                const result = await response.json()
                console.log('Resposta bruta da API:', result)
                console.log('Status da resposta:', response.status)

                if (response.ok) {
                    if (!Array.isArray(result)) {
                        console.error('Resposta da API não é um array:', result)
                        throw new Error('Formato de dados inválido da API')
                    }

                    const dateRange = generateDateRange(inicio, fim)

                    // Mapear os dados retornados pela API (formato YYYY-MM-DD)
                    const vendasMap = new Map<string, number>()
                    result.forEach((item: { dia: string; valor: number }) => {
                        if (item.dia && typeof item.valor === 'number') {
                            vendasMap.set(item.dia, item.valor)
                        } else {
                            console.warn('Item inválido ignorado:', item)
                        }
                    })

                    // Criar os dados do gráfico
                    const chartData: DataPoint[] = dateRange.map(({ display, raw }) => ({
                        dia: display,
                        valor: vendasMap.get(raw) || 0,
                    }))

                    console.log('Dados processados para o gráfico:', chartData)
                    setData(chartData)
                } else {
                    console.error(
                        'Erro na API:',
                        result.error || result.detail || 'Resposta inválida',
                    )
                    const dateRange = generateDateRange(inicio, fim)
                    const chartData: DataPoint[] = dateRange.map(({ display }) => ({
                        dia: display,
                        valor: 0,
                    }))
                    setData(chartData)
                }
            } catch (error) {
                console.error('Erro ao buscar dados de vendas:', error)
                const dateRange = generateDateRange(inicio, fim)
                const chartData: DataPoint[] = dateRange.map(({ display }) => ({
                    dia: display,
                    valor: 0,
                }))
                setData(chartData)
            } finally {
                setIsLoading(false)
            }
        }

        fetchVendas()
    }, [inicio, fim])

    // Título dinâmico com o período
    const title = `Total de Vendas (${format(new Date(inicio), 'dd/MM/yyyy', {
        locale: ptBR,
    })} - ${format(new Date(fim), 'dd/MM/yyyy', { locale: ptBR })})`

    return (
        <S.Container>
            <h2>{title}</h2>
            {isLoading ? (
                <p>Carregando gráfico...</p>
            ) : (
                <>
                    {data.every((item) => item.valor === 0) && (
                        <p>Nenhuma venda registrada no período selecionado.</p>
                    )}
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart
                            data={data}
                            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                        >
                            <CartesianGrid strokeDasharray="5 5" stroke={colors.cinzaClaro} />
                            <XAxis
                                dataKey="dia"
                                stroke={colors.texto}
                                tick={{ fontSize: 12 }}
                                interval="preserveStartEnd"
                            />
                            <YAxis
                                stroke={colors.texto}
                                tick={{ fontSize: 12 }}
                                tickFormatter={(value) => `R$ ${value.toFixed(2)}`}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: colors.cinzaEscuro,
                                    borderRadius: '8px',
                                    color: colors.branco,
                                }}
                                formatter={(value: number) => `R$ ${value.toFixed(2)}`}
                            />
                            <Legend
                                wrapperStyle={{
                                    color: colors.texto,
                                    fontSize: '14px',
                                    paddingTop: '10px',
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="valor"
                                name={`Vendas (R$)`}
                                stroke={colors.corPrimaria}
                                strokeWidth={2}
                                dot={false}
                                activeDot={{ r: 6, fill: colors.corPrimaria, strokeWidth: 2 }}
                                strokeDasharray="5 5"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </>
            )}
        </S.Container>
    )
}

export default GraficoVendas
