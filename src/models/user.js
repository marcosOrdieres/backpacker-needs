export default class User {
    static instance = this.instance == null ? new User() : this.instance;

    static accessToken;
    static accountId;
    static userId;
    static householdId;
    static accountAdmin;

    getToken() {
      return this.accessToken;
    }

    setToken(value) {
      this.accessToken = value;
    }

    getAccountId() {
      return this.accountId;
    }

    setAccountId(value) {
      this.accountId = value;
    }

    getUserId() {
      return this.userId;
    }

    setUserId(value) {
      this.userId = value;
    }

    getHouseholdId() {
      return this.householdId;
    }

    setHouseholdId(value) {
      this.householdId = value;
    }

    getAccountAdmin() {
      return this.accountAdmin;
    }

    setAccountAdmin(value) {
      this.accountAdmin = value;
    }

    getUserObject() {
      const user = {
        accessToken: this.accessToken,
        accountId: parseInt(this.accountId),
        userId: parseInt(this.userId),
        householdId: parseInt(this.householdId),
        accountAdmin: this.accountAdmin
      };

      return user;
    }
}
