export interface Agendamento {
    id: number
    cliente: number
    cliente_nome: string
    funcionario: number
    servico: number
    servico_nome: string
    servico_duracao: number
    data: string
    hora_inicio: string
    status: 'CONFIRMADO' | 'CANCELADO' | 'EXPIRADO' | 'CONCLUIDO'
    criado_em: string
    preco_total: number
    metodo_pagamento: 'pix' | 'cartao_credito' | 'cartao_debito' | 'dinheiro' | null
}
