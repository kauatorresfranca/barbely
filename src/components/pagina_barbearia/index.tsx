import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Barbearia } from "../../models/Barbearia"

import logo from '../../assets/images/logo.png'
import logoBarbearia from '../../assets/images/logo_barbearia_exemplo.webp'
import user from '../../assets/images/user.png'

import * as S from './styles'
import { useCliente } from "../../hooks/useClienteAuth"
import Agendamento from "../agendamento"

const PaginaBarbearia = () => {
    const navigate = useNavigate()
    const { cliente, loading } = useCliente()
    const { slug } = useParams()
    const [barbearia, setBarbearia] = useState<Barbearia | null>(null)
    const [horarios, setHorarios] = useState<{ dia_semana: number; horario_abertura: string; horario_fechamento: string }[]>([])
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const diasSemana = ["Domingo", "Segunda Feira", "Terça Feira", "Quarta Feira", "Quinta Feira", "Sexta Feira", "Sábado"]

    useEffect(() => {
        const fetchBarbearia = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/barbearias/buscar-por-slug/${slug}/`)
                const data = await response.json()
                setBarbearia(data)
            } catch (error) {
                console.error("Erro ao buscar barbearia:", error)
            }
        };

        if (slug) fetchBarbearia();
    }, [slug]);

    useEffect(() => {
        const fetchHorarios = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/horarios/?slug=${slug}`);
                const data = await response.json();
                setHorarios(data);
            } catch (error) {
                console.error("Erro ao buscar horários:", error);
            }
        };

        fetchHorarios();
    }, [slug]);

    function ToAgendamento() {
        if (cliente) {
            setModalIsOpen(true)
        }
        else {
            navigate(`/barbearia/${slug}/login`)
        }
    }

    return (
        <div>
            {barbearia ? (
                <S.Container>
                    <S.Header>
                        <img src={logo} alt="logo barberly" />
                        <S.ButtonGroup>
                            {!loading && (
                                cliente ? (
                                    <S.UserResume>
                                        <img src={user} alt="" />
                                        <p>{cliente.user.nome}</p>
                                        <i className="ri-arrow-down-s-line"></i>
                                    </S.UserResume>
                                ) : (
                                    <S.Button to={`/barbearia/${slug}/login`}>Login</S.Button>
                                )
                            )}
                        </S.ButtonGroup>
                    </S.Header>
                    <S.BarbeariaProfile>
                        <S.BarbeariaResume>
                            <S.ResumeGroup>
                                <img src={logoBarbearia} alt="logo barbearia" />
                                <div>
                                    <h2>{barbearia.nome_barbearia}</h2>
                                    <p>Endereço fictício da barbearia</p>
                                    <h5><i className="ri-store-2-line"></i> Aberto agora - <i className="ri-phone-line"></i> 82 996124145</h5>
                                </div>
                            </S.ResumeGroup>
                            <S.AgendarHorario onClick={() => ToAgendamento()}>Agendar Horário</S.AgendarHorario>
                        </S.BarbeariaResume>
                        <S.BarbeariaInfos>
                            <S.AboutUs>
                                <h3><i className="ri-information-line"></i> Sobre Nós</h3>
                                <p>Texto sobre a barbearia. {barbearia.descricao}</p>
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
                    < Agendamento modalIsOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} />
                </S.Container>
            ) : (
                <p>Carregando barbearia...</p>
            )}
        </div>
    );
};

export default PaginaBarbearia;
