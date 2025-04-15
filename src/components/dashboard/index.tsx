import { useEffect, useState } from 'react'
import { useBarbeariaAtual } from '../../hooks/useBarbeariaAtual'
import { useNavigate } from "react-router-dom"

import logo from '.././../assets/images/logo.png'

import * as S from './styles'

// Importação dos componentes do dashboard
import Overview from '../sidebars/visaogeral/index'
import Agendamentos from '../sidebars/agendamentos/index'
import Clientes from '../sidebars/clientes/index'
import Profissionais from '../sidebars/profissionais/index'
import Financeiro from '../sidebars/financeiro/index'
import Servicos from '../sidebars/servicos/index'
import PerfilBarbearia from '../sidebars/perfil_barbearia/index'
import Configuracoes from '../sidebars/configuracoes/index'

const Dash = () => {
    const barbearia = useBarbeariaAtual()
    const slug = barbearia?.slug
    const [activeTab, setActiveTab] = useState('overview')
    const [preview, setPreview] = useState<string | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
            const fetchBarbearia = async () => {
                try {
                    const response = await fetch(`http://localhost:8000/api/barbearias/buscar-por-slug/${slug}/`)
                    const data = await response.json()

                    if (data.imagem) {
                        const isFullUrl = data.imagem.startsWith("http");
                        setPreview(isFullUrl ? data.imagem : `http://localhost:8000${data.imagem}`);
                        }

                } catch (error) {
                    console.error("Erro ao buscar barbearia:", error)
                }
            };

            if (slug) fetchBarbearia();
        }, [slug]);

    // Mapeamento de abas e seus componentes correspondentes
    const tabs = [
        { id: 'overview', label: 'Visão geral', icon: 'ri-dashboard-fill', component: <Overview /> },
        { id: 'agendamentos', label: 'Agendamentos', icon: 'ri-calendar-2-fill', component: <Agendamentos /> },
        { id: 'clientes', label: 'Clientes', icon: 'ri-team-fill', component: <Clientes /> },
        { id: 'profissionais', label: 'Profissionais', icon: 'ri-nurse-fill', component: <Profissionais /> },
        { id: 'financeiro', label: 'Financeiro', icon: 'ri-bank-card-fill', component: <Financeiro /> },
        { id: 'servicos', label: 'Serviços', icon: 'ri-scissors-fill', component: <Servicos /> },
        { id: 'perfil_da_barbearia', label: 'Perfil da Barbearia', icon: 'ri-store-2-line', component: <PerfilBarbearia /> },
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
                <S.Profile>
                        <img src={preview || "https://via.placeholder.com/150x150"} alt="logo da barbearia" />
                        <div>
                            <h3>{barbearia?.nome_barbearia}</h3>
                            <S.Activity >
                                <span></span>
                                <p>Aberto agora</p>
                                <i className="ri-arrow-down-s-line"></i>
                            </S.Activity>
                        </div>
                </S.Profile>
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
                {tabs.find(tab => tab.id === activeTab)?.component}
            </S.Content>
        </S.Container>
    );
};

export default Dash
