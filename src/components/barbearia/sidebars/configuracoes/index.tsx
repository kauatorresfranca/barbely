import Personalizar from '../../sub_sidebars/personalizar'
import ConfiguracoesAgendamento from '../../sub_sidebars/configuracoes_agendamento'
import * as S from './styles'
import { useState } from 'react'

const Configuracoes = () => {
    const [activeTab, setActiveTab] = useState('Configuracoes_agendamento')

    const tabs = [
        { id: 'Configuracoes_agendamento', title: 'Configurações de Agendamento', icon_left: 'ri-list-settings-line', icon_right: 'ri-arrow-right-s-line', component: <ConfiguracoesAgendamento /> },
        { id: 'personalizar', title: 'Personalizar', icon_left: 'ri-palette-fill', icon_right: 'ri-arrow-right-s-line', component: <Personalizar /> },
    ]
    return (
        <S.Container>
            <h2>Configurações</h2>
            <p className="subtitle">Personalize preferências da sua conta, notificações, planos e outras opções da barbearia.</p>
            <S.Financeiro>
                <S.SiderBarPerfil>
                        {tabs.map((tab) => (
                            <S.Tab className={activeTab === tab.id ? 'active' : ''} id={tab.id} onClick={() => setActiveTab(tab.id)}>
                                <i className={`${tab.icon_left} icon_left`}></i>
                                <h3>{tab.title}</h3>
                                <i className={`${tab.icon_right} icon_right`}></i>
                            </S.Tab>
                        ))}
                </S.SiderBarPerfil>
                {tabs.find(tab => tab.id === activeTab)?.component}
            </S.Financeiro>
        </S.Container>

    )
}

export default Configuracoes
