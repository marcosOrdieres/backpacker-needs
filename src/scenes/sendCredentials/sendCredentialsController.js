import { BaseScene } from 'components';
import template from './sendCredentialsTemplate';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { AccessToken, LoginManager, LoginButton } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';
import { BackHandler} from 'react-native';

class SendCredentialsController extends BaseScene {
  constructor (args) {
    super(args);
    this.state = {
      userName: '',
      password: '',
      theUserIsUsed: ''
    };
  }

  async componentDidMount () {
    this.setState({externalData: true});
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.user.setSendCredentialsLogin(undefined);
      this.navigateTo('Home');
    });
  }

  componentWillUnmount () {
    this.backHandler.remove();
  }

  async handleSignupEmail () {
    try {
      const signUp = await firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(this.state.userName, this.state.password);
      this.firebaseAnalytics.setUserProperty('handleSignupEmail', 'SendCredentialsController');
      this.user.setUserId(signUp.user.uid);
      return this.navigateTo('WhatDoesThisApp');
    } catch (error) {
      if (typeof error.message === 'string') {
        this.setState({theUserIsUsed: error.message});
      } else {
        console.warn(error.message);
      }
    }
  }

  async handleLogin () {
    try {
      const login = await firebase.auth().signInAndRetrieveDataWithEmailAndPassword(this.state.userName, this.state.password);
      this.firebaseAnalytics.setUserProperty('handleLogin', 'SendCredentialsController');
      this.user.setUserId(login.user.uid);
      // coming from login
      this.rootStore.dispatch({ type: 'FROM_LOGIN', isComingFromLogin: true});
      return this.loginDataWithFirebase();
    } catch (error) {
      if (typeof error.message === 'string') {
        this.setState({theUserIsUsed: error.message});
      } else {
        console.warn(error.message);
      }
    }
  }

  render () {
    return template(this);
  }
}

export default connect()(SendCredentialsController);
