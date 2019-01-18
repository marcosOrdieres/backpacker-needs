import React from 'react';
import { View } from 'react-native';
import { BaseScene } from 'components';
import template from './backpackTemplate';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import services from '../../services';

class BackpackController extends BaseScene {
  constructor (args) {
    super(args);
    this.services = services;
    this.storage = this.services.Storage;
    this.state = {
      titleAddItem: '',
      externalData: null,
      collapsed: {}
    };
  }

  async componentDidMount () {
    this.props.navigation.addListener('didFocus', async () => {
      await this.checkSelectedToDos();
      await this.checkDaysFocus();
      await this.rootStore.dispatch({ type: 'BACKPACK_SCREEN', isBackpackScreen: true});
      await this.setState({externalData: true});
    });

    this.props.navigation.addListener('didBlur', async () => {
      await this.rootStore.dispatch({ type: 'BACKPACK_SCREEN', isBackpackScreen: false});
    });
  }

  async checkSelectedToDos () {
    const recosSelected = await this.readRecommendationsSelected();
    const listInTheBackpack = await this.readValueListInTheBackpack();
    const listToDosArray = await this.listInTheBackpackSelected(listInTheBackpack);
    await this.setState({externalData: true});
    return listToDosArray;
  }

  // Primero cambiar para leer las dos que leo con Firebase, estas son : readRecommendationsSelected, readValueListInTheBackpack

  async readRecommendationsSelected () {
    let recommendationSelected;
    if (this.user.getChosenRegion()) {
      const chosenRegionString = this.user.getChosenRegion();
      const userDataStorage = await this.storage.getAsyncStorage(this.user.getUserId());
      if (!Object.values(userDataStorage.users)[0].region[chosenCountryString]) {
        recommendationSelected = null;
        return recommendationSelected;
      } else {
        await this.addRecosIntoUser(userDataStorage, chosenRegionString);
      }
    } else {
      const chosenCountryString = this.user.getChosenCountry();
      const userDataStorage = await this.storage.getAsyncStorage(this.user.getUserId());
      if (!Object.values(userDataStorage.users)[0].region[chosenCountryString]) {
        recommendationSelected = null;
        return recommendationSelected;
      } else {
        await this.addRecosIntoUser(userDataStorage, chosenCountryString );
      }
    }
  }

  async addRecosIntoUser(userDataStorage, chosenRegionOrCountry){
    valueListRecommendationSelected = Object.values(userDataStorage.users)[0].region[chosenRegionOrCountry].recommendationSelected;
    if (valueListRecommendationSelected) {
      const arrSelected = Object.values(valueListRecommendationSelected);
      this.user.setRecommendationsOnlyIntemSelected(arrSelected);
      return arrSelected;
    } else {
      return false;
    }
  }


  //
  // async readValueListInTheBackpack () {
  //   let inTheBackpack;
  //   if (!this.user.getChosenRegion()) {
  //     inTheBackpack = firebase.database().ref('users/' + this.user.getUserId() + '/region/' + this.user.getChosenCountry() + '/inTheBackpack');
  //   } else {
  //     inTheBackpack = firebase.database().ref('users/' + this.user.getUserId() + '/region/' + this.user.getChosenRegion() + '/inTheBackpack');
  //   }
  //   const snapshot = await inTheBackpack.once('value');
  //   const valueListInTheBackpack = snapshot.val();
  //   return valueListInTheBackpack;
  // }

    async readValueListInTheBackpack () {
      let inTheBackpack;
      if (this.user.getChosenRegion()) {
        const chosenRegionString = this.user.getChosenRegion();
        const userDataStorage = await this.storage.getAsyncStorage(this.user.getUserId());
        if (!Object.values(userDataStorage.users)[0].region[chosenRegionString]) {
          inTheBackpack = null;
          return inTheBackpack;
        } else {
          await this.addBackpackIntoUser(userDataStorage, chosenRegionString);
        }
      } else {
        const chosenCountryString = this.user.getChosenCountry();
        const userDataStorage = await this.storage.getAsyncStorage(this.user.getUserId());
        if (!Object.values(userDataStorage.users)[0].region[chosenCountryString]) {
          inTheBackpack = null;
          return inTheBackpack;
        } else {
          await this.addBackpackIntoUser(userDataStorage, chosenCountryString );
        }
      }
    }

    async addBackpackIntoUser(userDataStorage, chosenRegionOrCountry){
      const valueListInTheBackpackSelected = Object.values(userDataStorage.users)[0].region[chosenRegionOrCountry].inTheBackpack;
      console.warn('VAMOS PA LANTE: ',valueListInTheBackpackSelected );
      return valueListInTheBackpackSelected;
    }

