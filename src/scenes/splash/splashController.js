import {
	BaseScene
} from 'components';
import template from './splashTemplate';
import {
	connect
} from 'react-redux';
import firebase from 'react-native-firebase';

class SplashController extends BaseScene {
	constructor(args) {
		super(args);
		this.initializeApplication();
		this.state = {
			userLoggedIn: false
		};
	}

	async initializeApplication() {
		try {
			this.initializeFirebaseApp();
			this.isNewOrExistingUser();
		} catch (error) {
			console.warn(error);
		}
	}

	async initializeFirebaseApp() {
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

	async isNewOrExistingUser() {
		try {
			const isUserLoggedIn = await this.isUserLoggedIn();
			return this.navigateTo('Menu');
		} catch (error) {
			this.navigateTo('Home');
		}
	}

	async isUserLoggedIn() {
		return new Promise(function(resolve, reject) {
			firebase.auth().onAuthStateChanged(userMetadata => {
				if (userMetadata) {
					resolve(userMetadata.uid);
				} else {
					reject('Not Logged in', userMetadata);
				}
			});
		});
	}

	render() {
		return template(this);
	}
}

export default connect()(SplashController);