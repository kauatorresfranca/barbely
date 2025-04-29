import { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Barbearia } from '../../../models/Barbearia'
import { Servico } from '../../../models/servico'
import { Cliente } from '../../../models/cliente'
import { useCliente } from '../../../hooks/useClienteAuth'
import Agendamento from '../agendamento'
import MeusAgendamentosModal from '../modals/meus_agendamentos'
import MinhaContaModal from '../modals/minha_conta'
import * as S from './styles'
import logo from '../../../assets/images/logo.png'
import user from '../../../assets/images/user.png'
import { ClipLoader } from 'react-spinners'
import api from '../../../services/api'

const PaginaBarbearia = () => {
    const navigate = useNavigate()
    const { cliente, loading, updateCliente } = useCliente()
    const { slug } = useParams()

    const [barbearia, setBarbearia] = useState<Barbearia | null>(null)
    const [horarios, setHorarios] = useState<
        { dia_semana: number; horario_abertura: string | null; horario_fechamento: string | null }[]
    >([])
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [minhaContaModalIsOpen, setMinhaContaModalIsOpen] = useState(false)
    const [meusAgendamentosModalIsOpen, setMeusAgendamentosModalIsOpen] = useState(false)
    const [servicos, setServicos] = useState<Servico[]>([])
    const [endereco, setEndereco] = useState<string | null>(null)
    const [showDropdown, setShowDropdown] = useState(false)
    const [preview, setPreview] = useState<string | null>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const toggleDropdown = () => {
        setShowDropdown((prev) => !prev)
    }

    const diasSemana = [
        'Domingo',
        'Segunda Feira',
        'Terça Feira',
        'Quarta Feira',
        'Quinta Feira',
        'Sexta Feira',
        'Sábado',
    ]

    const isBarbeariaAberta = () => {
        const agora = new Date()
        const diaAtual = agora.getDay()
        const horaAtual =
            agora.getHours().toString().padStart(2, '0') +
            ':' +
            agora.getMinutes().toString().padStart(2, '0')

        const horarioHoje = horarios.find((h) => h.dia_semana === diaAtual)
        if (!horarioHoje || !horarioHoje.horario_abertura || !horarioHoje.horario_fechamento) {
            return false
        }

        return (
            horaAtual >= horarioHoje.horario_abertura.slice(0, 5) &&
            horaAtual <= horarioHoje.horario_fechamento.slice(0, 5)
        )
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                showDropdown
            ) {
                setShowDropdown(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [showDropdown])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [servicosRes] = await Promise.all([
                    fetch(`${api.baseURL}/servicos/?barbearia_slug=${slug}`),
                ])

                if (servicosRes.ok) {
                    setServicos(await servicosRes.json())
                } else {
                    console.error(
                        'Erro ao buscar serviços:',
                        servicosRes.status,
                        servicosRes.statusText,
                    )
                }
            } catch (error) {
                console.error('Erro ao buscar dados:', error)
            }
        }

        fetchData()
    }, [slug])

    useEffect(() => {
        const fetchEndereco = async () => {
            try {
                const response = await fetch(`${api.baseURL}/endereco-barbearia-publico/${slug}/`)
                if (response.ok) {
                    const data = await response.json()
                    const enderecoFormatado = `${data.endereco}, ${data.numero} - ${data.bairro}, ${data.cidade} - ${data.estado}, ${data.cep}`
                    setEndereco(enderecoFormatado)
                } else {
                    console.error('Erro ao buscar endereço:', response.status, response.statusText)
                }
            } catch (error) {
                console.error('Erro ao buscar endereço:', error)
            }
        }

        if (slug) {
            fetchEndereco()
        }
    }, [slug])

    useEffect(() => {
        if (barbearia) {
            console.log('Descrição da barbearia:', barbearia)
        }
    }, [barbearia])

    useEffect(() => {
        const fetchBarbearia = async () => {
            try {
                const response = await fetch(`${api.baseURL}/barbearias/buscar-por-slug/${slug}/`)
                if (response.ok) {
                    const data = await response.json()
                    setBarbearia(data)

                    if (data.imagem) {
                        const isFullUrl = data.imagem.startsWith('http')
                        setPreview(isFullUrl ? data.imagem : `http://localhost:8000${data.imagem}`)
                    }
                } else {
                    console.error('Erro ao buscar barbearia:', response.status, response.statusText)
                }
            } catch (error) {
                console.error('Erro ao buscar barbearia:', error)
            }
        }

        if (slug) fetchBarbearia()
    }, [slug])

    useEffect(() => {
        const fetchHorarios = async () => {
            try {
                const response = await fetch(`${api.baseURL}/horarios/?slug=${slug}`)
                if (response.ok) {
                    const data = await response.json()
                    console.log('Horários recebidos:', data) // Debug log to inspect the fetched data
                    setHorarios(data)
                } else {
                    console.error('Erro ao buscar horários:', response.status, response.statusText)
                }
            } catch (error) {
                console.error('Erro ao buscar horários:', error)
            }
        }

        if (slug) fetchHorarios()
    }, [slug])

    function ToAgendamento() {
        if (cliente) {
            setModalIsOpen(true)
        } else {
            navigate(`/barbearia/${slug}/login`)
        }
    }

    const handleLogout = () => {
        sessionStorage.removeItem('access_token_cliente')
        sessionStorage.removeItem('refresh_token_cliente')
        window.location.reload()
    }

    const handleUpdateCliente = (updatedCliente: Cliente) => {
        console.log('Atualizando cliente no pai:', updatedCliente)
        updateCliente(updatedCliente)
        setMinhaContaModalIsOpen(false)
    }

    const userImageSrc = cliente?.fotoPerfil
        ? cliente.fotoPerfil.startsWith('http')
            ? cliente.fotoPerfil
            : `http://localhost:8000${cliente.fotoPerfil}`
        : user

    return (
        <div>
            {barbearia ? (
                <S.Container>
                    <S.Header>
                        <img src={logo} alt="logo barberly" />
                        <S.ButtonGroup>
                            {!loading &&
                                (cliente ? (
                                    <S.UserResume ref={dropdownRef} onClick={toggleDropdown}>
                                        <img
                                            src={userImageSrc}
                                            alt="Foto do usuário"
                                            onError={() =>
                                                console.error(
                                                    'Erro ao carregar imagem do usuário:',
                                                    userImageSrc,
                                                )
                                            }
                                        />
                                        <p>
                                            <span>Olá,</span> {cliente?.user?.nome?.split(' ')[0]}
                                        </p>
                                        <i className="ri-arrow-down-s-line"></i>
                                        <S.DropdownMenu className={showDropdown ? 'active' : ''}>
                                            <li onClick={() => setMinhaContaModalIsOpen(true)}>
                                                Minha Conta
                                            </li>
                                            <li
                                                onClick={() => setMeusAgendamentosModalIsOpen(true)}
                                            >
                                                Meus Agendamentos
                                            </li>
                                            <li onClick={handleLogout}>
                                                <i className="ri-logout-box-line"></i> Sair
                                            </li>
                                        </S.DropdownMenu>
                                    </S.UserResume>
                                ) : (
                                    <S.Button to={`/barbearia/${slug}/login`}>Login</S.Button>
                                ))}
                        </S.ButtonGroup>
                    </S.Header>
                    <S.BarbeariaProfile>
                        <S.BarbeariaResume>
                            <S.ResumeGroup>
                                <img
                                    src={preview || 'https://via.placeholder.com/150x150'}
                                    alt="logo barbearia"
                                />
                                <div>
                                    <h2>{barbearia.nome_barbearia}</h2>
                                    <p>{endereco || 'Endereço não disponível'}</p>
                                    <h5>
                                        <i className="ri-store-2-line"></i>{' '}
                                        {isBarbeariaAberta() ? (
                                            <span className="aberto">Aberto</span>
                                        ) : (
                                            <span className="fechado">Fechado</span>
                                        )}{' '}
                                        - <i className="ri-phone-line"></i> {barbearia.telefone}
                                    </h5>
                                </div>
                            </S.ResumeGroup>
                            <S.AgendarHorario onClick={() => ToAgendamento()}>
                                Agendar Horário
                            </S.AgendarHorario>
                        </S.BarbeariaResume>
                        <S.BarbeariaInfos>
                            <S.AboutUs>
                                <h3>
                                    <i className="ri-information-line"></i> Sobre Nós
                                </h3>
                                <p>{barbearia.descricao}</p>
                            </S.AboutUs>
                            <S.Hours>
                                <h3>
                                    <i className="ri-time-line"></i> Horários
                                </h3>
                                <S.TableHours>
                                    {diasSemana.map((dia, index) => {
                                        const horario = horarios.find((h) => h.dia_semana === index)
                                        return (
                                            <S.Day key={index}>
                                                <p>{dia}</p>
                                                <p>
                                                    {horario?.horario_abertura &&
                                                    horario?.horario_fechamento
                                                        ? `${horario.horario_abertura.slice(
                                                              0,
                                                              5,
                                                          )} - ${horario.horario_fechamento.slice(
                                                              0,
                                                              5,
                                                          )}`
                                                        : 'Fechado'}
                                                </p>
                                            </S.Day>
                                        )
                                    })}
                                </S.TableHours>
                            </S.Hours>
                            <S.Services>
                                <h3>
                                    <i className="ri-scissors-2-fill"></i> Serviços
                                </h3>
                                <S.ServicesList>
                                    {servicos.map((servico) => (
                                        <S.Service key={servico.id}>
                                            <div>
                                                <h4>{servico.nome}</h4>
                                                <p>{servico.duracao_minutos} min</p>
                                            </div>
                                            <p>R$ {servico.preco}</p>
                                        </S.Service>
                                    ))}
                                </S.ServicesList>
                            </S.Services>
                        </S.BarbeariaInfos>
                    </S.BarbeariaProfile>
                    <Agendamento modalIsOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} />
                    {minhaContaModalIsOpen && (
                        <MinhaContaModal
                            onClose={() => setMinhaContaModalIsOpen(false)}
                            cliente={cliente}
                            updateCliente={handleUpdateCliente}
                        />
                    )}
                    {meusAgendamentosModalIsOpen && (
                        <MeusAgendamentosModal
                            onClose={() => setMeusAgendamentosModalIsOpen(false)}
                            cliente={cliente}
                        />
                    )}
                </S.Container>
            ) : (
                <ClipLoader color="#00c1fe" size={32} speedMultiplier={1} />
            )}
        </div>
    )
}

export default PaginaBarbearia
