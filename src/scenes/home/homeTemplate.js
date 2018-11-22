import React from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  TouchableHighlight
} from 'react-native';
import homeStyles from './homeStyles';
import {Button} from 'components';
import loginBackgroundImage from '../../assets/images/loginBackgroundImage.png';
import PopupDialog, { DialogTitle } from 'react-native-popup-dialog';

export default(controller) => (
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
        color={'#008000'}
        textColor={'white'}
        onPress={() => {
          controller.user.setSendCredentialsSignup(true);
				    return controller.props.navigation.navigate('SendCredentials');
        }} />
      <Button
        title={controller.i18n.t('home.registerFacebookTitle')}
        color={'#3b5998'}
        textColor={'white'}
        onPress={() => controller.handleSignupFacebook()} />
      <Text style={homeStyles.areYouUserText}>{controller.i18n.t('home.areYouUser')}</Text>
      <Button
        title={controller.i18n.t('home.loginTitle')}
        color={'white'}
        buttonBorderColor={'black'}
        textColor={'black'}
        onPress={() => {
          controller.user.setSendCredentialsLogin(true);
          return controller.props.navigation.navigate('SendCredentials');
        }} />
    </ImageBackground >
  </View>
);
