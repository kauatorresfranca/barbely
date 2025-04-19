import * as S from './styles'

const Faturamento = () => {
    const dados = {
        receitas: 'R$ 4.500,00',
        despesas: 'R$ 1.800,00',
        lucro: 'R$ 2.700,00',
    }

    return (
        <S.Container>
            <h2>Faturamento</h2>
            <p>Veja um resumo financeiro da sua barbearia.</p>
            <S.ResumoGrid>
                <S.ResumoItem>
                    <h3>Receitas</h3>
                    <p>{dados.receitas}</p>
                </S.ResumoItem>
                <S.ResumoItem>
                    <h3>Despesas</h3>
                    <p>{dados.despesas}</p>
                </S.ResumoItem>
                <S.ResumoItem>
                    <h3>Lucro</h3>
                    <p>{dados.lucro}</p>
                </S.ResumoItem>
            </S.ResumoGrid>
        </S.Container>
    )
}

export default Faturamento
