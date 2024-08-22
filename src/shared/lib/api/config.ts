import { ApiServiceFactory } from '../api/ApiServiceFactory';

type ApiConfig = {
  userService: string;
  productService: string
  orderService: string
};

const apiConfig: ApiConfig = {
  userService: 'https://jsonplaceholder.typicode.com/users',
  productService: 'https://api.example.com/products',
  orderService: 'https://api.example.com/orders',
};

const apiServicesFactory = new ApiServiceFactory<ApiConfig>();
apiServicesFactory.initialize(apiConfig);
export const apiServices = apiServicesFactory.getMethods();
