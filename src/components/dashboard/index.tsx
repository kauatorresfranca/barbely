import { useState } from 'react'
import { useBarbeariaAtual } from '../../hooks/useBarbeariaAtual'
import { useNavigate } from "react-router-dom"

import logobarbearia from '../../assets/images/logo_barbearia_exemplo.webp'
import logo from '.././../assets/images/logo.png'

import * as S from './styles'

// Importação dos componentes do dashboard
import Overview from '../sidebars/visaogeral/index'
import Agendamentos from '../sidebars/agendamentos/index'
import Clientes from '../sidebars/clientes/index'
import Profissionais from '../sidebars/profissionais/index'
import Financeiro from '../sidebars/financeiro/index'
import Servicos from '../sidebars/servicos/index'
import Configuracoes from '../sidebars/configuracoes/index'

const Dash = () => {
    const barbearia = useBarbeariaAtual();
    const [activeTab, setActiveTab] = useState('overview')
    const navigate = useNavigate()

    // Mapeamento de abas e seus componentes correspondentes
    const tabs = [
        { id: 'overview', label: 'Visão geral', icon: 'ri-dashboard-fill', component: <Overview /> },
        { id: 'agendamentos', label: 'Agendamentos', icon: 'ri-calendar-2-fill', component: <Agendamentos /> },
        { id: 'clientes', label: 'Clientes', icon: 'ri-team-fill', component: <Clientes /> },
        { id: 'profissionais', label: 'Profissionais', icon: 'ri-nurse-fill', component: <Profissionais /> },
        { id: 'financeiro', label: 'Financeiro', icon: 'ri-bank-card-fill', component: <Financeiro /> },
        { id: 'servicos', label: 'Serviços', icon: 'ri-scissors-fill', component: <Servicos /> },
        { id: 'configuracoes', label: 'Configurações', icon: 'ri-settings-3-fill', component: <Configuracoes /> },
    ]

        // função para fazer logout
        const handleLogout = () => {
            sessionStorage.removeItem("access_token");
            sessionStorage.removeItem("refresh_token");
            navigate("/login"); // Redirecionando para login
        }

    return (
        <S.Container>
            <S.SideBar>
                <S.BarberProfile>
                    <img id='logo_barberly' src={logo} alt="Barberly" />
                </S.BarberProfile>
                <nav>
                    <S.SidebarList>
                        {tabs.map(tab => (
                            <li key={tab.id}>
                                <button 
                                    className={activeTab === tab.id ? 'active' : ''}
                                    onClick={() => setActiveTab(tab.id)}
                                >
                                    <i className={tab.icon}></i> {tab.label}
                                </button>
                            </li>
                        ))}
                        <li className='logout'>
                            <button onClick={handleLogout}>
                                <i className="ri-logout-box-line"></i> 
                                Sair
                            </button>
                        </li>
                    </S.SidebarList>
                </nav>
            </S.SideBar>
            <S.Content>
                <S.Header>
                    <S.Profile>
                        <img src={logobarbearia} alt="logo da barbearia" />
                        <div>
                            <p>{barbearia?.nome_barbearia}</p>
                        </div>
                    </S.Profile>
                </S.Header>
                {tabs.find(tab => tab.id === activeTab)?.component}
            </S.Content>
        </S.Container>
    );
};

export default Dash
