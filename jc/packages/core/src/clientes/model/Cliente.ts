export default interface Cliente {
  id?: string;
  nome: string;
  email?: string;
  telefone?: string;
  nif?: string;
  bi?: string;
  endereco?: string;
  provincia?: string;
  municipio?: string;
  observacoes?: string;
  status: 'ATIVO' | 'INATIVO' | 'SUSPENSO';
  deleted?: boolean;
  deletedAt?: Date | null;
  compartilhamento?: 'GLOBAL' | 'RESTRITO';
  totalGasto?: number;
  totalServicos?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
