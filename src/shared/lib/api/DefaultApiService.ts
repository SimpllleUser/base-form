import { AxiosRequestConfig } from 'axios';
import { IFetchServiceActions, RequestResult } from './types';

export class DefaultApiService {
  fetchService: IFetchServiceActions;

  constructor(fetchService: IFetchServiceActions) {
    this.fetchService = fetchService;
  }

  private async handleRequest<T>(
    requestFunction: () => Promise<T>,
  ): RequestResult<T> {
    try {
      const data = await requestFunction();
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): RequestResult<T> {
    return this.handleRequest(() => this.fetchService.get<T>(url, config));
  }

  public async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): RequestResult<T> {
    return this.handleRequest(() => this.fetchService.post<T>(url, data, config));
  }

  public async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): RequestResult<T> {
    return this.handleRequest(() => this.fetchService.put<T>(url, data, config));
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): RequestResult<T> {
    return this.handleRequest(() => this.fetchService.delete<T>(url, config));
  }
}
