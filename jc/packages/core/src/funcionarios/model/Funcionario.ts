export default interface Funcionario {
  id: string;
  nome: string;
  nif: string;
  endereco: string;
  provincia: string;
  email: string;
  telefone: string;
  status: 'ATIVO' | 'INATIVO' | 'FERIAS' | 'LICENCA';
  createdAt: Date;
  updatedAt: Date;
}
