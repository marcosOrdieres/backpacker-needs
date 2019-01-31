import { BaseScene } from 'components';
import template from './homeTemplate';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { AccessToken, LoginManager, LoginButton } from 'react-native-fbsdk';
import {GoogleSignin } from 'react-native-google-signin';
import { NetInfo, BackHandler, Alert } from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast';
import RNFetchBlob from 'react-native-fetch-blob';
import services from '../../services';

class HomeController extends BaseScene {
  constructor (args) {
    super(args);
    this.services = services;
    this.storage = this.services.Storage;
    this.state = {
      noConnectionSplash: false,
      optinsChecked: false
    };
  }

  componentWillUnmount () {
    this.notificationListener();
    this.notificationOpenedListener();

    this.backHandler.remove();
  }

  componentDidMount () {
    this.checkPermission();
    this.createNotificationListeners();

    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.navigateTo('Home');
    });
  }

  async createNotificationListeners () {
  /*
  * Triggered when a particular notification has been received in foreground
  * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      const { title, body } = notification;
      this.showAlert(title, body);
    });

  /*
  * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
  * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
    });

  /*
  * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
  * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
    }
  /*
  * Triggered for data only payload in foreground
  * */
    this.messageListener = firebase.messaging().onMessage((message) => {
    // process data message
      console.log(JSON.stringify(message));
    });
  }

  showAlert (title, body) {
    Alert.alert(
    title, body,
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') }
      ],
    { cancelable: false },
  );
  }

  async checkPermission () {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  async getToken () {
    let fcmToken = await this.storage.get('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
            // user has a device token
        await this.storage.set('fcmToken', fcmToken);
      }
    }
  }

  async requestPermission () {
    try {
      await firebase.messaging().requestPermission();
        // User has authorised
      this.getToken();
    } catch (error) {
        // User has rejected permissions
      console.log('permission rejected');
    }
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
