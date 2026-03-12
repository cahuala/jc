import CaseOfUse from '../../shared/CaseOfUse';
import Oficina from '../model/Oficina';

import RepositoryOficina from '../provider/RepositoryOficina';

type Id = {
  id: string;
};
export default class SaveOficina
  implements CaseOfUse<Oficina, Id>
{
  constructor(private readonly repo: RepositoryOficina) {}
  async execute(params: Oficina): Promise<Id> {
    let result: any = await this.repo.save(params);
    return result;
  }
}
