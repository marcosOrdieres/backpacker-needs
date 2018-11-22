import { BaseScene } from 'components';
import template from './poisTemplate';
import { connect } from 'react-redux';

class PoisController extends BaseScene {
  constructor (args) {
    super(args);
  }

  render () {
    return template(this);
  }
}

export default connect()(PoisController);
