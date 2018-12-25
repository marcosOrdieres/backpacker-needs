import React, { Component } from 'react';
import { View, Image, StatusBar, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
const { width, height } = Dimensions.get('window');
import Palette from '../common/palette';

const localStyles = {
  wrapper: {
    // backgroundColor: '#f00'
  },

  firstSlide: {
    flex: 1,
    backgroundColor: Palette.blue
  },
  secondSlide: {
    flex: 1,
    backgroundColor: Palette.yellow
  },
  thirdSlide: {
    flex: 1,
    backgroundColor: Palette.red
  },
  container: {
    flex: 1
  },

  imgBackground: {
    width,
    height,
    backgroundColor: 'transparent',
    position: 'absolute'
  },

  image: {
    width,
    height
  }
};

export default class SwipperComponent extends Component {
  render () {
    return (
      <View style={localStyles.container}>
        <StatusBar barStyle='light-content' />
        <Swiper style={localStyles.wrapper}
          dot={<View style={{backgroundColor: Palette.primaryColor, width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
          activeDot={<View style={{backgroundColor: Palette.white, width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
          paginationStyle={{
            bottom: 70
          }}
          loop>
          <View style={localStyles.firstSlide}>
            {/* <Image
              style={localStyles.image}
              source={require('./img/1.jpg')}
              resizeMode='cover'
            /> */}
          </View>
          <View style={localStyles.secondSlide}>
            {/* <Image
              style={localStyles.image}
              source={require('./img/2.jpg')}
              resizeMode='cover'
            /> */}
          </View>
          <View style={localStyles.thirdSlide}>
            {/* <Image style={localStyles.image} source={require('./img/3.jpg')} /> */}
          </View>
        </Swiper>
      </View>
    );
  }
}
