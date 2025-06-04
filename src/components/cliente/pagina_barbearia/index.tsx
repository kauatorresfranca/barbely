import { useEffect, useState, useRef, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { Barbearia } from '../../../models/Barbearia'
import { Servico } from '../../../models/servico'
import { Cliente } from '../../../models/cliente'
import { useCliente } from '../../../hooks/useClienteAuth'
import Agendamento from '../agendamento'
import MeusAgendamentosModal from '../modals/meus_agendamentos'
import MinhaContaModal from '../modals/minha_conta'
import AuthModal from '../modals/auth_modal'
import * as S from './styles'
import logo from '../../../assets/images/logo.png'
import user from '../../../assets/images/user.png'
import { ClipLoader } from 'react-spinners'
import api from '../../../services/api'

const PaginaBarbearia = () => {
    const { cliente, loading, updateCliente } = useCliente()
    const { slug } = useParams()

    const [barbearia, setBarbearia] = useState<Barbearia | null>(null)
    const [horarios, setHorarios] = useState<
        { dia_semana: number; horario_abertura: string | null; horario_fechamento: string | null }[]
    >([])
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [authModalIsOpen, setAuthModalIsOpen] = useState(false)
    const [minhaContaModalIsOpen, setMinhaContaModalIsOpen] = useState(false)
    const [meusAgendamentosModalIsOpen, setMeusAgendamentosModalIsOpen] = useState(false)
    const [servicos, setServicos] = useState<Servico[]>([])
    const [endereco, setEndereco] = useState<string | null>(null)
    const [showDropdown, setShowDropdown] = useState(false)
    const [preview, setPreview] = useState<string | undefined>(undefined)
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
        const fetchBarbearia = async () => {
            try {
                const response = await fetch(`${api.baseURL}/barbearias/buscar-por-slug/${slug}/`)
                if (response.ok) {
                    const data = await response.json()
                    setBarbearia(data)

                    if (data.imagem) {
                        const isFullUrl =
                            data.imagem.startsWith('http') || data.imagem.startsWith('https')
                        setPreview(isFullUrl ? data.imagem : `${api.baseURL}${data.imagem}`)
                    } else {
                        setPreview(user) // Usar imagem padrão 'user' se não houver imagem
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
                    console.log('Horários recebidos:', data)
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

    const refreshToken = useCallback(async () => {
        const refreshToken = sessionStorage.getItem('refresh_token_cliente')
        if (refreshToken) {
            try {
                const response = await fetch(`${api.baseURL}/token/refresh/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ refresh: refreshToken }),
                })
                const data = await response.json()
                if (response.ok) {
                    sessionStorage.setItem('access_token_cliente', data.access)
                    window.dispatchEvent(new Event('storage'))
                    console.log('Token renovado com sucesso.')
                } else {
                    console.error('Falha ao renovar token:', data)
                    sessionStorage.removeItem('access_token_cliente')
                    sessionStorage.removeItem('refresh_token_cliente')
                    window.dispatchEvent(new Event('storage'))
                }
            } catch (error) {
                console.error('Erro ao renovar token:', error)
                sessionStorage.removeItem('access_token_cliente')
                sessionStorage.removeItem('refresh_token_cliente')
                window.dispatchEvent(new Event('storage'))
            }
        }
    }, [])

    useEffect(() => {
        if (cliente) {
            const checkToken = () => {
                const accessToken = sessionStorage.getItem('access_token_cliente')
                if (accessToken) {
                    const expiryTime = 4 * 60 * 1000
                    const interval = setInterval(() => {
                        refreshToken()
                    }, expiryTime)
                    return () => clearInterval(interval)
                }
            }
            checkToken()
        }
    }, [refreshToken, cliente])

    function ToAgendamento() {
        if (cliente) {
            setModalIsOpen(true)
        } else {
            setAuthModalIsOpen(true)
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

    const handleOpenAuthModal = () => {
        setAuthModalIsOpen(true)
    }

    const userImageSrc = cliente?.fotoPerfil
        ? cliente.fotoPerfil.startsWith('http') || cliente.fotoPerfil.startsWith('https')
            ? cliente.fotoPerfil
            : `${api.baseURL}${cliente.fotoPerfil}`
        : user // Usar imagem padrão 'user' se não houver fotoPerfil

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
                                            onError={(e) => {
                                                console.error(
                                                    'Erro ao carregar imagem do usuário:',
                                                    userImageSrc,
                                                )
                                                e.currentTarget.src = user // Fallback para 'user' em caso de erro
                                            }}
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
                                    <S.Button onClick={handleOpenAuthModal}>Login</S.Button>
                                ))}
                        </S.ButtonGroup>
                    </S.Header>
                    <S.BarbeariaProfile>
                        <S.BarbeariaResume>
                            <S.ResumeGroup>
                                <img
                                    src={preview}
                                    alt="logo barbearia"
                                    onError={(e) => {
                                        console.error('Erro ao carregar imagem da barbearia:', preview)
                                        e.currentTarget.src = user // Fallback para 'user' em caso de erro
                                    }}
                                />
                                <div>
                                    <h2>{barbearia.nome_barbearia}</h2>
                                    <p>
                                        {endereco ||
                                            'A barbearia ainda não tem um endereço configurado'}
                                    </p>
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
                                <p>
                                    {barbearia.descricao?.length > 0
                                        ? barbearia.descricao
                                        : 'A barbearia ainda não tem uma descrição configurada'}
                                </p>
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
                                {servicos.length > 0 ? (
                                    <S.ServicesList>
                                        {servicos.map((servico) => (
                                            <S.ServiceItem key={servico.id}>
                                                <S.ServiceName>
                                                    <i className="ri-scissors-fill tesoura"></i>
                                                    <div>
                                                        <h4>{servico.nome}</h4>
                                                        <p>{servico.duracao_minutos} min</p>
                                                    </div>
                                                </S.ServiceName>
                                                <p>R$ {servico.preco}</p>
                                            </S.ServiceItem>
                                        ))}
                                    </S.ServicesList>
                                ) : (
                                    <p>A barbearia ainda não tem serviços configurados</p>
                                )}
                            </S.Services>
                        </S.BarbeariaInfos>
                    </S.BarbeariaProfile>
                    <Agendamento
                        modalIsOpen={modalIsOpen}
                        onClose={() => setModalIsOpen(false)}
                        barbearia={barbearia}
                    />
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
                    <AuthModal
                        isOpen={authModalIsOpen}
                        onClose={() => setAuthModalIsOpen(false)}
                        onLoginSuccess={() => {
                            setAuthModalIsOpen(false)
                            window.location.reload()
                            setModalIsOpen(true)
                        }}
                    />
                </S.Container>
            ) : (
                <ClipLoader color="#00c1fe" size={32} speedMultiplier={1} />
            )}
        </div>
    )
}

export default PaginaBarbearia
