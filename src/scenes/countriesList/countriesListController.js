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
    await this.setState({externalData: 'yes'});
  }

  async getDataItem () {
    try {
      // Move it to splash
      const eventref = firebase.database().ref('region/');
      const snapshot = await eventref.once('value');
      const valueList = snapshot.val();
      let result = Object.keys(valueList).map(key => ({id: Number(key), title: valueList[key]}));
      this.user.setCountries(result);
      return result;
    } catch (error) {
      console.warn(error.message);
    }
  }

  onClickListItem (item) {
    this.user.setChosenRegion(item.id);
    return this.navigateTo('Menu');
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
