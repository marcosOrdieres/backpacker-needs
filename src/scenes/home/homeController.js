import { BaseScene } from 'components';
import template from './homeTemplate';
import { connect } from 'react-redux';

class HomeController extends BaseScene {
  constructor (args) {
    super(args);
  }

  render () {
    return template(this);
  }
}

export default connect()(HomeController);
