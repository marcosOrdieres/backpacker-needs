import React from 'react';
import { View, Text, ScrollView, ImageBackground, TouchableOpacity, TextInput, TouchableHighlight } from 'react-native';
import homeStyles from './homeStyles';
import { Button, Splash } from 'components';
import loginBackgroundImage from '../../assets/images/backpackerBack.png';
import logo from '../../assets/images/backpackerNeeds.png';
import { CheckBox } from 'react-native-elements';
import Toast, {DURATION} from 'react-native-easy-toast';
import Palette from '../../common/palette';

export default(controller) => (!controller.state.noConnectionSplash ? (
  <View style={homeStyles.homeContainer}>
    <ImageBackground
      style={{width: '100%', flex: 1}}
      source={loginBackgroundImage}>
      <View style={homeStyles.mainTitleView}>
        <Text style={homeStyles.mainTitleText}>{controller.i18n.t('home.mainTitleText')}</Text>
      </View>
      <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
        <View style={{flex: 1}}>
          <CheckBox
            center
            iconRight
            containerStyle={{ backgroundColor: 'transparent', borderColor: 'transparent', justifyContent: 'center'}}
            checked={controller.state.optinsChecked}
            onPress={() => controller.setState({optinsChecked: !controller.state.optinsChecked})}
            />
        </View>
        <View style={{flex: 4, flexDirection: 'row', flexWrap: 'wrap', paddingTop: '5%', paddingRight: '10%'}}>
          <Text style={homeStyles.textDataPrivacy}>{controller.i18n.t('home.textDataPrivacyTC')}</Text>
          <Text
            onPress={() => { controller.downloadTC(); }}
            style={homeStyles.textDataPrivacyLink}>{controller.i18n.t('home.TC')}
          </Text>
          <Text style={homeStyles.textDataPrivacy}>{controller.i18n.t('home.andDataPrivacyTC')}</Text>
          <Text
            onPress={() => controller.downloadDataPrivacy()}
            style={homeStyles.textDataPrivacyLink}>{controller.i18n.t('home.dataPrivacy')}
          </Text>
        </View>

      </View>
      <Toast
        ref='toastHome'
        style={{backgroundColor: Palette.primaryColor30, width: '70%'}}
        position='top'
        positionValue={200}
        fadeInDuration={3000}
        fadeOutDuration={2000}
        opacity={0.7}
        textStyle={{color: Palette.white, fontSize: 18, fontFamily: 'Calibri', textAlign: 'center' }} />

      <View style={{width: '100%', flex: 3}}>
        <Button
          title={controller.i18n.t('home.registerEmailTitle')}
          color={controller.palette.whiteTransparent}
          textColor={controller.palette.white}
          onPress={() => { controller.registerToCredentials(); }} />
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
          onPress={() => { controller.loginToCredentials(); }} />
      </View>

    </ImageBackground >
  </View>)
  :
  (<Splash logo={logo} textSplash={controller.i18n.t('home.noInternet')} />)
);
