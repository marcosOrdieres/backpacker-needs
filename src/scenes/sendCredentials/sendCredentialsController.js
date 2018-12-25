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
      password: ''
    };
  }

  async handleSignupEmail () {
    try {
      const signUp = await firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(this.state.userName, this.state.password);
      this.user.setUserId(signUp.user.uid);
      return this.navigateTo('TravelDecision');
			// should be when everzthing it will be done: return this.navigateTo('WhatDoesThisApp');
    } catch (error) {
      console.warn(error.message);
    }
  }

  async handleLogin () {
    try {
      await firebase.auth().signInAndRetrieveDataWithEmailAndPassword(this.state.userName, this.state.password);
      return this.navigateTo('TravelDecision');
    } catch (error) {
      this.setState({errorMessage: error.message});
      console.warn(error.message);
    }
  }

  render () {
    return template(this);
  }
}

export default connect()(SendCredentialsController);
