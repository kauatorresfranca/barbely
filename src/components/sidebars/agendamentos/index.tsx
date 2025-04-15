import { useState, useEffect } from 'react'
import * as S from './styles'

const hoje = new Date().toISOString().split('T')[0]

const gerarHoras = (intervalo: number) => {
  const horas = []
  const inicio = 8 * 60
  const fim = 20 * 60

  for (let minutos = inicio; minutos <= fim; minutos += intervalo) {
    const h = Math.floor(minutos / 60).toString().padStart(2, '0')
    const m = (minutos % 60).toString().padStart(2, '0')
    horas.push(`${h}:${m}`)
  }

  return horas
}

const AgendaGrafico = () => {
  const [dataSelecionada, setDataSelecionada] = useState(hoje)
  const [agendamentos, setAgendamentos] = useState([])
  const [carregando, setCarregando] = useState(false)

  const intervalo = 30
  const horas = gerarHoras(intervalo)

  const alturaPorMinuto = 1.5
  const totalMinutos = (20 - 8) * 60
  const alturaTimeline = totalMinutos * alturaPorMinuto

  const buscarAgendamentos = async (data: string) => {
    try {
      setCarregando(true)
      const res = await fetch(`/api/agendamentos/?data=${data}`)
      const dados = await res.json()
      setAgendamentos(dados)
    } catch (err) {
      console.error('Erro ao buscar agendamentos:', err)
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => {
    buscarAgendamentos(dataSelecionada)
  }, [dataSelecionada])

  return (
    <S.Container>
        <h2>Meus Agendamentos</h2>
        <p className="subtitle">Visualize e acompanhe os horários marcados pelos seus clientes, com todos os detalhes.</p>
      <S.Filtro>
        <S.InputsContainer>
          <S.InputGroup>
            <p>Data</p>
            <input
              type="date"
              value={dataSelecionada}
              onChange={(e) => setDataSelecionada(e.target.value)}
            />
          </S.InputGroup>
        </S.InputsContainer>
        <button onClick={() => buscarAgendamentos(dataSelecionada)}>
            Filtrar
        </button>
      </S.Filtro>

      {carregando ? (
        <p>Carregando agendamentos...</p>
      ) : (
        <S.HorariosContainer>
          <S.Timeline style={{ height: `${alturaTimeline}px` }}>
            <S.Horarios>
              {horas.map((hora) => {
                const [h, m] = hora.split(':').map(Number)
                const minutosDesde8h = (h - 8) * 60 + m
                const top = minutosDesde8h * alturaPorMinuto

                return (
                  <S.Hora key={hora} style={{ top: `${top}px` }}>
                    {hora}
                  </S.Hora>
                )
              })}
            </S.Horarios>

            <S.AgendamentosArea>
              {horas.map((hora) => {
                const [h, m] = hora.split(':').map(Number)
                const minutosDesde8h = (h - 8) * 60 + m
                const top = minutosDesde8h * alturaPorMinuto

                return <S.LinhaHora key={`linha-${hora}`} top={top} />
              })}

              {agendamentos.map((agendamento: any) => {
                const [h, m] = agendamento.hora.split(':').map(Number)
                const minutosDesde8h = (h - 8) * 60 + m
                const top = minutosDesde8h * alturaPorMinuto

                return (
                  <S.AgendamentoBlock
                    key={agendamento.id}
                    hora={agendamento.hora}
                    style={{ top: `${top}px` }}
                  >
                    <div>
                      <p className="cliente">{agendamento.cliente}</p>
                      <p>{agendamento.servico}</p>
                    </div>
                    <S.Button>Detalhes do Agendamento</S.Button>
                  </S.AgendamentoBlock>
                )
              })}
            </S.AgendamentosArea>
          </S.Timeline>
        </S.HorariosContainer>
      )}
    </S.Container>
  )
}

export default AgendaGrafico
