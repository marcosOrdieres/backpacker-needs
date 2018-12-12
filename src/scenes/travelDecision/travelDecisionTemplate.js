import React from 'react';
import travelDecisionStyles from './travelDecisionStyles';
import { ListItem } from 'components';
import { View, Text, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import Palette from '../../common/palette';
import { Button } from 'react-native-elements';

const {width, height} = Dimensions.get('window')

const textStyle = {
  zIndex: 10000000,
  position: 'absolute',
  top: 260,
  backgroundColor: 'white',
  width: width-6,
  margin: 3,
  borderColor: 'black',
  borderRadius: 3,
  borderWidth: 1
}

export default (controller) => (
  <View>
    {controller.state.show && controller.state.country ? <TouchableOpacity
     style={textStyle}
      onPress={() => {
        controller.setState({countryInput: controller.state.country, text: controller.state.country})
        controller.refs.countryInput.blur()
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
        <TextInput
          ref='countryInput'
          style={{height: 40}}
          placeholder='Type here the country!'
          value={controller.state.countryInput}
          underlineColorAndroid={Palette.transparent}
          onBlur={() => {
            controller.setState({show: false})
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
      <View style={[travelDecisionStyles.dividerStatic, controller.state.show && controller.state.country ? {marginTop: 40}: null]}>
        <Text style={travelDecisionStyles.textDividerStatic}>Country (eg. Thailand)</Text>
      </View>
      <View style={travelDecisionStyles.dividerDynamic}>
        <Text>Backpacker Needs</Text>
      </View>
      <View style={travelDecisionStyles.destinyView}>
        <Text style={travelDecisionStyles.destinyText}>About the Trip</Text>
      </View>
      <View style={travelDecisionStyles.aboutTheTripView}>
        <View style={travelDecisionStyles.whenView} />
        <View style={travelDecisionStyles.howManyDaysView} />
      </View>

        {/*<Button
          onPress={() => { controller.navigateTo('Destination'); }}
          title='Let´s Go!!' />*/}
    </View>
  </View>
);
