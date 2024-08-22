import { ApiServiceDefault } from './ApiService';
import { User } from '../../../views/config/User';

export class UserApiService extends ApiServiceDefault {
  constructor(url = '') {
    if (!url) {
      throw Error('Api service with empty path');
    }
    super(url);
  }

  public getUserById(id: string) {
    return this.get<User>(`/${id}`);
  }

  public createUser(user: User) {
    return this.post<User>('/', user);
  }

  public updateUser(id: string, user: User) {
    return this.put<User>(`/${id}`, user);
  }

  public deleteUser(id: string) {
    return this.delete<void>(`/${id}`);
  }

  public getUsers() {
    return this.get<Array<User>>('/');
  }
}
