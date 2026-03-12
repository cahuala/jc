import CaseOfUse from '../../shared/CaseOfUse';
import User from '../../users/model/User';
import Funcionario from '../model/Funcionario';
import RepositoryFuncionario from '../provider/RepositoryFuncionario';

export default class FindByIdFuncionario implements CaseOfUse<User, Funcionario | null> {
  constructor(private readonly repo: RepositoryFuncionario) {}

  async execute(id: string): Promise<Funcionario | null> {
    const user = await this.repo.findById(id);
    return user as any;
  }
}
