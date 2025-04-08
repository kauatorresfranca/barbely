import * as S from './styles'

const hoje = new Date().toISOString().split("T")[0]

const agendamentos = [
  {
    id: 1,
    cliente: 'João Silva',
    servico: 'Corte',
    hora: '09:00',
  },
  {
    id: 2,
    cliente: 'Lucas Pereira',
    servico: 'Barba',
    hora: '11:30',
  },
  {
    id: 3,
    cliente: 'Marcos Lima',
    servico: 'Combo Corte + Barba',
    hora: '15:00',
  },
]

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
  const intervalo = 30
  const horas = gerarHoras(intervalo)

  const alturaPorMinuto = 1.5 // controle da altura
  const totalMinutos = (20 - 8) * 60
  const alturaTimeline = totalMinutos * alturaPorMinuto

  return (
    <>
        <h2>Meus Agendamentos</h2>
        <S.Filtro>
            <S.InputsContainer>
                <S.InputGroup>
                    <p>Data</p>
                    <input type="date" defaultValue={hoje}/>
                </S.InputGroup>
            </S.InputsContainer>
            <button>Filtrar</button>
        </S.Filtro>
    <S.Container>
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

            return <S.LinhaHora key={hora} top={top} />
          })}

          {agendamentos.map((agendamento) => {
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
                    <p className='cliente'>{agendamento.cliente}</p>
                    <p>{agendamento.servico}</p>
                </div>
                <S.Button>Detalhes do Agendamento</S.Button>
            </S.AgendamentoBlock>
            )
        })}
        </S.AgendamentosArea>
    </S.Timeline>
    </S.Container>
    </>
)
}

export default AgendaGrafico
