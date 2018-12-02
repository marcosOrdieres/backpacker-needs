import React from 'react';
import { View } from 'react-native';
import { BaseScene } from 'components';
import template from './poisTemplate';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';

class PoisController extends BaseScene {
  constructor (args) {
    super(args);
    this.state = {
      externalData: null
    };
  }

  async componentDidMount () {
    this.props.navigation.addListener('didFocus', async () => {
      await this.readRecommendationsSelected();
      await this.setState({externalData: true});
    });
  }

  async readRecommendationsSelected () {
    const recommendationSelected = firebase.database().ref('users/' + this.user.getUserId()).child('recommendationSelected');
    const snapshot = await recommendationSelected.once('value');
    const valueListRecommendationSelected = snapshot.val();
    this.user.setToDos(valueListRecommendationSelected);
  }

  async readValueListInTheBackpack () {
    const inTheBackpack = firebase.database().ref('users/' + this.user.getUserId() + '/inTheBackpack');
    const snapshot = await inTheBackpack.once('value');
    const valueListInTheBackpack = snapshot.val();
    return valueListInTheBackpack;
  }

  listInTheBackpackSelected (checkListInTheBackpack) {
    let myArr = [];
    Object.values(this.user.getRecommendations()).forEach((value) => {
      if (checkListInTheBackpack && Object.values(checkListInTheBackpack).includes(value)) {
        myArr.push({value: value, selectedInTheBackpack: true});
      } else {
        return myArr.push(value);
      }
    });
    this.user.setInTheBackpackSelected(myArr);
    return myArr;
  }

  onClickListItem (item) {
    const listInTheBackpack = await this.readValueListInTheBackpack();
    if (!listInTheBackpack) {
      firebase.database().ref('users/' + this.user.getUserId()).set({inTheBackpack: {item}});
    } else {
      if (!Object.values(listInTheBackpack).includes(item)) {
        firebase.database().ref('users/' + this.user.getUserId()).child('inTheBackpack').push().set(item);
        const listInTheBackpack = await this.readValueListInTheBackpack();
        this.listInTheBackpackSelected(listInTheBackpack);
        this.setState({externalData: true});
      } else {
        console.warn('THE ITEM IS ALREADY IN DATABASE, PLEASE CHOOSE ANOTHER ONE');
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

export default connect()(PoisController);
