import { useEffect, useState } from 'react'
import { formatInTimeZone, toZonedTime } from 'date-fns-tz'
import { DayPicker } from 'react-day-picker'
import { ptBR } from 'date-fns/locale'

import { Funcionario } from '../../../../models/funcionario'
import { Servico } from '../../../../models/servico'

import * as S from './styles'
import { authFetch } from '../../../../utils/authFetch'

type Props = {
    setActiveTab: (
        tab: string,
        data?: {
            data?: string
            horario?: string
            servico: Servico
            funcionario: Funcionario | null
        },
    ) => void
    servico: Servico
    funcionario: Funcionario | null
}

const HorariosStep = ({ setActiveTab, servico, funcionario }: Props) => {
    const fusoHorario = 'America/Sao_Paulo'
    const hoje = toZonedTime(new Date(), fusoHorario)
    const [horariosDisponiveis, setHorariosDisponiveis] = useState<string[]>([])
    const [dataSelecionada, setDataSelecionada] = useState<Date | undefined>(hoje)
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

    useEffect(() => {
        const fetchHorarios = async () => {
            if (!dataSelecionada) return

            try {
                const token = sessionStorage.getItem('access_token_cliente')
                const dataNormalizada = toZonedTime(dataSelecionada, fusoHorario)
                const dataFormatada = formatInTimeZone(dataNormalizada, fusoHorario, 'yyyy-MM-dd')
                const diaSemana = dataSelecionada.getDay()

                console.log('Data selecionada:', dataFormatada, 'Dia da semana:', diaSemana)

                const url = new URL('http://localhost:8000/api/agendamentos/horarios-disponiveis/')
                url.searchParams.append('servico', String(servico.id))
                url.searchParams.append('data', dataFormatada)
                if (funcionario?.id != null) {
                    url.searchParams.append('funcionario', String(funcionario.id))
                }

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
                console.log('Resposta da API /api/agendamentos/horarios-disponiveis/:', dataJson)
                setHorariosDisponiveis(dataJson.horarios_disponiveis || [])
                setError(null)
            } catch (error) {
                console.error('Erro ao buscar horários disponíveis:', error)
                setError(error instanceof Error ? error.message : 'Erro ao buscar horários.')
            }
        }

        fetchHorarios()
    }, [servico.id, funcionario?.id, dataSelecionada])

    const handleNext = () => {
        if (!dataSelecionada || !horarioSelecionado) {
            alert('Selecione uma data e um horário antes de prosseguir.')
            return
        }

        const dataNormalizada = toZonedTime(dataSelecionada, fusoHorario)
        const dataFormatada = formatInTimeZone(dataNormalizada, fusoHorario, 'yyyy-MM-dd')

        setActiveTab('dia', {
            data: dataFormatada,
            horario: horarioSelecionado,
            servico,
            funcionario,
        })
    }

    return (
        <S.Container>
            <S.Data>
                <h3>Escolha a data</h3>
                <S.DataPickWrapper>
                    <DayPicker
                        mode="single"
                        selected={dataSelecionada}
                        onSelect={setDataSelecionada}
                        disabled={[{ before: hoje }]}
                        locale={ptBR}
                    />
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
                                horariosPorTurno[turnoSelecionado].map((horario) => (
                                    <S.HorarioItem
                                        key={horario}
                                        onClick={() => setHorarioSelecionado(horario)}
                                        selected={horarioSelecionado === horario}
                                    >
                                        <p>{horario}</p>
                                    </S.HorarioItem>
                                ))
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
