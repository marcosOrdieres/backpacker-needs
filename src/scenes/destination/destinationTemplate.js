import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import destinationStyles from './destinationStyles';
import Caribbean from '../../assets/mapJson/subregion/Caribbean.json';
import MapView from 'react-native-maps';
import Geojson from 'react-native-geojson';
import { Button, Main, ControlPanel } from 'components';
import Palette from '../../common/palette';
import markerBackpacker from '../../assets/images/markerBackpack.png';
import Toast, {DURATION} from 'react-native-easy-toast';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import BackpackSvg from '../../assets/svg/Ruck';
import drawerBackgroundImage from '../../assets/images/drawerBackpack.png';
import { ListItem } from 'components';

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
          style={{width: width, height: '20%', backgroundColor: 'black', opacity: 0.5}}>
          <ImageBackground
            style={{width: '100%', height: '100%', resizeMode: 'contain'}}
            source={drawerBackgroundImage} />
        </View>
        <View
          style={{width: width, height: '80%', padding: 22}}>
          <View style={{width: width}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <BackpackSvg width={25} height={25} color={Palette.black} colorFillCorner={Palette.white} colorFillRest={Palette.white} />
              </View>
              <View style={{flex: 5}}>
                <Text>{controller.i18n.t('destination.myBackpacks')}</Text>
              </View>
            </View>
            <View style={{borderBottomColor: 'black', borderBottomWidth: 0.5, opacity: 0.6, paddingTop: '10%'}} />
            <View style={{height: '100%'}}>
              <ListItem
                noFirstIcon
                noPaddingLeft
                noIcon
                fontTitle={14}
                dataItem={controller.user.getRegionsAsyncStorage()}
                onClickListItem={(item) => controller.onClickListItemRegion(item)} />
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={destinationStyles.modalContentRest}
        onPress={() => { controller.toggleModal(); }} />
    </Modal>

    <TouchableOpacity
      style={destinationStyles.hamburguerView}
      onPress={() => { controller.toggleModal(); }}>
      <Icon size={20} name='bars' color={Palette.white} />
    </TouchableOpacity>

    <TouchableOpacity
      style={destinationStyles.logoutView}
      onPress={() => {
        controller.logoutAndRedirect();
      }}>
      <Icon size={20} name='sign-out' color={Palette.white} />
    </TouchableOpacity>

    <TouchableOpacity
      style={destinationStyles.questionView}
      onPress={() => {
        controller.rootStore.dispatch({ type: 'FROM_DESTINATION_TO_WHAT', isDestinationToWhatScreen: true});
        controller.navigateTo('WhatDoesThisApp');
      }}>
      <Icon size={20} name='question' color={Palette.white} />
    </TouchableOpacity>

    <ActionButton buttonColor={Palette.primaryColor}>
      <ActionButton.Item buttonColor={Palette.green}
        title={controller.i18n.t('destination.addBackpack')}
        onPress={() => { controller.onPressAddBackpack(); }}>
        <BackpackSvg width={25} height={25} colorFillCorner={Palette.green} colorFillRest={Palette.green} />
      </ActionButton.Item>
    </ActionButton>
  </View>
);
