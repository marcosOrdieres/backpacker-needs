import React from 'react';
import { BaseScene } from 'components';
import template from './travelDecisionTemplate';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { View, Text } from 'react-native';
import FuckinCountries from '../../assets/mapJson/countriesJson.json';

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

  chargeGeojsonCountry(){
    FuckinCountries.features.forEach((putoObj) => {
      if(putoObj.properties.name === this.state.country){
        return this.user.setCountryGeojson(putoObj.properties);
      }
    });
  }

  getCountries () {
    let countriesArr = [];
    FuckinCountries.features.forEach((putoObj) => {
      countriesArr.push(putoObj.properties.name);
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

export default connect()(TravelDecisionController);
