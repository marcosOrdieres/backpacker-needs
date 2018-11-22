import React from 'react';
import { View, Text, ScrollView, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import sendCredentialsStyles from './sendCredentialsStyles';
import {Button} from 'components';
import loginBackgroundImage from '../../assets/images/loginBackgroundImage.png';

export default (controller) => (
  <View style={sendCredentialsStyles.sendCredentialsContainer}>
    <View style={{flex: 1, paddingTop: '20%'}}>
      <TextInput
        onChangeText={(userName) => { controller.setState({userName: userName}); }}
        placeholder='email' />

      <TextInput
        onChangeText={(password) => { controller.setState({password: password}); }}
        secureTextEntry
        placeholder='password' />
      {controller.user.getSendCredentialsLogin() ?
        (
          <Button
            title={'Log in with your email'}
            color={'#bebdef'}
            textColor={'black'}
            onPress={() => controller.handleLogin()}
             />
         ) : (
           <Button
             title={'Register with your email'}
             color={'#bebdef'}
             textColor={'black'}
             onPress={() => controller.handleSignupEmail()}
           />
       )}
    </View>
  </View>
);
