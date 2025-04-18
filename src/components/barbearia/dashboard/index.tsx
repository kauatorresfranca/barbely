import { useEffect, useState } from 'react'
import { useBarbeariaAtual } from '../../../hooks/useBarbeariaAtual'
import { useNavigate } from 'react-router-dom'
import { toZonedTime } from 'date-fns-tz' // Para lidar com fusos horários
import { getDay, format } from 'date-fns' // Para manipulação de datas

// Importação dos componentes do dashboard
import Overview from '../sidebars/visaogeral/index'
import Agendamentos from '../sidebars/agendamentos/index'
import Clientes from '../sidebars/clientes/index'
import Profissionais from '../sidebars/profissionais/index'
import Financeiro from '../sidebars/financeiro/index'
import Servicos from '../sidebars/servicos/index'
import PerfilBarbearia from '../sidebars/perfil_barbearia/index'
import Configuracoes from '../sidebars/configuracoes/index'
import { authFetch } from '../../../utils/authFetch'

import * as S from './styles'

import logo from '../../../assets/images/logo.png'

const Dash = () => {
    const barbearia = useBarbeariaAtual()
    const navigate = useNavigate()
    const slug = barbearia?.slug

    const [activeTab, setActiveTab] = useState('overview')
    const [preview, setPreview] = useState<string | null>(null)
    const [barbeariaIsOpen, setBarbeariaIsOpen] = useState<boolean>(false)
    const [horarios, setHorarios] = useState<
        { dia_semana: number; horario_abertura: string; horario_fechamento: string }[]
    >([])

    // Buscar a imagem da barbearia
    useEffect(() => {
        const fetchBarbearia = async () => {
            try {
                const response = await authFetch(
                    `http://localhost:8000/api/barbearias/buscar-por-slug/${slug}/`,
                )
                const data = await response.json()

                if (data.imagem) {
                    const isFullUrl = data.imagem.startsWith('http')
                    setPreview(isFullUrl ? data.imagem : `http://localhost:8000${data.imagem}`)
                }
            } catch (error) {
                console.error('Erro ao buscar barbearia:', error)
            }
        }

        if (slug) fetchBarbearia()
    }, [slug])

    // Buscar os horários da barbearia
    useEffect(() => {
        const fetchHorarios = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/horarios/?slug=${slug}`)
                if (!response.ok) {
                    throw new Error('Erro ao buscar horários')
                }
                const data = await response.json()
                setHorarios(data)
                console.log('Horários recebidos:', data) // Depuração
            } catch (error) {
                console.error('Erro ao buscar horários:', error)
            }
        }

        if (slug) fetchHorarios()
    }, [slug])

    // Verificar se a barbearia está aberta
    useEffect(() => {
        const isBarbeariaAberta = () => {
            // Obter a data atual
            const agora = new Date()
            console.log('Data antes do ajuste (local):', agora.toISOString()) // Depuração: data no fuso horário local
            console.log('Fuso horário local:', Intl.DateTimeFormat().resolvedOptions().timeZone) // Depuração: fuso horário do navegador

            // Converter para o fuso horário da barbearia
            const agoraZoned = toZonedTime(agora, 'America/Sao_Paulo')
            console.log('Data após ajuste (America/Sao_Paulo):', agoraZoned.toISOString()) // Depuração: data ajustada

            const diaAtual = getDay(agoraZoned) // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
            const horaAtual = format(agoraZoned, 'HH:mm') // Formato HH:mm (ex.: "14:30")

            console.log('Fuso horário ajustado:', 'America/Sao_Paulo')
            console.log('Dia atual (0-6):', diaAtual)
            console.log(
                'Data ajustada (formato legível):',
                format(agoraZoned, 'dd/MM/yyyy HH:mm:ss'),
            ) // Depuração: data ajustada formatada
            console.log('Hora atual:', horaAtual)

            const horarioHoje = horarios.find((h) => h.dia_semana === diaAtual)
            console.log('Horário de hoje:', horarioHoje)

            if (!horarioHoje || !horarioHoje.horario_abertura || !horarioHoje.horario_fechamento) {
                setBarbeariaIsOpen(false)
                return
            }

            const isAberta =
                horaAtual >= horarioHoje.horario_abertura.slice(0, 5) &&
                horaAtual <= horarioHoje.horario_fechamento.slice(0, 5)
            setBarbeariaIsOpen(isAberta)
            console.log('Barbearia aberta?', isAberta)
        }

        if (horarios.length > 0) {
            isBarbeariaAberta()
            const interval = setInterval(isBarbeariaAberta, 60000) // Atualizar a cada minuto
            return () => clearInterval(interval)
        }
    }, [horarios])

    // Mapeamento de abas e seus componentes correspondentes
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
        {
            id: 'financeiro',
            label: 'Financeiro',
            icon: 'ri-bank-card-fill',
            component: <Financeiro />,
        },
        { id: 'servicos', label: 'Serviços', icon: 'ri-scissors-fill', component: <Servicos /> },
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

    // Função para fazer logout
    const handleLogout = () => {
        sessionStorage.removeItem('access_token_barbearia')
        sessionStorage.removeItem('refresh_token_barbearia')
        navigate('/login') // Redirecionando para login
    }

    return (
        <S.Container>
            <S.SideBar>
                <S.BarberProfile>
                    <img id="logo_barberly" src={logo} alt="Barberly" />
                </S.BarberProfile>
                <S.Profile>
                    <img
                        src={preview || 'https://via.placeholder.com/150x150'}
                        alt="logo da barbearia"
                    />
                    <div>
                        <h3>{barbearia?.nome_barbearia}</h3>
                        <S.Activity>
                            <div>
                                <>
                                    <span className={barbeariaIsOpen ? 'open' : 'closed'}></span>
                                    <p>{barbeariaIsOpen ? 'Aberto Agora' : 'Fechado Agora'}</p>
                                </>
                            </div>
                            <i className="ri-arrow-down-s-line"></i>
                        </S.Activity>
                    </div>
                </S.Profile>
                <nav>
                    <S.SidebarList>
                        {tabs.map((tab) => (
                            <li key={tab.id}>
                                <button
                                    className={activeTab === tab.id ? 'active' : ''}
                                    onClick={() => setActiveTab(tab.id)}
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
