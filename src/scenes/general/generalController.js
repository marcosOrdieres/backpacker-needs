import { BaseScene } from 'components';
import template from './generalTemplate';
import { connect } from 'react-redux';

class GeneralController extends BaseScene {
  constructor (args) {
    super(args);
  }

  onClickListItemRecommendations (item) {
    try {
      this.user.setToDos(item);
    } catch (error) {
      console.warn(error.message);
    }
  }

  render () {
    return template(this);
  }
}

export default connect()(GeneralController);
