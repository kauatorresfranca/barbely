import { useState, useEffect, useRef } from 'react';
import { formatInTimeZone, toZonedTime } from 'date-fns-tz';
import { addDays, subDays, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { authFetch } from '../../../../utils/authFetch';
import DetalhesModal from '../../modals/agendamentos/Detalhes';
import CriarAgendamentoModal from '../../modals/agendamentos/criar';
import * as S from './styles';
import api from '../../../../services/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Agendamento, NovoAgendamento } from '../../../../models/Agendamento';
import { Funcionario } from '../../../../models/funcionario';
import { Servico } from '../../../../models/servico';
import { Toast } from '../../../../components/toast';

const fusoHorario = 'America/Sao_Paulo';
const hoje = formatInTimeZone(new Date(), fusoHorario, 'yyyy-MM-dd');

const gerarHoras = (intervalo: number): string[] => {
    const horas: string[] = [];
    const inicio = 8 * 60;
    const fim = 20 * 60;

    for (let minutos = inicio; minutos <= fim; minutos += intervalo) {
        const h = Math.floor(minutos / 60)
            .toString()
            .padStart(2, '0');
        const m = (minutos % 60).toString().padStart(2, '0');
        horas.push(`${h}:${m}`);
    }

    return horas;
};

const getIconePagamento = (metodo: string | null): string => {
    switch (metodo) {
        case 'pix':
            return 'ri-pix-fill pix';
        case 'cartao_credito':
            return 'ri-bank-card-fill card';
        case 'cartao_debito':
            return 'ri-bank-card-fill card';
        case 'dinheiro':
            return 'ri-cash-line cash';
        default:
            return 'ri-question-fill';
    }
};

const AgendaGrafico = () => {
    const [dataSelecionada, setDataSelecionada] = useState<string>(hoje);
    const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
    const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
    const [servicos, setServicos] = useState<Servico[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [createModalIsOpen, setCreateModalIsOpen] = useState<boolean>(false);
    const [selectedAgendamento, setSelectedAgendamento] = useState<Agendamento | null>(null);
    const [toastMessage, setToastMessage] = useState<string>('');
    const [showToast, setShowToast] = useState<boolean>(false);
    const [criandoAgendamento, setCriandoAgendamento] = useState<boolean>(false);
    const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
    const [agendamentoSemLogin, setAgendamentoSemLogin] = useState<boolean>(false);

    const calendarRef = useRef<HTMLDivElement>(null);
    const dateDisplayRef = useRef<HTMLDivElement>(null);

    const [novoAgendamento, setNovoAgendamento] = useState<NovoAgendamento>({
        cliente_email: '',
        cliente_nome: '',
        funcionario: '',
        servico: '',
        data: hoje,
        hora_inicio: '08:00',
        metodo_pagamento: '',
    });

    const intervalo = 30;
    const horas = gerarHoras(intervalo);
    const alturaPorMinuto = 1.5;
    const totalMinutos = (20 - 8) * 60;
    const alturaTimeline = totalMinutos * alturaPorMinuto;

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const token = sessionStorage.getItem('access_token_barbearia');
                if (!token) return;
                const response = await authFetch(`${api.baseURL}/barbearias/update/`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                setAgendamentoSemLogin(data.agendamento_sem_login || false);
            } catch (error) {
                console.error('Erro ao carregar configurações:', error);
                setToastMessage('Erro ao carregar configurações.');
                setShowToast(true);
            }
        };
        fetchConfig();
    }, []);

    const formatarData = (data: string): string => {
        const selectedDate = toZonedTime(data, fusoHorario);
        const today = toZonedTime(hoje, fusoHorario);
        const yesterday = subDays(today, 1);
        const tomorrow = addDays(today, 1);

        if (isSameDay(selectedDate, today)) {
            return 'HOJE';
        } else if (isSameDay(selectedDate, yesterday)) {
            return 'ONTEM';
        } else if (isSameDay(selectedDate, tomorrow)) {
            return 'AMANHÃ';
        }
        return formatInTimeZone(selectedDate, fusoHorario, 'dd/MM/yyyy');
    };

    const mudarDia = (direcao: 'anterior' | 'proximo'): void => {
        const dataAtual = toZonedTime(dataSelecionada, fusoHorario);
        const novaData = direcao === 'anterior' ? subDays(dataAtual, 1) : addDays(dataAtual, 1);
        setDataSelecionada(formatInTimeZone(novaData, fusoHorario, 'yyyy-MM-dd'));
    };

    const handleDateChange = (date: Date | null): void => {
        if (date) {
            setDataSelecionada(formatInTimeZone(date, fusoHorario, 'yyyy-MM-dd'));
            setIsCalendarOpen(false);
        }
    };

    const toggleCalendar = (): void => {
        setIsCalendarOpen(!isCalendarOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                calendarRef.current &&
                !calendarRef.current.contains(event.target as Node) &&
                dateDisplayRef.current &&
                !dateDisplayRef.current.contains(event.target as Node)
            ) {
                setIsCalendarOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const openModal = (agendamento: Agendamento): void => {
        setSelectedAgendamento(agendamento);
        setModalIsOpen(true);
    };

    const closeModal = (): void => {
        setModalIsOpen(false);
        setSelectedAgendamento(null);
    };

    const openCreateModal = (): void => {
        setCreateModalIsOpen(true);
    };

    const closeCreateModal = (): void => {
        setCreateModalIsOpen(false);
        setToastMessage('');
        setShowToast(false);
        setNovoAgendamento({
            cliente_email: '',
            cliente_nome: '',
            funcionario: '',
            servico: '',
            data: hoje,
            hora_inicio: '08:00',
            metodo_pagamento: '',
        });
    };

    const buscarFuncionarios = async (): Promise<boolean> => {
        try {
            const token = sessionStorage.getItem('access_token_barbearia');
            if (!token) {
                throw new Error('Você precisa estar logado para acessar os funcionários.');
            }

            const res = await authFetch(`${api.baseURL}/funcionarios/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {
                if (res.status === 401) {
                    throw new Error('Sessão expirada. Por favor, faça login novamente.');
                }
                throw new Error('Falha ao buscar funcionários');
            }

            const dados: Funcionario[] = await res.json();
            setFuncionarios(dados);
            return true;
        } catch (err) {
            const error = err as Error;
            console.error('Erro ao buscar funcionários:', error);
            setToastMessage(error.message || 'Erro ao buscar funcionários.');
            setShowToast(true);
            return false;
        }
    };

    const buscarServicos = async (): Promise<boolean> => {
        try {
            const token = sessionStorage.getItem('access_token_barbearia');
            if (!token) {
                throw new Error('Você precisa estar logado para acessar os serviços.');
            }

            const res = await authFetch(`${api.baseURL}/servicos/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {
                if (res.status === 401) {
                    throw new Error('Sessão expirada. Por favor, faça login novamente.');
                }
                throw new Error('Falha ao buscar serviços');
            }

            const dados: Servico[] = await res.json();
            setServicos(dados);
            return true;
        } catch (err) {
            const error = err as Error;
            console.error('Erro ao buscar serviços:', error);
            setToastMessage(error.message || 'Erro ao buscar serviços.');
            setShowToast(true);
            return false;
        }
    };

    const buscarAgendamentos = async (data: string): Promise<boolean> => {
        try {
            const token = sessionStorage.getItem('access_token_barbearia');
            if (!token) {
                throw new Error('Você precisa estar logado para acessar os agendamentos.');
            }

            const res = await authFetch(`${api.baseURL}/barbearia/agendamentos/?data=${data}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {
                if (res.status === 401) {
                    throw new Error('Sessão expirada. Por favor, faça login novamente.');
                }
                throw new Error('Falha ao buscar agendamentos');
            }

            const dados: Agendamento[] = await res.json();
            setAgendamentos(dados);
            return true;
        } catch (err) {
            const error = err as Error;
            console.error('Erro ao buscar agendamentos:', error);
            setToastMessage(error.message || 'Erro ao buscar agendamentos.');
            setShowToast(true);
            return false;
        }
    };

    const validateNovoAgendamento = (agendamentoSemLogin: boolean): string | null => {
        if (!agendamentoSemLogin && !novoAgendamento.cliente_email) {
            return 'O e-mail do cliente é obrigatório quando o agendamento sem login está desativado.';
        }
        if (
            !agendamentoSemLogin &&
            novoAgendamento.cliente_email &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(novoAgendamento.cliente_email)
        ) {
            return 'Por favor, insira um e-mail válido.';
        }
        if (!novoAgendamento.cliente_nome) {
            return 'O nome do cliente é obrigatório.';
        }
        if (!novoAgendamento.funcionario) {
            return 'Selecione um funcionário.';
        }
        if (!novoAgendamento.servico) {
            return 'Selecione um serviço.';
        }
        if (!novoAgendamento.data) {
            return 'Selecione uma data.';
        }
        if (!novoAgendamento.hora_inicio) {
            return 'Selecione uma hora de início.';
        }
        if (!novoAgendamento.metodo_pagamento) {
            return 'Selecione um método de pagamento.';
        }
        return null;
    };

    const criarAgendamento = async (agendamentoSemLogin: boolean): Promise<void> => {
        try {
            const validationError = validateNovoAgendamento(agendamentoSemLogin);
            if (validationError) {
                setToastMessage(validationError);
                setShowToast(true);
                return;
            }

            setCriandoAgendamento(true);
            const token = sessionStorage.getItem('access_token_barbearia');
            if (!token) {
                throw new Error('Você precisa estar logado para criar agendamentos.');
            }

            const payload = {
                cliente_email: novoAgendamento.cliente_email || '',
                cliente_nome: novoAgendamento.cliente_nome,
                funcionario: parseInt(novoAgendamento.funcionario),
                servico: parseInt(novoAgendamento.servico),
                data: novoAgendamento.data,
                hora_inicio: novoAgendamento.hora_inicio,
                metodo_pagamento: novoAgendamento.metodo_pagamento,
                status: 'CONFIRMADO',
            };

            const res = await authFetch(`${api.baseURL}/barbearia/agendamentos/criar/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const erroData = await res.json();
                if (res.status === 401) {
                    throw new Error('Sessão expirada. Por favor, faça login novamente.');
                }
                if (res.status === 403) {
                    throw new Error('Apenas contas de barbearia podem criar agendamentos.');
                }
                if (res.status === 400 && erroData) {
                    if (erroData.non_field_errors) {
                        throw new Error(erroData.non_field_errors[0]);
                    }
                    const errorMessages = Object.values<string[]>(erroData).flat().join(' ');
                    throw new Error(errorMessages || 'Falha ao criar agendamento');
                }
                throw new Error('Falha ao criar agendamento');
            }

            const novoAgendamentoData: Agendamento = await res.json();
            setAgendamentos([...agendamentos, novoAgendamentoData]);
            setToastMessage('Agendamento criado com sucesso!');
            setShowToast(true);
            closeCreateModal();
        } catch (err) {
            const error = err as Error;
            console.error('Erro ao criar agendamento:', error);
            setToastMessage(error.message || 'Erro ao criar agendamento.');
            setShowToast(true);
        } finally {
            setCriandoAgendamento(false);
        }
    };

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            setIsLoading(true);
            try {
                await Promise.all([
                    buscarFuncionarios(),
                    buscarServicos(),
                    buscarAgendamentos(dataSelecionada),
                ]);
            } catch (err) {
                const error = err as Error;
                console.error('Erro ao carregar dados:', error);
                setToastMessage(error.message || 'Erro ao carregar dados.');
                setShowToast(true);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [dataSelecionada]);

    const formatarStatus = (status: Agendamento['status']): string => {
        switch (status) {
            case 'CONFIRMADO':
                return 'Confirmado';
            case 'CANCELADO':
                return 'Cancelado';
            case 'EXPIRADO':
                return 'Expirado';
            case 'CONCLUIDO':
                return 'Concluído';
            default:
                return status;
        }
    };

    return (
        <S.Container>
            <h2>Meus Agendamentos</h2>
            <p className="subtitle">
                Visualize e acompanhe os horários marcados pelos clientes, com todos os detalhes.
            </p>
            {showToast && <Toast message={toastMessage} onClose={() => setShowToast(false)} />}
            <S.MeusAgendamentosHeader>
                <S.Filtro>
                    <S.DateNavigator>
                        <S.ArrowButton className="voltarDia" onClick={() => mudarDia('anterior')}>
                            <i className="ri-arrow-left-double-line"></i>
                        </S.ArrowButton>
                        <S.DateWrapper>
                            <S.DateDisplay
                                onClick={toggleCalendar}
                                ref={dateDisplayRef}
                                className="date-display"
                            >
                                {formatarData(dataSelecionada)}
                            </S.DateDisplay>
                            {isCalendarOpen && (
                                <S.CalendarContainer ref={calendarRef}>
                                    <DatePicker
                                        selected={toZonedTime(dataSelecionada, fusoHorario)}
                                        onChange={handleDateChange}
                                        inline
                                        calendarClassName="custom-calendar"
                                        locale={ptBR}
                                    />
                                </S.CalendarContainer>
                            )}
                        </S.DateWrapper>
                        <S.ArrowButton className="avançarDia" onClick={() => mudarDia('proximo')}>
                            <i className="ri-arrow-right-double-line"></i>
                        </S.ArrowButton>
                    </S.DateNavigator>
                </S.Filtro>
                <S.CriarAgendamento
                    onClick={openCreateModal}
                    disabled={funcionarios.length === 0 || servicos.length === 0}
                >
                    Criar Agendamento
                </S.CriarAgendamento>
            </S.MeusAgendamentosHeader>
            <S.HorariosContainer>
                {isLoading ? (
                    <S.LoadingContainer>
                        <S.Message>Carregando agendamentos...</S.Message>
                    </S.LoadingContainer>
                ) : (
                    <>
                        {funcionarios.length === 0 ? (
                            <S.Message>
                                Nenhum funcionário cadastrado. Adicione funcionários para visualizar
                                a agenda.
                            </S.Message>
                        ) : (
                            <>
                                <S.FuncionariosHeader>
                                    {funcionarios.map((funcionario) => (
                                        <S.FuncionarioTitle key={funcionario.id}>
                                            {funcionario.imagem ? (
                                                <img src={funcionario.imagem} alt="" />
                                            ) : (
                                                <i className="ri-user-3-fill"></i>
                                            )}
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
                                            <S.Timelines
                                                key={funcionario.id}
                                                style={{ height: `${alturaTimeline}px` }}
                                            >
                                                <S.AgendamentosArea>
                                                    {horas.map((hora) => {
                                                        const [h, m] = hora.split(':').map(Number);
                                                        const minutosDesde8h = (h - 8) * 60 + m;
                                                        const top = minutosDesde8h * alturaPorMinuto;

                                                        return (
                                                            <S.LinhaHora
                                                                key={`linha-${hora}-${funcionario.id}`}
                                                                top={top}
                                                            />
                                                        );
                                                    })}
                                                    {agendamentos
                                                        .filter(
                                                            (agendamento) =>
                                                                agendamento.funcionario === funcionario.id,
                                                        )
                                                        .map((agendamento) => {
                                                            const [h, m] = agendamento.hora_inicio
                                                                .split(':')
                                                                .map(Number);
                                                            const minutosDesde8h = (h - 8) * 60 + m;
                                                            const top =
                                                                minutosDesde8h * alturaPorMinuto;

                                                            return (
                                                                <S.AgendamentoBlock
                                                                    key={agendamento.id}
                                                                    style={{ top: `${top}px` }}
                                                                    onClick={() => openModal(agendamento)}
                                                                >
                                                                    <S.AgendamentoInfo
                                                                        hora={agendamento.hora_inicio}
                                                                        status={agendamento.status}
                                                                    >
                                                                        <p className="status">
                                                                            {formatarStatus(
                                                                                agendamento.status,
                                                                            )}
                                                                        </p>
                                                                        <div>
                                                                            <p className="cliente">
                                                                                {agendamento.cliente_nome}
                                                                            </p>
                                                                            <p className="servico">
                                                                                <i
                                                                                    className={getIconePagamento(
                                                                                        agendamento.metodo_pagamento,
                                                                                    )}
                                                                                ></i>{' '}
                                                                                {agendamento.servico_nome}{' '}
                                                                                -{' '}
                                                                                {agendamento.servico_duracao}{' '}
                                                                                min
                                                                            </p>
                                                                        </div>
                                                                    </S.AgendamentoInfo>
                                                                    <i className="ri-arrow-right-s-line arrow"></i>
                                                                </S.AgendamentoBlock>
                                                            );
                                                        })}
                                                </S.AgendamentosArea>
                                            </S.Timelines>
                                        ))}
                                    </S.Timelines>
                                </S.TimelinesContainer>
                            </>
                        )}
                    </>
                )}
            </S.HorariosContainer>

            <DetalhesModal
                isOpen={modalIsOpen}
                onClose={closeModal}
                agendamento={selectedAgendamento}
                formatarStatus={formatarStatus}
            />
            <CriarAgendamentoModal
                isOpen={createModalIsOpen}
                onClose={closeCreateModal}
                novoAgendamento={novoAgendamento}
                setNovoAgendamento={setNovoAgendamento}
                funcionarios={funcionarios}
                servicos={servicos}
                horas={horas}
                criandoAgendamento={criandoAgendamento}
                onCreate={() => criarAgendamento(agendamentoSemLogin)}
                agendamentoSemLogin={agendamentoSemLogin}
            />
        </S.Container>
    );
};

export default AgendaGrafico;
