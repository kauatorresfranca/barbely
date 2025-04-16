import * as S from './styles';
import { AgendamentoData } from '../../../cliente/agendamento';
import { toZonedTime, format } from 'date-fns-tz';

type Props = {
  setActiveTab: (tab: string) => void;
  agendamentoData: AgendamentoData;
};

const ConfirmacaoStep = ({ setActiveTab, agendamentoData }: Props) => {
  const fusoHorario = 'America/Sao_Paulo';

  const dataFormatada = agendamentoData.data
    ? format(toZonedTime(agendamentoData.data, fusoHorario), 'dd/MM/yyyy', {
        timeZone: fusoHorario,
      })
    : '';

  const handleNext = async () => {
    const token = sessionStorage.getItem('access_token_cliente');

    if (!token) {
      alert('Você precisa estar logado para agendar.');
      return;
    }

    try {
      // Normaliza a data para America/Sao_Paulo
      const dataNormalizada = toZonedTime(agendamentoData.data, fusoHorario);
      const data = format(dataNormalizada, 'yyyy-MM-dd'); // ex: "2025-04-15"
      const horario = agendamentoData.horario; // ex: "10:00"

      // Cria um Date completo: "2025-04-15T10:00:00"
      const dataHoraCompleta = new Date(`${data}T${horario}:00`);

      if (isNaN(dataHoraCompleta.getTime())) {
        alert('Horário inválido selecionado.');
        return;
      }

      const horaFormatada = format(dataHoraCompleta, 'HH:mm');

      const payload = {
        data: data, // Usa a data normalizada
        funcionario: agendamentoData.funcionario?.id,
        hora_inicio: horaFormatada,
        servico: agendamentoData.servico.id,
      };

      const res = await fetch('http://localhost:8000/api/agendamentos/criar/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error('Erro ao agendar:', errorData);
        alert('Erro ao tentar confirmar o agendamento.');
        return;
      }

      alert('Agendamento confirmado com sucesso!');
      setActiveTab('sucesso');
    } catch (error) {
      console.error('Erro ao enviar agendamento:', error);
      alert('Erro de conexão com o servidor.');
    }
  };

  const handleBack = () => {
    setActiveTab('servico');
  };

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
  );
};

export default ConfirmacaoStep;
