import React from 'react';
import { BaseScene } from 'components';
import template from './travelDecisionTemplate';
import { AsyncStorage } from 'react-native';

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
      const userId = this.user.getUserId();
      const dateAndRegion = {'users': {[userId]: {'region': {[chosenRegionOrCountry]: {'date': this.state.date}}}}};
      const firstTimeStoreDataAndRegion = await this.storage.set(this.user.getUserId(), JSON.stringify(dateAndRegion));
      const existingDataAndRegion = await this.storage.get(this.user.getUserId());
      firebase.database().ref('users/' + this.user.getUserId()).set({'region': {[chosenRegionOrCountry]: {'date': this.state.date}}});
      return true;
    } else {
      // Same as I do in firebase I do it in the asyncStorage
      const dateAndRegion = {[chosenRegionOrCountry]: {'date': this.state.date}};
      const existingDataAndRegion = await this.storage.get(this.user.getUserId());
      Object.assign(Object.values(JSON.parse(existingDataAndRegion).users[0].region, dateAndRegion));
      const otherTimesStoreDataAndRegion = await this.storage.set(this.user.getUserId(), JSON.stringify(existingDataAndRegion));
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
    const countriesInTheWorld = await this.getCountries();
    this.user.setCountriesInTheWorld(countriesInTheWorld);
  }

  checkCountry () {
    if (this.state.text.length >= 2) {
      this.user.getCountriesInTheWorld().find((country) => {
        if (country.includes(this.state.text)) {
          this.user.setChosenCountry(country);
          this.setState({ country: country });
        } else {
          return false;
        }
      });
    }
  }

  async chargeGeojsonCountry () {
    const features = GeojsonCountries.features;
    for (let objEachCountry of features) {
      if (objEachCountry.properties.name === this.state.country) {
        const coordinatesLatAndLong = await this.calculateLongAndLat(objEachCountry.geometry.coordinates);
        this.user.setLat(coordinatesLatAndLong.latitude);
        this.user.setLong(coordinatesLatAndLong.longitude);
        const completeGeojsonCountry = {'type': 'FeatureCollection', 'features': [objEachCountry]};
        return this.user.setCountryGeojson(completeGeojsonCountry);
      }
    }
  }

  getCountries () {
    let countriesArr = [];
    GeojsonCountries.features.forEach((objEachCountry) => {
      const countryName = objEachCountry.properties.name;
      countriesArr.push(countryName);
    });
    return countriesArr;
  }

  async onClickListItem (item) {
    try {
      this.user.setChosenRegion(item);
      return this.toggleModal();
    } catch (error) {
      console.warn(error.message);
    }
  }

  async calculateLongAndLat (array) {
    const firstLongLat = array[0][0];
    const lastLongLat = array[0][0];
    const longitude = await this.getNumber(firstLongLat[0], 0);
    const latitude = await this.getNumber(firstLongLat[1], 1);
    return {longitude, latitude};
  }

  async getNumber (num, index) {
    if (!num[index]) return Number(num);
    return this.getNumber(num[index]);
  }

  async onPressCountryOverlay () {
    console.warn('onPressCountryOverlay');
    this.setState({countryInput: this.state.country, text: this.state.countryInput});
    await this.refs.countryInput.blur();
    await this.checkCountry();
    await this.chargeGeojsonCountry();
  }

  render () {
    return template(this);
  }
}

export default connect()(TravelDecisionController);
