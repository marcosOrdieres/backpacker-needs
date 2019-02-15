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
      return this.loginDataWithFirebase();
    } catch (error) {
      if (typeof error.message === 'string') {
        this.setState({theUserIsUsed: error.message});
      } else {
        console.warn(error.message);
      }
    }
  }

  async getUserDataForLogin () {
    try {
      const eventref = firebase.database().ref('users/' + this.user.getUserId());
      const snapshot = await eventref.once('value');
      valueList = snapshot.val();
      return valueList;
    } catch (error) {
      console.warn(error.message);
    }
  }

  async loginDataWithFirebase () {
    try {
      const userDataFirebase = await this.getUserDataForLogin();
      const countryOrRegion = Object.keys(userDataFirebase.region)[0];
      const regions = this.user.getRegions();
      const chooseRegionOrCountry = Object.keys(regions).forEach((region) => {
        if (region === countryOrRegion) {
          this.rootStore.dispatch({ type: 'SAME_REGION', isSameRegion: true});
        }
      });

      if (this.rootStore.getState().isSameRegion) {
        this.rootStore.dispatch({ type: 'SAME_REGION', isSameRegion: false});
        this.user.setChosenRegion(countryOrRegion);
      } else {
        this.user.setChosenCountry(countryOrRegion);
        this.chargeGeojsonCountry(countryOrRegion);
      }
      // In The login, I create the object with all the things in the USer from Firebase
      await this.storage.setAsyncStorage(this.user.getUserId(), userDataFirebase);
      await this.setState({externalData: 'yes'});
      return await this.navigateTo('Menu');
    } catch (error) {
      await this.setState({externalData: 'yes'});
      return await this.navigateTo('Home');
    }
  }

  render () {
    return template(this);
  }
}

export default connect()(SendCredentialsController);
