export interface Cliente {
  id: number;
  user: {
    nome: string;
    telefone: string;
    email: string;
    date_joined: string;
  };
  barbearia: number;
  fotoPerfil: string | null;
  status: string;
  historico?: {
    id: number;
    cliente_nome: string;
    funcionario_nome: string | null;
    servico_nome: string;
    data: string;
    data_formatada: string;
    hora_inicio: string;
    servico_duracao: number;
    status: string;
    preco_total: string;
    metodo_pagamento: string;
  }[];
  estatisticas?: {
    agendamentos_este_mes: number;
    total_agendamentos: number;
    gasto_total: string;
    ultimo_agendamento: string;
    servico_mais_frequente: string;
  };
}
