export default interface Oficina {
  id?: string;
  nome: string;
  nif: string;
  endereco: string;
  provincia: string;
  email: string;
  telefone: string;
  status: 'ATIVO' | 'INATIVO' | 'SUSPENSO';
  deleted: boolean;
  imgUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