  async listInTheBackpackSelected (listInTheBackpack) {
    let myArrFinal = [];
    let myArrFinalClean = [];
    let myArrItem = [];
    let itemTitle;
    let indexOfArray;
    this.user.getRecommendationsSelected().forEach((item) => {
      indexOfArray = this.user.getRecommendationsSelected().indexOf(item);
      itemTitle = item.key;
      item.data.forEach((recommendation) => {
        recommendation.forEach((itemRecommendation) => {
          if (itemRecommendation.selectedRecommendations) {
            if (listInTheBackpack && Object.values(listInTheBackpack).includes(itemRecommendation.value)) {
              // These are the selected and not backpacked ones
              myArrFinal[indexOfArray] = {key: itemTitle};
              myArrItem.push({value: itemRecommendation.value, selectedInTheBackpack: true});
              return myArrFinal[indexOfArray].data = [myArrItem];
            } else {
              // These are the selected and the backpacked ones
              myArrFinal[indexOfArray] = {key: itemTitle};
              myArrItem.push(itemRecommendation.value);
              return myArrFinal[indexOfArray].data = [myArrItem];
            }
          }
        });
      });
      myArrItem = [];
    });
    myArrFinalClean = myArrFinal.filter(() => { return true; });
    this.user.setInTheBackpackSelected(myArrFinalClean);
    return myArrFinalClean;
  }

  async onClickListItemBackpack (item) {
    let countryOrRegion;
    if (!this.user.getChosenRegion()) {
      countryOrRegion = this.user.getChosenCountry();
    } else {
      countryOrRegion = this.user.getChosenRegion();
    }
    const listInTheBackpack = await this.readValueListInTheBackpack();
    if (!listInTheBackpack) {
      //Here it comes if there are not items in the selectedInTheBackpack, so it update (first time), the inTheBackpack
      firebase.database().ref('users/' + this.user.getUserId()).child('region').child(countryOrRegion).update({inTheBackpack: {item}});
      const userDataStorage = await this.storage.getAsyncStorage(this.user.getUserId());

      const newRecommendation = {'inTheBackpack': {item}};
      const newObject = Object.assign(Object.values(userDataStorage.users)[0].region[countryOrRegion], newRecommendation);
      Object.values(userDataStorage.users)[0].region[countryOrRegion] = newObject;
      await this.storage.setAsyncStorage(this.user.getUserId(), newObject);

      const listInTheBackpack = await this.readValueListInTheBackpack();
      this.listInTheBackpackSelected(listInTheBackpack);
      this.setState({externalData: true});
    } else {
      //Here it comes if there are already items in the selectedInTheBackpack, so it push (existing), the inTheBackpack
      if (!Object.values(listInTheBackpack).includes(item)) {
        firebase.database().ref('users/' + this.user.getUserId()).child('region').child(countryOrRegion).child('inTheBackpack').push(item);



        let userDataStorage = await this.storage.getAsyncStorage(this.user.getUserId());
        //const userDataStorageParsed = JSON.parse(userDataStorage);
        Object.values(userDataStorage.users)[0].region[countryOrRegion].inTheBackpack[item.toString()] = item.toString();
        const otherTimesStoreDataAndRegion = await this.storage.setAsyncStorage(this.user.getUserId(), userDataStorage);



        const listInTheBackpack = await this.readValueListInTheBackpack();
        this.listInTheBackpackSelected(listInTheBackpack);
        this.setState({externalData: true});
      } else {
        console.warn('THE ITEM IS ALREADY IN THE BACKPACK DATABASE, PLEASE CHOOSE ANOTHER ONE');
      }
    }
  }

  async onBlurAddItem (section, index) {
    const addedItems = await this.storeAddItem(this.state.titleAddItem);
    await this.listRecosSelected(addedItems, section);
    await this.checkSelectedToDos();
    this.setState({titleAddItem: ''});
  }

  async listRecosSelected (addedItems, section) {
    let sectionData = section;
    this.user.getRecommendationsSelected().forEach((completeSection) => {
      if (Object.values(completeSection)[0] === Object.values(sectionData)[0]) {
        // Push into getRecommendationsSelected the added items in their own section
        Object.values(completeSection)[1][0].push({value: addedItems, selectedRecommendations: true});
      }
    });
  }

  async storeAddItem (addItem) {
    try {
      if (!this.user.getChosenRegion()) {
        // change this, i did quickly
        // store the items that are Added manually by the user.
        await firebase.database().ref('users/' + this.user.getUserId())
          .child('region')
          .child(this.user.getChosenCountry())
          .child('recommendationSelected')
          .push(addItem);
        return addItem;
      } else {
        await firebase.database().ref('users/' + this.user.getUserId())
          .child('region')
          .child(this.user.getChosenRegion())
          .child('recommendationSelected')
          .push(addItem);
        return addItem;
      }
    } catch (error) {
      console.warn(error.message);
    }
  }

  titleAddItem (section) {
    Object.values(this.user.getRecommendationsSelected()).forEach((recommendation) => {
      if (Object.values(recommendation)[0] === Object.values(section)[0]) {
        return this.state.titleAddItem;
      } else {
        return '';
      }
    });
  }

  titleAddItemChangeText (title, section) {
    Object.values(this.user.getRecommendationsSelected()).forEach((recommendation) => {
      if (Object.values(recommendation)[0] === Object.values(section)[0]) {
        this.setState({titleAddItem: title});
      }
    });
  }

  render () {
    if (this.state.externalData === null) {
      return <View />;
    } else {
      return template(this);
    }
  }
}

export default connect()(BackpackController);
