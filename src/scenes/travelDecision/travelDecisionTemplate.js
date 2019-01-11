import React from 'react';
import travelDecisionStyles from './travelDecisionStyles';
import { ListItem } from 'components';
import { View, Text, TextInput, TouchableOpacity, Dimensions, TouchableHighlight, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import Palette from '../../common/palette';
import { Button } from 'react-native-elements';
import { DateTravel } from 'components';
import Icon from 'react-native-vector-icons/FontAwesome';

const {width, height} = Dimensions.get('window');

export default (controller) => (
  <ScrollView style={{flex: 1, flexDirection: 'column'}}>
    {controller.state.show && controller.state.country ? <TouchableOpacity
      style={travelDecisionStyles.countryTextOverlay}
      onPress={() => {
        controller.setState({countryInput: controller.state.country, text: controller.state.countryInput});
        controller.refs.countryInput.blur();
        controller.checkCountry();
      }}>
      <Text style={{fontSize: 18, margin: 5}}>
        {controller.state.country}
      </Text>
    </TouchableOpacity> : null}

    <View style={travelDecisionStyles.topBar}>
      <Text style={travelDecisionStyles.textTopBar}>{controller.i18n.translate('travelDecision.BN')}</Text>
    </View>

    <View style={{flex: 1}}>
      <View style={travelDecisionStyles.destinyView}>
        <Text style={travelDecisionStyles.destinyText}>{controller.i18n.translate('travelDecision.destination')}</Text>
      </View>
      <View style={travelDecisionStyles.dividerStatic}>
        <Text style={travelDecisionStyles.textDividerStatic}>{controller.i18n.translate('travelDecision.region')}</Text>
      </View>

      <View style={travelDecisionStyles.dividerDynamicLoco}>

        <TouchableOpacity
          style={{height: '100%', justifyContent: 'flex-start'}}
          onPress={() => { controller.toggleModal(); }}>
          <Text style={travelDecisionStyles.textChoseRegion}>
            {controller.user.getChosenRegion() ? controller.user.getChosenRegion() : controller.i18n.translate('travelDecision.chooseRegion') }
          </Text>
          <View style={{justifyContent:'right'}}>
            <Icon size={10} name='search' color={Palette.primaryColor} />
          </View>
      </TouchableOpacity>
        <Modal
          style={travelDecisionStyles.modal}
          isVisible={controller.state.isModalVisible}>

          <View style={travelDecisionStyles.modalContent}>
            <Text>{controller.i18n.translate('travelDecision.choose')}</Text>
            <TouchableOpacity onPress={() => { controller.toggleModal(); }}>
              <View style={{width: width}}>
                <ListItem
                  noFirstIcon
                  noPaddingLeft
                  noIcon
                  dataItem={Object.keys(controller.user.getCountries()).sort()}
                  onClickListItem={(itemTitle) => controller.onClickListItem(itemTitle)} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { controller.toggleModal(); }}>
              <Text>[Hide me!]</Text>
            </TouchableOpacity>
          </View>
        </Modal>

      </View>

      <View style={[travelDecisionStyles.dividerStatic, controller.state.show && controller.state.country ? {marginTop: 40} : null]}>
        <Text style={travelDecisionStyles.textDividerStatic}>{controller.i18n.t('travelDecision.country')}</Text>
      </View>
      <View style={travelDecisionStyles.dividerDynamic}>
        <TextInput
          ref='countryInput'
          style={travelDecisionStyles.textInputCountry}
          placeholder={controller.i18n.t('travelDecision.placeholderCountry')}
          value={controller.state.countryInput}
          underlineColorAndroid={Palette.transparent}
          onBlur={() => { controller.setState({show: false}); }}
          onChangeText={(text) => {
            controller.setState({text, countryInput: text, show: true});
            if (text.length > 0) {
              controller.checkCountry();
            } else {
              controller.setState({country: null, show: false});
            }
          }} />
      </View>
    </View>

    <View style={{flex: 1}}>

      <TouchableOpacity
        onPress={() => {
          if (controller.state.letsgo) {
            controller.sendRegionAndDate();
            return controller.navigateTo('Menu');
          } else {
            return false;
          }
        }}
        style={[{backgroundColor: controller.state.letsgo ? Palette.green : Palette.disabled}, travelDecisionStyles.destinyView]}>
        <Text style={[{color: controller.state.letsgo ? Palette.white : Palette.black}, travelDecisionStyles.destinyText]}>
          {controller.state.letsgo ? controller.i18n.t('travelDecision.letsgo') : controller.i18n.t('travelDecision.aboutTrip')}
        </Text>
      </TouchableOpacity>

      <View style={travelDecisionStyles.aboutTheTripView}>
        <DateTravel
          date={controller.state.date}
          onDateChange={(date) => {
            controller.user.setDateOfTravel(date);
            controller.setState({date: date});
            controller.checkLetsGo();
          }} />
      </View>
    </View>
  </ScrollView>
);
