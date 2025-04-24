import { toZonedTime, format } from 'date-fns-tz'
import { useNavigate } from 'react-router-dom'

import { AgendamentoData } from '../../../cliente/agendamento'
import { authFetch } from '../../../../utils/authFetch'

import * as S from './styles'

type Props = {
    setActiveTab: (tab: string) => void
    agendamentoData: AgendamentoData
}

const ConfirmacaoStep = ({ setActiveTab, agendamentoData }: Props) => {
    const fusoHorario = 'America/Sao_Paulo'
    const navigate = useNavigate()

    const dataFormatada = agendamentoData.data
        ? format(toZonedTime(agendamentoData.data, fusoHorario), 'dd/MM/yyyy', {
              timeZone: fusoHorario,
          })
        : ''

    const handleNext = async () => {
        const token = sessionStorage.getItem('access_token_cliente')

        if (!token) {
            const slug = sessionStorage.getItem('barbearia_slug') || 'default-slug'
            navigate(`/clientes/login?redirect=/barbearia/${slug}/agendamento`)
            return
        }

        try {
            const dataNormalizada = toZonedTime(agendamentoData.data, fusoHorario)
            const data = format(dataNormalizada, 'yyyy-MM-dd')
            const horario = agendamentoData.horario

            const dataHoraCompleta = new Date(`${data}T${horario}:00`)

            if (isNaN(dataHoraCompleta.getTime())) {
                alert('Horário inválido selecionado.')
                return
            }

            const horaFormatada = format(dataHoraCompleta, 'HH:mm')

            const payload = {
                data: data,
                funcionario: agendamentoData.funcionario?.id,
                hora_inicio: horaFormatada,
                servico: agendamentoData.servico.id,
            }

            console.log('Enviando payload para /api/agendamentos/criar/', payload)

            const res = await authFetch('http://localhost:8000/api/agendamentos/criar/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            })

            if (!res.ok) {
                const errorData = await res.json()
                console.error('Erro ao agendar:', errorData)
                alert(
                    `Erro: ${
                        errorData.detail || errorData.erro || 'Falha ao confirmar agendamento.'
                    }`,
                )
                return
            }

            const result = await res.json()
            console.log('Agendamento criado com sucesso:', result)
            setActiveTab('sucesso')
        } catch (error) {
            console.error('Erro ao enviar agendamento:', error)
            alert('Erro de conexão com o servidor.')
        }
    }

    const handleBack = () => {
        setActiveTab('horarios')
    }

    return (
        <S.Container>
            <h3>Confirme as informações do agendamento</h3>
            <S.Confirmacao>
                <p>
                    <strong>Data:</strong> {dataFormatada}
                </p>
                <p>
                    <strong>Horário:</strong> {agendamentoData.horario}
                </p>
                <p>
                    <strong>Serviço:</strong> {agendamentoData.servico.nome} - R${' '}
                    {agendamentoData.servico.preco}
                </p>
                <p>
                    <strong>Profissional:</strong>{' '}
                    {agendamentoData.funcionario
                        ? agendamentoData.funcionario.nome
                        : 'Sem preferência'}
                </p>
            </S.Confirmacao>
            <S.Button className="back" onClick={handleBack}>
                Voltar
            </S.Button>
            <S.Button onClick={handleNext}>Confirmar</S.Button>
        </S.Container>
    )
}

export default ConfirmacaoStep
