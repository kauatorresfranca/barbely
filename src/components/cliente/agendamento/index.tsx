import { useState, useEffect } from 'react'
import { Funcionario } from '../../../models/funcionario'
import { Servico } from '../../../models/servico'
import HorariosStep from '../agendamento_steps/second_step'
import FirstStep from '../agendamento_steps/first_step'
import ConfirmacaoStep from '../agendamento_steps/confirmacao_dados'
import SucessoStep from '../agendamento_steps/sucesso_step'
import * as S from './styles'

type Props = {
    modalIsOpen: boolean
    onClose?: () => void
}

export type AgendamentoData = {
    data: string
    horario: string
    servico: Servico
    funcionario: Funcionario | null
}

const Agendamento = ({ modalIsOpen, onClose }: Props) => {
    const [activeTab, setActiveTab] = useState('servico')
    const [agendamentoData, setAgendamentoData] = useState<AgendamentoData | null>(null)

    useEffect(() => {
        console.log('agendamentoData atualizado:', agendamentoData)
    }, [agendamentoData])

    const canAccessTab = (tab: string, incomingData?: Partial<AgendamentoData>): boolean => {
        if (tab === 'servico') return true

        const dataToCheck = incomingData ? { ...agendamentoData, ...incomingData } : agendamentoData

        if (tab === 'horarios') {
            return !!dataToCheck?.servico
        }
        if (tab === 'dia') {
            return !!dataToCheck?.data && !!dataToCheck?.horario
        }
        if (tab === 'sucesso') {
            return !!dataToCheck?.data && !!dataToCheck?.horario && !!dataToCheck?.servico
        }
        return false
    }

    const handleSetActiveTab = (tab: string, data?: Partial<AgendamentoData>) => {
        if (!canAccessTab(tab, data)) {
            console.log('Bloqueado: canAccessTab retornou false para', tab, 'com data:', data)
            alert(`Por favor, complete a etapa atual antes de prosseguir para "${tab}".`)
            return
        }

        if (data) {
            setAgendamentoData((prev) => ({ ...prev, ...data } as AgendamentoData))
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
                {activeTab !== 'sucesso' && (
                    <>
                        <h2>Agende sua sessão</h2>
                        <S.Etapas>
                            {['servico', 'horarios', 'dia'].map((id, index) => (
                                <span
                                    key={index}
                                    onClick={() => canAccessTab(id) && setActiveTab(id)}
                                    className={`${id === activeTab ? 'active' : ''} ${
                                        !canAccessTab(id) ? 'disabled' : ''
                                    }`}
                                />
                            ))}
                        </S.Etapas>
                    </>
                )}
                <S.Step className="active" id={activeTab}>
                    {activeTab === 'servico' && <FirstStep setActiveTab={handleSetActiveTab} />}
                    {activeTab === 'horarios' && agendamentoData && (
                        <HorariosStep
                            setActiveTab={handleSetActiveTab}
                            servico={agendamentoData.servico}
                            funcionario={agendamentoData.funcionario}
                        />
                    )}
                    {activeTab === 'dia' && agendamentoData && (
                        <ConfirmacaoStep
                            setActiveTab={handleSetActiveTab}
                            agendamentoData={agendamentoData}
                        />
                    )}
                    {activeTab === 'sucesso' && <SucessoStep onClose={onClose} />}
                </S.Step>
            </S.Modal>
        </S.Overlay>
    )
}

export default Agendamento
