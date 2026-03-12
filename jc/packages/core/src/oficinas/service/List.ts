import CaseOfUse from '../../shared/CaseOfUse';
import User from '../../users/model/User';
import Oficina from '../model/Oficina';
import RepositoryOficina from '../provider/RepositoryOficina';

export default class ListOficina
  implements CaseOfUse<User, Oficina[]>
{
  constructor(private readonly repo: RepositoryOficina) {}
  async execute(): Promise<Oficina[]> {
    const Oficina = await this.repo.list();
    return Oficina;
  }
}
