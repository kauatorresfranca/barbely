import * as S from './styles'

type Props = {
    setActiveTab: (tab: string) => void
}

const ServicoStep = ({ setActiveTab }: Props) => {
    const handleNext = () => {
    setActiveTab('horarios')
}

    return (
        <S.Container>
            <h3>Escolha o serviço</h3>
            {/* Aqui entraria a lista de serviços */}
            <S.Button onClick={() => handleNext()}>Prosseguir</S.Button>
        </S.Container>
    )
}

export default ServicoStep
