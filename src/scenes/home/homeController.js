import { BaseScene } from 'components';
import template from './homeTemplate';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { AccessToken, LoginManager, LoginButton } from 'react-native-fbsdk';
import {GoogleSignin } from 'react-native-google-signin';
import { NetInfo } from 'react-native';

class HomeController extends BaseScene {
  constructor (args) {
    super(args);
    this.state = {
      noConnectionSplash: false
    };
  }

  async componentWillMount () {
    const connectionInfo = await NetInfo.getConnectionInfo();
    if (connectionInfo.type == 'none') {
      this.setState({noConnectionSplash: true});
    }
  }

  async handleSignupFacebook () {
    try {
      const signUpFacebook = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);
      if (signUpFacebook.isCancelled) {}
      const dataUser = await AccessToken.getCurrentAccessToken();
      const credential = firebase.auth.FacebookAuthProvider.credential(dataUser.accessToken);
      const firebaseSignUpFacebookUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
      return this.navigateTo('Menu');
    } catch (error) {
      console.warn(error.message);
    }
  }

  render () {
    return template(this);
  }
}

export default connect()(HomeController);
