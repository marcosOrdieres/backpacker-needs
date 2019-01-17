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
      console.warn('EL MISTERIOOO 1111: ', userDataStorage);

      if (!Object.values(JSON.parse(userDataStorage).users)[0].region[chosenCountryString]) {
        recommendationSelected = null;
        return recommendationSelected;
      } else {
        recommendationSelected = Object.values(JSON.parse(userDataStorage).users)[0].region[chosenCountryString].recommendationSelected;
        return recommendationSelected;
      }
    } else {
      const chosenCountryString = this.user.getChosenCountry();
      // Instead of reading from Firebase, I read from AsyncStorage
      // recommendationSelected = firebase.database().ref('users/' + this.user.getUserId() + '/region/' + this.user.getChosenCountry() + '/recommendationSelected');
      const userDataStorage = await this.storage.get(this.user.getUserId());
      console.warn('EL MISTERIOOO 22222: ', userDataStorage);
      if (!Object.values(JSON.parse(userDataStorage).users)[0].region[chosenCountryString]) {
        recommendationSelected = null;
        return recommendationSelected;
      } else {
        recommendationSelected = Object.values(JSON.parse(userDataStorage).users)[0].region[chosenCountryString].recommendationSelected;
        return recommendationSelected;
      }
    }
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
        const userDataStorage = await this.storage.get(this.user.getUserId());
        console.warn('AVERRR 1111: ',userDataStorage);
        const newRecommendation = {'recommendationSelected': {item}};

        const newObject = Object.assign(Object.values(JSON.parse(userDataStorage).users)[0].region[chosenRegionOrCountry], newRecommendation);
        const newObjParsed = JSON.parse(userDataStorage);

        Object.values(newObjParsed.users)[0].region[chosenRegionOrCountry] = newObject;

        await this.storage.set(this.user.getUserId(), JSON.stringify(newObjParsed));
        const listRecos = await this.readValueListRecommendations();

        this.listRecommendationsWhichSelected(listRecos);
        this.setState({externalData: true, spinnerVisible: false});
      } else {
        // Here the list of Recommendations has data, so we push into existing
        if (!Object.values(listRecos).includes(item)) {
          firebase.database().ref('users/' + this.user.getUserId()).child('region').child(chosenRegionOrCountry).child('recommendationSelected').push(item);

          const userDataStorage = await this.storage.get(this.user.getUserId());

          console.warn('AVERRR 222222: ',userDataStorage);


          // "qMjXWKQENWdkFHzD9RrMNQWaOUC2" : {
          //   "region" : {
          //     "Egypt" : {
          //       "date" : "2019-01-14",
          //       "recommendationSelected" : {
          //         "-LWCABbxafLvvuLhth2y" : "Travel Water Bottle",
          //         "item" : "Lock"
          //       }
          //     }
          const hola = {'item':{item}}
          console.warn('643646: ', Object.values(JSON.parse(userDataStorage).users)[0].region[chosenRegionOrCountry].recommendationSelected);

          const newObject = Object.assign(Object.values(Object.values(JSON.parse(userDataStorage).users)[0].region[chosenRegionOrCountry]), hola);
          console.warn('aver 333333', newObject);
          const newObjParsed = JSON.parse(userDataStorage);
          console.warn('aver 4444444', newObjParsed);


          Object.values(newObjParsed.users)[0].region[chosenRegionOrCountry].recommendationSelected = newObject;
          console.warn('EL NUEVO OBJ: ',newObjParsed );
          const otherTimesStoreDataAndRegion = await this.storage.set(this.user.getUserId(), JSON.stringify(newObjParsed));
          const laMovida = await this.storage.get(this.user.getUserId());
          const listRecos = await this.readValueListRecommendations();
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
