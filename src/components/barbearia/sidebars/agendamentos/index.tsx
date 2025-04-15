import { useState, useEffect } from 'react';
import { formatInTimeZone, toZonedTime} from 'date-fns-tz';
import {addDays, subDays} from 'date-fns'
import * as S from './styles'

const fusoHorario = 'America/Sao_Paulo';
const hoje = formatInTimeZone(new Date(), fusoHorario, 'yyyy-MM-dd');

const gerarHoras = (intervalo: number) => {
  const horas: string[] = [];
  const inicio = 8 * 60;
  const fim = 20 * 60;

  for (let minutos = inicio; minutos <= fim; minutos += intervalo) {
    const h = Math.floor(minutos / 60).toString().padStart(2, '0');
    const m = (minutos % 60).toString().padStart(2, '0');
    horas.push(`${h}:${m}`);
  }

  return horas;
};

type Funcionario = {
  id: number;
  nome: string;
};

type Agendamento = {
  id: number;
  cliente: number;
  cliente_nome: string;
  funcionario: number;
  servico: number;
  servico_nome: string;
  servico_duracao: number;
  data: string;
  hora_inicio: string;
  cancelado: boolean;
  criado_em: string;
};

const AgendaGrafico = () => {
  const [dataSelecionada, setDataSelecionada] = useState<string>(hoje);
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [carregando, setCarregando] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedAgendamento, setSelectedAgendamento] = useState<Agendamento | null>(null);

  const intervalo = 30;
  const horas = gerarHoras(intervalo);

  const alturaPorMinuto = 1.5;
  const totalMinutos = (20 - 8) * 60;
  const alturaTimeline = totalMinutos * alturaPorMinuto;

  const formatarData = (data: string) => {
    return formatInTimeZone(toZonedTime(data, fusoHorario), fusoHorario, 'dd/MM/yyyy');
  };

  const mudarDia = (direcao: 'anterior' | 'proximo') => {
    const dataAtual = toZonedTime(dataSelecionada, fusoHorario);
    const novaData = direcao === 'anterior' ? subDays(dataAtual, 1) : addDays(dataAtual, 1);
    setDataSelecionada(formatInTimeZone(novaData, fusoHorario, 'yyyy-MM-dd'));
  };

  const openModal = (agendamento: Agendamento) => {
    setSelectedAgendamento(agendamento);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedAgendamento(null);
  };

  const buscarFuncionarios = async () => {
    try {
      const token = sessionStorage.getItem('access_token');
      const res = await fetch('http://localhost:8000/api/funcionarios/', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) throw new Error('Falha ao buscar funcionários');
      const dados: Funcionario[] = await res.json();
      setFuncionarios(dados);
    } catch (err) {
      console.error('Erro ao buscar funcionários:', err);
    }
  };

  const buscarAgendamentos = async (data: string) => {
    try {
      setCarregando(true);
      const token = sessionStorage.getItem('access_token');
      const res = await fetch(
        `http://localhost:8000/api/barbearia/agendamentos/?data=${data}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Status da resposta:', res.status);
      const respostaTexto = await res.text();
      console.log('Resposta da API:', respostaTexto);

      if (!res.ok) throw new Error('Falha ao buscar agendamentos');

      try {
        const dados: Agendamento[] = JSON.parse(respostaTexto);
        if (dados.length === 0) {
          console.log('Nenhum agendamento encontrado para a data selecionada.');
        }
        setAgendamentos(dados);
      } catch (jsonError) {
        console.error('Erro ao analisar JSON:', jsonError);
        throw new Error('Resposta da API não é um JSON válido');
      }
    } catch (err) {
      console.error('Erro ao buscar agendamentos:', err);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarFuncionarios();
    buscarAgendamentos(dataSelecionada);
  }, [dataSelecionada]);

  return (
    <S.Container>
      <h2>Meus Agendamentos</h2>
      <p className="subtitle">
        Visualize e acompanhe os horários marcados pelos seus clientes, com todos os detalhes.
      </p>
      <S.Filtro>
        <S.DateNavigator>
          <S.ArrowButton className="voltarDia" onClick={() => mudarDia('anterior')}>
            <i className="ri-arrow-left-double-line"></i>
          </S.ArrowButton>
          <S.DateDisplay>
            {dataSelecionada === hoje ? 'HOJE' : formatarData(dataSelecionada)}
          </S.DateDisplay>
          <S.ArrowButton className="avançarDia" onClick={() => mudarDia('proximo')}>
            <i className="ri-arrow-right-double-line"></i>
          </S.ArrowButton>
        </S.DateNavigator>
        <button onClick={() => buscarAgendamentos(dataSelecionada)}>Atualizar</button>
      </S.Filtro>

      {carregando ? (
        <p>Carregando agendamentos...</p>
      ) : (
        <S.HorariosContainer>
          <S.FuncionariosHeader>
            {funcionarios.map((funcionario) => (
              <S.FuncionarioTitle key={funcionario.id}>
                {funcionario.nome}
              </S.FuncionarioTitle>
            ))}
          </S.FuncionariosHeader>
          <S.TimelinesContainer>
            <S.Horarios>
              {horas.map((hora) => {
                const [h, m] = hora.split(':').map(Number);
                const minutosDesde8h = (h - 8) * 60 + m;
                const top = minutosDesde8h * alturaPorMinuto;

                return (
                  <S.Hora key={hora} style={{ top: `${top}px` }}>
                    {hora}
                  </S.Hora>
                );
              })}
            </S.Horarios>
            <S.Timelines>
              {funcionarios.map((funcionario) => (
                <S.Timeline key={funcionario.id} style={{ height: `${alturaTimeline}px` }}>
                  <S.AgendamentosArea>
                    {horas.map((hora) => {
                      const [h, m] = hora.split(':').map(Number);
                      const minutosDesde8h = (h - 8) * 60 + m;
                      const top = minutosDesde8h * alturaPorMinuto;

                      return <S.LinhaHora key={`linha-${hora}-${funcionario.id}`} top={top} />;
                    })}
                    {agendamentos
                      .filter((agendamento) => agendamento.funcionario === funcionario.id)
                      .map((agendamento) => {
                        const [h, m] = agendamento.hora_inicio.split(':').map(Number);
                        const minutosDesde8h = (h - 8) * 60 + m;
                        const top = minutosDesde8h * alturaPorMinuto;
                        const altura = agendamento.servico_duracao * alturaPorMinuto;

                        return (
                          <S.AgendamentoBlock
                            key={agendamento.id}
                            hora={agendamento.hora_inicio}
                            style={{ top: `${top}px`, height: `${altura}px` }}
                            cancelado={agendamento.cancelado}
                          >
                            <S.AgendamentoInfo>
                              <p className="hora">{agendamento.hora_inicio.slice(0, 5)}</p>
                              <div>
                                <p className="cliente">{agendamento.cliente_nome}</p>
                                <p className="servico">
                                  {agendamento.servico_nome} - {agendamento.servico_duracao} min
                                </p>
                              </div>
                              {agendamento.cancelado && <p className="cancelado">Cancelado</p>}
                            </S.AgendamentoInfo>
                            <S.Button onClick={() => openModal(agendamento)}>Detalhes</S.Button>
                          </S.AgendamentoBlock>
                        );
                      })}
                  </S.AgendamentosArea>
                </S.Timeline>
              ))}
            </S.Timelines>
          </S.TimelinesContainer>
        </S.HorariosContainer>
      )}

      {modalIsOpen && selectedAgendamento && (
        <S.Overlay>
          <S.Modal>
            <S.CloseButton onClick={closeModal}>×</S.CloseButton>
            <h2>Detalhes do Agendamento</h2>
            <S.ModalContent>
              <S.InfoItem>
                <S.InfoLabel>Cliente</S.InfoLabel>
                <S.InfoValue>{selectedAgendamento.cliente_nome}</S.InfoValue>
              </S.InfoItem>
              <S.InfoItem>
                <S.InfoLabel>Serviço</S.InfoLabel>
                <S.InfoValue>{selectedAgendamento.servico_nome}</S.InfoValue>
              </S.InfoItem>
              <S.InfoItem>
                <S.InfoLabel>Horário</S.InfoLabel>
                <S.InfoValue>{selectedAgendamento.hora_inicio.slice(0, 5)}</S.InfoValue>
              </S.InfoItem>
              <S.InfoItem>
                <S.InfoLabel>Duração</S.InfoLabel>
                <S.InfoValue>{`${selectedAgendamento.servico_duracao} minutos`}</S.InfoValue>
              </S.InfoItem>
              <S.InfoItem>
                <S.InfoLabel>Status</S.InfoLabel>
                <S.InfoValue cancelado={selectedAgendamento.cancelado}>
                  {selectedAgendamento.cancelado ? 'Cancelado' : 'Ativo'}
                </S.InfoValue>
              </S.InfoItem>
            </S.ModalContent>
          </S.Modal>
        </S.Overlay>
      )}
    </S.Container>
  );
};

export default AgendaGrafico;
