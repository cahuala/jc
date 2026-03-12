import CaseOfUse from '../../shared/CaseOfUse';
import User from '../model/User';
import ProviderCrypto from '../provider/ProviderCrypto';
import RepositoryUser from '../provider/RepositoryUser';
type INPUT = {
  email: string;
  password: string;
};
export default class LoginUser implements CaseOfUse<INPUT, User> {
  constructor(
    private readonly repo: RepositoryUser,
    private readonly cripto: ProviderCrypto,
  ) {}
  async execute(input: INPUT): Promise<User> {
  const { email, password } = input;

  const user = await this.repo.searchToEmail(email);
  if (!user || !user.password) {
    throw new Error('Utilizador não encontrado ou sem senha.');
  }

  const similarPassword = await this.cripto.compare(password, user.password);
  if (!similarPassword) throw new Error('Senha incorrecta');

  const { password: _, ...userWithoutPassword } = user;

  return userWithoutPassword as User;
}

}
