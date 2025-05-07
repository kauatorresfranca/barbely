import * as S from './styles'

const Planos = () => {
    const planos = [
        {
            nome: 'Básico',
            preco: 'R$ 49,90/mês',
            precoAnual: 'R$ 479,90/ano',
            recursos: [
                'Até 2 funcionários',
                'Até 50 agendamentos/mês',
                'Suporte básico via e-mail',
            ],
            atual: true,
            recomendado: false,
        },
        {
            nome: 'Profissional',
            preco: 'R$ 99,90/mês',
            precoAnual: 'R$ 959,90/ano',
            recursos: [
                'Até 5 funcionários',
                'Até 150 agendamentos/mês',
                'Relatórios básicos',
                'Integração com PIX e cartão',
                'Personalização de tema',
                'Suporte via chat',
            ],
            atual: false,
            recomendado: true,
        },
        {
            nome: 'Premium',
            preco: 'R$ 199,90/mês',
            precoAnual: 'R$ 1.919,90/ano',
            recursos: [
                'Funcionários ilimitados',
                'Agendamentos ilimitados',
                'Relatórios avançados',
                'Personalização de marca',
                'Personalização de tema',
                'Suporte prioritário (chat e telefone)',
            ],
            atual: false,
            recomendado: false,
        },
    ]

    return (
        <S.Container>
            <S.Header>
                <h2>Planos de Assinatura</h2>
                <p className="subtitle">
                    Escolha o plano ideal para a sua barbearia e otimize sua gestão.
                </p>
            </S.Header>
            <S.PlanosGrid>
                {planos.map((plano, index) => (
                    <S.PlanoCard key={index} atual={plano.atual} recomendado={plano.recomendado}>
                        {plano.recomendado && <S.RecomendadoBadge>Recomendado</S.RecomendadoBadge>}
                        <h3>{plano.nome}</h3>
                        <S.PrecoWrapper>
                            <span className="preco">{plano.preco}</span>
                            <span className="preco-anual">ou {plano.precoAnual}</span>
                        </S.PrecoWrapper>
                        <ul>
                            {plano.recursos.map((recurso, i) => (
                                <li key={i}>
                                    <S.CheckIcon className="ri-check-line" />
                                    {recurso}
                                </li>
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
