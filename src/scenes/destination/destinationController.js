import { BaseScene } from 'components';
import template from './destinationTemplate';
import { connect } from 'react-redux';

class DestinationController extends BaseScene {
  constructor (args) {
    super(args);
  }

  render () {
    return template(this);
  }
}

export default connect()(DestinationController);
