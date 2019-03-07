import { BaseScene } from 'components';
import template from './whatDoesThisAppTemplate';
import { connect } from 'react-redux';
import { BackHandler} from 'react-native';

class WhatDoesThisAppController extends BaseScene {
  constructor (args) {
    super(args);
  }

  componentDidMount () {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      BackHandler.exitApp();
    });
  }

  render () {
    return template(this);
  }
}

export default connect()(WhatDoesThisAppController);
