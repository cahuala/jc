/* eslint-disable prettier/prettier */
import CaseOfUse from '../../shared/CaseOfUse';
import Cliente from '../model/Cliente';
import RepositoryCliente from '../provider/RepositoryCliente';

export default class SaveCliente implements CaseOfUse<Cliente, Cliente> {
  constructor(private readonly repo: RepositoryCliente) {}
  async execute(params: Cliente): Promise<Cliente> {
    const result = await this.repo.save(params);
    return result;
  }
}
