export interface Cliente {
    id: number
    user: {
        nome: string
        telefone: string
        email: string
        date_joined: string // Adicionado
    }
    barbearia: number
    fotoPerfil: string | null
}
