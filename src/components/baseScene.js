import React, { Component } from 'react';
import i18n from '../translations';
import User from '../models/user';
import rootStore from '../stores/root';
import env from '../config/env';
import palette from '../common/palette';
import { NetInfo } from 'react-native';
import firebase from 'react-native-firebase';
import { StackActions, NavigationActions } from 'react-navigation';

export default class BaseScene extends Component {
  constructor (args) {
    super();
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

  resetNavigation(route){
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: route })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  setState (args) {
    return new Promise((resolve) => super.setState(args, resolve));
  }
}
