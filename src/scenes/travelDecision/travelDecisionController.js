import React from 'react';
import { BaseScene } from 'components';
import template from './travelDecisionTemplate';
import services from '../../services';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { View, Text, BackHandler } from 'react-native';
import GeojsonCountries from '../../assets/mapJson/countriesJson.json';
import moment from 'moment';

// goback
// si demo y , no go back, solo segundo pa fuera
// si
class TravelDecisionController extends BaseScene {
  constructor (args) {
    super(args);
    this.services = services;
    this.storage = this.services.Storage;
    const now = moment().format();
    this.state = {
      text: '',
      country: '',
      countriesArray: [],
      region: '',
      date: now,
      letsgo: false,
      isModalVisible: false,
      focusOnCountry: false
    };
  }

  regionOrCountry () {
    if (this.user.getChosenRegion()) {
      return this.user.getChosenRegion();
    } else {
      return this.user.getChosenCountry();
    }
  }

  async sendRegionOrCountryAndDate () {
    const chosenRegionOrCountry = await this.regionOrCountry();
    const isCountryStored = await this.readListSelectedCountries();
    if (!isCountryStored) {
      const userId = this.user.getUserId().toString();
      const dateAndRegion = {'users': {[userId]: {'region': {[chosenRegionOrCountry]: {'date': this.state.date}}}}};
      // AsyncStorage
      const firstTimeStoreDataAndRegion = await this.storage.set(this.user.getUserId(), JSON.stringify(dateAndRegion));
      const existingDataAndRegion = await this.storage.get(this.user.getUserId());
      // firebase
      firebase.database().ref('users/' + this.user.getUserId()).set({'region': {[chosenRegionOrCountry]: {'date': this.state.date}}});
      return true;
    } else {
      const dateAndRegion = {[chosenRegionOrCountry]: {'date': this.state.date}};
      const existingDataAndRegion = await this.storage.get(this.user.getUserId());
      const newObject = Object.assign(Object.values(JSON.parse(existingDataAndRegion).users)[0].region, dateAndRegion);
      const newObjParsed = JSON.parse(existingDataAndRegion);
      Object.values(newObjParsed.users)[0].region = newObject;
      // AsyncStorage
      const otherTimesStoreDataAndRegion = await this.storage.set(this.user.getUserId(), JSON.stringify(newObjParsed));
      const hola = await this.storage.get(this.user.getUserId());
      // firebase
      firebase.database().ref('users/' + this.user.getUserId()).child('region').update({ [chosenRegionOrCountry]: {'date': this.state.date}});
      return true;
    }
  }

  async checkLetsGo () {
    if (this.state.country.length > 3 || (this.user.getChosenRegion() || this.user.getChosenCountry())) {
      return this.setState({ letsgo: true });
    } else {
      return true;
    }
  }

  toggleModal () {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  async componentDidMount () {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.navigateTo('whatDoesThisApp');
    });
    const countriesInTheWorld = await this.getCountriesList();
    this.user.setCountriesInTheWorld(countriesInTheWorld);
  }

  checkCountry () {
    let countryArr = [];
    if (this.state.text.length >= 2) {
      this.user.getCountriesInTheWorld().find((country) => {
        if (country.toLowerCase().contains(this.state.text.toLowerCase())) {
          countryArr.push(country);
          this.user.setChosenCountry(country);
          this.user.setChosenRegion(undefined);
          // tengo que convertir esto en un array
          this.setState({
            countriesArray: countryArr,
            country: country
          });
        } else {
          return false;
        }
      });
    }
  }

  getCountriesList () {
    let countriesArr = [];
    const locale = this.i18n.currentLocale().substring(0, 2);
    GeojsonCountries.features.forEach((objEachCountry) => {
      if (locale === 'es') {
        const countryName = objEachCountry.properties.nameEs;
        countriesArr.push(countryName);
      } else if (locale === 'de') {
        const countryName = objEachCountry.properties.nameDe;
        countriesArr.push(countryName);
      } else {
        const countryName = objEachCountry.properties.name;
        countriesArr.push(countryName);
      }
    });
    return countriesArr;
  }

  async onClickListItem (item) {
    try {
      this.user.setChosenRegion(item);
      this.user.setChosenCountry(undefined);
      this.setState({ text: '', country: '', countryInput: ''});
      return this.toggleModal();
    } catch (error) {
      console.warn(error.message);
    }
  }

  async onPressCountryOverlay (value) {
    const country = this.state.country;
    this.setState({countryInput: value, text: this.state.countryInput});
    await this.refs.countryInput.blur();
    await this.checkCountry();
    await this.chargeGeojsonCountry(value);
  }

  render () {
    return template(this);
  }
}

export default connect()(TravelDecisionController);
