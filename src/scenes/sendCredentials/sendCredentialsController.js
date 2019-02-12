import { BaseScene } from 'components';
import template from './sendCredentialsTemplate';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { AccessToken, LoginManager, LoginButton } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';

class SendCredentialsController extends BaseScene {
  constructor (args) {
    super(args);
    this.state = {
      userName: '',
      password: '',
      theUserIsUsed: ''
    };
  }

  async handleSignupEmail () {
    try {
      const signUp = await firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(this.state.userName, this.state.password);
      this.firebaseAnalytics.setUserProperty('handleSignupEmail', 'SendCredentialsController');
      this.user.setUserId(signUp.user.uid);
      return this.navigateTo('TravelDecision');
			// should be when everzthing it will be done: return this.navigateTo('WhatDoesThisApp');
    } catch (error) {
      if (error.message == 'The email address is already in use by another account.') {
        console.warn('erererer');
        this.setState({theUserIsUsed: error.message});
      }
    }
  }

  async handleLogin () {
    try {
      await firebase.auth().signInAndRetrieveDataWithEmailAndPassword(this.state.userName, this.state.password);
      this.firebaseAnalytics.setUserProperty('handleLogin', 'SendCredentialsController');
      return this.navigateTo('TravelDecision');
    } catch (error) {
      console.warn(error.message);
    }
  }

  render () {
    return template(this);
  }
}

export default connect()(SendCredentialsController);
