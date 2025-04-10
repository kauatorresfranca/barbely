import { useState } from 'react'
import * as S from './styles'
import HorariosStep from '../agendamento_steps/second_step'
import FirstStep from '../agendamento_steps/first_step'
import ConfirmacaoStep from '../agendamento_steps/confirmacao'

type Props = {
    modalIsOpen: boolean
    onClose?: () => void
}

type AgendamentoData = {
    servicoId: number
    funcionarioId: number | null
}

const Agendamento = ({ modalIsOpen, onClose }: Props) => {
    const [activeTab, setActiveTab] = useState('servico')
    const [agendamentoData, setAgendamentoData] = useState<AgendamentoData | null>(null)

    const handleSetActiveTab = (tab: string, data?: AgendamentoData) => {
        if (data) {
            setAgendamentoData(data)
        }
        setActiveTab(tab)
    }

    if (!modalIsOpen) return null

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget && onClose) {
            onClose()
        }
    }

    return (
        <S.Overlay onClick={handleOverlayClick}>
            <S.Modal>
                <S.CloseButton onClick={onClose}>×</S.CloseButton>
                <h2>Agende sua sessão</h2>
                <S.Etapas>
                    {['servico', 'horarios', 'dia'].map((id, index) => (
                        <span key={index} className={id === activeTab ? 'active' : ''}></span>
                    ))}
                </S.Etapas>
                <S.Step className="active" id={activeTab}>
                    {activeTab === 'servico' && (
                        <FirstStep setActiveTab={handleSetActiveTab} />
                    )}
                    {activeTab === 'horarios' && agendamentoData && (
                        <HorariosStep
                            setActiveTab={handleSetActiveTab}
                            servicoId={agendamentoData.servicoId}
                            funcionarioId={agendamentoData.funcionarioId}
                        />
                    )}
                    {activeTab === 'dia' && (
                        <ConfirmacaoStep setActiveTab={handleSetActiveTab} />
                    )}
                </S.Step>
            </S.Modal>
        </S.Overlay>
    )
}

export default Agendamento
