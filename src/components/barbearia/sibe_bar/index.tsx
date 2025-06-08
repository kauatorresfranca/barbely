import { useEffect, useState, useRef } from 'react'
import { useBarbeariaAtual } from '../../../hooks/useBarbeariaAtual'
import { useNavigate } from 'react-router-dom'
import { toZonedTime } from 'date-fns-tz'
import { getDay, format } from 'date-fns'

import Overview from '../sidebars/visaogeral/index'
import Agendamentos from '../sidebars/agendamentos/index'
import Clientes from '../sidebars/clientes/index'
import Profissionais from '../sidebars/profissionais/index'
import Financeiro from '../sidebars/financeiro/index'
import Servicos from '../sidebars/servicos/index'
import PerfilBarbearia from '../sidebars/perfil_barbearia/index'
import Configuracoes from '../sidebars/configuracoes/index'
import api from '../../../services/api'
import { authFetch } from '../../../utils/authFetch'
import { Toast } from '../../toast'

import * as S from './styles'

import logo from '../../../assets/images/logo.png'
import user from '../../../assets/images/user.png'
import { ClipLoader } from 'react-spinners'

interface Horario {
    dia_semana: number
    horario_abertura: string | null
    horario_fechamento: string | null
    id?: number
    fechado?: boolean
}

