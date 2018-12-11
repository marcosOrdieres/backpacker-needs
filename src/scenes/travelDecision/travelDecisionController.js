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
      country: ''
      // countryInput: false

      // TODO: A picker for the Countries that match the letters
      // TODO: with this country chosen, check the geoJson and send it to the next screen
      // and for make a geoJson with this country.
    };
  }

  // onClickCountry (countryInput) {
  //   return this.setState({countryInput: countryInput});
  // }

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
        const latLong = calc(objEachCountry.geometry.coordinates);
        this.user.setLat(latLong.lat)
        this.user.setLong(latLong.long)
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

function calc(array) {
  const firstLongLat = array[0][0];
  const lastLongLat = array[0][0];
  const long = getNumber(firstLongLat[0], 0)
  const lat = getNumber(firstLongLat[1], 1)
  return {long, lat}
}

function getNumber(num, index) {
  if (!num[index]) return Number(num)
  return getNumber(num[index])
}

export default connect()(TravelDecisionController);
