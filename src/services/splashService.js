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

  startApp () {
    const body = {
      accessToken: this.user.getToken()
    };

    return this.request.post(endpoints.start, body)
    .then((userData) => {
      if (userData.cleanCache) {
        this.storage.clear();
      }
      rootStore.dispatch({ type: 'checkVersion', isVersionAllowed: userData.isVersionAllowed});
      rootStore.dispatch({ type: 'checkIfLoggedIn', isUserLoggedIn: userData.isUserLoggedIn});
      this.user.setAccountId(userData.accountId);
      this.user.setUserId(userData.userId);
      this.user.setHouseholdId(userData.householdId);
      this.user.setAccountAdmin(userData.accountAdmin);
    })
    .catch((err) => {
      throw err;
    });
  }
}
