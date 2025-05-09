import { useState, useEffect } from 'react'
import * as S from './styles'
import api from '../../../../../services/api'
import { authFetch } from '../../../../../utils/authFetch'

const ConfiguracoesAgendamento = () => {
    const [allowBookingWithoutLogin, setAllowBookingWithoutLogin] = useState(false)
    const [intervaloAgendamento, setIntervaloAgendamento] = useState(30)
    const [prazoCancelamento, setPrazoCancelamento] = useState(30)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const response = await authFetch(`${api.baseURL}/barbearias/update/`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                })
                if (!response.ok) {
                    throw new Error('Erro ao carregar configurações')
                }
                const data = await response.json()
                setAllowBookingWithoutLogin(data.agendamento_sem_login || false)
                setIntervaloAgendamento(data.intervalo_agendamento || 30)
                setPrazoCancelamento(data.prazo_cancelamento || 30)
            } catch (error) {
                console.error('Erro ao carregar configurações:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchConfig()
    }, [])

    const handleSave = async () => {
        try {
            const response = await authFetch(`${api.baseURL}/barbearias/update/`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    agendamento_sem_login: allowBookingWithoutLogin,
                    intervalo_agendamento: intervaloAgendamento,
                    prazo_cancelamento: prazoCancelamento,
                }),
            })
            if (!response.ok) {
                throw new Error('Erro ao salvar configurações')
            }
            alert('Configurações salvas com sucesso!')
        } catch (error) {
            console.error('Erro ao salvar configurações:', error)
            alert('Erro ao salvar configurações.')
        }
    }

    if (loading) return <div>Carregando...</div>

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
                <S.Subtitle>Prazo de Cancelamento</S.Subtitle>
                <S.InputGroup>
                    <label htmlFor="prazo">Prazo (minutos)</label>
                    <input
                        type="number"
                        id="prazo"
                        value={prazoCancelamento}
                        onChange={(e) => setPrazoCancelamento(Number(e.target.value))}
                        min="15"
                        max="60"
                        step="5"
                    />
                </S.InputGroup>
                <S.Description>
                    Define o prazo mínimo de tempo que o cliente tem para cancelar um agendamento.
                </S.Description>
            </S.Section>
            <S.Button onClick={handleSave}>Confirmar Alterações</S.Button>
        </S.Container>
    )
}

export default ConfiguracoesAgendamento
