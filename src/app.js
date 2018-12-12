import React, { Component} from 'react';
import { AppRegistry } from 'react-native';
import { RootStack } from './config/router';
import { Provider } from 'react-redux';
import rootStore from './stores/root';

Object.defineProperty(Array.prototype, 'last', {
  value: function () { return this[this.length-1]; },
  enumerable: false
});

Object.defineProperty(Array.prototype, 'middle', {
  value: function () { return this[this.length/2-1]; },
  enumerable: false
});

class App extends Component {
  render () {
    return (
      <Provider store={rootStore}>
        <RootStack />
      </Provider>
    );
  }
}

export default App;

AppRegistry.registerComponent('mapProducts', () => App);
