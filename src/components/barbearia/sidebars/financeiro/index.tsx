import { useState } from 'react'
import Planos from '../../sub_sidebars/planos'
import Faturamento from '../../sub_sidebars/faturamento'
import * as S from './styles'

const Financeiro = () => {
    const [activeTab, setActiveTab] = useState('planos')

    const tabs = [
        {
            id: 'planos',
            title: 'Planos',
            icon_left: 'ri-shake-hands-fill',
            icon_right: 'ri-arrow-right-s-line',
            component: <Planos />,
        },
        {
            id: 'faturamento',
            title: 'Faturamento',
            icon_left: 'ri-bank-line',
            icon_right: 'ri-arrow-right-s-line',
            component: <Faturamento />,
        },
    ]

    return (
        <S.Container>
            <h2>Financeiro</h2>
            <p className="subtitle">
                Acompanhe seus ganhos, pagamentos recebidos e tenha controle total sobre a parte
                financeira da sua barbearia.
            </p>
            <S.Financeiro>
                <S.SiderBarPerfil>
                    {tabs.map((tab) => (
                        <S.Tab
                            key={tab.id}
                            className={activeTab === tab.id ? 'active' : ''}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <i className={`${tab.icon_left} icon_left`}></i>
                            <h3>{tab.title}</h3>
                            <i className={`${tab.icon_right} icon_right`}></i>
                        </S.Tab>
                    ))}
                </S.SiderBarPerfil>
                <S.Content>{tabs.find((tab) => tab.id === activeTab)?.component}</S.Content>
            </S.Financeiro>
        </S.Container>
    )
}

export default Financeiro
