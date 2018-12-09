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
import routes from '../common/routes.json';
import Palette from '../common/palette';

import DestinationScreen from '../scenes/destination';
import RecommendationsScreen from '../scenes/recommendations';
import BackpackScreen from '../scenes/backpack';
import SplashScreen from '../scenes/splash';
import HomeScreen from '../scenes/home';
import SendCredentialsScreen from '../scenes/sendCredentials';
import WhatDoesThisAppScreen from '../scenes/whatDoesThisApp';
import TravelDecisionScreen from '../scenes/travelDecision';

import AirportSvg from '../assets/svg/Airport';
import CheckMark from '../assets/svg/CheckMark';
import BackpackSvg from '../assets/svg/Ruck';

const Splash = routes.Splash;
const Home = routes.Home;

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
      tabBarIcon: ({ tintColor }) => {
        if (tintColor === Palette.primaryColorUnselected) {
          return <AirportSvg color={Palette.primaryColorUnselected} width={25} height={25} />;
        } else {
          return <AirportSvg width={25} height={25} />;
        }
      }
    }
  },
  Recommendations: {
    screen: RecommendationsScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Recommends',
      tabBarIcon: ({ tintColor }) => {
        if (tintColor === Palette.primaryColorUnselected) {
          return <CheckMark color={Palette.primaryColorUnselected} width={25} height={25} />;
        } else {
          return <CheckMark width={25} height={25} />;
        }
      }
    })
  },
  Backpack: {
    screen: BackpackScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'To-Do List',
      tabBarIcon: ({ tintColor }) => {
        if (tintColor === Palette.primaryColorUnselected) {
          return <BackpackSvg color={Palette.primaryColorUnselected} width={25} height={25} />;
        } else {
          return <BackpackSvg width={25} height={25} />;
        }
      }
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
        height: 60,
        shadowOpacity: 0
      },
      labelStyle: styles.labelStyle,
      indicatorStyle: {
        backgroundColor: '#ffffff'
      },
      swipeEnabled: true
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
  Destination: {
    screen: DestinationScreen
  },
  Recommendations: {
    screen: RecommendationsScreen
  },
  Backpack: {
    screen: BackpackScreen
  },
  SendCredentials: {
    screen: SendCredentialsScreen
  },
  WhatDoesThisApp: {
    screen: WhatDoesThisAppScreen
  },
  TravelDecision: {
    screen: TravelDecisionScreen
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
