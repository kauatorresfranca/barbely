import { useState, useEffect } from 'react'
import { Funcionario } from '../../../models/funcionario'
import { Servico } from '../../../models/servico'
import { Barbearia } from '../../../models/Barbearia'
import HorariosStep from '../agendamento_steps/horarios_step'
import FirstStep from '../agendamento_steps/first_step'
import ConfirmacaoStep from '../agendamento_steps/confirmacao_dados'
import SucessoStep from '../agendamento_steps/sucesso_step'
import MetodoPagamentoStep from '../agendamento_steps/metodos_pagamento_step'
import * as S from './styles'

type Props = {
    modalIsOpen: boolean
    onClose?: () => void
    barbearia: Barbearia | null
}

export type AgendamentoData = {
    data?: string
    horario?: string
    servico?: Servico
    funcionario?: Funcionario | null
    metodoPagamento?: 'Pix' | 'Cartão de Crédito' | 'Cartão de Débito' | 'Dinheiro'
    clienteNome?: string
    clienteEmail?: string
    telefone?: string
}

const Agendamento = ({ modalIsOpen, onClose, barbearia }: Props) => {
    const [activeTab, setActiveTab] = useState('servico')
    const [agendamentoData, setAgendamentoData] = useState<AgendamentoData>({})

    useEffect(() => {
        console.log('agendamentoData atualizado:', agendamentoData)
    }, [agendamentoData])

    const canAccessTab = (tab: string, incomingData?: Partial<AgendamentoData>): boolean => {
        if (tab === 'servico') return true

        const dataToCheck = { ...agendamentoData, ...(incomingData || {}) }

        if (tab === 'horarios') {
            return !!dataToCheck.servico
        }
        if (tab === 'metodo_pagamento') {
            return !!dataToCheck.data && !!dataToCheck.horario && !!dataToCheck.servico
        }
        if (tab === 'dia') {
            return (
                !!dataToCheck.data &&
                !!dataToCheck.horario &&
                !!dataToCheck.servico &&
                !!dataToCheck.metodoPagamento
            )
        }
        if (tab === 'sucesso') {
            return (
                !!dataToCheck.data &&
                !!dataToCheck.horario &&
                !!dataToCheck.servico &&
                !!dataToCheck.metodoPagamento
            )
        }
        return false
    }

    const handleSetActiveTab = (tab: string, data?: Partial<AgendamentoData>) => {
        console.log('Antes da validação - agendamentoData:', agendamentoData, 'incomingData:', data)
        if (!canAccessTab(tab, data)) {
            console.log('Bloqueado: canAccessTab retornou false para', tab, 'com data:', {
                ...agendamentoData,
                ...data,
            })
            alert(`Por favor, complete a etapa atual antes de prosseguir para "${tab}".`)
            return
        }

        if (data) {
            setAgendamentoData((prev) => {
                const newData = { ...prev, ...data }
                console.log('Novo agendamentoData:', newData)
                return newData
            })
        }
        setActiveTab(tab)
    }

    const resetAgendamento = () => {
        setActiveTab('servico')
        setAgendamentoData({})
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
                            {['servico', 'horarios', 'metodo_pagamento', 'dia'].map((id, index) => (
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
                    {activeTab === 'servico' && (
                        <FirstStep setActiveTab={handleSetActiveTab} barbearia={barbearia} />
                    )}
                    {activeTab === 'horarios' && (
                        <HorariosStep
                            setActiveTab={handleSetActiveTab}
                            servico={agendamentoData.servico!}
                            funcionario={agendamentoData.funcionario || null}
                            barbearia={barbearia}
                        />
                    )}
                    {activeTab === 'metodo_pagamento' && (
                        <MetodoPagamentoStep
                            setActiveTab={handleSetActiveTab}
                            agendamentoData={agendamentoData}
                            barbearia={barbearia}
                        />
                    )}
                    {activeTab === 'dia' && (
                        <ConfirmacaoStep
                            setActiveTab={handleSetActiveTab}
                            agendamentoData={agendamentoData as AgendamentoData}
                            barbearia={barbearia}
                        />
                    )}
                    {activeTab === 'sucesso' && (
                        <SucessoStep onClose={onClose} resetAgendamento={resetAgendamento} />
                    )}
                </S.Step>
            </S.Modal>
        </S.Overlay>
    )
}

export default Agendamento
