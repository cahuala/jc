export default interface User {
  id: string;
  nome: string;
  email: string;
  password: string;
  role:
    | 'ADMIN_GLOBAL'
    | 'ADMIN'
    | 'GESTOR'
    | 'MECANICO'
    | 'RECECIONISTA'
    | 'CAIXA';
  status: 'ATIVO' | 'INATIVO' | 'SUSPENSO';
  oficinaId?: string;
  createdAt: Date;
  updatedAt: Date;
}
