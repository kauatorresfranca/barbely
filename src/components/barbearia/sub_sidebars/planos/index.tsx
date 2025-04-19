import * as S from './styles'

const Planos = () => {
    const planos = [
        {
            nome: 'Gratuito',
            preco: 'R$ 0,00',
            recursos: ['Até 5 agendamentos/mês', 'Suporte básico', 'Relatórios simples'],
            atual: true,
        },
        {
            nome: 'Premium',
            preco: 'R$ 99,90/mês',
            recursos: ['Agendamentos ilimitados', 'Suporte prioritário', 'Relatórios avançados'],
            atual: false,
        },
    ]

    return (
        <S.Container>
            <h2>Planos de Assinatura</h2>
            <p className="subtitle">
                Escolha o plano ideal para a sua barbearia e otimize sua gestão.
            </p>
            <S.PlanosGrid>
                {planos.map((plano, index) => (
                    <S.PlanoCard key={index} atual={plano.atual}>
                        <h3>{plano.nome}</h3>
                        <p className="preco">{plano.preco}</p>
                        <ul>
                            {plano.recursos.map((recurso, i) => (
                                <li key={i}>{recurso}</li>
                            ))}
                        </ul>
                        <S.Botao disabled={plano.atual}>
                            {plano.atual ? 'Plano Atual' : 'Escolher Plano'}
                        </S.Botao>
                    </S.PlanoCard>
                ))}
            </S.PlanosGrid>
        </S.Container>
    )
}

export default Planos
