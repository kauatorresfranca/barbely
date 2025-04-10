import { useEffect, useState } from 'react';
import * as S from './styles';

type Props = {
    setActiveTab: (tab: string) => void;
    servicoId: number;
    funcionarioId: number | null;
};

const HorariosStep = ({ setActiveTab, servicoId, funcionarioId }: Props) => {
    const [horariosDisponiveis, setHorariosDisponiveis] = useState<string[]>([]);

    useEffect(() => {
        const fetchHorarios = async () => {
            if (servicoId == null) return; // evita chamada errada

            try {
                const data = '2025-04-10'; // futuramente será dinâmico
                const url = new URL('http://localhost:8000/api/agendamentos/horarios-disponiveis/');
                url.searchParams.append('servico', String(servicoId));
                url.searchParams.append('data', data);

                if (funcionarioId != null) {
                    url.searchParams.append('funcionario', String(funcionarioId));
                } else {
                    console.log('Sem preferência de funcionário');
                }

                const response = await fetch(url.toString(), {
                    headers: { 'Content-Type': 'application/json' },
                });

                if (!response.ok) {
                    throw new Error(`Erro ${response.status} - ${response.statusText}`);
                }

                const dataJson = await response.json();
                setHorariosDisponiveis(dataJson.horarios_disponiveis || []);
            } catch (error) {
                console.error('Erro ao buscar horários disponíveis:', error);
            }
        };

        fetchHorarios();
    }, [servicoId, funcionarioId]);


    const handleNext = () => {
        setActiveTab('dia');
    };

    return (
        <S.Container>
            <S.Data>
                <h3>Escolha a data</h3>
                {/* Aqui futuramente entrará um componente de seleção de datas */}
            </S.Data>

            <S.Horario>
                <h3>Escolha o melhor horário</h3>
                <S.HorarioList>
                    {horariosDisponiveis.length > 0 ? (
                        horariosDisponiveis.map(horario => (
                            <S.HorarioItem key={horario}>
                                <p>{horario}</p>
                            </S.HorarioItem>
                        ))
                    ) : (
                        <p>Nenhum horário disponível</p>
                    )}
                </S.HorarioList>
            </S.Horario>

            <S.Button onClick={handleNext}>Prosseguir</S.Button>
        </S.Container>
    );
};

export default HorariosStep;
