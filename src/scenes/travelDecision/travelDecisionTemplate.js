import React from 'react';
import travelDecisionStyles from './travelDecisionStyles';
import { ListItem } from 'components';
import { View, Text, TextInput, TouchableOpacity, Dimensions, TouchableHighlight, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import Palette from '../../common/palette';
import { Button } from 'react-native-elements';
import { DateTravel } from 'components';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import logoNoLetters from '../../assets/images/backpackNoLetters.png';
import logoEmpty from '../../assets/images/backpackEmpty.png';

const {width, height} = Dimensions.get('window');

export default (controller) => (
  <View style={{flex: 1, justifyContent: 'space-between'}}>
    <View style={travelDecisionStyles.topBar}>
      <Text style={travelDecisionStyles.textTopBar}>{controller.i18n.translate('travelDecision.BN')}</Text>
    </View>

    <View style={{flex: 0.75}}>
      <View style={[{flex: 0.2, justifyContent: 'center', alignItems: 'center'}]}>
        <Text style={travelDecisionStyles.destinyText}>{controller.i18n.translate('travelDecision.destination')}</Text>
      </View>

      {!controller.state.focusOnCountry ?
        <View style={{flex: 0.3, opacity: controller.state.text ? 0.5 : null}}>

          <View style={{flex: 0.5, justifyContent: 'center', paddingLeft: '5%',
            backgroundColor: '#fff2cc', borderTopWidth: 0.5, borderBottomWidth: 1, borderColor: 'black'}}>
            <Text style={travelDecisionStyles.textDividerStatic}>{controller.i18n.translate('travelDecision.region')}</Text>
          </View>

          <TouchableOpacity
            onPress={() => { controller.toggleModal(); }}
            style={{flex: 0.5, flexDirection: 'row'}}>
            <View
              style={{flex: 0.2, backgroundColor: Palette.primaryColor75, alignItems: 'center', justifyContent: 'center', borderColor: 'black', borderLeftWidth: 1}}>
              <Icon size={20} name='search' color={'white'} />
            </View>

            <View
              style={{flex: 0.8, justifyContent: 'center'}}>
              <Text style={{paddingLeft: 5, fontFamily: 'Calibri', fontSize: 15, textAlign: 'left'}}>
                {controller.user.getChosenRegion() ? controller.user.getChosenRegion() : controller.i18n.translate('travelDecision.chooseRegion') }
              </Text>
            </View>

            <Modal
              style={travelDecisionStyles.modal}
              onBackdropPress={() => { controller.toggleModal(); }}
              isVisible={controller.state.isModalVisible}>
              <View style={travelDecisionStyles.modalContent}>
                <View>
                  <View
                    style={{borderBottomColor: Palette.primaryColor, borderBottomWidth: 1, width: '80%', alignItems: 'center', paddingTop: 10}} />
                </View>
                <TouchableOpacity onPress={() => { controller.toggleModal(); }}>
                  <View style={{width: width}}>
                    <ListItem
                      isTip
                      noFirstIcon
                      noPaddingLeft
                      noIcon={false}
                      dataItem={Object.keys(controller.user.getRegions()).sort()}
                      onClickListItem={(itemTitle) => {
                        controller.onClickListItem(itemTitle);
                        if (controller.user.getDateOfTravel()) {
                          controller.checkLetsGo();
                        }
                      }} />
                  </View>
                </TouchableOpacity>
              </View>
            </Modal>

          </TouchableOpacity>

        </View>
      :
      null
    }

      <View style={{borderColor: 'black', borderBottomWidth: 1, flex: 0.3, opacity: controller.user.getChosenRegion() ? 0.5 : null}}>

        <View style={[{flex: 0.5, justifyContent: 'center', paddingLeft: '5%', borderColor: 'black', borderBottomWidth: 1,
          backgroundColor: '#fff2cc', borderTopWidth: 1}, controller.state.show && controller.state.country ? {marginTop: 40} : null]}>
          <Text style={travelDecisionStyles.textDividerStatic}>{controller.i18n.t('travelDecision.country')}</Text>
        </View>

        <View style={{flex: 0.5, flexDirection: 'row'}}>

          <View
            onPress={() => { controller.toggleModal(); }}
            style={{flex: 0.2, backgroundColor: Palette.primaryColor75, alignItems: 'center', justifyContent: 'center', borderColor: 'black', borderLeftWidth: 1}}>
            <Icon size={20} name='pencil' color={'white'} />
          </View>

          <View style={{ flex: 0.8, backgroundColor: Palette.white}}>
            <TextInput
              ref='countryInput'
              style={travelDecisionStyles.textInputCountry}
              placeholder={controller.i18n.t('travelDecision.placeholderCountry')}
              value={controller.state.countryInput}
              underlineColorAndroid={Palette.transparent}
              autoCapitalize={'characters'}
              onFocus={() => { controller.setState({focusOnCountry: true}); }}
              onBlur={() => {
                controller.setState({show: false, focusOnCountry: false});
                if ((controller.state.countryInput !== '') && controller.user.getDateOfTravel()) {
                  controller.checkLetsGo();
                }
              }}
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

      </View>
      {!controller.state.focusOnCountry ?
        <ScrollView
          contentContainerStyle={{ justifyContent: 'center', alignItems: 'center'}}>
          <Text style={[{paddingTop: '5%', paddingBottom: '5%'}, travelDecisionStyles.destinyText]}>{controller.user.getDateOfTravel() ? controller.i18n.t('travelDecision.travelDay') + controller.state.date : controller.i18n.t('travelDecision.chooseDate')}</Text>
          <DateTravel
            date={controller.state.date}
            logo={controller.user.getDateOfTravel() ? logoNoLetters : logoEmpty}
            onDateChange={(date) => {
              controller.user.setDateOfTravel(date);
              controller.setState({date: date});
              controller.checkLetsGo();
            }} />
        </ScrollView>
        :
        controller.state.focusOnCountry && controller.state.show && controller.state.country ?

        controller.state.countriesArray.map((value) => (
          <TouchableOpacity
            style={{backgroundColor: Palette.white, width: width, borderColor: Palette.black, borderRadius: 5, borderWidth: 1}}
            onPress={() => { controller.onPressCountryOverlay(value); }}>
            <Text style={{fontSize: 18, margin: 5}}>
              {value}
            </Text>
          </TouchableOpacity>
        ))
        :
        null
      }

    </View>
    <TouchableOpacity
      onPress={async () => {
        if (controller.state.letsgo) {
          await controller.sendRegionOrCountryAndDate();
          return controller.navigateTo('Menu');
        } else {
          return false;
        }
      }}

      style={{flex: 0.15, justifyContent: 'center', alignItems: 'center', backgroundColor: controller.state.letsgo ? Palette.green : Palette.disabled}}>
      <Text style={[{color: controller.state.letsgo ? Palette.white : Palette.black}, travelDecisionStyles.destinyText]}>
        {controller.state.letsgo ? controller.i18n.t('travelDecision.letsgo') : controller.i18n.t('travelDecision.aboutTrip')}
      </Text>
    </TouchableOpacity>
  </View>
);
