import { BaseScene } from 'components';
import template from './destinationTemplate';
import { connect } from 'react-redux';
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog';

import Australia from '../../assets/mapJson/subregion/Australia_and_NewZealand.json';
import Caribbean from '../../assets/mapJson/subregion/Caribbean.json';
import CentralAmerica from '../../assets/mapJson/subregion/CentralAmerica.json';
import CentralAsia from '../../assets/mapJson/subregion/CentralAsia.json';
import EasternAfrica from '../../assets/mapJson/subregion/EasternAfrica.json';
import EasternAsia from '../../assets/mapJson/subregion/EasternAsia.json';
import EasternEurope from '../../assets/mapJson/subregion/EasternEurope.json';
import Melanesia from '../../assets/mapJson/subregion/Melanesia.json';
import NorthernAfrica from '../../assets/mapJson/subregion/NorthernAfrica.json';
import NorthernAmerica from '../../assets/mapJson/subregion/NorthernAmerica.json';
import NorthernEurope from '../../assets/mapJson/subregion/NorthernEurope.json';
import Polynesia from '../../assets/mapJson/subregion/Polynesia.json';
import SouthAmerica from '../../assets/mapJson/subregion/SouthAmerica.json';
import SouthEasternAsia from '../../assets/mapJson/subregion/SouthEasternAsia.json';
import SouthernAfrica from '../../assets/mapJson/subregion/SouthernAfrica.json';
import SouthernAsia from '../../assets/mapJson/subregion/SouthernAsia.json';
import SouthernEurope from '../../assets/mapJson/subregion/SouthernEurope.json';
import WesternAsia from '../../assets/mapJson/subregion/WesternAsia.json';
import WesternEurope from '../../assets/mapJson/subregion/WesternEurope.json';

class DestinationController extends BaseScene {
  constructor (args) {
    super(args);
    this.state = {
      mapRegion: null,
      lastLat: 20.15,
      lastLong: -74.91,
      buttonFly: true
    };
    this.slideAnimation = new SlideAnimation({slideFrom: 'bottom'});
  }

  async componentWillMount () {
    try {
      const country = this.user.getCountries();
      let result = Object.keys(country).map(function (key) { return [key, country[key]]; });
      const resultCoordinates = result.forEach((element) => {
        element.find((place) => {
          if (place === this.user.getChosenRegion()) {
            return this.user.setChosenRegionCoordinates(element[1]);
          }
        });
      });

      let mapRegion = {
        latitude: this.user.getChosenRegionCoordinates().latitude,
        longitude: this.user.getChosenRegionCoordinates().longitude,
        latitudeDelta: 60,
        longitudeDelta: 60
      };
      this.onRegionChange(mapRegion, mapRegion.latitude, mapRegion.longitude);
    } catch (error) {
      console.warn(error.message);
    }
  }

  onRegionChange (mapRegion, lastLat, lastLong) {
    this.setState({
      mapRegion: mapRegion,
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong
    });
  }

  regionChosen () {
    if (this.user.getCountryGeojson()) {
      return this.user.getCountryGeojson();
    } else {
      switch (this.user.getChosenRegion()) {
        case 'Australia':
          return Australia;
          break;
        case 'Caribbean':
          return Caribbean;
          break;
        case 'CentralAmerica':
          return CentralAmerica;
          break;
        case 'CentralAsia':
          return CentralAsia;
          break;
        case 'EasternAfrica':
          return EasternAfrica;
          break;
        case 'EasternAsia':
          return EasternAsia;
          break;
        case 'EasternEurope':
          return EasternEurope;
          break;
        case 'Melanesia':
          return Melanesia;
          break;
        case 'NorthernAfrica':
          return NorthernAfrica;
          break;
        case 'NorthernAmerica':
          return NorthernAmerica;
          break;
        case 'NorthernEurope':
          return NorthernEurope;
          break;
        case 'Polynesia':
          return Polynesia;
          break;
        case 'SouthAmerica':
          return SouthAmerica;
          break;
        case 'SouthEasternAsia':
          return SouthEasternAsia;
          break;
        case 'SouthernAfrica':
          return SouthernAfrica;
          break;
        case 'SouthernAsia':
          return SouthernAsia;
          break;
        case 'SouthernEurope':
          return SouthernEurope;
          break;
        case 'WesternAsia':
          return WesternAsia;
          break;
        default: WesternEurope;
      }
    }
  }

  render () {
    return template(this);
  }
}

export default connect()(DestinationController);
