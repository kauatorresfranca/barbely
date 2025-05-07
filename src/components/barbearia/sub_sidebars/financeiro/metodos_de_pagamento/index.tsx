import { useState, useEffect } from 'react'
import * as S from './styles'
import api from '../../../../../services/api'
import { authFetch } from '../../../../../utils/authFetch'
import { useBarbeariaAtual } from '../../../../../hooks/useBarbeariaAtual'

// Define the interface for payment methods
interface PaymentMethods {
    pix: boolean
    creditCard: boolean
    debitCard: boolean
    cash: boolean
}

const MetodosPagamento = () => {
    const barbearia = useBarbeariaAtual()
    const slug = barbearia?.slug
    const barbeariaId = barbearia?.id // Obtém o ID da barbearia
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethods>({
        pix: true,
        creditCard: true,
        debitCard: true,
        cash: true,
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    // Carrega os métodos de pagamento salvos ao montar o componente
    useEffect(() => {
        const fetchPaymentMethods = async () => {
            if (!slug) {
                setError('Slug da barbearia não encontrado.')
                setLoading(false)
                return
            }

            try {
                setLoading(true)
                const token = sessionStorage.getItem('access_token_barbearia')
                if (!token) {
                    throw new Error('Usuário não autenticado. Faça login como barbearia.')
                }

                const response = await authFetch(
                    `${api.baseURL}/barbearias/metodos-pagamento/?barbearia_slug=${slug}`,
                    {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                )

                if (!response.ok) {
                    throw new Error('Erro ao carregar métodos de pagamento.')
                }

                const data = await response.json()
                setPaymentMethods({
                    pix: data.pix || false,
                    creditCard: data.credit_card || false,
                    debitCard: data.debit_card || false,
                    cash: data.cash || false,
                })
                setError(null)
            } catch (err) {
                console.error('Erro ao carregar métodos de pagamento:', err)
                setError(err.message || 'Falha ao carregar dados.')
            } finally {
                setLoading(false)
            }
        }

        fetchPaymentMethods()
    }, [slug])

    const togglePaymentMethod = (method: keyof PaymentMethods) => {
        setPaymentMethods((prev) => ({
            ...prev,
            [method]: !prev[method],
        }))
    }

    const savePaymentMethods = async () => {
        if (!barbeariaId) {
            setError('ID da barbearia não encontrado.')
            return
        }

        try {
            setLoading(true)
            setError(null)
            setSuccess(null)

            const token = sessionStorage.getItem('access_token_barbearia')
            if (!token) {
                throw new Error('Usuário não autenticado. Faça login como barbearia.')
            }

            const payload = {
                pix: paymentMethods.pix,
                credit_card: paymentMethods.creditCard,
                debit_card: paymentMethods.debitCard,
                cash: paymentMethods.cash,
            }

            const response = await authFetch(`${api.baseURL}/barbearias/${barbeariaId}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            })

            if (!response.ok) {
                throw new Error('Falha ao salvar métodos de pagamento.')
            }

            setSuccess('Métodos de pagamento salvos com sucesso!')
            console.log('enviando para o back end:', JSON.stringify(payload))
        } catch (err) {
            console.error('Erro ao salvar métodos de pagamento:', err)
            setError(err.message || 'Erro ao salvar os dados.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <S.Container>
            <h2>Métodos de Pagamento</h2>
            <p className="subtitle">Configure os métodos de pagamento aceito por sua barbearia.</p>
            {loading && <p>Carregando...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <S.PaymentList>
                <S.PaymentItem>
                    <span>PIX</span>
                    <S.ToggleSwitch>
                        <input
                            type="checkbox"
                            checked={paymentMethods.pix}
                            onChange={() => togglePaymentMethod('pix')}
                            disabled={loading}
                        />
                        <S.Slider />
                    </S.ToggleSwitch>
                </S.PaymentItem>
                <S.PaymentItem>
                    <span>Cartão de Crédito</span>
                    <S.ToggleSwitch>
                        <input
                            type="checkbox"
                            checked={paymentMethods.creditCard}
                            onChange={() => togglePaymentMethod('creditCard')}
                            disabled={loading}
                        />
                        <S.Slider />
                    </S.ToggleSwitch>
                </S.PaymentItem>
                <S.PaymentItem>
                    <span>Cartão de Débito</span>
                    <S.ToggleSwitch>
                        <input
                            type="checkbox"
                            checked={paymentMethods.debitCard}
                            onChange={() => togglePaymentMethod('debitCard')}
                            disabled={loading}
                        />
                        <S.Slider />
                    </S.ToggleSwitch>
                </S.PaymentItem>
                <S.PaymentItem>
                    <span>Dinheiro</span>
                    <S.ToggleSwitch>
                        <input
                            type="checkbox"
                            checked={paymentMethods.cash}
                            onChange={() => togglePaymentMethod('cash')}
                            disabled={loading}
                        />
                        <S.Slider />
                    </S.ToggleSwitch>
                </S.PaymentItem>
            </S.PaymentList>
            <S.Button onClick={savePaymentMethods} disabled={loading}>
                Salvar Alterações
            </S.Button>
        </S.Container>
    )
}

export default MetodosPagamento
