import { forOwn } from 'lodash';
import { ApiServiceDefault } from './ApiService';

type FactoryMethods<T> = Record<keyof T, () => ApiServiceDefault>;

export class ApiServiceFactory<T extends Record<string, string>> {
  private methods: FactoryMethods<T> = {} as FactoryMethods<T>;

  constructor(config?: T) {
    if (config) {
      this.initialize(config);
    }
  }

  public initialize(config: T): void {
    forOwn(config, (url, key) => {
      this.methods[key as keyof T] = () => new ApiServiceDefault(url);
    });
  }

  public getMethods(): FactoryMethods<T> {
    return this.methods;
  }

  static createFactoryFromConfig<T extends Record<string, string>>(config: T): ApiServiceFactory<T> {
    const factory = new ApiServiceFactory<T>();
    factory.initialize(config);
    return factory;
  }
}

type ConfigInitializer<T extends Record<string, string>> = (config: T) => ApiServiceFactory<T>;
