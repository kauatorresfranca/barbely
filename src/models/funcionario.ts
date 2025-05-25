export interface Funcionario {
  id: number;
  barbearia: number;
  nome: string;
  email?: string;
  telefone?: string;
  imagem?: string;
  status: string;
  data_criacao?: string;
  total_servicos?: number;
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
    receita_total: string;
    cliente_mais_frequente: string;
    servico_mais_realizado: string;
  };
}
