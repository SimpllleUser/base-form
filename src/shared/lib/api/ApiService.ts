import { AxiosRequestConfig } from 'axios';
import FetchService from '.';

type RequestResult<T> = Promise<{ data: T | null; error: unknown | null }>;

export interface IFetchServiceActions {
  get<T>(url: string, config?: AxiosRequestConfig): RequestResult<T>;
  post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): RequestResult<T>;
  put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): RequestResult<T>;
  delete<T>(url: string, config?: AxiosRequestConfig): RequestResult<T>;
}
export class ApiServiceDefault implements IFetchServiceActions {
  fetchService: FetchService;

  constructor(url: string, fetchService?: FetchService) {
    this.fetchService = fetchService ?? new FetchService(url);
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

  public get<T>(url: string, config?: AxiosRequestConfig): RequestResult<T> {
    return this.handleRequest(() => this.fetchService.get(url, config));
  }

  public post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): RequestResult<T> {
    return this.handleRequest(() => this.fetchService.post(url, data, config));
  }

  public put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): RequestResult<T> {
    return this.handleRequest(() => this.fetchService.put(url, data, config));
  }

  public delete<T>(url: string, config?: AxiosRequestConfig): RequestResult<T> {
    return this.handleRequest(() => this.fetchService.delete(url, config));
  }
}
