import React from 'react';
import { BaseScene } from 'components';
import template from './recommendationsTemplate';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { View } from 'react-native';
import services from '../../services';

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

  async listRecommendationsWhichSelected (checkListRecos) {
    let myArr = [];
    let myArrFinal = [];
    let myArrItem = [];
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

      console.warn('ESE 11: ', userDataStorage);

      if (!Object.values(JSON.parse(userDataStorage).users)[0].region.chosenRegionString) {
        recommendationSelected = null;
        return recommendationSelected;
      } else {
        recommendationSelected = Object.values(JSON.parse(userDataStorage).users)[0].region.chosenRegionString.recommendationSelected;
        return recommendationSelected;
      }
    } else {
      const chosenCountryString = this.user.getChosenCountry();
      // Instead of reading from Firebase, I read from AsyncStorage
      // recommendationSelected = firebase.database().ref('users/' + this.user.getUserId() + '/region/' + this.user.getChosenCountry() + '/recommendationSelected');
      const userDataStorage = await this.storage.get(this.user.getUserId());
      console.warn('EL MISTERIOOO: ', userDataStorage);
      if (!Object.values(JSON.parse(userDataStorage).users)[0].region[chosenCountryString]) {
        recommendationSelected = null;
        return recommendationSelected;
      } else {
        recommendationSelected = Object.values(JSON.parse(userDataStorage).users)[0].region[chosenCountryString].recommendationSelected;
        return recommendationSelected;
      }
    }
    console.warn('LAS RECOS SELECCIONADAS: ', recommendationSelected);
    return recommendationSelected;
    // const snapshot = await recommendationSelected.once('value');
    // const valueListRecommendations = snapshot.val();
    // return valueListRecommendations;
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
      if (!listRecos) {
        // Here the list of Recommendations is empty cause there is none, so we update
        // Write in Firebase in Background, do it for AsyncStorage
        firebase.database().ref('users/' + this.user.getUserId()).child('region').child(chosenRegionOrCountry).update({recommendationSelected: {item}});
        let userDataStorage;
        userDataStorage = await this.storage.get(this.user.getUserId());
        console.warn('11111: ', userDataStorage);
        const newRecommendation = {'recommendationSelected': {item}};
        console.warn('ESTO: ', newRecommendation);

        const newObject = Object.assign(Object.values(JSON.parse(userDataStorage).users)[0].region[chosenRegionOrCountry], newRecommendation);

        const newObjParsed = JSON.parse(userDataStorage);
        Object.values(newObjParsed.users)[0].region[chosenRegionOrCountry] = newObject;

        console.warn('222222: ', newObjParsed);
        await this.storage.set(this.user.getUserId(), JSON.stringify(newObjParsed));

        const laMovida = await this.storage.get(this.user.getUserId());
        console.warn('ESTA ES LA MOVIDA DE CUANDO NOOOOOO HAY: ', laMovida);

        const listRecos = await this.readValueListRecommendations();
        console.warn('333333333', listRecos);
        this.listRecommendationsWhichSelected(listRecos);
        this.setState({externalData: true, spinnerVisible: false});
      } else {
        // Here the list of Recommendations has data, so we push into existing
        if (!Object.values(listRecos).includes(item)) {
          firebase.database().ref('users/' + this.user.getUserId()).child('region').child(chosenRegionOrCountry).child('recommendationSelected').push(item);

          const userDataStorage = await this.storage.get(this.user.getUserId());
          console.warn('4444444', userDataStorage);
          const newObject = Object.assign(Object.values(JSON.parse(userDataStorage).users)[0].region.chosenRegionOrCountry.recommendationSelected, item);
          console.warn('555555', newObject);

          const newObjParsed = JSON.parse(userDataStorage);
          console.warn('666666666', newObjParsed);

          Object.values(newObjParsed.users)[0].region.chosenRegionOrCountry.recommendationSelected = newObject;
          console.warn('777777', newObjParsed);

          const otherTimesStoreDataAndRegion = await this.storage.set(this.user.getUserId(), JSON.stringify(newObjParsed));

          const laMovida = await this.storage.get(this.user.getUserId());
          console.warn('ESTA ES LA MOVIDA DE CUANDO SIIIIII HAY: ', laMovida);

          const listRecos = await this.readValueListRecommendations();
          console.warn('888888888 :', listRecos);
          this.listRecommendationsWhichSelected(listRecos);
          this.setState({externalData: true, spinnerVisible: false});
        } else {
          this.setState({spinnerVisible: false});
          console.warn('THE ITEM IS ALREADY IN THE RECOMMENDATIONS SELECTED DATABASE, PLEASE CHOOSE ANOTHER ONE');
        }
      }
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

export default connect()(RecommendationsController);
