import CaseOfUse from '../../shared/CaseOfUse';
import Funcionario from '../model/Funcionario';

import RepositoryFuncionario from '../provider/RepositoryFuncionario';

export default class SaveFuncionario implements CaseOfUse<Funcionario, string> {
  constructor(private readonly repo: RepositoryFuncionario) {}
  async execute(params: Funcionario): Promise<string> {
    let result: any = await this.repo.save(params);
    return result;
  }
}
