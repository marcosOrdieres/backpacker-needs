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
      if (this.rootStore.getState().isRegionChanged ||this.rootStore.getState().isRecosUpdated) {
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
    console.warn('getChosenRegion', this.user.getChosenRegion());
    console.warn('getChosenCountry', this.user.getChosenCountry());

    if(this.user.getChosenRegion()){
      recommendationSelected = firebase.database().ref('users/' + this.user.getUserId() + '/region/' + this.user.getChosenRegion() + '/recommendationSelected');
    } else{
      recommendationSelected = firebase.database().ref('users/' + this.user.getUserId() + '/region/' + this.user.getChosenCountry() + '/recommendationSelected');
    }
    const snapshot = await recommendationSelected.once('value');
    const valueListRecommendations = snapshot.val();
    return valueListRecommendations;
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
        //Here the list of Recommendations is empty cause there is none, so we update
        await firebase.database().ref('users/' + this.user.getUserId())
          .child('region')
          .child(chosenRegionOrCountry)
          .update({recommendationSelected: {item}});
        const listRecos = await this.readValueListRecommendations();
        this.listRecommendationsWhichSelected(listRecos);
        this.setState({externalData: true, spinnerVisible: false});
      } else {
        //Here the list of Recommendations has data, so we push into existing
        if (!Object.values(listRecos).includes(item)) {
          await firebase.database().ref('users/' + this.user.getUserId())
            .child('region')
            .child(chosenRegionOrCountry)
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
