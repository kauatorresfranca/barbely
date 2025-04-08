import * as S from './styles'
import { useState } from 'react';
import Planos from '../../planos';

const Financeiro = () => {
    const [activeTab, setActiveTab] = useState('planos')

    const tabs = [
        { id: 'planos', title: 'Planos', icon_left: 'ri-shake-hands-fill', icon_right: 'ri-arrow-right-s-line', component: <Planos /> },
        { id: 'faturamento', title: 'Faturamento', icon_left: 'ri-bank-line', icon_right: 'ri-arrow-right-s-line', component: 'faturamento' },
    
    ]
    return (
        <S.Container>
            <h2>Financeiro</h2>
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

export default Financeiro