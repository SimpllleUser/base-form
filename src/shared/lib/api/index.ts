import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface IFetchServiceActions {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>;
  put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>;
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
}
class FetchService implements IFetchServiceActions {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.initializeResponseInterceptor();
  }

  private initializeResponseInterceptor() {
    this.axiosInstance.interceptors.response.use(
      this.handleResponse,
      this.handleError,
    );
  }

  private handleResponse = (response: AxiosResponse) => response.data;

  // Handle the error response
  protected handleError = (error: unknown) => Promise.reject(error);

  // GET request
  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const res: T = await this.axiosInstance.get(url, config);
    return res;
  }

  // POST request
  public async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const res: T = await this.axiosInstance.post(url, data, config);
    return res;
  }

  // PUT request
  public async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const res: T = await this.axiosInstance.put(url, data, config);
    return res;
  }

  // DELETE request
  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const res: T = await this.axiosInstance.delete(url, config);
    return res;
  }
}

export default FetchService;
