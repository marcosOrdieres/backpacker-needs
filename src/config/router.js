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
import loginScreen from '../scenes/login';

import VaccinationsScreen from '../scenes/home';
import VisaScreen from '../scenes/home';
import MiscelaneaScreen from '../scenes/home';

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

export const General = TabNavigator({
  Vaccinations: {
    screen: VaccinationsScreen,
    navigationOptions: {
      title: 'Vaccinations',
      tabBarOnPress: (scene, jumpToIndex) => {
        if (typeof scene.previousScene.routes !== 'undefined') {
          if (scene.previousScene.routes[0].key === 'Tariff') {
            return;
          }
        }
        scene.jumpToIndex(scene.scene.index);
      }
    }
  },
  Visa: {
    screen: VisaScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Visa'
    })
  },
  Miscelanea: {
    screen: MiscelaneaScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Miscelanea'
    })
  }
},
  {
    tabBarPosition: 'bottom',
    ...TabNavigator.Presets.AndroidTopTabs,
    tabBarOptions: {
      upperCaseLabel: false,
      activeTintColor: '#ffffff',
      inactiveTintColor: '#9796ce',
      swipeEnabled: true,
      style: {
        backgroundColor: '#5856d6',
        height: 60
      },
      labelStyle: {
        color: 'white',
        fontSize: 14,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Hind-Light',
        paddingBottom: 20
      },
      upperCaseLabel: false,
      tabStyle: {
        elevation: 4
      },
      indicatorStyle: {
        backgroundColor: 'white',
        height: 3
      }
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
        if (tintColor === '#9796ce') {
          return (<SvgUri width={24} height={24} source={require('../assets/svg/airportYES.svg')} />);
        } else {
          return (<SvgUri width={24} height={24} source={require('../assets/svg/airportNO.svg')} />);
        }
      }
    }
  },
  General: {
    screen: General,
    navigationOptions: ({ navigation }) => ({
      title: 'General',
      tabBarIcon: ({ tintColor }) => {
        if (tintColor === '#9796ce') {
          return (<SvgUri width={24} height={24} source={require('../assets/svg/generalYES.svg')} />);
        } else {
          return (<SvgUri width={24} height={24} source={require('../assets/svg/generalNO.svg')} />);
        }
      }
    })
  },
  Accommodation: {
    screen: AccommodationScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Sleep',
      tabBarIcon: ({ tintColor }) => {
        if (tintColor === '#9796ce') {
          return (<SvgUri width={24} height={24} source={require('../assets/svg/sleepYES.svg')} />);
        } else {
          return (<SvgUri width={24} height={24} source={require('../assets/svg/sleepNO.svg')} />);
        }
      }
    })
  },
  Food: {
    screen: FoodScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Meals',
      tabBarIcon: ({ tintColor }) => {
        if (tintColor === '#9796ce') {
          return (<SvgUri width={24} height={24} source={require('../assets/svg/foodYES.svg')} />);
        } else {
          return (<SvgUri width={24} height={24} source={require('../assets/svg/foodNO.svg')} />);
        }
      }
    })
  },
  Pois: {
    screen: PoisScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'POIs',
      tabBarIcon: ({ tintColor }) => {
        if (tintColor === '#9796ce') {
          return (<SvgUri width={24} height={24} source={require('../assets/svg/poiYES.svg')} />);
        } else {
          return (<SvgUri width={24} height={24} source={require('../assets/svg/poiNO.svg')} />);
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
        height: 60
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
    screen: General
  },
  Pois: {
    screen: PoisScreen
  },
  Vaccinations: {
    screen: VaccinationsScreen
  },
  Visa: {
    screen: VisaScreen
  },
  Miscelanea: {
    screen: MiscelaneaScreen
  },
  Login: {
    screen: loginScreen
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
