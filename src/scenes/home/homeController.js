import { BaseScene } from 'components';
import template from './homeTemplate';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { AccessToken, LoginManager, LoginButton } from 'react-native-fbsdk';
import {GoogleSignin } from 'react-native-google-signin';
import { NetInfo, BackHandler } from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast';
import RNFetchBlob from 'react-native-fetch-blob';

class HomeController extends BaseScene {
  constructor (args) {
    super(args);
    this.state = {
      noConnectionSplash: false,
      optinsChecked: false
    };
    this.firebaseAnalytics.setCurrentScreen('home_screen', 'HomeController')
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
    RNFetchBlob
      .config({
        fileCache: true,
        addAndroidDownloads: {
          // useDownloadManager: true, this makes it work and seen the PDF but goes to the catch
          notification: true,
          title: 'You have downloaded Terms and Conditions',
          description: 'A pdf file.',
          mime: 'application/pdf',
          mediaScannable: true
        }
      })
      .fetch('GET', this.env.TC)
      .then((res) => {
        setTimeout(() => { this.refs.toastHome.show('You have downloaded Terms and Conditions', 500); }, 50);
      });
  }

  downloadDataPrivacy () {
    RNFetchBlob
      .config({
        fileCache: true,
        addAndroidDownloads: {
          // useDownloadManager: true, this makes it work and seen the PDF but goes to the catch
          notification: true,
          title: 'You have downloaded Data Privacy',
          description: 'A pdf file.',
          mime: 'application/pdf',
          mediaScannable: true
        }
      })
      .fetch('GET', this.env.dataPrivacy)
      .then((res) => {
        setTimeout(() => { this.refs.toastHome.show('You have downloaded Data Privacy', 500); }, 50);
      });
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
        this.user.setUserId(firebaseSignUpFacebookUser.user.uid);
        return this.navigateTo('TravelDecision');
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
    if (!this.state.optinsChecked) {
      setTimeout(() => { this.refs.toastHome.show(this.i18n.t('home.toast'), 500); }, 50);
    } else {
      this.user.setSendCredentialsLogin(true);
      return this.navigateTo('SendCredentials');
    }
  }

  render () {
    return template(this);
  }
}

export default connect()(HomeController);
