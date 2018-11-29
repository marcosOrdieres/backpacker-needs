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
      lastLat: null,
      lastLong: null,
      buttonFly: true
    };
    this.slideAnimation = new SlideAnimation({slideFrom: 'bottom'});
  }

  async componentDidMount () {
    try {
      var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
      this.region = await navigator.geolocation.getCurrentPosition((position, error, options) => {
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.00922 * 1.5,
          longitudeDelta: 0.00421 * 1.5
        };
        this.onRegionChange(region, region.latitude, region.longitude);
      });
    } catch (error) {
      console.warn(error);
    }
  }

  onRegionChange (region, lastLat, lastLong) {
    this.setState({
      mapRegion: region,
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong
    });
  }

  regionChosen () {
    console.warn('chosen regionnn:', this.user.getChosenRegion());
    switch (this.user.getChosenRegion()) {
      case 1:
        return Australia;
        break;
      case 2:
        return Caribbean;
        break;
      case 3:
        return CentralAmerica;
        break;
      case 4:
        return CentralAsia;
        break;
      case 5:
        return EasternAfrica;
        break;
      case 6:
        return EasternAsia;
        break;
      case 7:
        return EasternEurope;
        break;
      case 8:
        return Melanesia;
        break;
      case 9:
        return NorthernAfrica;
        break;
      case 10:
        return NorthernAmerica;
        break;
      case 11:
        return NorthernEurope;
        break;
      case 12:
        return Polynesia;
        break;
      case 13:
        return SouthAmerica;
        break;
      case 14:
        return SouthEasternAsia;
        break;
      case 15:
        return SouthernAfrica;
        break;
      case 16:
        return SouthernAsia;
        break;
      case 17:
        return SouthernEurope;
        break;
      case 18:
        return WesternAsia;
        break;
      default: WesternEurope;

    }
  }

  componentWillUnmount () {
    navigator.geolocation.clearWatch(this.region);
  }

  render () {
    return template(this);
  }
}

export default connect()(DestinationController);
