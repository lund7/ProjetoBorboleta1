export type Remedio = {
  id: number;
  nome: string;
  dose?: string;
  horario: string;
  instrucao?: string;
  frequencia?: string;
  tomado?: boolean;
};

export type Servico = {
  id: number;
  tipo: string;
  nome: string;
  bairro: string;
  horario: string;
  latitude: number;
  longitude: number;
};

export type Dados = {
  medicacoes: Remedio[];
  servicos: Servico[];
};