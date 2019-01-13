import React from 'react';
import { View } from 'react-native';
import { BaseScene } from 'components';
import template from './backpackTemplate';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';

class BackpackController extends BaseScene {
  constructor (args) {
    super(args);
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
    return listToDosArray;
  }

  async readRecommendationsSelected () {
    const recommendationSelected = firebase.database().ref('users/' + this.user.getUserId() + '/region/' + this.user.getChosenRegion() + '/recommendationSelected');
    const snapshot = await recommendationSelected.once('value');
    const valueListRecommendationSelected = snapshot.val();
    // my added items tienen que formar parte de esta ristra.
    if (valueListRecommendationSelected) {
      const arrSelected = Object.values(valueListRecommendationSelected);
      this.user.setRecommendationsOnlyIntemSelected(Object.values(valueListRecommendationSelected));
      return arrSelected;
    } else {
      return false;
    }
  }

  async readValueListInTheBackpack () {
    const inTheBackpack = firebase.database().ref('users/' + this.user.getUserId() + '/region/' + this.user.getChosenRegion() + '/inTheBackpack');
    const snapshot = await inTheBackpack.once('value');
    const valueListInTheBackpack = snapshot.val();
    return valueListInTheBackpack;
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
    const listInTheBackpack = await this.readValueListInTheBackpack();
    if (!listInTheBackpack) {
      await firebase.database().ref('users/' + this.user.getUserId())
        .child('region')
        .child(this.user.getChosenRegion())
        .update({inTheBackpack: {item}});
      const listInTheBackpack = await this.readValueListInTheBackpack();
      this.listInTheBackpackSelected(listInTheBackpack);
      this.setState({externalData: true});
    } else {
      if (!Object.values(listInTheBackpack).includes(item)) {
        await firebase.database().ref('users/' + this.user.getUserId())
          .child('region')
          .child(this.user.getChosenRegion())
          .child('inTheBackpack')
          .push(item);
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
    console.warn('ESOSS ITEMS ADDED: ', addedItems);
    console.warn('wwww: ', this.user.getRecommendationsSelected());

    // section = ['Traveller Items']

    // en este punto ya estan los datos metidos en la BBDD.
    // Ahora tengo que ver como meter esos datos en la seccion correspondiente, para
    // despues leerlos en checkSelectedToDos y que se muestren
    // Tambien que solo se vea una vez en cada listItem, no en cada uno. Solo en correspondiente

    await this.listRecosSelected(addedItems, section);
    console.warn('LO DEFINITIVOOOOOO 2222 : ', this.user.getRecommendationsSelected());

    await this.checkSelectedToDos();
  }

  async listRecosSelected (addedItems, section) {
    let sectionData = section;
    this.user.getRecommendationsSelected().forEach((completeSection) => {
      console.warn('LA PUTA SECCION: ', Object.values(sectionData)[0]);
      console.warn('LA PUTA completeSection: ', Object.values(completeSection)[0]);

      if (Object.keys(completeSection)[0] === Object.keys(sectionData)[0]) {
        console.warn('LA SECCION ELEGIDA: ', completeSection);
        Object.values(completeSection)[1].push({value: addedItems, selectedRecommendations: true});
        console.warn('LO DEFINITIVOOOOOO: ', this.user.getRecommendationsSelected());
        // esta bien lo que hago pero se guarda en todos mirar porque
      // myArrItem.push({value: addedItems, selectedRecommendations: true});
      }

      console.warn('LO DEFINITIVOOOOOO 1111: ', this.user.getRecommendationsSelected());
    });

    // let myArr = [];
    // let myArrFinal = [];
    // let myArrItem = [];
    // const group = Object.keys(this.user.getRecommendations()).map((group, index) => {
    //   myArrFinal[index] = {key: group};
    //   return this.user.getRecommendations()[group];
    // });
    // group.forEach((groupItem, index, array) => {
    //   const indexOfArray = group.indexOf(groupItem);
    //   Object.values(groupItem).forEach((item, index, array) => {
    //     myArrItem.push({value: item, selectedRecommendations: true});
    //     return myArrFinal[indexOfArray].data = [myArrItem];
    //   });
    //
    //   this.user.setRecommendationsSelected(myArrFinal);
    //   myArrItem = [];
    //   return myArrFinal;
    // });
  }

  async storeAddItem (addItem) {
    try {
      // store the items that are Added manually by the user.
      await firebase.database().ref('users/' + this.user.getUserId())
        .child('region')
        .child(this.user.getChosenRegion())
        .child('recommendationSelected')
        .push(addItem);
      return addItem;
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

export default connect()(BackpackController);
