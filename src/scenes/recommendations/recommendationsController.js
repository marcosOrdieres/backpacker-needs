import React from 'react';
import { BaseScene } from 'components';
import template from './recommendationsTemplate';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { View } from 'react-native';
import services from '../../services';
import { Linking } from 'react-native';

class RecommendationsController extends BaseScene {
  // The calls to Firebase that are read, instead of read in Firebase,
  // I read it from AsyncStorage, but write, I write in both (firebase in the background)
  constructor (args) {
    super(args);
    this.services = services;
    this.storage = this.services.Storage;
    this.state = {
      selected: false,
      externalData: null,
      index: 0,
      spinnerVisible: false,
      collapsed: {}
    };
  }

  async componentDidMount () {
    this.props.navigation.addListener('didFocus', async () => {
      if (this.rootStore.getState().isRegionChanged || this.rootStore.getState().isRecosUpdated) {
        await this.checkSelectedRecommendations();
        await this.checkDaysFocus();
        await this.rootStore.dispatch({ type: 'REGION_CHANGED', isRegionChanged: false});
        await this.rootStore.dispatch({ type: 'RECOS_UPDATED', isRecosUpdated: false});
        await this.setState({externalData: true});
      }
    });
  }

  async checkSelectedRecommendations () {
    const checkListRecos = await this.readValueListRecommendations();
    const listRecommendationsArray = await this.listRecommendationsWhichSelected(checkListRecos);
    return listRecommendationsArray;
  }

  async readValueListRecommendations () {
    let recommendationSelected;
    if (this.user.getChosenRegion()) {
      const chosenRegionString = this.user.getChosenRegion();
      // Instead of reading from Firebase, I read from AsyncStorage
      // recommendationSelected = firebase.database().ref('users/' + this.user.getUserId() + '/region/' + this.user.getChosenRegion() + '/recommendationSelected');
      const userDataStorage = await this.storage.get(this.user.getUserId());
      if (!Object.values(JSON.parse(userDataStorage).users)[0].region[chosenRegionString]) {
        return null;
      } else {
        recommendationSelected = Object.values(JSON.parse(userDataStorage).users)[0].region[chosenRegionString].recommendationSelected;
        return recommendationSelected;
      }
    } else {
      const chosenCountryString = this.user.getChosenCountry();
      // Instead of reading from Firebase, I read from AsyncStorage
      // recommendationSelected = firebase.database().ref('users/' + this.user.getUserId() + '/region/' + this.user.getChosenCountry() + '/recommendationSelected');
      const userDataStorage = await this.storage.get(this.user.getUserId());
      if (!Object.values(JSON.parse(userDataStorage).users)[0].region[chosenCountryString]) {
        return null;
      } else {
        recommendationSelected = Object.values(JSON.parse(userDataStorage).users)[0].region[chosenCountryString].recommendationSelected;
        return recommendationSelected;
      }
    }
  }

  async onClickListItemRecommendations (item) {
    try {
      let chosenRegionOrCountry;
      if (this.user.getChosenRegion()) {
        chosenRegionOrCountry = this.user.getChosenRegion();
      } else {
        chosenRegionOrCountry = this.user.getChosenCountry();
      }
      this.setState({spinnerVisible: true});
      const listRecos = await this.readValueListRecommendations();
      let isItemSelected = false;

      if (listRecos) {
        Object.values(listRecos).forEach((recommendation) => {
          if (recommendation === item.value) {
            isItemSelected = true;
            return isItemSelected;
          } else {
            return true;
          }
        });
      }

      if (!listRecos) {
        // Here the list of Recommendations is empty cause there is none, so we update
        // Write in Firebase in Background, do it for AsyncStorage
        firebase.database().ref('users/' + this.user.getUserId()).child('region').child(chosenRegionOrCountry).update({recommendationSelected: {[item]: item}});
        const userDataStorage = await this.storage.get(this.user.getUserId());
        const newRecommendation = {'recommendationSelected': {[item]: item}};
        const newObject = Object.assign(Object.values(JSON.parse(userDataStorage).users)[0].region[chosenRegionOrCountry], newRecommendation);
        const newObjParsed = JSON.parse(userDataStorage);
        Object.values(newObjParsed.users)[0].region[chosenRegionOrCountry] = newObject;
        await this.storage.set(this.user.getUserId(), JSON.stringify(newObjParsed));
        const listRecos = await this.readValueListRecommendations();
        this.listRecommendationsWhichSelected(listRecos);
        this.setState({externalData: true});
      } else {
        // Here the list of Recommendations has data, so we push into existing
        if (!isItemSelected) {
          firebase.database().ref('users/' + this.user.getUserId()).child('region').child(chosenRegionOrCountry).child('recommendationSelected').push(item);
          // Here get from asyncstorage, parse, add the item into recommendationSelected and set again the new obj for asyncstorage
          let userDataStorage = await this.storage.get(this.user.getUserId());
          const userDataStorageParsed = JSON.parse(userDataStorage);
          Object.values(userDataStorageParsed.users)[0].region[chosenRegionOrCountry].recommendationSelected[item.toString()] = item.toString();
          const otherTimesStoreDataAndRegion = await this.storage.set(this.user.getUserId(), JSON.stringify(userDataStorageParsed));
          const listRecos = await this.readValueListRecommendations();
          this.listRecommendationsWhichSelected(listRecos);
          this.setState({externalData: true});
        } else {
          // If there are itemsSelected, but are already selected and I want to deselect them.
          // first time here does not work.
          let userDataStorage = await this.storage.getAsyncStorage(this.user.getUserId());
          delete Object.values(userDataStorage.users)[0].region[chosenRegionOrCountry].recommendationSelected[item.value.toString()];
          const otherTimesStoreDataAndRegion = await this.storage.setAsyncStorage(this.user.getUserId(), userDataStorage);
          let userDataStorageSecond = await this.storage.getAsyncStorage(this.user.getUserId());
          const listRecos = await this.readValueListRecommendations();
          this.listRecommendationsWhichSelected(listRecos);
          this.setState({spinnerVisible: false});
        }
      }
    } catch (error) {
      console.warn(error.message);
    }
  }

  onClickAmazonItems (item) {
    console.warn('EL ITEM: ', item);
    if (item === 'Kindle') {
      Linking.openURL('https://www.amazon.com/gp/product/B07CXG6C9W?ie=UTF8&tag=pack1989-20&camp=1789&linkCode=xm2&creativeASIN=B07CXG6C9W');
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

export default connect()(RecommendationsController);
