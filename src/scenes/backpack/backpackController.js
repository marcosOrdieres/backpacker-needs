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
      externalData: null
    };
  }

  async componentDidMount () {
    this.props.navigation.addListener('didFocus', async () => {
      await this.checkSelectedToDos();
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
    const recommendationSelected = firebase.database().ref('users/' + this.user.getUserId()).child('recommendationSelected');
    const snapshot = await recommendationSelected.once('value');
    const valueListRecommendationSelected = snapshot.val();
    const arrSelected = Object.values(valueListRecommendationSelected);
    this.user.setRecommendationsOnlyIntemSelected(Object.values(valueListRecommendationSelected));
    return arrSelected;
  }

  async readValueListInTheBackpack () {
    const inTheBackpack = firebase.database().ref('users/' + this.user.getUserId() + '/inTheBackpack');
    const snapshot = await inTheBackpack.once('value');
    const valueListInTheBackpack = snapshot.val();
    return valueListInTheBackpack;
  }

  async listInTheBackpackSelected (listInTheBackpack) {
    console.warn('listInTheBackpack: ', listInTheBackpack);
    let myArrFinal = [];
    let myArrItem = [];
    let itemTitle;
    let indexOfArray;
    this.user.getRecommendationsSelected().forEach((item, index) => {
      indexOfArray = this.user.getRecommendationsSelected().indexOf(item);
      itemTitle = item.title;
      item.data.forEach((recommendation) => {
        recommendation.forEach((itemRecommendation) => {
          if (itemRecommendation.selectedRecommendations) {
            if (listInTheBackpack && Object.values(listInTheBackpack).includes(itemRecommendation.value)) {
              // These are the selected and not backpacked ones
              myArrFinal[indexOfArray] = {title: itemTitle};
              myArrItem.push({value: itemRecommendation.value, selectedInTheBackpack: true});
              return myArrFinal[indexOfArray].data = [myArrItem];
            } else {
              // These are the selected and the backpacked ones
              myArrFinal[indexOfArray] = {title: itemTitle};
              myArrItem.push(itemRecommendation.value);
              return myArrFinal[indexOfArray].data = [myArrItem];
            }
          }
        });
      });
      myArrItem = [];
    });
    this.user.setInTheBackpackSelected(myArrFinal);
    return myArrFinal;
  }

  async onClickListItemBackpack (item) {
    const listInTheBackpack = await this.readValueListInTheBackpack();
    if (!listInTheBackpack) {
      firebase.database().ref('users/' + this.user.getUserId()).update({inTheBackpack: {item}});
    } else {
      if (!Object.values(listInTheBackpack).includes(item)) {
        firebase.database().ref('users/' + this.user.getUserId()).child('inTheBackpack').push().set(item);
        const listInTheBackpack = await this.readValueListInTheBackpack();
        this.listInTheBackpackSelected(listInTheBackpack);
        this.setState({externalData: true});
      } else {
        console.warn('THE ITEM IS ALREADY IN THE BACKPACK DATABASE, PLEASE CHOOSE ANOTHER ONE');
      }
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