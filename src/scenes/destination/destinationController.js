import React from 'react';
import { BaseScene } from 'components';
import template from './destinationTemplate';
import { connect } from 'react-redux';
import Toast, {DURATION} from 'react-native-easy-toast';
import { View, BackHandler } from 'react-native';

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
    this.myArrRegion = [];
    this.state = {
      mapRegion: null,
      lastLat: 20.15,
      lastLong: -74.91,
      buttonFly: true,
      isModalVisible: false,
      externalData: null
    };
  }

  toggleModal () {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  async componentDidMount () {
    this.setState({externalData: true});
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.navigateTo('Recommendations');
    });
    setTimeout(() => { this.refs.toast.show(this.i18n.t('destination.toast'), 6000); }, 1500);
  }

  componentWillUnmount () {
    this.backHandler.remove();
  }

  async mapBuilderWithJson () {
    await this.listItemBackpacks();
    const regions = this.user.getRegions();
    let result = Object.keys(regions).map(function (key) { return [key, regions[key]]; });
    const resultCoordinates = result.forEach((element) => {
      element.find((place) => {
        if (!this.user.getChosenRegion()) {
          if (place === this.user.getChosenCountry()) {
            return this.user.setChosenRegionCoordinates(element[1]);
          }
        } else {
          if (place === this.user.getChosenRegion()) {
            return this.user.setChosenRegionCoordinates(element[1]);
          }
        }
      });
    });
    let mapRegion = {
      latitude: this.user.getChosenRegionCoordinates() ? this.user.getChosenRegionCoordinates().latitude : this.user.getLat(),
      longitude: this.user.getChosenRegionCoordinates() ? this.user.getChosenRegionCoordinates().longitude : this.user.getLong(),
      latitudeDelta: 60,
      longitudeDelta: 60
    };
    this.onRegionChange(mapRegion, mapRegion.latitude, mapRegion.longitude);
  }

  async componentWillMount () {
    try {
      await this.mapBuilderWithJson();
    } catch (error) {
      console.warn(error.message);
    }
  }

  onRegionChange (mapRegion, lastLat, lastLong) {
    this.setState({
      mapRegion: mapRegion,
      lastLat: lastLat,
      lastLong: lastLong
    });
  }

  async listItemBackpacks () {
    const countriesBackpack = await this.readListSelectedCountries();
    this.user.setRegionsAsyncStorage(Object.keys(countriesBackpack));
    return this.setState({externalData: true});
  }

  async onClickListItemRegion (item) {
    this.user.setChosenCountry(null);
    this.user.setChosenRegion(null);
    this.user.setChosenRegionCoordinates(null);
    const regions = this.user.getRegions();
    const chooseRegionOrCountry = Object.keys(regions).forEach((region) => {
      if (region === item) {
        this.rootStore.dispatch({ type: 'SAME_REGION', isSameRegion: true});
      }
    });

    if (this.rootStore.getState().isSameRegion) {
      this.rootStore.dispatch({ type: 'SAME_REGION', isSameRegion: false});
      this.user.setChosenRegion(item);
    } else {
      await this.user.setChosenCountry(item);
      await this.chargeGeojsonCountry(item);
    }
    this.mapBuilderWithJson();
    this.rootStore.dispatch({ type: 'REGION_CHANGED', isRegionChanged: true});
    this.toggleModal();
    return this.setState({externalData: true});
  }

  regionChosen () {
    if (this.user.getChosenCountry()) {
      return this.user.getCountryGeojson();
    } else {
      switch (this.user.getChosenRegion()) {
        case 'Australia and New Zealand':
        case 'Australia y Nueva Zelanda':
        case 'Australien und Neuseeland':
          return Australia;
          break;
        case 'Caribbean':
        case 'Caribe':
        case 'Karibik':
          return Caribbean;
          break;
        case 'Central America':
        case 'America Central':
        case 'Mittelamerika':
          return CentralAmerica;
          break;
        case 'Central Asia':
        case 'Asia Central':
        case 'Mittelasien':
          return CentralAsia;
          break;
        case 'East Africa':
        case 'Este de Africa':
        case 'Ostafrika':
          return EasternAfrica;
          break;
        case 'East Asia':
        case 'Este de Asia':
        case 'Ostasien':
          return EasternAsia;
          break;
        case 'East Europe':
        case 'Europa del Este':
        case 'Osteuropa':
          return EasternEurope;
          break;
        case 'Melanesia':
        case 'Melanesia':
        case 'Melanesien':
          return Melanesia;
          break;
        case 'North Africa':
        case 'Norte de Africa':
        case 'Nordafrika':
          return NorthernAfrica;
          break;
        case 'North America':
        case 'Norte de America':
        case 'Nordamerika':
          return NorthernAmerica;
          break;
        case 'North Europe':
        case 'Norte de Europa':
        case 'Nordeuropa':

          return NorthernEurope;
          break;
        case 'Polynesia':
        case 'Polinesia':
        case 'Polynesien':
          return Polynesia;
          break;
        case 'South America':
        case 'America del Sur':
        case 'Südamerika':
          return SouthAmerica;
          break;
        case 'South East Asia':
        case 'Sudeste Asiatico':
        case 'Südostasien':
          return SouthEasternAsia;
          break;
        case 'South Africa':
        case 'Sur de Africa':
        case 'Südafrika':
          return SouthernAfrica;
          break;
        case 'South Asia':
        case 'Sur de Asia':
        case 'Südasien':
          return SouthernAsia;
          break;
        case 'South Europe':
        case 'Sur de Europa':
        case 'Südeuropa':
          return SouthernEurope;
          break;
        case 'West Asia':
        case 'Oeste de Asia':
        case 'Westasien':
          return WesternAsia;
          break;
        default: WesternEurope;
      }
    }
  }

  onPressAddBackpack () {
    this.user.setChosenCountry(null);
    this.user.setChosenRegion(null);
    this.user.setDateOfTravel(null);
    this.rootStore.dispatch({ type: 'RECOS_UPDATED', isRecosUpdated: true});
    this.navigateTo('TravelDecision');
  }

  async logoutAndRedirect () {
    await this.storage.clear();
    this.user.reset();
    this.rootStore.dispatch({type: 'RESET_USER'});
    this.navigateTo('Splash');
  }

  render () {
    if (this.state.externalData === null) {
      return <View />;
    } else {
      return template(this);
    }
  }
}

export default connect()(DestinationController);
