import { useState } from 'react'
import Planos from '../../sub_sidebars/financeiro/planos'
import MetodosPagamentos from '../../sub_sidebars/financeiro/metodos_de_pagamento'
import Custos from '../../sub_sidebars/financeiro/custos'

import * as S from './styles'

const Financeiro = () => {
    const [activeTab, setActiveTab] = useState('metodos_de_pagamento')

    const tabs = [
        {
            id: 'metodos_de_pagamento',
            title: 'Metodos de Pagamento',
            icon_right: 'ri-arrow-right-s-line',
            component: <MetodosPagamentos />,
        },
        {
            id: 'custos',
            title: 'Custos',
            icon_right: 'ri-arrow-right-s-line',
            component: <Custos />,
        },
        {
            id: 'planos',
            title: 'Planos',
            icon_right: 'ri-arrow-right-s-line',
            component: <Planos />,
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
