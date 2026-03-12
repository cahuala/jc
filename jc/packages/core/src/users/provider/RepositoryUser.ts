import User from '../model/User';

export default interface RepositoryUser {
  save(user: User): Promise<string>;
  searchToEmail(email: string): Promise<User | null>;
}
