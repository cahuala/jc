import Funcionario from '../model/Funcionario';

export default interface RepositoryFuncionario {
  save (funcionario: Funcionario): Promise<string>;
  delete(id: string): Promise<void>;
  list(): Promise<Funcionario[]>;
  findById(id: string): Promise<Funcionario | null>;
}
