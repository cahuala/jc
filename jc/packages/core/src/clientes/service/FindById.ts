/* eslint-disable prettier/prettier */
import CaseOfUse from '../../shared/CaseOfUse';
import Cliente from '../model/Cliente';
import RepositoryCliente from '../provider/RepositoryCliente';

type Input = {
  id: string;
};

export default class FindByIdCliente implements CaseOfUse<
  Input,
  Cliente | null
> {
  constructor(private readonly repo: RepositoryCliente) {}
  async execute(input: Input): Promise<Cliente | null> {
    const cliente = await this.repo.findById(input.id);
    return cliente;
  }
}
