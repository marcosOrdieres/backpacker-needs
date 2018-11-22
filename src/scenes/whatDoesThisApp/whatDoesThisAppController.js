import {
	BaseScene
} from 'components';
import template from './whatDoesThisAppTemplate';
import {
	connect
} from 'react-redux';

class WhatDoesThisAppController extends BaseScene {
  constructor (args) {
    super(args);
  }

  render () {
    return template(this);
  }
}

export default connect()(WhatDoesThisAppController);
