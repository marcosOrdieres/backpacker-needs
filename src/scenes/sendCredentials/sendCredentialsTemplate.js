import React from 'react';
import { View, Text, ScrollView, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import sendCredentialsStyles from './sendCredentialsStyles';
import {Button} from 'components';
import loginBackgroundImage from '../../assets/images/loginBackgroundImage.png';

export default (controller) => (
  <View style={sendCredentialsStyles.sendCredentialsContainer}>
    <View style={{flex: 1}}>
      <View style={{flex: 1}} />
      <View style={{flex: 1}}>
        <TextInput
          underlineColorAndroid={controller.palette.white}
          placeholderTextColor={controller.palette.white}
          style={{width: '100%'}}
          onChangeText={(userName) => { controller.setState({userName: userName}); }}
          placeholder={controller.i18n.t('email')} />

        <TextInput
          underlineColorAndroid={controller.palette.white}
          placeholderTextColor={controller.palette.white}
          style={{width: '100%'}}
          onChangeText={(password) => { controller.setState({password: password}); }}
          secureTextEntry
          placeholder={controller.i18n.t('password')} />
      </View>
      {controller.user.getSendCredentialsLogin() ?
        (
          <View style={{flex: 1}}>
            <Button
              title={controller.i18n.t('sendCredentials.login')}
              color={controller.palette.primaryColorTransparent}
              textColor={controller.palette.black}
              onPress={() => controller.handleLogin()}
             />
          </View>
         ) : (
           <View style={{flex: 1}}>
             <Button
               title={controller.i18n.t('sendCredentials.register')}
               color={controller.palette.primaryColorTransparent}
               textColor={controller.palette.black}
               onPress={() => controller.handleSignupEmail()}
           />
           </View>
       )}
    </View>
  </View>
);
