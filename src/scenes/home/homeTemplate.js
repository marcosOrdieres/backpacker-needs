import React from 'react';
import { View, Text, ScrollView, ImageBackground, TouchableOpacity, TextInput, TouchableHighlight } from 'react-native';
import homeStyles from './homeStyles';
import { Button, Splash } from 'components';
import loginBackgroundImage from '../../assets/images/backpackerBack.png';
import PopupDialog, { DialogTitle } from 'react-native-popup-dialog';
import logo from '../../assets/images/backpackerNeeds.png';

export default(controller) => (!controller.state.noConnectionSplash ? (
  <View style={homeStyles.homeContainer}>
    <ImageBackground
      style={{width: '100%', height: '100%'}}
      source={loginBackgroundImage}>
      <View style={homeStyles.mainTitleView}>
        <Text style={homeStyles.mainTitleText}>{controller.i18n.t('home.mainTitleText')}</Text>
      </View>
      <TouchableHighlight
        onPress={() => { controller.popupDialog.show(); }}>
        <Text style={homeStyles.textDataPrivacy}>{controller.i18n.t('home.textDataPrivacy')}</Text>
      </TouchableHighlight>
      <PopupDialog
        dialogTitle={<DialogTitle title='Dialog Title' />}
        ref={(popupDialog) => { controller.popupDialog = popupDialog; }}
        onDismissed={() => { controller.setState({buttonFly: false}); }}
        dialogAnimation={controller.slideAnimation}>
        <View>
          <Text>{controller.i18n.t('home.popupDialog')}</Text>
        </View>
      </PopupDialog>
      <Button
        title={controller.i18n.t('home.registerEmailTitle')}
        color={controller.palette.whiteTransparent}
        textColor={controller.palette.white}
        onPress={() => {
          controller.user.setSendCredentialsSignup(true);
          return controller.navigateTo('SendCredentials');
        }} />
      <Button
        title={controller.i18n.t('home.registerFacebookTitle')}
        color={controller.palette.blueFacebook}
        textColor={controller.palette.white}
        onPress={() => controller.handleSignupFacebook()} />
      <Text style={homeStyles.areYouUserText}>{controller.i18n.t('home.areYouUser')}</Text>
      <Button
        title={controller.i18n.t('home.loginTitle')}
        color={controller.palette.white}
        buttonBorderColor={controller.palette.black}
        textColor={controller.palette.black}
        onPress={() => {
          controller.user.setSendCredentialsLogin(true);
          return controller.navigateTo('SendCredentials');
        }} />
    </ImageBackground >
  </View>)
  :
  (<Splash logo={logo} textSplash={controller.i18n.t('home.noInternet')} />)
);
