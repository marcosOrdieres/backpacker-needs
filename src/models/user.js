export default class User {
    static instance = this.instance == null ? new User() : this.instance;
    static userId;
    static sendCredentialSignup;
    static sendCredentialLogin;
    static country;
    static chosenRegion;
    static chosenRegionCoordinates;
    static recommendations;
    static toDos;

    getToDos() {
      return this.toDos;
    }

    setToDos(value) {
      this.toDos = value;
    }

    getRecommendations() {
      return this.recommendations;
    }

    setRecommendations(value) {
      this.recommendations = value;
    }

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

    getUserId() {
      return this.userId;
    }

    setUserId(value) {
      this.userId = value;
    }

    getCountries() {
      return this.country;
    }

    setCountries(value) {
      this.country = value;
    }

    getChosenRegion() {
      return this.chosenRegion;
    }

    setChosenRegion(value) {
      this.chosenRegion = value;
    }

    getChosenRegionCoordinates() {
      return this.chosenRegionCoordinates;
    }

    setChosenRegionCoordinates(value) {
      this.chosenRegionCoordinates = value;
    }

    getUserObject() {
      const user = {
        sendCredentialSignup: this.sendCredentialSignup,
        sendCredentialLogin: this.sendCredentialLogin,
        userId: parseInt(this.userId),
        country: this.country,
        chosenRegion: this.chosenRegion,
        chosenRegionCoordinates: this.chosenRegionCoordinates,
        recommendations: this.recommendations,
        toDos: this.toDos
      };

      return user;
    }
}
