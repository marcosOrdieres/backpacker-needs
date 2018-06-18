import React, { Component } from 'react';
import services from '../services';
import i18n from '../translations';
import User from '../models/user';
import rootStore from '../stores/root';
import routes from '../common/routes';

export default class BaseScene extends Component {
  constructor (args) {
    super();
    this.services = services;
    this.i18n = i18n;
    this.user = User.instance;
    this.rootStore = rootStore;
    this.routes = routes;
  }

  setState (args) {
    return new Promise((resolve) => super.setState(args, resolve));
  }
}