const Dash = () => {
    const barbearia = useBarbeariaAtual()
    const navigate = useNavigate()
    const slug = barbearia?.slug

    console.log('Barbearia atual:', barbearia)

    const [activeTab, setActiveTab] = useState(() => {
        const savedTab = sessionStorage.getItem('activeTab')
        return savedTab || 'overview'
    })
    const [preview, setPreview] = useState<string | null>(null)
    const [logoIsLoading, setLogoIsLoading] = useState<boolean>(true)
    const [barbeariaIsOpen, setBarbeariaIsOpen] = useState(false)
    const [horarios, setHorarios] = useState<Horario[]>([])
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [manualStatus, setManualStatus] = useState<'auto' | 'open' | 'closed'>('auto')
    const [showDropdown, setShowDropdown] = useState(false)
    const [toastMessage, setToastMessage] = useState<string>('')
    const [showToast, setShowToast] = useState<boolean>(false)

    const dropdownRef = useRef<HTMLDivElement>(null)

    const fetchHorarios = async () => {
        try {
            const token = sessionStorage.getItem('access_token_barbearia')
            const response = await authFetch(`${api.baseURL}/horarios/?slug=${slug}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
            })
            if (!response.ok) {
                throw new Error('Erro ao buscar horários')
            }
            const data = await response.json()
            console.log('Horários recebidos:', data)
            setHorarios(data)
        } catch (error) {
            const err = error as Error
            console.error('Erro ao buscar horários:', err)
            setToastMessage(err.message || 'Erro ao buscar horários da barbearia.')
            setShowToast(true)
        }
    }

    useEffect(() => {
        const fetchBarbearia = async () => {
            try {
                const response = await authFetch(
                    `${api.baseURL}/barbearias/buscar-por-slug/${slug}/`,
                )
                const data = await response.json()
                console.log('dados do buscar por slug:', data)
                if (data.imagem) {
                    setPreview(data.imagem)
                }
            } catch (error) {
                const err = error as Error
                console.error('Erro ao buscar barbearia:', err)
                setToastMessage(err.message || 'Erro ao buscar dados da barbearia.')
                setShowToast(true)
            } finally {
                setLogoIsLoading(false)
            }
        }

        if (slug) fetchBarbearia()
    }, [slug])

    useEffect(() => {
        if (slug) fetchHorarios()
    }, [slug])

    useEffect(() => {
        const isBarbeariaAberta = () => {
            const agora = new Date()
            const agoraZoned = toZonedTime(agora, 'America/Sao_Paulo')
            const diaAtual = getDay(agoraZoned)
            const horaAtual = format(agoraZoned, 'HH:mm')

            const horarioHoje = horarios.find((h) => h.dia_semana === diaAtual)

            if (!horarioHoje || !horarioHoje.horario_abertura || !horarioHoje.horario_fechamento) {
                setBarbeariaIsOpen(false)
                return
            }

            const isAberta =
                horaAtual >= horarioHoje.horario_abertura.slice(0, 5) &&
                horaAtual <= horarioHoje.horario_fechamento.slice(0, 5)

            switch (manualStatus) {
                case 'auto':
                    setBarbeariaIsOpen(isAberta)
                    break
                case 'open':
                    setBarbeariaIsOpen(true)
                    break
                case 'closed':
                    setBarbeariaIsOpen(false)
                    break
            }
        }

        if (horarios.length > 0) {
            isBarbeariaAberta()
            const interval = setInterval(isBarbeariaAberta, 60000)
            return () => clearInterval(interval)
        }
    }, [horarios, manualStatus])

    const updateManualStatus = async (status: 'auto' | 'open' | 'closed') => {
        const diaAtual = getDay(toZonedTime(new Date(), 'America/Sao_Paulo'))
        await fetchHorarios()
        const horario = horarios.find((h) => h.dia_semana === diaAtual)
        if (!horario || !horario.id) {
            setToastMessage('Horário do dia atual não encontrado ou ID inválido.')
            setShowToast(true)
            return
        }

        try {
            const token = sessionStorage.getItem('access_token_barbearia')
            if (!token) {
                setToastMessage('Token de autenticação não encontrado. Faça login novamente.')
                setShowToast(true)
                handleLogout()
                return
            }

            const fechado = status === 'closed' ? true : status === 'open' ? false : horario.fechado
            const horarioAbertura = fechado ? null : horario.horario_abertura || '08:00:00'
            const horarioFechamento = fechado ? null : horario.horario_fechamento || '18:00:00'

            if (!fechado && (!horarioAbertura || !horarioFechamento)) {
                setToastMessage(
                    'Horários de abertura e fechamento não podem ser nulos quando o dia está aberto.',
                )
                setShowToast(true)
                return
            }

            const payload = {
                fechado: Boolean(fechado),
                horario_abertura: horarioAbertura,
                horario_fechamento: horarioFechamento,
            }
            console.log(`Enviando PATCH para o horário com ID ${horario.id}, payload:`, payload)

            const response = await authFetch(`${api.baseURL}/horarios/${horario.id}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            })

            if (!response.ok) {
                const errorData = await response.json()
                console.error('Erro na resposta do PATCH:', errorData)
                throw new Error(`Erro ao atualizar status: ${JSON.stringify(errorData)}`)
            }

            setManualStatus(status)
            setToastMessage('Status da barbearia atualizado com sucesso!')
            setShowToast(true)
            await fetchHorarios()
        } catch (error) {
            const err = error as Error
            console.error('Erro ao atualizar status:', err)
            setToastMessage(err.message || 'Erro ao atualizar o status da barbearia.')
            setShowToast(true)
            await fetchHorarios()
        }
    }

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current) {
                const target = event.target as Node
                const path = event.composedPath ? event.composedPath() : []
                const isClickInside =
                    dropdownRef.current.contains(target) || path.includes(dropdownRef.current)

                if (!isClickInside) {
                    setShowDropdown(false)
                }
            }
        }

        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [])

    useEffect(() => {
        sessionStorage.setItem('activeTab', activeTab)
    }, [activeTab])

    const tabs = [
        {
            id: 'overview',
            label: 'Visão geral',
            icon: 'ri-dashboard-fill',
            component: <Overview />,
        },
        {
            id: 'agendamentos',
            label: 'Agendamentos',
            icon: 'ri-calendar-2-fill',
            component: <Agendamentos />,
        },
        { id: 'clientes', label: 'Clientes', icon: 'ri-team-fill', component: <Clientes /> },
        {
            id: 'profissionais',
            label: 'Profissionais',
            icon: 'ri-nurse-fill',
            component: <Profissionais />,
        },
        { id: 'servicos', label: 'Serviços', icon: 'ri-scissors-fill', component: <Servicos /> },
        {
            id: 'financeiro',
            label: 'Financeiro',
            icon: 'ri-bank-card-fill',
            component: <Financeiro />,
        },
        {
            id: 'perfil_da_barbearia',
            label: 'Perfil da Barbearia',
            icon: 'ri-store-2-line',
            component: <PerfilBarbearia />,
        },
        {
            id: 'configuracoes',
            label: 'Configurações',
            icon: 'ri-settings-3-fill',
            component: <Configuracoes />,
        },
    ]

    const handleLogout = () => {
        sessionStorage.removeItem('access_token_barbearia')
        sessionStorage.removeItem('refresh_token_barbearia')
        sessionStorage.removeItem('activeTab')
        navigate('/login')
    }

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    return (
        <S.Container>
            <S.HamburgerButton onClick={toggleSidebar}>
                <i className={isSidebarOpen ? 'ri-close-line' : 'ri-menu-line'}></i>
            </S.HamburgerButton>

            <S.SideBar isOpen={isSidebarOpen}>
                <S.BarberProfile>
                    <img id="logo_barberly" src={logo} alt="Barberly" />
                </S.BarberProfile>
                <S.Profile>
                    {logoIsLoading ? (
                        <S.LoadingContainer>
                            <ClipLoader color="#00c1fe" size={32} speedMultiplier={1} />
                        </S.LoadingContainer>
                    ) : (
                        <img src={preview || user} alt="logo da barbearia" />
                    )}
                    <div>
                        <h3>{barbearia?.nome_barbearia}</h3>
                        <S.Activity ref={dropdownRef} onClick={toggleDropdown}>
                            <div>
                                <span className={barbeariaIsOpen ? 'open' : 'closed'}></span>
                                <p>{barbeariaIsOpen ? 'Aberto Agora' : 'Fechado Agora'}</p>
                            </div>
                            <i className="ri-arrow-down-s-line"></i>
                            <S.DropdownMenu className={showDropdown ? 'active' : ''}>
                                <S.StatusContainer>
                                    <h4>Altere Sua Atividade</h4>
                                    <p>Escolha o modo de operação da barbearia para o dia atual.</p>
                                    <S.StatusSelect
                                        value={manualStatus}
                                        onChange={(e) => {
                                            updateManualStatus(
                                                e.target.value as 'auto' | 'open' | 'closed',
                                            )
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <option value="auto">Automático</option>
                                        <option value="open">Aberto</option>
                                        <option value="closed">Fechado</option>
                                    </S.StatusSelect>
                                </S.StatusContainer>
                            </S.DropdownMenu>
                        </S.Activity>
                    </div>
                </S.Profile>
                {showToast && <Toast message={toastMessage} onClose={() => setShowToast(false)} />}
                <nav>
                    <S.SidebarList>
                        {tabs.map((tab) => (
                            <li key={tab.id}>
                                <button
                                    className={activeTab === tab.id ? 'active' : ''}
                                    onClick={() => {
                                        setActiveTab(tab.id)
                                        setIsSidebarOpen(false)
                                    }}
                                >
                                    <i className={tab.icon}></i> {tab.label}
                                </button>
                            </li>
                        ))}
                        <li className="logout">
                            <button onClick={handleLogout}>
                                <i className="ri-logout-box-line"></i>
                                Sair
                            </button>
                        </li>
                    </S.SidebarList>
                </nav>
            </S.SideBar>
            <S.Content>{tabs.find((tab) => tab.id === activeTab)?.component}</S.Content>
        </S.Container>
    )
}

export default Dash
