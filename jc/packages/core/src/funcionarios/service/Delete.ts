import CaseOfUse from '../../shared/CaseOfUse';
import RepositoryFuncionario from '../provider/RepositoryFuncionario';
type Input = {
  id: string;
};
export default class DeleteFuncionario implements CaseOfUse<Input, void> {
  constructor(private readonly repo: RepositoryFuncionario) {}

  async execute(input: Input): Promise<void> {
    const { id } = input;
    const request = await this.repo.findById(id);
    if (!request) {
      throw new Error('Funcionario não encontrado!');
    }

    return this.repo.delete(id);
  }
}
