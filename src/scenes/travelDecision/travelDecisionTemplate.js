import React from 'react';
import travelDecisionStyles from './travelDecisionStyles';
import { ListItem } from 'components';
import { View, Text, TextInput, TouchableOpacity, Dimensions, TouchableHighlight, ScrollView } from 'react-native';
import Modal from "react-native-modal";
import Palette from '../../common/palette';
import { Button } from 'react-native-elements';
import AirportSvg from '../../assets/svg/Airport';
import Calendar from '../../assets/svg/Calendar';
import DatePicker from 'react-native-datepicker';

const {width, height} = Dimensions.get('window');

const textStyle = {
  zIndex: 100,
  position: 'absolute',
  top: 260,
  backgroundColor: 'white',
  width: width - 6,
  margin: 3,
  borderColor: 'black',
  borderRadius: 3,
  borderWidth: 1
};

export default (controller) => (
  <View>
    {controller.state.show && controller.state.country ? <TouchableOpacity
      style={textStyle}
      onPress={() => {
        controller.setState({countryInput: controller.state.country, text: controller.state.country});
        controller.refs.countryInput.blur();
        controller.checkCountry();
      }}>
      <Text style={{fontSize: 18, margin: 5}}>
        {controller.state.country}
      </Text>
    </TouchableOpacity> : null}
    <View style={travelDecisionStyles.topBar}>
      <Text style={travelDecisionStyles.textTopBar}>Backpacker Needs</Text>
    </View>

    <View>
      <View style={travelDecisionStyles.destinyView}>
        <Text style={travelDecisionStyles.destinyText}>Destiny</Text>
      </View>
      <View style={travelDecisionStyles.dividerStatic}>
        <Text style={travelDecisionStyles.textDividerStatic}>Region (eg. South East Asia)</Text>
      </View>

      <View style={travelDecisionStyles.dividerDynamicLoco}>

          <TouchableOpacity onPress={()=>{controller.toggleModal()}}>
            <Text>Please Choose a Region!</Text>
          </TouchableOpacity>
          <Modal
              style={travelDecisionStyles.modal}
              isVisible={controller.state.isModalVisible}>


              <View style={travelDecisionStyles.modalContent}>
                  <Text>Choose a Region!</Text>
                  <TouchableOpacity onPress={()=>{controller.toggleModal()}}>
                    <View style = {{width:width}}>
                      <ListItem
                        dataItem={Object.keys(controller.user.getCountries()).sort()}
                        onClickListItem={(itemTitle) => controller.onClickListItem(itemTitle)} />
                    </View>
                  </TouchableOpacity>


              <TouchableOpacity onPress={()=>{controller.toggleModal()}}>
                <Text>[Hide me!]</Text>
              </TouchableOpacity>
            </View>
          </Modal>

    </View>

      <View style={[travelDecisionStyles.dividerStatic, controller.state.show && controller.state.country ? {marginTop: 40} : null]}>
        <Text style={travelDecisionStyles.textDividerStatic}>Country (eg. Thailand)</Text>
      </View>

      <View style={travelDecisionStyles.dividerDynamic}>

        <TextInput
          ref='countryInput'
          style={{height: 40}}
          placeholder='Type here the country!'
          value={controller.state.countryInput}
          underlineColorAndroid={Palette.transparent}
          onBlur={() => {
            controller.setState({show: false});
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

      <View style={travelDecisionStyles.destinyView}>
        <Text style={travelDecisionStyles.destinyText}>About the trip</Text>
      </View>
      <View style={travelDecisionStyles.aboutTheTripView}>
        <View style={travelDecisionStyles.whenView}>
          <View style={{marginTop: 5, width: 80, height: 30}} />
          <Text style={travelDecisionStyles.textTopBar}>When?</Text>
          <View style={{marginTop: 30, width: 100, height: 100}}>
            <Calendar width={100} height={100} />
          </View>
          <DatePicker
            style={{width: '80%', paddingTop: 20}}
            date={controller.state.date}
            mode='date'
            placeholder='select date'
            format='YYYY-MM-DD'
            minDate='2018-05-01'
            maxDate='2019-12-01'
            confirmBtnText='Confirm'
            cancelBtnText='Cancel'
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36,
                borderColor: 'white'
              },
              dateText: {
                color: 'white',
                fontSize: 16,
                fontFamily: 'Calibri'
              }
            }}
            onDateChange={(date) => { controller.setState({date: date}); }} />
        </View>
      </View>
      {/* <ListItem
  dataItem={Object.keys(controller.user.getCountries()).sort()}
  onClickListItem={(itemTitle) => controller.onClickListItem(itemTitle)} /> */}

      {/* <Button
          onPress={() => { controller.navigateTo('Destination'); }}
          title='Let´s Go!!' /> */}
    </View>
  </View>
);
