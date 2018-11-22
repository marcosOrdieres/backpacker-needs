import { BaseScene } from 'components';
import template from './generalTemplate';
import { connect } from 'react-redux';

class GeneralController extends BaseScene {
  constructor (args) {
    super(args);
  }

  render () {
    return template(this);
  }
}

export default connect()(GeneralController);
