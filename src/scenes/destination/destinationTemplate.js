import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import destinationStyles from './destinationStyles';
import MapView from 'react-native-maps';
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
    {controller.state.buttonFly ?
      <View style={styles.buttonView}>
        <Button
          onPress={() => { this.popupDialog.show(); }}
          title={'I want to Fly, Now!'}
          color={'#5856d6'}
          textColor={'white'} />
      </View>
      :
      null
    }
    <PopupDialog
      dialogTitle={<DialogTitle title='Dialog Title' />}
      ref={(popupDialog) => { this.popupDialog = popupDialog; }}
      onDismissed={() => { controller.setState({buttonFly: false}); }}
      dialogAnimation={controller.slideAnimation}>
      <View>
        <Text>Hello</Text>
      </View>
    </PopupDialog>

  </View>
);
