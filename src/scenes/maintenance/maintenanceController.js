import { BaseScene } from 'components';
import template from './maintenanceTemplate';
import { connect } from 'react-redux';

class MaintenanceController extends BaseScene {
  constructor (args) {
    super(args);
  }

  render () {
    return template(this);
  }
}

export default connect()(MaintenanceController);
