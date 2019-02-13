import React from 'react';
import { View} from 'react-native';
import { BaseScene } from 'components';
import template from './splashTemplate';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import services from '../../services';

class SplashController extends BaseScene {
  constructor (args) {
    super(args);
    this.services = services;
    this.firebaseAnalytics.setAnalyticsCollectionEnabled(true);
    this.storage = this.services.Storage;
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

      // These two take them from AsyncStorage
      // Also  do setChosenCountry and setChosenRegion here from AsyncStorage
      await this.getDataItem();
      await this.getDataItemRecommendations();
      await this.getDataItemRecosAmazonLinks();

      const userDataStorage = await this.storage.getAsyncStorage(this.user.getUserId());
      const countryOrRegion = Object.keys(Object.values(userDataStorage.users)[0].region)[0];

      // Check if it is region or country to store it.
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

      await this.setState({externalData: 'yes'});
      return await this.navigateTo('Menu');
    } catch (error) {
      // TODO: fix this
      const getDataItemDidMount = await this.getDataItem();
      const getDataItemRecommendationsDidMount = await this.getDataItemRecommendations();
      const getItemREcosAmazonLinksDidMount = await this.getDataItemRecosAmazonLinks();
      await this.setState({externalData: 'yes'});
      return await this.navigateTo('Home');
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
      let valueList;
      const regionStored = await this.storage.getAsyncStorage('region');
      if (!regionStored) {
        const eventref = firebase.database().ref('region/');
        const snapshot = await eventref.once('value');
        valueList = snapshot.val();
      } else {
        valueList = await this.storage.getAsyncStorage('region');
      }
      await this.storage.setAsyncStorage('region', valueList);
      this.user.setRegions(valueList);
      const countries = Object.keys(valueList);
      countriesSorted = countries.sort();
      return countriesSorted;
    } catch (error) {
      console.warn(error.message);
    }
  }

  async getDataItemRecommendations () {
    try {
      let valueList;
      const recosStored = await this.storage.getAsyncStorage('recommendations');
      if (!recosStored) {
        // Aqui pillo las recomendaciones de firebase
        const locale = this.i18n.currentLocale().substring(0, 2);
        const eventref = firebase.database().ref('recommendationsTotal/').child(locale).child('/recommendations');
        const snapshot = await eventref.once('value');
        valueList = snapshot.val();
        if (!valueList) {
          const eventref = firebase.database().ref('recommendationsTotal/').child('en').child('/recommendations');
          const snapshot = await eventref.once('value');
          valueList = snapshot.val();
        }
      } else {
        valueList = await this.storage.getAsyncStorage('recommendations');
      }
      await this.storage.setAsyncStorage('recommendations', valueList);
      this.user.setRecommendations(valueList);
      return valueList;
    } catch (error) {
      console.warn(error.message);
    }
  }

  async getDataItemRecosAmazonLinks () {
    try {
      let valueListLinks;
      const recosAmazonLinksStored = await this.storage.getAsyncStorage('amazonLinks');
      if (!recosAmazonLinksStored) {
        // Aqui pillo las recomendaciones de firebase
        const locale = this.i18n.currentLocale().substring(0, 2);
        const eventref = firebase.database().ref('amazonLinks/').child(locale);
        const snapshot = await eventref.once('value');
        valueListLinks = snapshot.val();
        if (!valueListLinks) {
          const eventref = firebase.database().ref('amazonLinks/').child('en');
          const snapshot = await eventref.once('value');
          valueListLinks = snapshot.val();
        }
      } else {
        valueListLinks = await this.storage.getAsyncStorage('amazonLinks');
      }
      await this.storage.setAsyncStorage('amazonLinks', valueListLinks);
      this.user.setAmazonLinksRecommendations(valueListLinks);
      return valueListLinks;
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
