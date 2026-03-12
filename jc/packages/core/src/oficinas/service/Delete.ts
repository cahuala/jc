import CaseOfUse from '../../shared/CaseOfUse';
import RepositoryOficina from '../provider/RepositoryOficina';
type Input = {
  id: string;
};
export default class DeleteOficina implements CaseOfUse<Input, void> {
  constructor(private readonly repo: RepositoryOficina) {}

  async execute(input: Input): Promise<void> {
    const { id } = input;
    const request = await this.repo.findById(id);
    if (!request) {
      throw new Error('Oficina não encontrada!');
    }
    return this.repo.delete(id);
  }
}
