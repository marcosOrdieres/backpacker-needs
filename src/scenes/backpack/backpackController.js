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
    try {
      const recosSelected = await this.readRecommendationsSelected();
      const listInTheBackpack = await this.readValueListInTheBackpack();
      const listToDosArray = await this.listInTheBackpackSelected(listInTheBackpack);
      await this.setState({externalData: true});
      return listToDosArray;
    } catch (error) {
      console.warn(error.message);
    }
  }

  // Primero cambiar para leer las dos que leo con Firebase, estas son : readRecommendationsSelected, readValueListInTheBackpack

  async readRecommendationsSelected () {
    try {
      let recommendationSelected;
      if (this.user.getChosenRegion()) {
        const chosenRegionString = this.user.getChosenRegion();
        const userDataStorage = await this.storage.getAsyncStorage(this.user.getUserId());
        if (!Object.values(userDataStorage.users)[0].region[chosenRegionString]) {
          return null;
        } else {
          await this.addRecosIntoUser(userDataStorage, chosenRegionString);
        }
      } else {
        const chosenCountryString = this.user.getChosenCountry();
        const userDataStorage = await this.storage.getAsyncStorage(this.user.getUserId());
        if (!Object.values(userDataStorage.users)[0].region[chosenCountryString]) {
          return null;
        } else {
          await this.addRecosIntoUser(userDataStorage, chosenCountryString);
        }
      }
    } catch (error) {
      console.warn(error.message);
    }
  }

  async addRecosIntoUser (userDataStorage, chosenRegionOrCountry) {
    try {
      valueListRecommendationSelected = Object.values(userDataStorage.users)[0].region[chosenRegionOrCountry].recommendationSelected;
      if (valueListRecommendationSelected) {
        const arrSelected = Object.values(valueListRecommendationSelected);
        this.user.setRecommendationsOnlyIntemSelected(arrSelected);
        return arrSelected;
      } else {
        return false;
      }
    } catch (error) {
      console.warn(error.message);
    }
  }

  async addBackpackFirstTime (userDataStorage, countryOrRegion) {
    // When I dont have stored in the userDataStorage inTheBackpack, first time, add inTheBackpack as item.
    // We need it to have always the Backpack inside the inTheBackpack.
    if (!Object.values(userDataStorage.users)[0].region[countryOrRegion].inTheBackpack) {
      const userDataStorage = await this.storage.getAsyncStorage(this.user.getUserId());
      const newRecommendation = {'inTheBackpack': {'item': 'Backpack'}};
      const newObject = Object.assign(Object.values(userDataStorage.users)[0].region[countryOrRegion], newRecommendation);
      Object.values(userDataStorage.users)[0].region[countryOrRegion] = newObject;
      await this.storage.setAsyncStorage(this.user.getUserId(), userDataStorage);
      const userStorage = await this.storage.getAsyncStorage(this.user.getUserId());
      return userStorage;
    } else {
      return null;
    }
  }

  async readValueListInTheBackpack () {
    try {
      let inTheBackpack;
      if (this.user.getChosenRegion()) {
        const chosenRegionString = this.user.getChosenRegion();
        const userDataStorage = await this.storage.getAsyncStorage(this.user.getUserId());
        const newUserDataStorage = await this.addBackpackFirstTime(userDataStorage, chosenRegionString);
        if (newUserDataStorage) {
          return this.addBackpackIntoUser(newUserDataStorage, chosenRegionString);
        } else {
          return this.addBackpackIntoUser(userDataStorage, chosenRegionString);
        }
      } else {
        const chosenCountryString = this.user.getChosenCountry();
        const userDataStorage = await this.storage.getAsyncStorage(this.user.getUserId());
        const newUserDataStorage = await this.addBackpackFirstTime(userDataStorage, chosenCountryString);
        if (newUserDataStorage) {
          return this.addBackpackIntoUser(newUserDataStorage, chosenCountryString);
        } else {
          return this.addBackpackIntoUser(userDataStorage, chosenCountryString);
        }
      }
    } catch (error) {
      console.warn(error.message);
    }
  }

  async addBackpackIntoUser (userDataStorage, chosenRegionOrCountry) {
    try {
      if (!Object.values(userDataStorage.users)[0].region[chosenRegionOrCountry].inTheBackpack) {
        return null;
      } else {
        const valueListInTheBackpackSelected = Object.values(userDataStorage.users)[0].region[chosenRegionOrCountry].inTheBackpack;
        return valueListInTheBackpackSelected;
      }
    } catch (error) {
      console.warn(error.message);
    }
  }

  async listInTheBackpackSelected (listInTheBackpack) {
    let myArrFinal = [];
    let myArrFinalClean = [];
    let myArrItem = [];
    let itemTitle;
    let indexOfArray;
    if (!this.user.getRecommendationsSelected()) {
      this.listRecommendationsWhichSelected();
    }
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
    try {
      let countryOrRegion;
      let isItemInTheBackpack = false;

      if (!this.user.getChosenRegion()) {
        countryOrRegion = this.user.getChosenCountry();
      } else {
        countryOrRegion = this.user.getChosenRegion();
      }
      const listInTheBackpack = await this.readValueListInTheBackpack();
      if (listInTheBackpack) {
        Object.values(listInTheBackpack).forEach((recommendation) => {
          if (recommendation === item.value) {
            isItemInTheBackpack = true;
            return isItemInTheBackpack;
          }
        });
      }

      if (!listInTheBackpack) {
        // Here it comes if there are not items in the selectedInTheBackpack, so it update (first time), the inTheBackpack
        firebase.database().ref('users/' + this.user.getUserId()).child('region').child(countryOrRegion).update({inTheBackpack: {[item]: item}});
        const userDataStorage = await this.storage.getAsyncStorage(this.user.getUserId());
        const newRecommendation = {'inTheBackpack': {[item]: item}};
        const newObject = Object.assign(Object.values(userDataStorage.users)[0].region[countryOrRegion], newRecommendation);
        Object.values(userDataStorage.users)[0].region[countryOrRegion] = newObject;
        await this.storage.setAsyncStorage(this.user.getUserId(), userDataStorage);
        const listInTheBackpack = await this.readValueListInTheBackpack();
        this.listInTheBackpackSelected(listInTheBackpack);
        this.setState({externalData: true});
      } else {
        // Here it comes if there are already items in the selectedInTheBackpack, so it push (existing), the inTheBackpack
        if (!isItemInTheBackpack) {
          firebase.database().ref('users/' + this.user.getUserId()).child('region').child(countryOrRegion).child('inTheBackpack').push(item);
          let userDataStorage = await this.storage.getAsyncStorage(this.user.getUserId());
          Object.values(userDataStorage.users)[0].region[countryOrRegion].inTheBackpack[item.toString()] = item.toString();
          const otherTimesStoreDataAndRegion = await this.storage.setAsyncStorage(this.user.getUserId(), userDataStorage);
          const listInTheBackpack = await this.readValueListInTheBackpack();
          this.listInTheBackpackSelected(listInTheBackpack);
          this.setState({externalData: true});
        } else {
          // If there are isItemInTheBackpack, but are already selected and I want to deselect them.
          // first time here does not work.
          let userDataStorage = await this.storage.getAsyncStorage(this.user.getUserId());
          delete Object.values(userDataStorage.users)[0].region[countryOrRegion].inTheBackpack[item.value.toString()];
          const otherTimesStoreDataAndRegion = await this.storage.setAsyncStorage(this.user.getUserId(), userDataStorage);
          const listInTheBackpack = await this.readValueListInTheBackpack();
          this.listInTheBackpackSelected(listInTheBackpack);
          this.setState({externalData: true});
        }
      }
    } catch (error) {
      console.warn(error.message);
    }
  }

  async onBlurAddItem (section, index) {
    try {
      const addedItems = await this.storeAddItem(this.state.titleAddItem);
      await this.listRecosSelected(addedItems, section);
      await this.checkSelectedToDos();
      this.setState({titleAddItem: ''});
    } catch (error) {
      console.warn(error.message);
    }
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
      if (this.user.getChosenRegion()) {
        // store the items that are Added manually by the user.
        firebase.database().ref('users/' + this.user.getUserId()).child('region').child(this.user.getChosenRegion()).child('recommendationSelected').push(addItem);
        Object.values(userDataStorage.users)[0].region[this.user.getChosenRegion()].recommendationSelected[addItem.toString()] = addItem.toString();
        await this.storage.setAsyncStorage(this.user.getUserId(), userDataStorage);
        return addItem;
      } else {
        firebase.database().ref('users/' + this.user.getUserId()).child('region').child(this.user.getChosenCountry()).child('recommendationSelected').push(addItem);
        const chosenRegionString = this.user.getChosenRegion();
        const userDataStorage = await this.storage.getAsyncStorage(this.user.getUserId());
        Object.values(userDataStorage.users)[0].region[this.user.getChosenCountry()].recommendationSelected[addItem.toString()] = addItem.toString();
        await this.storage.setAsyncStorage(this.user.getUserId(), userDataStorage);
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
