import {
	BaseScene
} from 'components';
import template from './splashTemplate';
import {
	connect
} from 'react-redux';
import TimerMixin from 'react-timer-mixin';
import firebase from 'react-native-firebase';

class SplashController extends BaseScene {
  constructor (args) {
    super(args);
    this.initializeFirebaseApp();
    this.isNewOrExistingUser();
    this.state = {
      userLoggedIn: false
    };
  }

  async initializeFirebaseApp () {
    try {
      const firebaseConfig = {
        apiKey: this.env.apiKey,
        authDomain: this.env.authDomain,
        databaseURL: this.env.databaseURL
      };
      const firebaseApp = firebase.app(firebaseConfig);
    } catch (error) {
      console.warn(error.message);
    }
  }

  componentDidMount () {
    TimerMixin.setTimeout(() => {
      this.props.navigation.navigate('Home');
    }, 1000);
  }

  async isUserLoggedIn () {
    return new Promise(function (resolve, reject) {
      firebase.auth().onAuthStateChanged(userMetadata => {
        if (userMetadata) {
          console.warn('LOGIN_SUCCESS');
          resolve(userMetadata.uid);
        } else {
          console.warn('LOGIN_FAIL');
          reject(Error('It broke'));
        }
      });
    });
  }

  async isNewOrExistingUser () {
    try {
      const isUserLoggedIn = await this.isUserLoggedIn();
      console.warn('isUserLoggedIn: ', isUserLoggedIn);
      if (isUserLoggedIn) {
        console.warn('pa dentrooo');
        return this.navigateTo('Menu');
      } else {
        return this.navigateTo('Home');
      }
    } catch (error) {
      console.warn(error);
    }
  }

  render () {
    return template(this);
  }
}

export default connect()(SplashController);
