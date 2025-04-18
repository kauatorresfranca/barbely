export interface Cliente {
    id: number
    user: {
        nome: string
        telefone: string
        email: string
    }
    barbearia: number
    fotoPerfil: string | null
}
