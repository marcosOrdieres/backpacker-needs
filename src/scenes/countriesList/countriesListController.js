import React from 'react';
import { BaseScene } from 'components';
import template from './countriesListTemplate';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { View, Text } from 'react-native';

class CountriesListController extends BaseScene {
  constructor (args) {
    super(args);
    this.state = {
      externalData: null
    };
  }

  async componentDidMount () {
    const getDataItemDidMount = await this.getDataItem();
    const getDataItemRecommendationsDidMount = await this.getDataItemRecommendations();
    await this.setState({externalData: 'yes'});
  }

  async getDataItem () {
    try {
      // Move it to splash
      const eventref = firebase.database().ref('region/');
      const snapshot = await eventref.once('value');
      const valueList = snapshot.val();
      this.user.setCountries(valueList);
      const countries = Object.keys(valueList);
      return countries;
    } catch (error) {
      console.warn(error.message);
    }
  }

  async getDataItemRecommendations () {
    try {
      // Move it to splash
      const eventref = firebase.database().ref('recommendations/');
      const snapshot = await eventref.once('value');
      const valueList = snapshot.val();
      this.user.setRecommendations(valueList);
      return valueList;
    } catch (error) {
      console.warn(error.message);
    }
  }

  onClickListItem (item) {
    try {
      this.user.setChosenRegion(item);
      firebase.database().ref('users/' + this.user.getUserId()).set({
        region: item
      });

      return this.navigateTo('Menu');
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

export default connect()(CountriesListController);
