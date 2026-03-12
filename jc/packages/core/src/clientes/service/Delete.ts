/* eslint-disable prettier/prettier */
import CaseOfUse from '../../shared/CaseOfUse';
import RepositoryCliente from '../provider/RepositoryCliente';

type Input = {
  id: string;
};

export default class DeleteCliente implements CaseOfUse<Input, void> {
  constructor(private readonly repo: RepositoryCliente) {}

  async execute(input: Input): Promise<void> {
    const { id } = input;
    const cliente = await this.repo.findById(id);
    if (!cliente) {
      throw new Error('Cliente não encontrado!');
    }
    return this.repo.delete(id);
  }
}
