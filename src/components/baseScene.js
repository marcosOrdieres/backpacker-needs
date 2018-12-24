import React, { Component } from 'react';
import services from '../services';
import i18n from '../translations';
import User from '../models/user';
import rootStore from '../stores/root';
import routes from '../common/routes';
import env from '../config/env';
import palette from '../common/palette';
import { NetInfo } from 'react-native';
import firebase from 'react-native-firebase';

export default class BaseScene extends Component {
  constructor (args) {
    super();
    this.services = services;
    this.i18n = i18n;
    this.user = User.instance;
    this.rootStore = rootStore;
    this.env = env;
    this.palette = palette;
  }

  async readListSelectedCountries () {
    const countriesSelected = firebase.database().ref('users/' + this.user.getUserId() + '/region');
    const snapshot = await countriesSelected.once('value');
    const valueListCountriesSelected = snapshot.val();
    return valueListCountriesSelected;
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

  setState (args) {
    return new Promise((resolve) => super.setState(args, resolve));
  }
}
