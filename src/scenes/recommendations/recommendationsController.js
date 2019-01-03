import React from 'react';
import { BaseScene } from 'components';
import template from './recommendationsTemplate';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { View } from 'react-native';

class RecommendationsController extends BaseScene {
  constructor (args) {
    super(args);
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
      if(this.rootStore.getState().isRegionChanged){
        await this.checkSelectedRecommendations();
        await this.rootStore.dispatch({ type: 'REGION_CHANGED', isRegionChanged: false});
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
    const recommendationSelected = firebase.database().ref('users/' + this.user.getUserId() + '/region/' + this.user.getChosenRegion() + '/recommendationSelected');
    const snapshot = await recommendationSelected.once('value');
    const valueListRecommendations = snapshot.val();
    return valueListRecommendations;
  }

  async onClickListItemRecommendations (item) {
    try {
      this.setState({spinnerVisible: true});
      const listRecos = await this.readValueListRecommendations();
      if (!listRecos) {
        await firebase.database().ref('users/' + this.user.getUserId())
          .child('region')
          .child(this.user.getChosenRegion())
          .update({recommendationSelected: {item}});
        const listRecos = await this.readValueListRecommendations();
        this.listRecommendationsWhichSelected(listRecos);
        this.setState({externalData: true, spinnerVisible: false});
      } else {
        if (!Object.values(listRecos).includes(item)) {
          await firebase.database().ref('users/' + this.user.getUserId())
            .child('region')
            .child(this.user.getChosenRegion())
            .child('recommendationSelected')
            .push(item);
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
