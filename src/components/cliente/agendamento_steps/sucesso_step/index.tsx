import * as S from './styles'

type SucessoStepProps = {
    onClose?: () => void
}

const SucessoStep = ({ onClose }: SucessoStepProps) => {
    return (
        <S.Success>
            <h2>Sucesso!</h2>
            <p>Seu agendamento foi realizado com sucesso.</p>
            <p>Para mais detalhes, acesse a seção "Meus Agendamentos".</p>
            <S.Button onClick={onClose}>Fechar</S.Button>
        </S.Success>
    )
}

export default SucessoStep
