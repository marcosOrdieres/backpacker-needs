import { BaseScene } from 'components';
import template from './signupTemplate';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { AccessToken, LoginManager, LoginButton } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';
import jwt from 'jwt-decode';

class SignupController extends BaseScene {
  constructor (args) {
    super(args);
  }

  async handleSignupEmail () {
    try {
      const signUp = await firebase.auth().createUserAndRetrieveDataWithEmailAndPassword('example@gmail.com', '123456');
      return this.routes.home;
    } catch (error) {
      console.warn(error.message);
    }
  }

  async handleSignupFacebook () {
    try {
      const signUpFacebook = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);
      if (signUpFacebook.isCancelled) { }
      const dataUser = await AccessToken.getCurrentAccessToken();
      const credential = firebase.auth.FacebookAuthProvider.credential(dataUser.accessToken);
      const firebaseSignUpFacebookUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
      return this.routes.home;
    } catch (error) {
      console.warn(error.message);
    }
  }

  async handleSignupGoogle () {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const configureWebClient = await GoogleSignin.configure({
        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login
        webClientId: this.env.webClientId
      });

      const dataGoogleSignin = await GoogleSignin.signIn();
      const credential = firebase.auth.GoogleAuthProvider.credential(dataGoogleSignin.idToken, dataGoogleSignin.accessToken);
      const signInGoogle = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
      return this.routes.home;
    } catch (error) {
      console.warn(error.message);
    }
  }
  render () {
    return template(this);
  }
}

export default connect()(SignupController);
