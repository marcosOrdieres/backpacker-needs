import React from 'react';
import { BaseScene } from 'components';
import template from './countriesListTemplate';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { View, Text } from 'react-native';

class CountriesListController extends BaseScene {
  constructor (args) {
    super(args);
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
    return template(this);
  }
}

export default connect()(CountriesListController);
