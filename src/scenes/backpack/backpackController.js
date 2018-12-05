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
    this.user.setRecommendationsSelected(valueListRecommendationSelected);
  }

  async readValueListInTheBackpack () {
    const inTheBackpack = firebase.database().ref('users/' + this.user.getUserId() + '/inTheBackpack');
    const snapshot = await inTheBackpack.once('value');
    const valueListInTheBackpack = snapshot.val();
    return valueListInTheBackpack;
  }

  listInTheBackpackSelected (listInTheBackpack) {
    let myArr = [];
    Object.values(this.user.getRecommendationsSelected()).forEach((value) => {
      if (listInTheBackpack && Object.values(listInTheBackpack).includes(value)) {
        myArr.push({value: value, selectedInTheBackpack: true});
      } else {
        return myArr.push(value);
      }
    });

    this.user.setInTheBackpackSelected(myArr);
    return myArr;
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
