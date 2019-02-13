import React from 'react';
import { View, Text, ScrollView, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import sendCredentialsStyles from './sendCredentialsStyles';
import {Button} from 'components';

export default (controller) => (
  <View style={sendCredentialsStyles.sendCredentialsContainer}>
      <View style={{flex: 1, width:'80%', alignItems:'flex-end', justifyContent:'flex-end'}}>
        <TextInput
          ref='userNameRef'
          onSubmitEditing={() => { controller.refs.passwordRef.focus(); }}
          onBlur={() => { controller.refs.passwordRef.focus(); }}
          underlineColorAndroid={controller.palette.white}
          placeholderTextColor={controller.palette.primaryColor75}
          style={sendCredentialsStyles.textInputUserName}
          onChangeText={(userName) => { controller.setState({userName: userName}); }}
          placeholder={controller.i18n.t('email')} />

        <TextInput
          ref='passwordRef'
          underlineColorAndroid={controller.palette.white}
          placeholderTextColor={controller.palette.primaryColor75}
          style={sendCredentialsStyles.textInputPassword}
          onChangeText={(password) => { controller.setState({password: password}); }}
          secureTextEntry
          placeholder={controller.i18n.t('password')} />

      </View>
      {controller.state.theUserIsUsed !== '' ?
        <View style={{flex:0.5,width: '80%', flexWrap:'wrap', alignItems:'center', justifyContent:'center'}}>
          <Text style={sendCredentialsStyles.textErrorUserAlreadyUsed}>{controller.state.theUserIsUsed}</Text>
        </View>
      :
        null
      }
      {controller.user.getSendCredentialsLogin() ?
        (
          <View style={{flex: controller.state.theUserIsUsed !== '' ? 0.5 : 1, width: '80%', alignItems:'center', justifyContent:'center'}}>
            <Button
              title={controller.i18n.t('sendCredentials.login')}
              color={controller.palette.primaryColorTransparent}
              textColor={controller.palette.white}
              onPress={() => controller.handleLogin()}
             />
          </View>
         ) : (
           <View style={{flex: controller.state.theUserIsUsed !== '' ? 0.5 : 1, width: '80%', alignItems:'center', justifyContent:'center'}}>
             <Button
               title={controller.i18n.t('sendCredentials.register')}
               color={controller.palette.primaryColorTransparent}
               textColor={controller.palette.white}
               onPress={() => controller.handleSignupEmail()}
           />
           </View>
       )}
  </View>
);
