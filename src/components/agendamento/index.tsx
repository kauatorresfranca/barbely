import { useState } from 'react'
import * as S from './styles'
import HorariosStep from '../agendamento_steps/horarios'
import ServicoStep from '../agendamento_steps/servico'
import DiaStep from '../agendamento_steps/dia'

type Props = {
    modalIsOpen: boolean
    onClose?: () => void
}

const Agendamento = ({ modalIsOpen, onClose }: Props) => {
  const [activeTab, setActiveTab] = useState('servico')

  const steps = [
    { id: 'servico', title: 'Serviço', component: <ServicoStep setActiveTab={setActiveTab} /> },
    { id: 'horarios', title: 'Horários', component: <HorariosStep setActiveTab={setActiveTab} /> },
    { id: 'dia', title: 'Dia', component: <DiaStep setActiveTab={setActiveTab} /> }
  ]

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
        <h2>{steps.find((step) => step.id === activeTab)?.title}</h2>
        <S.Etapas>
          {steps.map((step, index) => (
            <span key={index} className={step.id === activeTab ? 'active' : ''}></span>
          ))}
        </S.Etapas>
        <S.Step className="active" id={activeTab}>
          {steps.find((step) => step.id === activeTab)?.component}
        </S.Step>
      </S.Modal>
    </S.Overlay>
  )
}

export default Agendamento
