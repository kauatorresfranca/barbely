import * as S from './styles'
import HorarioFuncionamentoForm from '../../formularios/perfil_da_barbearia/formulario_horarios_funcionamento';
import CompartilharBarbearia from '../../sub_sidebars/compartilhar_barbearia'
import { useState } from 'react';
import DadosBarbearia from '../../formularios/perfil_da_barbearia/formulario_informacoes';
import Localizacao from '../../formularios/perfil_da_barbearia/formulario_localizacao';

const PerfilBarbearia = () => {
    const [activeTab, setActiveTab] = useState('informacoes_da_barbearia')

    const tabs = [
        { id: 'informacoes_da_barbearia', title: 'Informações da Barbearia', icon_left: 'ri-article-fill', icon_right: 'ri-arrow-right-s-line', component: <DadosBarbearia /> },
        { id: 'localizacao', title: 'Localização da Barbearia', icon_left: 'ri-map-pin-fill', icon_right: 'ri-arrow-right-s-line', component: <Localizacao /> },
        { id: 'horario_de_funcionamento', title: 'Horários de Funcionamento', icon_left: 'ri-time-line', icon_right: 'ri-arrow-right-s-line', component: <HorarioFuncionamentoForm /> },
        { id: 'compartilhar_barbearia', title: 'Compartilhar Barbearia', icon_left: 'ri-share-circle-line', icon_right: 'ri-arrow-right-s-line', component: <CompartilharBarbearia /> }
    ]
    return (
        <S.Container>
            <h2>Perfil da Barbearia</h2>
            <S.PerfilBarbearia>
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
            </S.PerfilBarbearia>
        </S.Container>
        
    )
}

export default PerfilBarbearia