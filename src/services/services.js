import RequestService from './requestService.js';
import StorageService from './storageService.js';
import ProductsService from './productsService.js';
import SplashService from './splashService.js';

const requestService = new RequestService(storageService);
const storageService = new StorageService(requestService);
const productsService = new ProductsService(requestService);
const splashService = new SplashService(requestService, storageService);

export default {
  Request: requestService,
  Storage: storageService,
  Products: productsService,
  Splash: splashService
};
