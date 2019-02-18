import { BaseScene } from 'components';
import template from './homeTemplate';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { AccessToken, LoginManager, LoginButton } from 'react-native-fbsdk';
import {GoogleSignin } from 'react-native-google-signin';
import { NetInfo, BackHandler, Linking } from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast';
import RNFetchBlob from 'react-native-fetch-blob';

class HomeController extends BaseScene {
  constructor (args) {
    super(args);
    this.state = {
      noConnectionSplash: false,
      optinsChecked: false
    };
    this.firebaseAnalytics.setCurrentScreen('home_screen', 'HomeController');
  }

  componentWillUnmount () {
    this.backHandler.remove();
  }

  componentDidMount () {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.navigateTo('Home');
    });
  }

  downloadTC () {
    Linking.openURL('https://backpackerneeds2.blogspot.com/2019/02/terms-conditions.html');
  }

  downloadDataPrivacy () {
    Linking.openURL('https://backpackerneeds2.blogspot.com/2019/02/privacy-policy.html');
  }

  async componentWillMount () {
    const connectionInfo = await NetInfo.getConnectionInfo();
    if (connectionInfo.type == 'none') {
      this.setState({noConnectionSplash: true});
    }
  }

  async handleSignupFacebook () {
    try {
      if (!this.state.optinsChecked) {
        setTimeout(() => { this.refs.toastHome.show(this.i18n.t('home.toast'), 500); }, 50);
      } else {
        const signUpFacebook = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);
        if (signUpFacebook.isCancelled) {}
        const dataUser = await AccessToken.getCurrentAccessToken();
        const credential = firebase.auth.FacebookAuthProvider.credential(dataUser.accessToken);
        const firebaseSignUpFacebookUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
        console.warn('firebaseSignUpFacebookUser:', firebaseSignUpFacebookUser.additionalUserInfo.isNewUser);
        this.user.setUserId(firebaseSignUpFacebookUser.user.uid);

        if (firebaseSignUpFacebookUser.additionalUserInfo.isNewUser) {
          return this.navigateTo('WhatDoesThisApp');
        } else {
          return this.loginDataWithFirebase();
          // return this.navigateTo('Menu');
        }
      }
    } catch (error) {
      console.warn(error.message);
    }
  }

  registerToCredentials () {
    if (!this.state.optinsChecked) {
      setTimeout(() => { this.refs.toastHome.show(this.i18n.t('home.toast'), 500); }, 50);
    } else {
      this.user.setSendCredentialsSignup(true);
      return this.navigateTo('SendCredentials');
    }
  }

  loginToCredentials () {
    this.user.setSendCredentialsLogin(true);
    return this.navigateTo('SendCredentials');
  }

  render () {
    return template(this);
  }
}

export default connect()(HomeController);
