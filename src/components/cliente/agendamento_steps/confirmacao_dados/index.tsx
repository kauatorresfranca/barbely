import { toZonedTime, format } from 'date-fns-tz'
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

const ConfirmacaoStep = ({ setActiveTab, agendamentoData }: Props) => {
    const fusoHorario = 'America/Sao_Paulo'

    if (!agendamentoData.servico) {
        console.error('Erro: Serviço não definido no agendamentoData', agendamentoData)
        alert('Erro: Dados do serviço não foram carregados. Por favor, reinicie o agendamento.')
        setActiveTab('servico')
        return null
    }

    if (!agendamentoData.data) {
        console.error('Erro: Data não definida no agendamentoData', agendamentoData)
        alert('Erro: Data não foi selecionada. Por favor, retorne e escolha uma data.')
        setActiveTab('horarios')
        return null
    }

    const dataNormalizada = toZonedTime(agendamentoData.data, fusoHorario)
    const dataFormatada = format(dataNormalizada, 'dd/MM/yyyy', {
        timeZone: fusoHorario,
    })

    const metodoPagamentoNome = () => {
        const metodo = agendamentoData.metodoPagamento
        if (!metodo) return 'Não especificado'
        switch (metodo.toLowerCase()) {
            case 'pix':
                return 'PIX'
            case 'cartão de crédito':
                return 'Cartão de Crédito'
            case 'cartão de débito':
                return 'Cartão de Débito'
            case 'dinheiro':
                return 'Dinheiro'
            default:
                return metodo
        }
    }

    const handleNext = async () => {
        const token = sessionStorage.getItem('access_token_cliente')

        if (!token) {
            console.error('Token de autenticação não encontrado.')
            alert('Você precisa estar logado para confirmar o agendamento.')
            return
        }

        console.log('Dados recebidos no ConfirmacaoStep:', agendamentoData)

        try {
            const metodoPagamento = metodoPagamentoNome()
            if (!metodoPagamento || metodoPagamento === 'Não especificado') {
                alert('Selecione um método de pagamento válido.')
                setActiveTab('metodo_pagamento')
                return
            }

            if (!agendamentoData.servico || !agendamentoData.data || !agendamentoData.horario) {
                throw new Error('Dados essenciais do agendamento estão ausentes.')
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
                metodo_pagamento: metodoPagamento,
                telefone: agendamentoData.telefone || undefined,
            }

            console.log('Enviando payload para /api/agendamentos/criar/', payload)

            const res = await authFetch(`${api.baseURL}/agendamentos/criar/`, {
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
                if (errorData.non_field_errors?.includes('A barbearia está fechada neste dia.')) {
                    alert(
                        'A barbearia está fechada na data selecionada. Por favor, escolha outra data.',
                    )
                    setActiveTab('horarios')
                    return
                }
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
