import React from 'react';
import { View, Image } from 'react-native';
import logo from '../../images/logoMaps.png';
import splashStyles from './splashStyles';

export default (controller) => (
  <View style={splashStyles.splashContainer}>
    <Image
      style={splashStyles.image}
      source={logo} />
  </View>
);
