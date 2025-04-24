import { useState, useEffect } from 'react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from 'recharts'
import { colors } from '../../../../styles'
import * as S from './styles'

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

        for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
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
                    `http://localhost:8000/api/barbearias/overview/?grafico=vendas&inicio=${inicio}&fim=${fim}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    },
                )
                const result = await response.json()
                console.log('Resposta de /api/barbearias/overview/?grafico=vendas:', result)

                if (response.ok) {
                    // Gerar todos os dias no período
                    const dateRange = generateDateRange(inicio, fim)

                    // Mapear os dados retornados pela API (assumindo formato YYYY-MM-DD)
                    const vendasMap = new Map<string, number>()
                    result.forEach((item: { dia: string; valor: number }) => {
                        const apiDate = item.dia // Formato: YYYY-MM-DD
                        vendasMap.set(apiDate, item.valor)
                    })

                    // Criar os dados do gráfico, preenchendo dias sem vendas com valor 0
                    const chartData: DataPoint[] = dateRange.map(({ display, raw }) => ({
                        dia: display,
                        valor: vendasMap.get(raw) || 0,
                    }))

                    setData(chartData)
                } else {
                    console.error('Erro ao buscar dados de vendas:', result.error || result.detail)
                    // Mesmo em caso de erro, gerar o gráfico com valores zerados
                    const dateRange = generateDateRange(inicio, fim)
                    const chartData: DataPoint[] = dateRange.map(({ display }) => ({
                        dia: display,
                        valor: 0,
                    }))
                    setData(chartData)
                }
            } catch (error) {
                console.error('Erro ao buscar dados de vendas:', error)
                // Em caso de erro de conexão, gerar o gráfico com valores zerados
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

    return (
        <S.Container>
            <h2>Total de vendas</h2>
            {isLoading ? (
                <p>Carregando gráfico...</p>
            ) : (
                <>
                    {data.every((item) => item.valor === 0) && (
                        <p>Nenhuma venda registrada no período selecionado.</p>
                    )}
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={data}>
                            <XAxis dataKey="dia" stroke={colors.branco} />
                            <YAxis stroke={colors.branco} />
                            <CartesianGrid strokeDasharray="3 3" stroke={colors.texto} />
                            <Line
                                type="monotone"
                                dataKey="valor"
                                stroke={colors.corPrimaria}
                                strokeWidth={3}
                                dot={{ r: 6, fill: colors.corPrimaria }}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: colors.cinzaEscuro,
                                    borderRadius: '5px',
                                }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </>
            )}
        </S.Container>
    )
}

export default GraficoVendas
