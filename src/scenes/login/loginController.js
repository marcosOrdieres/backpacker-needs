import { BaseScene } from 'components';
import template from './loginTemplate';
import { connect } from 'react-redux';

class LoginController extends BaseScene {
  constructor (args) {
    super(args);
  }

  async handleLogin () {
    try {
      await firebase.auth().signInWithEmailAndPassword('example@gmail.com', '123456');
      return this.routes.home;
    } catch (error) {
      this.setState({ errorMessage: error.message });
      console.warn(error);
    }
  }

  render () {
    return template(this);
  }
}

export default connect()(LoginController);
