import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import destinationStyles from './destinationStyles';
import Caribbean from '../../assets/mapJson/subregion/Caribbean.json';
import MapView from 'react-native-maps';
import Geojson from 'react-native-geojson';
import { Button } from 'components';
import PopupDialog, { DialogTitle } from 'react-native-popup-dialog';

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
      // region={controller.state.mapRegion}
      minZoomLevel={10}
      maxZoomLevel={12}
      showsUserLocation
      followUserLocation
      zoomEnabled
      zoomControlEnabled
      rotateEnabled
      scrollEnabled
      loadingEnabled
      // onRegionChange={controller.onRegionChange.bind(controller)}
      >
      <Geojson geojson={controller.regionChosen()}
        fillColor={{color: 'red'}} />

      <MapView.Marker
        coordinate={{
          latitude: (controller.state.lastLat + 0.00050) || -36.82339,
          longitude: (controller.state.lastLong + 0.00050) || -73.03569
        }}>
        <View>
          <Text style={{color: '#000'}}>
            { controller.state.lastLong } / { controller.state.lastLat }
          </Text>
        </View>
      </MapView.Marker>
    </MapView>
  </View>
);
