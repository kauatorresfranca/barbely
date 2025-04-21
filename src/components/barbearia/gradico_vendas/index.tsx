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
    inicio: string
    fim: string
}

interface DataPoint {
    dia: string
    valor: number
}

const GraficoVendas = ({ inicio, fim }: GraficoVendasProps) => {
    const [data, setData] = useState<DataPoint[]>([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchVendas = async () => {
            setIsLoading(true)
            const token = sessionStorage.getItem('access_token_barbearia')
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
                    setData(result)
                } else {
                    console.error('Erro ao buscar dados de vendas:', result.error)
                    setData([])
                }
            } catch (error) {
                console.error('Erro ao buscar dados de vendas:', error)
                setData([])
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
            ) : data.length === 0 ? (
                <p>Nenhuma venda registrada no período selecionado.</p>
            ) : (
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
            )}
        </S.Container>
    )
}

export default GraficoVendas
