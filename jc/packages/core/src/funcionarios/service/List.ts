import CaseOfUse from '../../shared/CaseOfUse';
import User from '../../users/model/User';
import Funcionario from '../model/Funcionario';
import RepositoryFuncionario from '../provider/RepositoryFuncionario';

export default class ListFuncionario implements CaseOfUse<User, Funcionario[]> {
  constructor(private readonly repo: RepositoryFuncionario) {}
  async execute(): Promise<Funcionario[]> {
    const funcionarios = await this.repo.list();
    return funcionarios;
  }
}
