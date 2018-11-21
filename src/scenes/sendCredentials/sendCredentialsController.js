import {
	BaseScene
} from 'components';
import template from './sendCredentialsTemplate';
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

class sendCredentialsController extends BaseScene {
	constructor(args) {
		super(args);
		console.warn(this.state);

		this.state = {
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

	async handleSignupEmail() {
		try {
			const signUp = await firebase.auth().createUserAndRetrieveDataWithEmailAndPassword('example@gmail.com', '123456');
			return this.routes.home;
		} catch (error) {
			console.warn(error.message);
		}
	}

	async handleLogin() {
		try {
			console.warn('userName: ', this.state.userName);
			console.warn('password: ', this.state.password);
			await firebase.auth().signInWithEmailAndPassword(this.state.userName, this.state.password);
			console.warn('LOGINNNNNNN');
			return this.routes.home;
		} catch (error) {
			this.setState({
				errorMessage: error.message
			});
			console.warn(error);
		}
	}

	render() {
		return template(this);
	}
}

export default connect()(sendCredentialsController);