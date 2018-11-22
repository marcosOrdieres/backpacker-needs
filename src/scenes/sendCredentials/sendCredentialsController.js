import {
	BaseScene
} from 'components';
import template from './sendCredentialsTemplate';
import {
	connect
} from 'react-redux';
import firebase from 'react-native-firebase';
import {
	AccessToken,
	LoginManager,
	LoginButton
} from 'react-native-fbsdk';
import {
	GoogleSignin
} from 'react-native-google-signin';

class sendCredentialsController extends BaseScene {
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
      return this.navigateTo('Menu');
			// return this.navigateTo('WhatDoesThisApp');
    } catch (error) {
      console.warn(error.message);
    }
  }

  async handleLogin () {
    try {
      await firebase.auth().signInAndRetrieveDataWithEmailAndPassword(this.state.userName, this.state.password);
      return this.navigateTo('Menu');
    } catch (error) {
      this.setState({
        errorMessage: error.message
      });
      console.warn(error.message);
    }
  }

  render () {
    return template(this);
  }
}

export default connect()(sendCredentialsController);
