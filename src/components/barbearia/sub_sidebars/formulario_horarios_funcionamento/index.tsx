import { useState, useEffect } from 'react'
import { ClipLoader } from 'react-spinners' // Importe o ClipLoader
import { authFetch } from '../../../../utils/authFetch'
import { useBarbeariaAtual } from '../../../../hooks/useBarbeariaAtual'
import * as S from './styles'
import api from '../../../../services/api'

// Interface para os dados de horário retornados pela API
interface HorarioAPI {
    dia_semana: number
    horario_abertura: string | null
    horario_fechamento: string | null
}

// Interface para o estado local de horários
interface HorarioLocal {
    dia: string
    aberto: boolean
    abre_as: string
    fecha_as: string
}

const diasDaSemana = [
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
    'Domingo',
]

const HorarioFuncionamentoForm = () => {
    const barbearia = useBarbeariaAtual()
    const slug = barbearia?.slug
    const [horarios, setHorarios] = useState<HorarioLocal[]>(
        diasDaSemana.map((dia) => ({
            dia,
            aberto: false,
            abre_as: '08:00',
            fecha_as: '19:00',
        })),
    )
    const [isLoading, setIsLoading] = useState(true) // Renomeado de loading para isLoading
    const [hasError, setHasError] = useState(false) // Renomeado de erro para hasError

    useEffect(() => {
        const fetchHorarios = async () => {
            if (!slug) {
                setHasError(true)
                setIsLoading(false)
                return
            }

            setIsLoading(true)
            setHasError(false)
            try {
                const response = await authFetch(`${api.baseURL}/horarios/?slug=${slug}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${sessionStorage.getItem('access_token_barbearia')}`,
                    },
                })

                if (response.ok) {
                    const data: HorarioAPI[] = await response.json()
                    const horariosFormatados = diasDaSemana.map((dia, index) => {
                        const horario = data.find((h) => h.dia_semana === index)
                        return {
                            dia,
                            aberto:
                                horario && horario.horario_abertura && horario.horario_fechamento
                                    ? true
                                    : false,
                            abre_as:
                                horario && horario.horario_abertura
                                    ? horario.horario_abertura.slice(0, 5)
                                    : '',
                            fecha_as:
                                horario && horario.horario_fechamento
                                    ? horario.horario_fechamento.slice(0, 5)
                                    : '',
                        }
                    })
                    setHorarios(horariosFormatados)
                } else {
                    console.error('Erro ao carregar horários')
                    setHasError(true)
                }
            } catch (error) {
                console.error('Erro ao conectar com o servidor:', error)
                setHasError(true)
            } finally {
                setIsLoading(false)
            }
        }

        fetchHorarios()
    }, [slug])

    const handleCheckboxChange = (index: number) => {
        const novosHorarios = [...horarios]
        novosHorarios[index].aberto = !novosHorarios[index].aberto
        if (!novosHorarios[index].aberto) {
            novosHorarios[index].abre_as = ''
            novosHorarios[index].fecha_as = ''
        } else {
            novosHorarios[index].abre_as = '08:00'
            novosHorarios[index].fecha_as = '19:00'
        }
        setHorarios(novosHorarios)
    }

    const handleTimeChange = (index: number, campo: 'abre_as' | 'fecha_as', valor: string) => {
        const novosHorarios = [...horarios]
        novosHorarios[index][campo] = valor
        setHorarios(novosHorarios)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const token = sessionStorage.getItem('access_token_barbearia')

        const mapaDias = {
            Domingo: 0,
            'Segunda-feira': 1,
            'Terça-feira': 2,
            'Quarta-feira': 3,
            'Quinta-feira': 4,
            'Sexta-feira': 5,
            Sábado: 6,
        }

        const dadosParaEnviar = horarios.map((h) => ({
            dia_semana: mapaDias[h.dia as keyof typeof mapaDias],
            aberto: h.aberto,
            fechado: !h.aberto,
            horario_abertura: h.aberto ? h.abre_as : null,
            horario_fechamento: h.aberto ? h.fecha_as : null,
        }))

        try {
            const response = await authFetch(`${api.baseURL}/horarios/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(dadosParaEnviar),
            })

            if (response.ok) {
                alert('Alterações salvas com sucesso!')
                setHasError(false)
            } else {
                console.error('Erro ao salvar horários')
                alert('Erro ao salvar horários.')
                setHasError(true)
            }
        } catch (error) {
            console.error('Erro ao enviar os horários:', error)
            alert('Erro ao conectar com o servidor.')
            setHasError(true)
        }
    }

    // Renderiza o ClipLoader se estiver carregando, houver erro ou não houver dados válidos
    if (isLoading || hasError) {
        return (
            <S.Container>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                    }}
                >
                    <ClipLoader color="#00c1fe" size={32} speedMultiplier={1} />
                </div>
            </S.Container>
        )
    }

    return (
        <S.Container>
            <h2>Horário de Funcionamento</h2>
            <p className="subtitle">
                Defina os dias e horários em que sua barbearia estará aberta para atendimento.
            </p>
            <S.Form onSubmit={handleSubmit}>
                <S.Table>
                    <thead>
                        <tr>
                            <th>Dia da Semana</th>
                            <th>Abre às</th>
                            <th>Fecha às</th>
                        </tr>
                    </thead>
                    <tbody>
                        {horarios.map((horario, index) => (
                            <tr key={horario.dia}>
                                <td>
                                    <S.CheckboxWrapper>
                                        <input
                                            type="checkbox"
                                            checked={horario.aberto}
                                            onChange={() => handleCheckboxChange(index)}
                                        />
                                        <span className="checkmark"></span>
                                        <h3>{horario.dia}</h3>
                                    </S.CheckboxWrapper>
                                </td>
                                <td>
                                    <S.Input
                                        type="time"
                                        value={horario.abre_as}
                                        onChange={(e) =>
                                            handleTimeChange(index, 'abre_as', e.target.value)
                                        }
                                        disabled={!horario.aberto}
                                    />
                                </td>
                                <td>
                                    <S.Input
                                        type="time"
                                        value={horario.fecha_as}
                                        onChange={(e) =>
                                            handleTimeChange(index, 'fecha_as', e.target.value)
                                        }
                                        disabled={!horario.aberto}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </S.Table>
                <S.Button type="submit">Salvar alterações</S.Button>
            </S.Form>
        </S.Container>
    )
}

export default HorarioFuncionamentoForm
