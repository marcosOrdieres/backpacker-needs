import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import destinationStyles from './destinationStyles';
import Caribbean from '../../assets/mapJson/subregion/Caribbean.json';
import MapView from 'react-native-maps';
import Geojson from 'react-native-geojson';
import { Button } from 'components';
import PopupDialog, { DialogTitle } from 'react-native-popup-dialog';
import Palette from '../../common/palette';
import markerBackpacker from '../../assets/images/markerBackpack.png';

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
      toolbarEnabled
      // onRegionChange={controller.onRegionChange.bind(controller)}
      >
      <Geojson
        geojson={controller.regionChosen()}
        fillColor={Palette.primaryColorTransparent} />

      <MapView.Marker
        image={markerBackpacker}
        coordinate={{
          latitude: controller.state.lastLat,
          longitude: controller.state.lastLong
        }} />
    </MapView>
  </View>
);
