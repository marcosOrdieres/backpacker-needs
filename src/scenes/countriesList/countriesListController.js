import { BaseScene } from 'components';
import template from './countriesListTemplate';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';

class CountriesListController extends BaseScene {
  constructor (args) {
    super(args);
  }

  getDataItem () {
    let database = firebase.database();
    console.warn('DATABASE: ', database);
    const list = [
      {
        title: 'South East Asia'
      },
      {
        title: 'North America'
      }
    ];
    return list;
  }

  onClickListItem () {
    // Aqui cuando clicko, ademas de elegirse ese item (region), mando a Leaflet que se me vea ese MapJson que quiero y con else {
      // centroide pongo una chincheta en el medrio de la region que tengo.
  }

  render () {
    return template(this);
  }
}

export default connect()(CountriesListController);
