import React from 'react';
import { BaseScene } from 'components';
import template from './travelDecisionTemplate';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { View, Text } from 'react-native';
import GeojsonCountries from '../../assets/mapJson/countriesJson.json';

class TravelDecisionController extends BaseScene {
  constructor (args) {
    super(args);
    this.state = {
      text: '',
      country: '',
      date: '2016-05-15',
      letsgo: false
    };
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
        const coordinatesLatAndLong = calculateLongAndLat(objEachCountry.geometry.coordinates);
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

  onClickListItem (item) {
    try {
      this.user.setChosenRegion(item);
      firebase.database().ref('users/' + this.user.getUserId()).set({
        region: item
      });

      return this.navigateTo('Menu');
    } catch (error) {
      console.warn(error.message);
    }
  }

  render () {
    return template(this);
  }
}

function calculateLongAndLat (array) {
  const firstLongLat = array[0][0];
  const lastLongLat = array[0][0];
  const longitude = getNumber(firstLongLat[0], 0);
  const latitude = getNumber(firstLongLat[1], 1);
  return {longitude, latitude};
}

function getNumber (num, index) {
  if (!num[index]) return Number(num);
  return getNumber(num[index]);
}

export default connect()(TravelDecisionController);
