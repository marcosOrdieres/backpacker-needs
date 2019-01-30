import React from 'react';
import { BaseScene } from 'components';
import template from './travelDecisionTemplate';
import services from '../../services';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { View, Text } from 'react-native';
import GeojsonCountries from '../../assets/mapJson/countriesJson.json';
import moment from 'moment';

class TravelDecisionController extends BaseScene {
  constructor (args) {
    super(args);
    this.services = services;
    this.storage = this.services.Storage;
    const now = moment().format();
    this.state = {
      text: '',
      country: '',
      region: '',
      date: now,
      letsgo: false,
      isModalVisible: false
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
    const now = moment().format();
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
    const countriesInTheWorld = await this.getRegions();
    this.user.setCountriesInTheWorld(countriesInTheWorld);
  }

  checkCountry () {
    if (this.state.text.length >= 2) {
      this.user.getCountriesInTheWorld().find((country) => {
        if (country.includes(this.state.text)) {
          // set Coutrny
          this.user.setChosenCountry(country);
          this.setState({ country: country });
        } else {
          return false;
        }
      });
    }
  }

  getRegions () {
    let countriesArr = [];
    GeojsonCountries.features.forEach((objEachCountry) => {
      const countryName = objEachCountry.properties.name;
      countriesArr.push(countryName);
    });
    return countriesArr;
  }

  async onClickListItem (item) {
    // set Region
    try {
      this.user.setChosenRegion(item);
      return this.toggleModal();
    } catch (error) {
      console.warn(error.message);
    }
  }

  async onPressCountryOverlay () {
    const country = this.state.country;
    this.setState({countryInput: this.state.country, text: this.state.countryInput});
    await this.refs.countryInput.blur();
    await this.checkCountry();
    await this.chargeGeojsonCountry(country);
  }

  render () {
    return template(this);
  }
}

export default connect()(TravelDecisionController);
