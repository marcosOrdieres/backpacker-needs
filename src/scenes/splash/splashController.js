import { BaseScene } from 'components';
import template from './splashTemplate';
import { connect } from 'react-redux';
import TimerMixin from 'react-timer-mixin';

class SplashController extends BaseScene {
  constructor (args) {
    super(args);
  }

  componentDidMount () {
    TimerMixin.setTimeout(() => {
      this.props.navigation.navigate('Login');
    }, 3000);
  }

  render () {
    return template(this);
  }
}

export default connect()(SplashController);
