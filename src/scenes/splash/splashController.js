import React from 'react';
import { View} from 'react-native';
import { BaseScene } from 'components';
import template from './splashTemplate';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';

class SplashController extends BaseScene {
  constructor (args) {
    super(args);
    this.initializeApplication();
    this.state = {
      userLoggedIn: false,
      externalData: null
    };
  }

  async initializeApplication () {
    try {
      this.initializeFirebaseApp();
      this.isNewOrExistingUser();
    } catch (error) {
      console.warn(error);
    }
  }

  async initializeFirebaseApp () {
    try {
      const firebaseConfig = {
        apiKey: this.env.apiKey,
        authDomain: this.env.authDomain,
        databaseURL: this.env.databaseURL
      };
      const firebaseApp = firebase.app(firebaseConfig);
    } catch (error) {
      console.warn(error.message);
    }
  }

  async isNewOrExistingUser () {
    try {
      const isUserLoggedIn = await this.isUserLoggedIn();
      this.user.setUserId(isUserLoggedIn);

      const getDataItemDidMount = await this.getDataItem();
      const getDataItemRecommendationsDidMount = await this.getDataItemRecommendations();
      await this.setState({externalData: 'yes'});

      return this.navigateTo('TravelDecision');
    } catch (error) {
      console.warn(error.message);
      this.navigateTo('Home');
    }
  }

  async isUserLoggedIn () {
    return new Promise(function (resolve, reject) {
      firebase.auth().onAuthStateChanged(userMetadata => {
        if (userMetadata) {
          resolve(userMetadata.uid);
        } else {
          reject('Not Logged in', userMetadata);
        }
      });
    });
  }

  async getDataItem () {
    try {
      const eventref = firebase.database().ref('region/');
      const snapshot = await eventref.once('value');
      const valueList = snapshot.val();
      this.user.setCountries(valueList);
      const countries = Object.keys(valueList);
      countriesSorted = countries.sort();
      return countriesSorted;
    } catch (error) {
      console.warn(error.message);
    }
  }

  async getDataItemRecommendations () {
    try {
			// Move it to splash
      const eventref = firebase.database().ref('recommendations/');
      const snapshot = await eventref.once('value');
      const valueList = snapshot.val();
      this.user.setRecommendations(valueList);
      return valueList;
    } catch (error) {
      console.warn(error.message);
    }
  }

  render () {
    if (this.state.externalData === null) {
      return <View />;
    } else {
      return template(this);
    }
  }
}

export default connect()(SplashController);
