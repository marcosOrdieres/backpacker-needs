import React from 'react';
import travelDecisionStyles from './travelDecisionStyles';
import { ListItem } from 'components';
import { View, Text, TextInput, TouchableOpacity, Button } from 'react-native';
import Palette from '../../common/palette';

export default (controller) => (
  <View>
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
          style={{height: 40}}
          placeholder='Type here the country!'
          value={controller.state.countryInput}
          onChangeText={(text) => {
            controller.setState({text});
            controller.checkCountry();
          }} />
        <Text>{controller.state.country}</Text>
      </View>
      <View style={travelDecisionStyles.dividerStatic}>
        <Text style={travelDecisionStyles.textDividerStatic}>Country (eg. Thailand)</Text>
      </View>
      <View style={travelDecisionStyles.dividerDynamic}>
        <Button
  onPress={()=>{controller.navigateTo('Destination')}}
  title="HOLAAAAA"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"/>
        <Text>Backpacker Needs</Text>
      </View>
      <View style={travelDecisionStyles.destinyView}>
        <Text style={travelDecisionStyles.destinyText}>About the Trip</Text>
      </View>
      <View style={travelDecisionStyles.aboutTheTripView}>
        <View style={{backgroundColor: 'yellow'}}>
          <Text>hello world 1.........</Text>
          <Text>hello world 1.........</Text>
          <Text>hello world 1.........</Text>
          <Text>hello world 1.........</Text>
        </View>
        <View style={{backgroundColor: 'green'}}>
          <Text>hello world 2.........</Text>
          <Text>hello world 2.........</Text>
          <Text>hello world 2.........</Text>
          <Text>hello world 2.........</Text>
        </View>
      </View>
    </View>
  </View>
);
