import React from 'react';
import {
  StyleSheet,
  Image,
  Icon,
  SafeAreaView,
  Platform
} from 'react-native';
import {
  StackNavigator,
  TabNavigator
 } from 'react-navigation';
import i18n from '../translations';
import Color from '../common/colors.json';
import routes from '../common/routes.json';
// import { Palette } from '../common/palette.js';
import SvgUri from 'react-native-svg-uri';

import DestinationScreen from '../scenes/destination';
import GeneralScreen from '../scenes/general';
import AccommodationScreen from '../scenes/accommodation';
import FoodScreen from '../scenes/food';
import PoisScreen from '../scenes/pois';
import SplashScreen from '../scenes/splash';
import HomeScreen from '../scenes/home';

const Splash = routes.Splash;
const Home = routes.Home;

import DestinationSvg from '../assets/svg/flights.svg';
import GeneralSvg from '../assets/svg/earthGlobe.svg';
import AccommodationSvg from '../assets/svg/house.svg';
import FoodSvg from '../assets/svg/food.svg';
import PoisSvg from '../assets/svg/pois.svg';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    width: 36,
    height: 36
  },
  labelStyle: {
    fontFamily: 'Hind-Light',
    fontSize: 14,
    marginLeft: Platform.isPad ? 25 : 0,
    marginRight: 0,
    marginBottom: 0,
    marginTop: 0
  }
});

export const MenuBar = TabNavigator({
  Destination: {
    screen: DestinationScreen,
    navigationOptions: {
      title: 'Destination',
      tabBarOnPress: (scene, jumpToIndex) => {
        if (typeof scene.previousScene.routes !== 'undefined') {
          if (scene.previousScene.routes[0].key === 'Tariff') {
            return;
          }
        }
        scene.jumpToIndex(scene.scene.index);
      },
      tabBarIcon: ({ tintColor }) => (<SvgUri width={24} height={24} source={require('../assets/svg/airportNO.svg')} />)
    }
  },
  General: {
    screen: GeneralScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'General',
      tabBarIcon: ({ tintColor }) => (<SvgUri width={24} height={24} source={require('../assets/svg/earthGlobe.svg')} />)
    })
  },
  Accommodation: {
    screen: AccommodationScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Stay',
      tabBarIcon: ({ tintColor }) => (<SvgUri width={24} height={24} source={require('../assets/svg/house.svg')} />)
    })
  },
  Food: {
    screen: FoodScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Food',
      tabBarIcon: ({ tintColor }) => (<SvgUri width={24} height={24} source={require('../assets/svg/food.svg')} />)
    })
  },
  Pois: {
    screen: PoisScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'POIs',
      tabBarIcon: ({ tintColor }) => (<SvgUri width={24} height={24} source={require('../assets/svg/pois.svg')} />)
    })
  }
},
  {
    tabBarPosition: 'top',
    tabBarOptions: {
      upperCaseLabel: false,
      showIcon: true,
      activeTintColor: '#ffffff',
      inactiveTintColor: '#9796ce',
      style: {
        backgroundColor: '#5856d6',
        height: 60
      },
      labelStyle: styles.labelStyle,
      indicatorStyle: {
        backgroundColor: '#ffffff'
      }
    }
  });

export const RootStack = StackNavigator({
  Splash: {
    screen: SplashScreen
  },
  Home: {
    screen: HomeScreen
  },
  Menu: {
    screen: MenuBar
  },
  Accommodation: {
    screen: AccommodationScreen
  },
  Destination: {
    screen: DestinationScreen
  },
  Food: {
    screen: FoodScreen
  },
  General: {
    screen: GeneralScreen
  },
  Pois: {
    screen: PoisScreen
  }
},
  {
    navigationOptions: {
      header: Platform.OS === 'ios' ? <SafeAreaView style={{backgroundColor: '#fff'}} /> : null
    },
    cardStyle: {
      backgroundColor: 'white'
    }
  });
