import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import destinationStyles from './destinationStyles';
import Caribbean from '../../assets/mapJson/subregion/Caribbean.json';
import MapView from 'react-native-maps';
import Geojson from 'react-native-geojson';
import { Button, Main, ControlPanel } from 'components';
import PopupDialog, { DialogTitle } from 'react-native-popup-dialog';
import Palette from '../../common/palette';
import markerBackpacker from '../../assets/images/markerBackpack.png';
import Toast, {DURATION} from 'react-native-easy-toast';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import BackpackSvg from '../../assets/svg/Ruck';
import drawerBackgroundImage from '../../assets/images/drawerBackpack.png';

import NavigationDrawerLayout from 'react-native-navigation-drawer-layout';
import Drawer from 'react-native-drawer';

import Modal from 'react-native-modal';
const {width, height} = Dimensions.get('window');

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

    <Modal
      animationIn='slideInLeft'
      animationOut='slideInLeft'
      onSwipe={() => { controller.setState({isModalVisible: false}); }}
      swipeDirection='left'
      style={destinationStyles.modal}
      isVisible={controller.state.isModalVisible}>

      <View style={destinationStyles.modalContent}>
        <View
          style={{width: width, height: '20%'}}>
          <ImageBackground
            style={{width: '100%', height: '100%', resizeMode: 'contain'}}
            source={drawerBackgroundImage} />
        </View>
        <View
          style={{width: width, height: '60%', backgroundColor: 'blue', padding: 22}} />
      </View>
      <TouchableOpacity
        style={destinationStyles.modalContentRest}
        onPress={() => { controller.setState({isModalVisible: false}); }} />
    </Modal>

    <TouchableOpacity
      style={{width: 50, height: 50, backgroundColor: Palette.primaryColor, paddingTop: 100, paddingLeft: 100}}
      onPress={() => { controller.toggleModal(); }}
         />
    <ActionButton buttonColor={Palette.primaryColor}>
      <ActionButton.Item buttonColor={Palette.green} title='Add Backpack' onPress={() => { controller.navigateTo('TravelDecision'); }}>
        <BackpackSvg width={25} height={25} colorFillCorner={Palette.green} colorFillRest={Palette.green} />
      </ActionButton.Item>
    </ActionButton>
  </View>
);
