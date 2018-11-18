import endpoints from '../config/endpoints';
import User from '../models/user';

export default class ApplicationService {
  constructor (request) {
    this.request = request;
    this.user = User.instance;
  }

	/*
	  AUTH FIREBASE
	*/

  readAccount () {
    return this.request.get(endpoints.account.readAccount + this.user.getAccountId());
  }

  readAccountFirebase () {
    return this.request.delete(endpoints.account.readAccountFirebase);
  }

}
