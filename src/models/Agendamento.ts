export type Agendamento = {
    id: number;
    cliente: number;
    cliente_nome: string;
    funcionario: number;
    servico: number;
    servico_nome: string;
    servico_duracao: number;
    data: string;
    hora_inicio: string;
    cancelado: boolean;
    criado_em: string;
    };
