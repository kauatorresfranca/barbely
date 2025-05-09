import { useState, useEffect } from 'react'
import { AgendamentoData } from '../../agendamento'
import { Barbearia } from '../../../../models/Barbearia'
import * as S from './styles'

type Props = {
    setActiveTab: (tab: string, data?: Partial<AgendamentoData>) => void
    agendamentoData: AgendamentoData
    barbearia: Barbearia | null
}

type PaymentMethod = {
    id: string
    nome: 'Pix' | 'Cartão de Crédito' | 'Cartão de Débito' | 'Dinheiro'
}

const MetodoPagamentoStep = ({ setActiveTab, agendamentoData, barbearia }: Props) => {
    const [metodoSelecionado, setMetodoSelecionado] = useState<
        'Pix' | 'Cartão de Crédito' | 'Cartão de Débito' | 'Dinheiro' | null
    >(agendamentoData.metodoPagamento || null)
    const [metodosDisponiveis, setMetodosDisponiveis] = useState<PaymentMethod[]>([])
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!barbearia) {
            setError('Informações da barbearia não disponíveis.')
            return
        }

        const metodos: PaymentMethod[] = []
        if (barbearia.pix) metodos.push({ id: 'pix', nome: 'Pix' })
        if (barbearia.credit_card) metodos.push({ id: 'cartao_credito', nome: 'Cartão de Crédito' })
        if (barbearia.debit_card) metodos.push({ id: 'cartao_debito', nome: 'Cartão de Débito' })
        if (barbearia.cash) metodos.push({ id: 'dinheiro', nome: 'Dinheiro' })

        setMetodosDisponiveis(metodos)
        if (metodos.length === 0) {
            setError('Nenhum método de pagamento disponível para esta barbearia.')
        } else {
            setError(null)
        }
    }, [barbearia])

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
            {error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : metodosDisponiveis.length === 0 ? (
                <p>Nenhum método de pagamento disponível para esta barbearia.</p>
            ) : (
                <S.MetodosList>
                    <S.MetodoContent></S.MetodoContent>
                    {metodosDisponiveis.map((metodo) => (
                        <S.MetodoItem
                            key={metodo.id}
                            onClick={() => setMetodoSelecionado(metodo.nome)}
                            $selected={metodoSelecionado === metodo.nome}
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
            <S.Button onClick={handleNext} disabled={!!error || !metodoSelecionado}>
                Prosseguir
            </S.Button>
        </S.Container>
    )
}

export default MetodoPagamentoStep
