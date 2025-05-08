import { useState } from 'react'
import * as S from './styles'

const ConfiguracoesAgendamento = () => {
    const [allowBookingWithoutLogin, setAllowBookingWithoutLogin] = useState(false)
    const [intervaloAgendamento, setIntervaloAgendamento] = useState(30)

    return (
        <S.Container>
            <S.Title>Configurações de Agendamento</S.Title>

            <S.Section>
                <S.Subtitle>Agendamentos sem login</S.Subtitle>
                <S.RadioGroup>
                    <S.RadioOption>
                        <input
                            type="radio"
                            id="desativado"
                            name="allowBookingWithoutLogin"
                            checked={!allowBookingWithoutLogin}
                            onChange={() => setAllowBookingWithoutLogin(false)}
                        />
                        <label htmlFor="desativado">Desativado</label>
                    </S.RadioOption>
                    <S.RadioOption>
                        <input
                            type="radio"
                            id="ativado"
                            name="allowBookingWithoutLogin"
                            checked={allowBookingWithoutLogin}
                            onChange={() => setAllowBookingWithoutLogin(true)}
                        />
                        <label htmlFor="ativado">Ativado</label>
                    </S.RadioOption>
                </S.RadioGroup>
                <S.Description>Permite que clientes agendem sem estar logados.</S.Description>
            </S.Section>

            <S.Section>
                <S.Subtitle>Intervalo de Agendamento</S.Subtitle>
                <S.InputGroup>
                    <label htmlFor="intervalo">Intervalo (minutos)</label>
                    <input
                        type="number"
                        id="intervalo"
                        value={intervaloAgendamento}
                        onChange={(e) => setIntervaloAgendamento(Number(e.target.value))}
                        min="15"
                        max="60"
                        step="5"
                    />
                </S.InputGroup>
                <S.Description>
                    Define o intervalo de tempo entre os horários disponíveis (mínimo 15min, máximo
                    60min).
                </S.Description>
            </S.Section>
            <S.Section>
                <S.Subtitle>Prazo de cancelamento</S.Subtitle>
                <S.InputGroup>
                    <label htmlFor="prazo">Prazo (minutos)</label>
                    <input
                        type="number"
                        id="prazo"
                        value={intervaloAgendamento}
                        onChange={(e) => setIntervaloAgendamento(Number(e.target.value))}
                        min="15"
                        max="60"
                        step="5"
                    />
                </S.InputGroup>
                <S.Description>
                    Define o prazo mínimo de tempo que o cliente tem para cancelar um agendamento.
                </S.Description>
            </S.Section>
            <S.Button>Confirmar Alterações</S.Button>
        </S.Container>
    )
}

export default ConfiguracoesAgendamento
