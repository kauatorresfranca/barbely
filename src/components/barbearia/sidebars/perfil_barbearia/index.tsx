import { useState } from 'react'

import HorarioFuncionamentoForm from '../../sub_sidebars/formulario_horarios_funcionamento'
import CompartilharBarbearia from '../../sub_sidebars/compartilhar_barbearia'
import DadosBarbearia from '../../sub_sidebars/formulario_informacoes'
import Localizacao from '../../sub_sidebars/formulario_endereco'

import * as S from './styles'

const PerfilBarbearia = () => {
    const [activeTab, setActiveTab] = useState('informacoes_da_barbearia')

    const tabs = [
        {
            id: 'informacoes_da_barbearia',
            title: 'Informações da Barbearia',
            icon_right: 'ri-arrow-right-s-line',
            component: <DadosBarbearia />,
        },
        {
            id: 'localizacao',
            title: 'Localização da Barbearia',
            icon_right: 'ri-arrow-right-s-line',
            component: <Localizacao />,
        },
        {
            id: 'horario_de_funcionamento',
            title: 'Horários de Funcionamento',
            icon_right: 'ri-arrow-right-s-line',
            component: <HorarioFuncionamentoForm />,
        },
        {
            id: 'compartilhar_barbearia',
            title: 'Compartilhar Barbearia',
            icon_right: 'ri-arrow-right-s-line',
            component: <CompartilharBarbearia />,
        },
    ]
    return (
        <S.Container>
            <h2>Perfil da Barbearia</h2>
            <p className="subtitle">
                Atualize as informações principais da sua barbearia, como nome, logo, descrição e
                identidade visual.
            </p>
            <S.PerfilBarbearia>
                <S.SiderBarPerfil>
                    {tabs.map((tab) => (
                        <S.Tab
                            className={activeTab === tab.id ? 'active' : ''}
                            id={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <h3>{tab.title}</h3>
                            <i className={`${tab.icon_right} icon_right`}></i>
                        </S.Tab>
                    ))}
                </S.SiderBarPerfil>
                {tabs.find((tab) => tab.id === activeTab)?.component}
            </S.PerfilBarbearia>
        </S.Container>
    )
}

export default PerfilBarbearia
