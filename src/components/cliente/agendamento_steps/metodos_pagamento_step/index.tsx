import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import * as S from './styles'
import { AgendamentoData } from '../../agendamento'
import api from '../../../../services/api'
import { ClipLoader } from 'react-spinners'

type Props = {
    setActiveTab: (tab: string, data?: Partial<AgendamentoData>) => void
    agendamentoData: AgendamentoData
}

type PaymentMethod = {
    id: string
    nome: string
}

const MetodoPagamentoStep = ({ setActiveTab, agendamentoData }: Props) => {
    const { slug } = useParams<{ slug: string }>()
    const [metodoSelecionado, setMetodoSelecionado] = useState<string | null>(
        agendamentoData.metodoPagamento || null,
    )
    const [metodosDisponiveis, setMetodosDisponiveis] = useState<PaymentMethod[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchMetodosPagamento = async () => {
            try {
                setLoading(true)
                const response = await fetch(
                    `${api.baseURL}/barbearias/metodos-pagamento/?barbearia_slug=${slug}`,
                )
                if (!response.ok) {
                    throw new Error(`Erro ao buscar métodos de pagamento: ${response.statusText}`)
                }
                const data = await response.json()
                console.log('Resposta do backend:', data) // Depuração
                const metodos: PaymentMethod[] = []
                if (data.pix === true) metodos.push({ id: 'pix', nome: 'Pix' })
                if (data.credit_card === true)
                    metodos.push({ id: 'cartao_credito', nome: 'Cartão de Crédito' })
                if (data.debit_card === true)
                    metodos.push({ id: 'cartao_debito', nome: 'Cartão de Débito' })
                if (data.cash === true) metodos.push({ id: 'dinheiro', nome: 'Dinheiro' })
                setMetodosDisponiveis(metodos)
                setError(null)
            } catch (err) {
                console.error('Erro ao buscar métodos de pagamento:', err)
                setError(
                    'Não foi possível carregar os métodos de pagamento. Verifique o slug ou o servidor.',
                )
            } finally {
                setLoading(false)
            }
        }

        if (slug) {
            fetchMetodosPagamento()
        }
    }, [slug])

    const handleNext = () => {
        if (!metodoSelecionado) {
            alert('Por favor, selecione um método de pagamento antes de prosseguir.')
            return
        }
        if (!agendamentoData.data || !agendamentoData.horario) {
            alert('Por favor, complete as etapas anteriores (data e horário) antes de prosseguir.')
            return
        }

        setActiveTab('dia', { ...agendamentoData, metodoPagamento: metodoSelecionado })
    }

    const handleBack = () => {
        setActiveTab('horarios')
    }

    return (
        <S.Container>
            <h3>Escolha o método de pagamento</h3>
            {loading ? (
                <ClipLoader color="#00c1fe" size={32} speedMultiplier={1} />
            ) : error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : metodosDisponiveis.length === 0 ? (
                <p>Nenhum método de pagamento disponível para esta barbearia.</p>
            ) : (
                <S.MetodosList>
                    <S.MetodoContent></S.MetodoContent>
                    {metodosDisponiveis.map((metodo) => (
                        <S.MetodoItem
                            key={metodo.id}
                            onClick={() => setMetodoSelecionado(metodo.id)}
                            $selected={metodoSelecionado === metodo.id}
                            aria-label={`Selecionar ${metodo.nome}`}
                        >
                            <S.MetodoContent>
                                <i
                                    className={
                                        metodo.id === 'pix'
                                            ? 'ri-pix-fill pix'
                                            : metodo.id === 'cartao_credito'
                                            ? 'ri-bank-card-fill card'
                                            : metodo.id === 'cartao_debito'
                                            ? 'ri-bank-card-fill card'
                                            : 'ri-cash-fill cash'
                                    }
                                ></i>
                                <p>{metodo.nome}</p>
                            </S.MetodoContent>
                        </S.MetodoItem>
                    ))}
                </S.MetodosList>
            )}
            <S.Button className="back" onClick={handleBack}>
                Voltar
            </S.Button>
            <S.Button onClick={handleNext} disabled={loading || !!error || !metodoSelecionado}>
                Prosseguir
            </S.Button>
        </S.Container>
    )
}

export default MetodoPagamentoStep
