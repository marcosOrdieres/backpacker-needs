import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import destinationStyles from './destinationStyles';
import Caribbean from '../../assets/mapJson/subregion/Caribbean.json';
import MapView from 'react-native-maps';
import Geojson from 'react-native-geojson';
import { Button } from 'components';
import PopupDialog, { DialogTitle } from 'react-native-popup-dialog';
import Palette from '../../common/palette';
import markerBackpacker from '../../assets/images/markerBackpack.png';
import Toast, {DURATION} from 'react-native-easy-toast';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import BackpackSvg from '../../assets/svg/Ruck';

const localStyles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject
  },
  buttonView: {
    position: 'absolute',
    top: 400,
    width: 350,
    marginLeft: 10
  }
});
export default (controller) => (
  <View style={{flex: 1}}>
    <MapView
      style={localStyles.map}
      region={controller.state.mapRegion}
      rotateEnabled
      scrollEnabled
      loadingEnabled
      showsScale
      showsCompass
      showsPointsOfInterest
      zoomControlEnabled
      toolbarEnabled>
      <Geojson
        geojson={controller.regionChosen()}
        fillColor={Palette.primaryColorTransparent} />
    </MapView>

    <Toast
      ref='toast'
      style={{backgroundColor: Palette.primaryColor30, width: '70%'}}
      position='top'
      positionValue={200}
      fadeInDuration={3000}
      fadeOutDuration={2000}
      opacity={0.7}
      textStyle={{color: Palette.white, fontSize: 18, fontFamily: 'Calibri', textAlign: 'center' }} />
    <ActionButton buttonColor={Palette.primaryColor}>
      <ActionButton.Item buttonColor={Palette.green} title='Add Backpack' onPress={() => { console.warn('vamos para el TravelDecision'); }}>
        <BackpackSvg width={25} height={25} colorFillCorner={Palette.green} colorFillRest={Palette.green} />
      </ActionButton.Item>
    </ActionButton>
  </View>
);
