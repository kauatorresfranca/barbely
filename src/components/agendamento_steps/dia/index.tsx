import * as S from './styles'

type Props = {
    setActiveTab: (tab: string) => void
}

const DiaStep = ({ setActiveTab }: Props) => {
    const handleBack = () => {
    setActiveTab('horarios')
    }

    return (
    <S.Container>
        <h3>Confirme o dia</h3>
        <S.Button onClick={() => handleBack()}>Voltar</S.Button>
    </S.Container>
    )
}

export default DiaStep
