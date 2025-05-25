export interface Agendamento {
    id: number
    cliente: number
    cliente_nome: string
    funcionario: number
    funcionario_nome: string | null  // Adicionado para corresponder ao serializer
    servico: number
    servico_nome: string
    servico_duracao: number
    data: string
    data_formatada?: string  // Adicionado para manter compatibilidade com o uso anterior
    hora_inicio: string
    status: 'CONFIRMADO' | 'CANCELADO' | 'EXPIRADO' | 'CONCLUIDO'
    criado_em: string
    preco_total: number
    metodo_pagamento: 'pix' | 'cartao_credito' | 'cartao_debito' | 'dinheiro' | null
}

export interface NovoAgendamento {
    cliente_email?: string
    cliente_nome: string
    funcionario: string
    servico: string
    data: string
    hora_inicio: string
    metodo_pagamento: string
}
