export default class User {
    static instance = this.instance == null ? new User() : this.instance;

    static accessToken;
    static accountId;
    static userId;
    static accountAdmin;
    static accountAdmin;
    static sendCredentialSignup;
    static sendCredentialLogin;

    getSendCredentialsSignup() {
      return this.sendCredentialSignup;
    }

    setSendCredentialsSignup(value) {
      this.sendCredentialSignup = value;
    }

    getSendCredentialsLogin() {
      return this.sendCredentialLogin;
    }

    setSendCredentialsLogin(value) {
      this.sendCredentialLogin = value;
    }

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

    getAccountAdmin() {
      return this.accountAdmin;
    }

    setAccountAdmin(value) {
      this.accountAdmin = value;
    }

    getUserObject() {
      const user = {
        sendCredentialSignup: this.sendCredentialSignup,
        sendCredentialLogin: this.sendCredentialLogin,
        accessToken: this.accessToken,
        accountId: parseInt(this.accountId),
        userId: parseInt(this.userId),
        accountAdmin: this.accountAdmin
      };

      return user;
    }
}
