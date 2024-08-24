import { AxiosRequestConfig } from 'axios';

export type RequestResult<T> = Promise<{ data: T | null; error: unknown | null }>;

export interface IFetchServiceActions {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>;
  put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>;
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
}
