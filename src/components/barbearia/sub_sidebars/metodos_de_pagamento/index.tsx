import { useState } from 'react'
import * as S from './styles'

// Define the interface for payment methods
interface PaymentMethods {
    pix: boolean
    creditCard: boolean
    debitCard: boolean
    cash: boolean
}

const MetodosPagamento = () => {
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethods>({
        pix: true,
        creditCard: true,
        debitCard: true,
        cash: true,
    })

    const togglePaymentMethod = (method: keyof PaymentMethods) => {
        setPaymentMethods((prev) => ({
            ...prev,
            [method]: !prev[method],
        }))
    }

    return (
        <S.Container>
            <h2>Métodos de Pagamento</h2>
            <p className="subtitle">Configure os métodos de pagamento aceito por sua barbearia.</p>
            <S.PaymentList>
                <S.PaymentItem>
                    <span>PIX</span>
                    <S.ToggleSwitch>
                        <input
                            type="checkbox"
                            checked={paymentMethods.pix}
                            onChange={() => togglePaymentMethod('pix')}
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
                        />
                        <S.Slider />
                    </S.ToggleSwitch>
                </S.PaymentItem>
            </S.PaymentList>
        </S.Container>
    )
}

export default MetodosPagamento
