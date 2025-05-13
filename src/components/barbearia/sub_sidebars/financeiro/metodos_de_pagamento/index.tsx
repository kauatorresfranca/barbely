import { useState, useEffect } from 'react'
import * as S from './styles'
import api from '../../../../../services/api'
import { authFetch } from '../../../../../utils/authFetch'
import { useBarbeariaAtual } from '../../../../../hooks/useBarbeariaAtual'
import { Toast } from '../../../../../components/toast'

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
    const barbeariaId = barbearia?.id
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethods>({
        pix: true,
        creditCard: true,
        debitCard: true,
        cash: false, // Valores iniciais conforme dados fornecidos
    })
    const [loading, setLoading] = useState(true)
    const [toastMessage, setToastMessage] = useState('')
    const [showToast, setShowToast] = useState(false)

    // Log para depuração
    useEffect(() => {
        console.log('Estado de barbearia:', {
            barbearia: barbearia,
            slug: slug,
            barbeariaId: barbeariaId,
            token: sessionStorage.getItem('access_token_barbearia'),
        })
    }, [barbearia, slug, barbeariaId])

    // Carrega os métodos de pagamento quando barbearia estiver disponível
    useEffect(() => {
        const fetchPaymentMethods = async () => {
            // Verifica se todos os dados necessários estão disponíveis
            if (!barbearia || !slug || !barbeariaId) {
                console.warn('Dados da barbearia não disponíveis ainda:', {
                    barbearia: barbearia,
                    slug: slug,
                    barbeariaId: barbeariaId,
                })
                return // Não exibe toast, apenas aguarda
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
                    const errorData = await response.json()
                    throw new Error(errorData.detail || 'Erro ao carregar métodos de pagamento.')
                }

                const data = await response.json()
                setPaymentMethods({
                    pix: data.pix ?? false,
                    creditCard: data.credit_card ?? false,
                    debitCard: data.debit_card ?? false,
                    cash: data.cash ?? false,
                })
            } catch (err: unknown) {
                const error = err as Error
                console.error('Erro ao carregar métodos de pagamento:', {
                    message: error.message,
                    status: err.response?.status,
                })
                setToastMessage(error.message || 'Falha ao carregar métodos de pagamento.')
                setShowToast(true)
            } finally {
                setLoading(false)
            }
        }

        fetchPaymentMethods()
    }, [barbearia, slug, barbeariaId])

    const togglePaymentMethod = (method: keyof PaymentMethods) => {
        setPaymentMethods((prev) => ({
            ...prev,
            [method]: !prev[method],
        }))
    }

    const savePaymentMethods = async () => {
        if (!barbeariaId) {
            setToastMessage('ID da barbearia não encontrado.')
            setShowToast(true)
            return
        }

        try {
            setLoading(true)
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
                const errorData = await response.json()
                throw new Error(errorData.detail || 'Falha ao salvar métodos de pagamento.')
            }

            setToastMessage('Métodos de pagamento salvos com sucesso!')
            setShowToast(true)
        } catch (err: unknown) {
            const error = err as Error
            console.error('Erro ao salvar métodos de pagamento:', {
                message: error.message,
                status: err.response?.status,
            })
            setToastMessage(error.message || 'Erro ao salvar os métodos de pagamento.')
            setShowToast(true)
        } finally {
            setLoading(false)
        }
    }

    // Renderizar enquanto barbearia está carregando
    if (!barbearia) {
        return (
            <S.Container>
                <h2>Métodos de Pagamento</h2>
                <p>Carregando dados da barbearia...</p>
                {showToast && <Toast message={toastMessage} onClose={() => setShowToast(false)} />}
            </S.Container>
        )
    }

    return (
        <S.Container>
            <h2>Métodos de Pagamento</h2>
            <p className="subtitle">Configure os métodos de pagamento aceitos por sua barbearia.</p>

            {showToast && <Toast message={toastMessage} onClose={() => setShowToast(false)} />}

            {loading && <p>Carregando métodos de pagamento...</p>}
            {!loading && (
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
            )}
            <S.Button onClick={savePaymentMethods} disabled={loading || !barbeariaId}>
                {loading ? 'Salvando...' : 'Salvar Alterações'}
            </S.Button>
        </S.Container>
    )
}

export default MetodosPagamento
