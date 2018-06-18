import { BaseScene } from 'components';
import template from './foodTemplate';
import { connect } from 'react-redux';

class FoodController extends BaseScene {
  constructor (args) {
    super(args);
  }

  render () {
    return template(this);
  }
}

export default connect()(FoodController);
