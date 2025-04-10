import * as S from './styles'

type Props = {
    setActiveTab: (tab: string) => void
}

const ConfirmacaoStep = ({ setActiveTab }: Props) => {
    const handleNext = () => {
    setActiveTab('dia')
    }

    return (
        <S.Container>
        <h3>Sessão agendada com sucesso !</h3>
        <S.Button onClick={() => handleNext()}>Confirmar sessão</S.Button>
        </S.Container>
    )
}

export default ConfirmacaoStep
