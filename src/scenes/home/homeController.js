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
	constructor(args) {
		super(args);

		this.state = {
			sendCredentialsLogin: false,
			sendCredentialsSignup: false,
			loginButtonPressed: false,
			signUpButtonPressed: false,
			userName: '',
			password: ''
		};
	}

	validate() {
		alph = /^[a-zA-Z]+$/;
		if (type === 'username') {
			if (alph.test(text)) {
				console.warn('text is correct');
			} else {
				console.warn('text is incorrect');
			}
		}
	}

	async handleSignupFacebook() {
		try {
			const signUpFacebook = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);
			if (signUpFacebook.isCancelled) {}
			const dataUser = await AccessToken.getCurrentAccessToken();
			const credential = firebase.auth.FacebookAuthProvider.credential(dataUser.accessToken);
			const firebaseSignUpFacebookUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
			return this.routes.home;
		} catch (error) {
			console.warn(error.message);
		}
	}

	async handleSignupGoogle() {
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
			return this.routes.home;
		} catch (error) {
			console.warn(error.message);
		}
	}

	render() {
		return template(this);
	}
}

export default connect()(HomeController);