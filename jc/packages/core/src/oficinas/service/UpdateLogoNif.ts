import CaseOfUse from '../../shared/CaseOfUse';

import RepositoryOficina from '../provider/RepositoryOficina';

type Id = {
  id: string;
};
type Entrada = {
  nif: string;
  imageUrl: string;
};
export default class UpdateLogoOficinaForNif implements CaseOfUse<Entrada, Id> {
  constructor(private readonly repo: RepositoryOficina) {}
  async execute(params: Entrada): Promise<any> {
    let result: any = await this.repo.updatePhoto(params);
    return result;
  }
}
