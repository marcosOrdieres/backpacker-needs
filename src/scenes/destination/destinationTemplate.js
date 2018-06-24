import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import destinationStyles from './destinationStyles';
import MapView from 'react-native-maps';

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject
  }
});
export default (controller) => (
  <View style={{flex: 1}}>
    <MapView
      style={styles.map}
      region={controller.state.mapRegion}
      showsUserLocation
      followUserLocation
      zoomEnabled
      zoomControlEnabled
      rotateEnabled
      scrollEnabled
      loadingEnabled
      onRegionChange={controller.onRegionChange.bind(controller)}>
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
