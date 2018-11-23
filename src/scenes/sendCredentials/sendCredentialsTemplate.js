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
        placeholder={controller.i18n.t('email')} />

      <TextInput
        onChangeText={(password) => { controller.setState({password: password}); }}
        secureTextEntry
        placeholder={controller.i18n.t('password')} />
      {controller.user.getSendCredentialsLogin() ?
        (
          <Button
            title={controller.i18n.t('sendCredentials.login')}
            color={controller.palette.primaryColorTransparent}
            textColor={controller.palette.black}
            onPress={() => controller.handleLogin()}
             />
         ) : (
           <Button
             title={controller.i18n.t('sendCredentials.register')}
             color={controller.palette.primaryColorTransparent}
             textColor={controller.palette.black}
             onPress={() => controller.handleSignupEmail()}
           />
       )}
    </View>
  </View>
);
