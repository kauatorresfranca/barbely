import * as S from './styles'

type SucessoStepProps = {
    onClose?: () => void
    resetAgendamento?: () => void // Adiciona a nova prop
}

const SucessoStep = ({ onClose, resetAgendamento }: SucessoStepProps) => {
    const handleClose = () => {
        if (resetAgendamento) {
            resetAgendamento() // Reseta o activeTab e agendamentoData
        }
        if (onClose) {
            onClose() // Fecha o modal
        }
    }

    return (
        <S.Success>
            <h2>Sucesso!</h2>
            <p>Seu agendamento foi realizado com sucesso.</p>
            <p>Para mais detalhes, acesse a seção "Meus Agendamentos".</p>
            <S.Button onClick={handleClose}>Fechar</S.Button>
        </S.Success>
    )
}

export default SucessoStep
