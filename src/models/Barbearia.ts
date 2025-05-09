// models/Barbearia.ts
export interface Barbearia {
    descricao: string
    id: number
    nome_barbearia: string
    nome_proprietario: string
    email: string
    username: string
    cnpj: string | null
    plano: string
    data_criacao: string
    slug: string
    telefone: string
    agendamento_sem_login: boolean
    pix: boolean
    credit_card: boolean
    debit_card: boolean
    cash: boolean
}
