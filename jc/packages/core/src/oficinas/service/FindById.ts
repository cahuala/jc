import CaseOfUse from '../../shared/CaseOfUse';
import User from '../../users/model/User';
import Oficina from '../model/Oficina';
import RepositoryOficina from '../provider/RepositoryOficina';

export default class FindByIdOficina
  implements CaseOfUse<User, Oficina | null>
{
  constructor(private readonly repo: RepositoryOficina) {}

  async execute(id: string): Promise<Oficina | null> {
    const user = await this.repo.findById(id);
    return user as any;
  }
}
