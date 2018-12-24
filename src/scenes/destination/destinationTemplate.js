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

const styles = StyleSheet.create({
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
      style={styles.map}
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
      position='bottom'
      positionValue={200}
      fadeInDuration={3000}
      fadeOutDuration={2000}
      opacity={0.7}
      textStyle={{color: Palette.white, fontSize: 18, fontFamily: 'Calibri', textAlign: 'center' }} />
    {/* <TouchableOpacity
      onPress={() => { controller.navigateTo('TravelDecision'); }}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 100,
        position: 'absolute',
        // marginLeft: '70%',
        // marginTop: '120%',
        backgroundColor: Palette.primaryColor30,
        borderRadius: 100
      }}
    >
      <Icon name={'chevron-right'} size={30} color='#01a699' />
    </TouchableOpacity> */}
  </View>
);
