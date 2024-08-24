import { DefaultApiService } from './DefaultApiService';
import { User } from '../../../views/config/User';
import AxiosService from '../../../shared/lib/api/AxiosService';

export class UserApiService {
  private apiService: DefaultApiService

  constructor(url = '') {
    this.apiService = new DefaultApiService(new AxiosService(url));
  }

  public getUserById(id: string) {
    return this.apiService.get<User>(`/${id}`);
  }

  public createUser(user: User) {
    return this.apiService.post<User>('/', user);
  }

  public updateUser(id: string, user: User) {
    return this.apiService.put<User>(`/${id}`, user);
  }

  public deleteUser(id: string) {
    return this.apiService.delete<void>(`/${id}`);
  }

  public getUsers() {
    return this.apiService.get<Array<User>>('/');
  }
}
