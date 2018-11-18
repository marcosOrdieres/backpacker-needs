import { BaseService } from 'components';
import User from '../models/user.js';
import rootStore from '../stores/root.js';
import endpoints from '../config/endpoints.json';

export default class SplashService {
  constructor (request, storage) {
    this.request = request;
    this.storage = storage;
    this.user = User.instance;
  }
}
