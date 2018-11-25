import { BaseScene } from 'components';
import template from './destinationTemplate';
import { connect } from 'react-redux';
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog';

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

  componentWillUnmount () {
    navigator.geolocation.clearWatch(this.region);
  }

  render () {
    return template(this);
  }
}

export default connect()(DestinationController);
