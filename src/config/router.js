import React from 'react';
import { StyleSheet, Image, Icon, SafeAreaView, Platform } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import i18n from '../translations';
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.white,
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
      title: i18n.t('destination.destination'),
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
      title: i18n.t('recommendations.recommendations'),
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
      title: i18n.t('backpack.backpack'),
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
      activeTintColor: Palette.white,
      inactiveTintColor: Palette.primaryColorUnselected,
      style: {
        backgroundColor: Palette.primaryColor,
        height: 60,
        shadowOpacity: 0
      },
      labelStyle: styles.labelStyle,
      indicatorStyle: {
        backgroundColor: Palette.white
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
      header: Platform.OS === 'ios' ? <SafeAreaView style={{backgroundColor: Palette.white}} /> : null
    },
    cardStyle: {
      backgroundColor: Palette.white
    }
  });
