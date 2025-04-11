import * as S from './styles';
import { AgendamentoData } from '../../agendamento/';
import { toZonedTime, format } from 'date-fns-tz';

type Props = {
  setActiveTab: (tab: string) => void;
  agendamentoData: AgendamentoData;
};

const ConfirmacaoStep = ({ setActiveTab, agendamentoData }: Props) => {
  const fusoHorario = 'America/Sao_Paulo';
  const dataFormatada = agendamentoData.data
    ? format(toZonedTime(agendamentoData.data, fusoHorario), 'dd/MM/yyyy', { timeZone: fusoHorario })
    : '';

  const handleNext = () => {
    alert('Sessão confirmada!');
    setActiveTab('servico');
  };

  return (
    <S.Container>
      <h3>Confirme as informações do agendamento</h3>
      <S.Confirmacao>
        <p><strong>Data:</strong> {dataFormatada}</p>
        <p><strong>Horário:</strong> {agendamentoData.horario}</p>
        <p><strong>Serviço:</strong> {agendamentoData.servico.nome} - R$ {agendamentoData.servico.preco}</p>
        <p>
          <strong>Profissional:</strong>{' '}
          {agendamentoData.funcionario ? agendamentoData.funcionario.nome : 'Sem preferência'}
        </p>
      </S.Confirmacao>

      <S.Button onClick={handleNext}>Confirmar</S.Button>
    </S.Container>
  );
};

export default ConfirmacaoStep;
