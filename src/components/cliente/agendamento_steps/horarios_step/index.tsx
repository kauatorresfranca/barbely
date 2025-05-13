import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import DatePicker from 'react-datepicker'
import { ptBR } from 'date-fns/locale'
import 'react-datepicker/dist/react-datepicker.css'
import { Funcionario } from '../../../../models/funcionario'
import { Servico } from '../../../../models/servico'
import { Barbearia } from '../../../../models/Barbearia'
import { AgendamentoData } from '../../agendamento'
import * as S from './styles'
import { authFetch } from '../../../../utils/authFetch'
import api from '../../../../services/api'

type Props = {
    setActiveTab: (tab: string, data?: Partial<AgendamentoData>) => void
    servico: Servico
    funcionario: Funcionario | null
    barbearia: Barbearia | null
}

const HorariosStep = ({ setActiveTab, servico, funcionario, barbearia }: Props) => {
    const hoje = new Date()
    const hojeAjustado = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate(), 0, 0, 0)

    const [horariosDisponiveis, setHorariosDisponiveis] = useState<string[]>([])
    const [dataSelecionada, setDataSelecionada] = useState<Date | null>(hojeAjustado)
    const [turnoSelecionado, setTurnoSelecionado] = useState<'manha' | 'tarde' | 'noite'>('manha')
    const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    const horariosManha = horariosDisponiveis.filter((h) => parseInt(h.split(':')[0]) < 12)
    const horariosTarde = horariosDisponiveis.filter((h) => {
        const hora = parseInt(h.split(':')[0])
        return hora >= 12 && hora < 18
    })
    const horariosNoite = horariosDisponiveis.filter((h) => parseInt(h.split(':')[0]) >= 18)

    const horariosPorTurno = {
        manha: horariosManha,
        tarde: horariosTarde,
        noite: horariosNoite,
    }

    const isHorarioPassado = (horario: string): boolean => {
        if (!dataSelecionada) return false
        const [hora, minuto] = horario.split(':').map(Number)
        const dataHorario = new Date(dataSelecionada)
        dataHorario.setHours(hora, minuto, 0, 0)

        const agora = new Date()
        return dataHorario < agora
    }

    const handleDateChange = (date: Date | null): void => {
        if (!date) {
            setDataSelecionada(null)
            return
        }
        const dataNormalizada = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            0,
            0,
            0,
        )
        console.log('Data selecionada (UTC):', dataNormalizada.toISOString())
        setDataSelecionada(dataNormalizada)
        setError(null)
    }

    useEffect(() => {
        const fetchHorarios = async () => {
            if (!dataSelecionada) return

            try {
                const token = sessionStorage.getItem('access_token_cliente')
                const dataFormatada = format(dataSelecionada, 'yyyy-MM-dd')

                const url = new URL(`${api.baseURL}/agendamentos/horarios-disponiveis/`)
                url.searchParams.append('servico', String(servico.id))
                url.searchParams.append('data', dataFormatada)
                if (funcionario?.id != null) {
                    url.searchParams.append('funcionario', String(funcionario.id))
                }

                console.log('Buscando horários para URL:', url.toString())

                const response = await authFetch(url.toString(), {
                    headers: {
                        'Content-Type': 'application/json',
                        ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    },
                })

                if (!response.ok) {
                    throw new Error(`Erro ${response.status} - ${response.statusText}`)
                }

                const dataJson = await response.json()
                console.log('Horários disponíveis:', dataJson.horarios_disponiveis)
                setHorariosDisponiveis(dataJson.horarios_disponiveis || [])
                setError(null)
            } catch (error) {
                console.error('Erro ao buscar horários:', error)
                setError(error instanceof Error ? error.message : 'Erro ao buscar horários.')
            }
        }

        fetchHorarios()
    }, [servico.id, funcionario?.id, dataSelecionada])

    const handleNext = () => {
        console.log(
            'handleNext chamado - dataSelecionada:',
            dataSelecionada,
            'horarioSelecionado:',
            horarioSelecionado,
        )

        if (!dataSelecionada || !horarioSelecionado) {
            alert('Selecione uma data e um horário antes de prosseguir.')
            return
        }

        const dataAjustada = new Date(
            dataSelecionada.getFullYear(),
            dataSelecionada.getMonth(),
            dataSelecionada.getDate(),
        )
        const dataFormatada = format(dataAjustada, 'yyyy-MM-dd')

        const dadosEnviados: Partial<AgendamentoData> = {
            data: dataFormatada,
            horario: horarioSelecionado,
            servico,
            funcionario,
        }
        console.log('Dados enviados para setActiveTab:', dadosEnviados)

        setActiveTab('metodo_pagamento', dadosEnviados)
    }

    const handleHorarioClick = (horario: string) => {
        if (!isHorarioPassado(horario)) {
            setHorarioSelecionado(horario)
            console.log('Horário selecionado:', horario)
        }
    }

    return (
        <S.Container>
            <S.Data>
                <h3>Escolha a data</h3>
                <S.DataPickWrapper>
                    <S.CalendarContainer>
                        <DatePicker
                            selected={dataSelecionada}
                            onChange={handleDateChange}
                            inline
                            calendarClassName="custom-calendar"
                            locale={ptBR}
                            minDate={hojeAjustado}
                            placeholderText={error || 'Selecione uma data'}
                        />
                    </S.CalendarContainer>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </S.DataPickWrapper>
            </S.Data>
            <S.Horario>
                <h3>Escolha o melhor horário</h3>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {horariosDisponiveis.length > 0 ? (
                    <>
                        <S.TurnosList>
                            <S.TurnoItem
                                onClick={() => setTurnoSelecionado('manha')}
                                selected={turnoSelecionado === 'manha'}
                            >
                                <p>Manhã</p>
                            </S.TurnoItem>
                            <S.TurnoItem
                                onClick={() => setTurnoSelecionado('tarde')}
                                selected={turnoSelecionado === 'tarde'}
                            >
                                <p>Tarde</p>
                            </S.TurnoItem>
                            <S.TurnoItem
                                onClick={() => setTurnoSelecionado('noite')}
                                selected={turnoSelecionado === 'noite'}
                            >
                                <p>Noite</p>
                            </S.TurnoItem>
                        </S.TurnosList>
                        <S.HorarioList>
                            {horariosPorTurno[turnoSelecionado].length > 0 ? (
                                horariosPorTurno[turnoSelecionado].map((horario) => {
                                    const isPassado = isHorarioPassado(horario)
                                    return (
                                        <S.HorarioItem
                                            key={horario}
                                            onClick={() => handleHorarioClick(horario)}
                                            selected={horarioSelecionado === horario}
                                            disabled={isPassado}
                                        >
                                            <p>{horario}</p>
                                        </S.HorarioItem>
                                    )
                                })
                            ) : (
                                <p className="nenhum_horario">
                                    Nenhum horário disponível nesse turno
                                </p>
                            )}
                        </S.HorarioList>
                    </>
                ) : (
                    <p className="nenhum_horario">Nenhum horário disponível nesse dia</p>
                )}
            </S.Horario>
            <S.Button onClick={handleNext}>Prosseguir</S.Button>
        </S.Container>
    )
}

export default HorariosStep
