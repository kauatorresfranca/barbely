import { useEffect, useState } from 'react';
import * as S from './styles';
import user from '../../../../assets/images/user.png';
import { Funcionario } from '../../../../models/funcionario';
import { useParams } from 'react-router-dom';
import { Servico } from '../../../../models/servico';

type Props = {
    setActiveTab: (tab: string, data?: { servico: Servico; funcionario: Funcionario | null }) => void;
};

const FirstStep = ({ setActiveTab }: Props) => {
    const { slug } = useParams();
    const [servicos, setServicos] = useState<Servico[]>([]);
    const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
    const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);
    const [selectedFuncionarioId, setSelectedFuncionarioId] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [servicosRes, funcionariosRes] = await Promise.all([
                    fetch(`http://localhost:8000/api/servicos/?barbearia_slug=${slug}`),
                    fetch(`http://localhost:8000/api/funcionarios/?barbearia_slug=${slug}`)
                ]);

                if (servicosRes.ok) {
                    setServicos(await servicosRes.json());
                } else {
                    console.error('Erro ao buscar serviços');
                }

                if (funcionariosRes.ok) {
                    setFuncionarios(await funcionariosRes.json());
                } else {
                    console.error('Erro ao buscar profissionais');
                }
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchData();
    }, [slug]);

    const handleNext = () => {
        if (selectedServiceId !== null) {
            const servico = servicos.find(s => s.id === selectedServiceId)!;
            const funcionario = funcionarios.find(f => f.id === selectedFuncionarioId!) ?? null;

            setActiveTab('horarios', { servico, funcionario });
        } else {
            alert('Por favor, selecione um serviço!');
        }
    };


    return (
        <S.Container>
            <S.Employee>
                <h3>Escolha um barbeiro</h3>
                <S.EmployeeList>
                    {funcionarios.map(func => (
                        <S.EmployeeItem
                            key={func.id}
                            onClick={() => setSelectedFuncionarioId(func.id)}
                            $selected={selectedFuncionarioId === func.id}
                        >
                            <img src={user} alt="Barbeiro" />
                            <h4>{func.nome}</h4>
                        </S.EmployeeItem>
                    ))}
                    <S.EmployeeItem
                        onClick={() => setSelectedFuncionarioId(null)}
                        $selected={selectedFuncionarioId === null}
                    >
                        <h4>Não tenho preferência</h4>
                    </S.EmployeeItem>
                </S.EmployeeList>
            </S.Employee>
            <S.Service>
                <h3>Escolha o serviço</h3>
                <S.ServicesList>
                    {servicos.map(servico => (
                        <S.ServiceItem
                            key={servico.id}
                            onClick={() => setSelectedServiceId(servico.id)}
                            $selected={selectedServiceId === servico.id}
                        >
                            <div>
                                <h4>{servico.nome}</h4>
                                <p>{servico.duracao_minutos} min</p>
                            </div>
                            <p>R$ {servico.preco}</p>
                        </S.ServiceItem>
                    ))}
                </S.ServicesList>
            </S.Service>

            <S.Button onClick={handleNext}>Prosseguir</S.Button>
        </S.Container>
    );
};

export default FirstStep;
