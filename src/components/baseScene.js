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
    this.firebaseAnalytics = firebase.analytics();
  }

  async getUserDataForLogin () {
    try {
      const eventref = firebase.database().ref('users/' + this.user.getUserId());
      // Esto tiene que tener la misma forma que cuando hago el sign up
      const snapshot = await eventref.once('value');
      valueList = snapshot.val();
      return valueList;
    } catch (error) {
      console.warn(error.message);
    }
  }

  async loginDataWithFirebase () {
    try {
      const userDataFirebase = await this.getUserDataForLogin();
      const countryOrRegion = Object.keys(userDataFirebase.region)[0];
      const regions = this.user.getRegions();
      const chooseRegionOrCountry = Object.keys(regions).forEach((region) => {
        if (region === countryOrRegion) {
          this.rootStore.dispatch({ type: 'SAME_REGION', isSameRegion: true});
        }
      });

      if (this.rootStore.getState().isSameRegion) {
        this.rootStore.dispatch({ type: 'SAME_REGION', isSameRegion: false});
        this.user.setChosenRegion(countryOrRegion);
      } else {
        this.user.setChosenCountry(countryOrRegion);
        this.chargeGeojsonCountry(countryOrRegion);
      }
      const userDataForLocalStorage = {'users': {[this.user.getUserId()]: userDataFirebase}};
      // In The login, I create the object with all the things in the USer from Firebase
      await this.storage.setAsyncStorage(this.user.getUserId(), userDataForLocalStorage);
      await this.setState({externalData: 'yes'});
      return await this.navigateTo('Menu');
    } catch (error) {
      await this.setState({externalData: 'yes'});
      return await this.navigateTo('Home');
    }
  }

  async listRecommendationsWhichSelected (checkListRecos) {
    let myArr = [];
    let myArrFinal = [];
    let myArrItem = [];
    let flag = false;
    const group = Object.keys(this.user.getRecommendations()).map((group, index) => {
      myArrFinal[index] = {key: group};
      return this.user.getRecommendations()[group];
    });
    group.forEach((groupItem, index, array) => {
      const indexOfArray = group.indexOf(groupItem);
      Object.values(groupItem).forEach((item, index, array) => {
        if (checkListRecos && Object.values(checkListRecos).includes(item)) {
          myArrItem.push({value: item, selectedRecommendations: true});
          return myArrFinal[indexOfArray].data = [myArrItem];
        } else {
          myArrItem.push(item);
          return myArrFinal[indexOfArray].data = [myArrItem];
        }
      });
      this.user.setRecommendationsSelected(myArrFinal);
      myArrItem = [];
      return myArrFinal;
    });

    this.user.getRecommendationsSelected().forEach(value => {
      if (value.key == this.i18n.t('recommendations.myTravelerItems')) {
        flag = true;
        return false;
      }
    });

    if (!flag) {
      this.user.getRecommendationsSelected().push({key: this.i18n.t('recommendations.myTravelerItems'), data: [[{value: 'Backpack', selectedRecommendations: true}]]});
    }
  }

  async chargeGeojsonCountry (country) {
    const features = GeojsonCountries.features;
    const locale = this.i18n.currentLocale().substring(0, 2);
    for (let objEachCountry of features) {
      if (locale === 'es') {
        if (objEachCountry.properties.nameEs === country) {
          const coordinatesLatAndLong = await this.calculateLongAndLat(objEachCountry.geometry.coordinates);
          this.user.setLat(coordinatesLatAndLong.latitude);
          this.user.setLong(coordinatesLatAndLong.longitude);
          const completeGeojsonCountry = {'type': 'FeatureCollection', 'features': [objEachCountry]};
          return this.user.setCountryGeojson(completeGeojsonCountry);
        }
      } else {
        if (objEachCountry.properties.name === country) {
          const coordinatesLatAndLong = await this.calculateLongAndLat(objEachCountry.geometry.coordinates);
          this.user.setLat(coordinatesLatAndLong.latitude);
          this.user.setLong(coordinatesLatAndLong.longitude);
          const completeGeojsonCountry = {'type': 'FeatureCollection', 'features': [objEachCountry]};
          return this.user.setCountryGeojson(completeGeojsonCountry);
        }
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
    if (!userDataStorage) {
      return null;
    } else {
      const countriesSelected = Object.values(userDataStorage.users)[0].region;
      return countriesSelected;
    }
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

  resetActionNavigation () {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Home' })]
    });
    return this.props.navigation.dispatch(resetAction);
  }

  pushNavigatorStack (route) {
    const pushAction = StackActions.push({
      routeName: route
    });
    return this.props.navigation.dispatch(pushAction);
  }

  setState (args) {
    return new Promise((resolve) => super.setState(args, resolve));
  }
}
