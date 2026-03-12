import CaseOfUse from '../../shared/CaseOfUse';
import User from '../model/User';
import ProviderCrypto from '../provider/ProviderCrypto';
import RepositoryUser from '../provider/RepositoryUser';

type Id = {
  id: string;
};
export default class SaveUser implements CaseOfUse<User, Id> {
  constructor(
    private readonly repo: RepositoryUser,
    private readonly cypto: ProviderCrypto,
  ) {}
  async execute(user: User): Promise<Id> {
    const userExist = await this.repo.searchToEmail(user.email);
    if (userExist) {
      throw new Error('Utilizador já existe');
    }
    if (!user?.password) {
      throw new Error('Senha do utilizador não definida.');
    }

    const passwordCrypto = await this.cypto.crypto(user.password);

    const newUser = {
      ...user,
      password: passwordCrypto,
      deleted: false,
    };

    let result: any = await this.repo.save(newUser);
    return result;
  }
}
