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
                'Suporte via chat',
            ],
            atual: false,
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
                'Suporte prioritário (chat e telefone)',
            ],
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
                        <p className="preco">
                            {plano.preco}{' '}
                            <span style={{ fontSize: '14px', fontWeight: 'normal' }}>
                                (ou {plano.precoAnual})
                            </span>
                        </p>
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
