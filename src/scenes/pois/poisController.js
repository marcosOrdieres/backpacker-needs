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

  onClickListItem (item) {
    console.warn(item);
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
