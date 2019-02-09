export default class User {
    static instance = this.instance == null ? new User() : this.instance;
    static userId;
    static sendCredentialSignup;
    static sendCredentialLogin;
    static country;
    static chosenCountry;
    static chosenRegion;
    static chosenRegionCoordinates;
    static recommendations;
    static recommendationsSelected;
    static inTheBackpackSelected;
    static recommendationsOnlyItemSelected;
    static countriesInTheWorld;
    static countryGeojson;
    static lat;
    static long;
    static dateOfTravel;
    static regionsStoredFirebase;
    static listRecosForNextClick; // This is for not calling again same function, less timeout

    setListRecosForNextClick(value) {
      this.listRecosForNextClick = value;
    }

    getListRecosForNextClick() {
      return this.listRecosForNextClick;
    }

    setRegionsAsyncStorage(value) {
      this.regionsStoredFirebase = value;
    }

    getRegionsAsyncStorage() {
      return this.regionsStoredFirebase;
    }

    setDateOfTravel(value) {
      this.dateOfTravel = value;
    }

    getDateOfTravel() {
      return this.dateOfTravel;
    }

    getLat() {
      return this.lat;
    }

    getLong() {
      return this.long;
    }

    setLat(val) {
      this.lat=val;
    }

    setLong(val) {
      this.long=val;
    }

    getCountryGeojson() {
      return this.countryGeojson;
    }

    setCountryGeojson(value) {
      this.countryGeojson = value;
    }


    getCountriesInTheWorld() {
      return this.countriesInTheWorld;
    }

    setCountriesInTheWorld(value) {
      this.countriesInTheWorld = value;
    }

    getRecommendationsOnlyIntemSelected() {
      return this.recommendationsOnlyItemSelected;
    }

    setRecommendationsOnlyIntemSelected(value) {
      this.recommendationsOnlyItemSelected = value;
    }

    getInTheBackpackSelected() {
      return this.inTheBackpackSelected;
    }

    setInTheBackpackSelected(value) {
      this.inTheBackpackSelected = value;
    }

    getRecommendationsSelected() {
      return this.recommendationsSelected;
    }

    setRecommendationsSelected(value) {
      this.recommendationsSelected = value;
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

    getRegions() {
      return this.country;
    }

    setRegions(value) {
      this.country = value;
    }

    getChosenCountry() {
      return this.chosenCountry;
    }

    setChosenCountry(value) {
      this.chosenCountry = value;
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
        chosenCountry: this.chosenCountry,
        chosenRegion: this.chosenRegion,
        chosenRegionCoordinates: this.chosenRegionCoordinates,
        recommendations: this.recommendations,
        recommendationsSelected: this.recommendationsSelected,
        inTheBackpackSelected: this.inTheBackpackSelected,
        recommendationsOnlyItemSelected: this.recommendationsOnlyItemSelected,
        countriesInTheWorld: this.countriesInTheWorld,
        countryGeojson: this.countryGeojson,
        lat: this.lat,
        long: this.long,
        dateOfTravel: this.dateOfTravel,
        regionsStoredFirebase: this.regionsStoredFirebase,
        listRecosForNextClick: this.listRecosForNextClick
      };

      return user;
    }
}
