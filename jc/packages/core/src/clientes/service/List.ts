/* eslint-disable prettier/prettier */
import CaseOfUse from '../../shared/CaseOfUse';
import Cliente from '../model/Cliente';
import RepositoryCliente from '../provider/RepositoryCliente';

type ListParams = {
  search?: string;
};

export default class ListCliente implements CaseOfUse<ListParams, Cliente[]> {
  constructor(private readonly repo: RepositoryCliente) {}
  async execute(_params?: ListParams): Promise<Cliente[]> {
    const clientes = await this.repo.list();
    return clientes;
  }
}
