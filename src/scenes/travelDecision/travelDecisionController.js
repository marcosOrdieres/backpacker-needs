import React from 'react';
import { BaseScene } from 'components';
import template from './travelDecisionTemplate';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { View, Text } from 'react-native';
import GeojsonCountries from '../../assets/mapJson/countriesJson.json';
import moment from 'moment';

class TravelDecisionController extends BaseScene {
  constructor (args) {
    super(args);
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

  async sendRegionAndDate () {
    const getChosenRegion = await this.user.getChosenRegion();
    const isCountryStored = await this.readListSelectedCountries();
    if (!isCountryStored) {
      await firebase.database().ref('users/' + this.user.getUserId()).set({
        'region': {
          [getChosenRegion]: {
            'date': this.state.date
          }
        }
      });
      return true;
    } else {
      await firebase.database().ref('users/' + this.user.getUserId())
      .child('region')
      .update({ [getChosenRegion]: {
        'date': this.state.date
      }});
      return true;
    }
  }

  async checkLetsGo () {
    const now = moment().format();
    if (this.state.country.length > 3 || this.user.getChosenRegion()) {
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
          this.setState({ country: country });
          this.chargeGeojsonCountry();
        } else {
          return false;
        }
      });
    }
  }

  chargeGeojsonCountry () {
    GeojsonCountries.features.forEach((objEachCountry) => {
      if (objEachCountry.properties.name === this.state.country) {
        const coordinatesLatAndLong = this.calculateLongAndLat(objEachCountry.geometry.coordinates);
        this.user.setLat(coordinatesLatAndLong.latitude);
        this.user.setLong(coordinatesLatAndLong.longitude);
        const completeGeojsonCountry = {'type': 'FeatureCollection', 'features': [objEachCountry]};
        return this.user.setCountryGeojson(completeGeojsonCountry);
      }
    });
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

  calculateLongAndLat (array) {
    const firstLongLat = array[0][0];
    const lastLongLat = array[0][0];
    const longitude = this.getNumber(firstLongLat[0], 0);
    const latitude = this.getNumber(firstLongLat[1], 1);
    return {longitude, latitude};
  }

  getNumber (num, index) {
    if (!num[index]) return Number(num);
    return getNumber(num[index]);
  }

  render () {
    return template(this);
  }
}

export default connect()(TravelDecisionController);
