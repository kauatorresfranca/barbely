import * as S from './styles'

type Props = {
    setActiveTab: (tab: string) => void
}

const HorariosStep = ({ setActiveTab }: Props) => {
    const handleNext = () => {
    setActiveTab('dia')
    }

    return (
        <S.Container>
        <h3>Escolha o horário</h3>
        <S.Button onClick={() => handleNext()}>Prosseguir</S.Button>
        </S.Container>
    )
}

export default HorariosStep
