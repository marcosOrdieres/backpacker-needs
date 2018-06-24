import { BaseScene } from 'components';
import template from './loginTemplate';
import { connect } from 'react-redux';

class LoginController extends BaseScene {
  constructor (args) {
    super(args);
  }

  render () {
    return template(this);
  }
}

export default connect()(LoginController);
