import { BaseScene } from 'components';
import template from './destinationTemplate';
import { connect } from 'react-redux';

class DestinationController extends BaseScene {
  constructor (args) {
    super(args);
    this.state = {
      mapRegion: null,
      lastLat: null,
      lastLong: null
    };
  }

  componentDidMount () {
    this.region = navigator.geolocation.watchPosition((position) => {
      console.warn('position: ', position);
      let region = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.00922 * 1.5,
        longitudeDelta: 0.00421 * 1.5
      };
      this.onRegionChange(region, region.latitude, region.longitude);
    });
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
