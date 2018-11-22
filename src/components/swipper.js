import React, { Component } from 'react';
import {
  View,
  Image,
  StatusBar,
  Dimensions
} from 'react-native';
import Swiper from 'react-native-swiper';
const { width, height } = Dimensions.get('window');

const styles = {
  wrapper: {
    // backgroundColor: '#f00'
  },

  firstSlide: {
    flex: 1,
    backgroundColor: 'blue'
  },
  secondSlide: {
    flex: 1,
    backgroundColor: 'yellow'
  },
  thirdSlide: {
    flex: 1,
    backgroundColor: 'red'
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
      <View style={styles.container}>
        <StatusBar barStyle='light-content' />
        <Swiper style={styles.wrapper}
          dot={<View style={{backgroundColor: 'rgba(255,255,255,.3)', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
          activeDot={<View style={{backgroundColor: '#fff', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
          paginationStyle={{
            bottom: 70
          }}
          loop>
          <View style={styles.firstSlide}>
            {/* <Image
              style={styles.image}
              source={require('./img/1.jpg')}
              resizeMode='cover'
            /> */}
          </View>
          <View style={styles.secondSlide}>
            {/* <Image
              style={styles.image}
              source={require('./img/2.jpg')}
              resizeMode='cover'
            /> */}
          </View>
          <View style={styles.thirdSlide}>
            {/* <Image style={styles.image} source={require('./img/3.jpg')} /> */}
          </View>
        </Swiper>
      </View>
    );
  }
}
