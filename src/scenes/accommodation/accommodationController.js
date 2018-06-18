import { BaseScene } from 'components';
import template from './accommodationTemplate';
import { connect } from 'react-redux';

class AccommodationController extends BaseScene {
  constructor (args) {
    super(args);
  }

  render () {
    return template(this);
  }
}

export default connect()(AccommodationController);
