import React from 'react';
import { BaseScene } from 'components';
import template from './generalTemplate';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { View } from 'react-native';

class GeneralController extends BaseScene {
  constructor (args) {
    super(args);
    this.state = {
      selected: false,
      externalData: null
    };
  }

  async componentDidMount () {
    await this.checkSelectedRecommendations();
    await this.setState({externalData: true});
  }

  listRecommendationsWhichSelected (checkListRecos) {
    let myArr = [];
    Object.values(this.user.getRecommendations()).forEach((value) => {
      if (checkListRecos && Object.values(checkListRecos).includes(value)) {
        myArr.push({value: value, selectedRecommendations: true});
      } else {
        return myArr.push(value);
      }
    });
    this.user.setRecommendationsSelected(myArr);
    return myArr;
  }

  async checkSelectedRecommendations () {
    const checkListRecos = await this.readValueListRecommendations();
    const listRecommendationsArray = await this.listRecommendationsWhichSelected(checkListRecos);
    return listRecommendationsArray;
  }

  async readValueListRecommendations () {
    const recommendationSelected = firebase.database().ref('users/' + this.user.getUserId() + '/recommendationSelected');
    const snapshot = await recommendationSelected.once('value');
    const valueListRecommendations = snapshot.val();
    return valueListRecommendations;
  }

  async onClickListItemRecommendations (item) {
    try {
      const listRecos = await this.readValueListRecommendations();
      if (!listRecos) {
        firebase.database().ref('users/' + this.user.getUserId()).set({recommendationSelected: {item}});
      } else {
        if (!Object.values(listRecos).includes(item)) {
          firebase.database().ref('users/' + this.user.getUserId()).child('recommendationSelected').push().set(item);
          const listRecos = await this.readValueListRecommendations();
          this.listRecommendationsWhichSelected(listRecos);
          this.setState({externalData: true});
        } else {
          console.warn('THE ITEM IS ALREADY IN DATABASE, PLEASE CHOOSE ANOTHER ONE');
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

export default connect()(GeneralController);
