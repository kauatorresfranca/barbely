import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Barbearia } from "../../models/Barbearia";

import logo from '../../assets/images/logo.png'
import logoBarbearia from '../../assets/images/logo_barbearia_exemplo.webp'

import * as S from './styles'
import { authFetch } from "../../utils/authFetch";

const PaginaBarbearia = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [barbearia, setBarbearia] = useState<Barbearia | null>(null);
    const [horarios, setHorarios] = useState<{ dia_semana: number; horario_abertura: string; horario_fechamento: string }[]>([]);

    const diasSemana = ["Domingo", "Segunda Feira", "Terça Feira", "Quarta Feira", "Quinta Feira", "Sexta Feira", "Sábado"];

    useEffect(() => {
        const dataStorage = sessionStorage.getItem("barbearia");

        if (dataStorage) {
            const barbeariaLogada = JSON.parse(dataStorage) as Barbearia;

            if (barbeariaLogada.slug === slug) {
                setBarbearia(barbeariaLogada);
            } else {
                navigate("/erro");
            }
        } else {
            navigate("/login");
        }
    }, [slug]);

    useEffect(() => {
        const fetchHorarios = async () => {
            const token = sessionStorage.getItem("access_token");

            try {
                const response = await authFetch("http://localhost:8000/api/horarios/", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                setHorarios(data);
            } catch (error) {
                console.error("Erro ao buscar horários:", error);
            }
        };

        fetchHorarios();
    }, []);

    return (
        <div>
            {barbearia ? (
                <S.Container>
                    <S.Header>
                        <img src={logo} alt="logo barberly" />
                        <S.ButtonGroup>
                            <S.Button to='/barbearia/login'>Login</S.Button>
                            <S.Button to='/barbearia/cadastro'>Cadastrar</S.Button>
                        </S.ButtonGroup>
                    </S.Header>
                    <S.BarbeariaProfile>
                        <S.BarbeariaResume>
                            <S.ResumeGroup>
                                <img src={logoBarbearia} alt="logo barbearia" />
                                <div>
                                    <h2>{barbearia.nome_barbearia}</h2>
                                    <p>Avenida coronel salustiano sarmento, 258 - Maceió, Alagoas</p>
                                    <h5><i className="ri-store-2-line"></i> Aberto agora - <i className="ri-phone-line"></i> 82 996124145</h5>
                                </div>
                            </S.ResumeGroup>
                            <S.AgendarHorario>Agendar Horario</S.AgendarHorario>
                        </S.BarbeariaResume>
                        <S.BarbeariaInfos>
                            <S.AboutUs>
                                <h3><i className="ri-information-line"></i> Sobre Nós</h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam quos ipsum optio aperiam provident odio nisi molestiae, eveniet a, earum repellat facere culpa consequuntur dolorem minus nam magnam repellendus nulla.</p>
                            </S.AboutUs>
                            <S.Hours>
                                <h3><i className="ri-time-line"></i> Horários</h3>
                                <S.TableHours>
                                    {diasSemana.map((dia, index) => {
                                        const horario = horarios.find(h => h.dia_semana === index);

                                        return (
                                            <S.Day key={index}>
                                                <p>{dia}</p>
                                                <p>
                                                    {horario?.horario_abertura && horario?.horario_fechamento
                                                    ? `${horario.horario_abertura.slice(0, 5)} - ${horario.horario_fechamento.slice(0, 5)}`
                                                    : "Fechado"}
                                                </p>
                                            </S.Day>
                                        );
                                    })}
                                </S.TableHours>
                            </S.Hours>
                            <S.Services>
                                <h3><i className="ri-scissors-2-fill"></i> Serviços</h3>
                                <S.ServicesList>
                                    <S.Service>
                                        <div>
                                            <h4>Corte de cabelo</h4>
                                            <p>15 m</p>
                                        </div>
                                        <p>R$ 35,00</p>
                                    </S.Service>
                                    <S.Service>
                                        <div>
                                            <h4>Barba</h4>
                                            <p>10 m</p>
                                        </div>
                                        <p>R$ 20,00</p>
                                    </S.Service>
                                    <S.Service>
                                        <div>
                                            <h4>Nevou</h4>
                                            <p>2 h</p>
                                        </div>
                                        <p>R$ 95,00</p>
                                    </S.Service>
                                </S.ServicesList>
                            </S.Services>
                        </S.BarbeariaInfos>
                    </S.BarbeariaProfile>
                </S.Container>
            ) : (
                <p>Carregando barbearia...</p>
            )}
        </div>
    );
};

export default PaginaBarbearia;
