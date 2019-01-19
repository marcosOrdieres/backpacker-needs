import React, { Component } from 'react';
import i18n from '../translations';
import User from '../models/user';
import rootStore from '../stores/root';
import env from '../config/env';
import palette from '../common/palette';
import { NetInfo } from 'react-native';
import firebase from 'react-native-firebase';
import { StackActions, NavigationActions } from 'react-navigation';
import services from '../services';
import GeojsonCountries from '../assets/mapJson/countriesJson.json';

export default class BaseScene extends Component {
  constructor (args) {
    super();
    this.services = services;
    this.storage = this.services.Storage;
    this.i18n = i18n;
    this.user = User.instance;
    this.rootStore = rootStore;
    this.env = env;
    this.palette = palette;
  }

  async chargeGeojsonCountry (country) {
    const features = GeojsonCountries.features;
    for (let objEachCountry of features) {
      if (objEachCountry.properties.name === country) {
        const coordinatesLatAndLong = await this.calculateLongAndLat(objEachCountry.geometry.coordinates);
        this.user.setLat(coordinatesLatAndLong.latitude);
        this.user.setLong(coordinatesLatAndLong.longitude);
        const completeGeojsonCountry = {'type': 'FeatureCollection', 'features': [objEachCountry]};
        return this.user.setCountryGeojson(completeGeojsonCountry);
      }
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

  async readListSelectedCountries () {
    const userDataStorage = await this.storage.getAsyncStorage(this.user.getUserId());
    const countriesSelected = Object.values(userDataStorage.users)[0].region;
    return countriesSelected;
  }

  async callToCheckDaysFocus (howManyDays) {
    const snapshot = await howManyDays.once('value');
    const valueDays = snapshot.val();
    return this.user.setDateOfTravel(valueDays);
  }

  async checkDaysFocus () {
    // I check the days Focus, it depends if it is Region or Country.
    if (!this.user.getChosenRegion()) {
      const howManyDays = firebase.database().ref('users/' + this.user.getUserId() + '/region/' + this.user.getChosenCountry() + '/date');
      this.callToCheckDaysFocus(howManyDays);
    } else {
      const howManyDays = firebase.database().ref('users/' + this.user.getUserId() + '/region/' + this.user.getChosenRegion() + '/date');
      this.callToCheckDaysFocus(howManyDays);
    }
  }

  checkHowManyDays () {
    const oneDay = 24 * 60 * 60 * 1000;
    const dateOfTravel = new Date(this.user.getDateOfTravel());
    const now = new Date();
    const diffDays = Math.round(Math.abs((now.getTime() - dateOfTravel.getTime()) / (oneDay)));
    return diffDays;
  }

  navigateTo (destination) {
    this.props.navigation.navigate(destination);
  }

  resetNavigation (route) {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: route })]
    });
    this.props.navigation.dispatch(resetAction);
  }

  setState (args) {
    return new Promise((resolve) => super.setState(args, resolve));
  }
}
