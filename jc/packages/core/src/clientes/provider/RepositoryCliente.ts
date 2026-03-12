/* eslint-disable prettier/prettier */
import Cliente from '../model/Cliente';

export default interface RepositoryCliente {
  save(params: Cliente): Promise<Cliente>;
  list(): Promise<Cliente[]>;
  findById(id: string): Promise<Cliente | null>;
  findByEmail(email: string): Promise<Cliente | null>;
  findByNif(nif: string): Promise<Cliente | null>;
  delete(id: string): Promise<void>;
}
