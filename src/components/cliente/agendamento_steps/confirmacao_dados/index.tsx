import { toZonedTime, format } from 'date-fns-tz'
import { useNavigate } from 'react-router-dom'
import { AgendamentoData } from '../../../cliente/agendamento'
import { Barbearia } from '../../../../models/Barbearia'
import { authFetch } from '../../../../utils/authFetch'
import * as S from './styles'
import api from '../../../../services/api'

type Props = {
    setActiveTab: (tab: string) => void
    agendamentoData: AgendamentoData
    barbearia: Barbearia | null
}

const ConfirmacaoStep = ({ setActiveTab, agendamentoData, barbearia }: Props) => {
    const fusoHorario = 'America/Sao_Paulo'
    const navigate = useNavigate()

    const dataFormatada = agendamentoData.data
        ? format(toZonedTime(agendamentoData.data, fusoHorario), 'dd/MM/yyyy', {
              timeZone: fusoHorario,
          })
        : ''

    const metodoPagamentoMap: { [key: string]: string } = {
        Pix: 'pix',
        'Cartão de Crédito': 'cartao_credito',
        'Cartão de Débito': 'cartao_debito',
        Dinheiro: 'dinheiro',
    }

    const metodoPagamentoNome = () => {
        const metodo = agendamentoData.metodoPagamento
        if (!metodo || !metodoPagamentoMap[metodo]) {
            return 'Não especificado'
        }
        return metodo
    }

    const handleNext = async () => {
        const token = sessionStorage.getItem('access_token_cliente')
        const isAgendamentoSemLogin = barbearia?.agendamento_sem_login

        if (!isAgendamentoSemLogin && !token) {
            const slug = sessionStorage.getItem('barbearia_slug') || 'default-slug'
            navigate(`/clientes/login?redirect=/barbearia/${slug}/agendamento`)
            return
        }

        console.log('Dados recebidos no ConfirmacaoStep:', agendamentoData)

        try {
            const metodoPagamento = agendamentoData.metodoPagamento
            if (!metodoPagamento || !metodoPagamentoMap[metodoPagamento]) {
                alert('Selecione um método de pagamento válido.')
                setActiveTab('metodo_pagamento')
                return
            }

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
                funcionario: agendamentoData.funcionario?.id || null,
                hora_inicio: horaFormatada,
                servico: agendamentoData.servico.id,
                metodo_pagamento: metodoPagamento, // Enviar o valor original ("Dinheiro")
                cliente_nome: agendamentoData.clienteNome || undefined,
                cliente_email: agendamentoData.clienteEmail || undefined,
                telefone: agendamentoData.telefone || undefined,
            }

            console.log('Enviando payload para /api/agendamentos/criar/', payload)

            const res = await authFetch(`${api.baseURL}/agendamentos/criar/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
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
        setActiveTab('metodo_pagamento')
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
                <p>
                    <strong>Método de Pagamento:</strong> {metodoPagamentoNome()}
                </p>
                {agendamentoData.clienteNome && (
                    <p>
                        <strong>Nome do Cliente:</strong> {agendamentoData.clienteNome}
                    </p>
                )}
                {agendamentoData.clienteEmail && (
                    <p>
                        <strong>E-mail do Cliente:</strong> {agendamentoData.clienteEmail}
                    </p>
                )}
                {agendamentoData.telefone && (
                    <p>
                        <strong>Telefone do Cliente:</strong> {agendamentoData.telefone}
                    </p>
                )}
            </S.Confirmacao>
            <S.Button className="back" onClick={handleBack}>
                Voltar
            </S.Button>
            <S.Button onClick={handleNext}>Confirmar</S.Button>
        </S.Container>
    )
}

export default ConfirmacaoStep
