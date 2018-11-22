import {
	BaseScene
} from 'components';
import template from './homeTemplate';
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

class HomeController extends BaseScene {
  constructor (args) {
    super(args);
  }

  async handleSignupFacebook () {
    try {
      const signUpFacebook = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);
      if (signUpFacebook.isCancelled) {}
      const dataUser = await AccessToken.getCurrentAccessToken();
      const credential = firebase.auth.FacebookAuthProvider.credential(dataUser.accessToken);
      const firebaseSignUpFacebookUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
      return this.props.navigation.navigate('Menu');
    } catch (error) {
      console.warn(error.message);
    }
  }

  async handleSignupGoogle () {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true
      });
      const configureWebClient = await GoogleSignin.configure({
        offlineAccess: true,
        forceConsentPrompt: true,
        webClientId: this.env.webClientId
      });

      const dataGoogleSignin = await GoogleSignin.signIn();
      const credential = firebase.auth.GoogleAuthProvider.credential(dataGoogleSignin.idToken, dataGoogleSignin.accessToken);
      const signInGoogle = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
      return this.props.navigation.navigate('Menu');
    } catch (error) {
      console.warn(error.message);
    }
  }

  render () {
    return template(this);
  }
}

export default connect()(HomeController);
