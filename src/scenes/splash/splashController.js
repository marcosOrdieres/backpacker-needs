import { BaseScene } from 'components';
import template from './splashTemplate';
import { connect } from 'react-redux';
import TimerMixin from 'react-timer-mixin';
import firebase from 'react-native-firebase';

class SplashController extends BaseScene {
  constructor (args) {
    super(args);
    this.initializeFirebaseApp();
    // await this.isNewOrExistingUser()
  }

  async initializeFirebaseApp () {
    try {
      const firebaseConfig = {
        apiKey: this.env.apiKey,
        authDomain: this.env.authDomain,
        databaseURL: this.env.databaseURL
      };
      const firebaseApp = firebase.initializeApp(firebaseConfig);
    } catch (error) {
      console.warn(error.message);
    }
  }

  componentDidMount () {
    TimerMixin.setTimeout(() => {
      this.props.navigation.navigate('Signup');
    }, 3000);
  }

  async isUserLoggedIn () {
    firebase.auth().onAuthStateChanged(isUserLoggedIn => {
      return isUserLoggedIn;
    });
    // check if user is logged in or not
  }

  async hasUserAccount () {
    // check if the user is new or not
  }

  async isNewOrExistingUser () {
    const isUserLoggedIn = await this.isUserLoggedIn();
    if (isUserLoggedIn) {
      return this.props.navigation.navigate('Menu');
    } else {
      const hasUserAccount = await this.hasUserAccount();
      if (hasUserAccount) {
        return this.props.navigation.navigate('Login');
      } else {
        return this.props.navigation.navigate('Signup');
      }
    }
  }

  render () {
    return template(this);
  }
}

export default connect()(SplashController);
