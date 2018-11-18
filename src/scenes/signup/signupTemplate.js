import React from 'react';
import { View, Text, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import signupStyles from './signupStyles';
import {Button} from 'components';
import loginBackgroundImage from '../../assets/images/loginBackgroundImage.png';

export default (controller) => (
  <View style={signupStyles.signupContainer}>
    <ImageBackground
      style={{width: '100%', height: '100%'}}
      source={loginBackgroundImage}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text
          style={{color: 'white', textAlign: 'center', fontSize: 35}}>
        Welcome Backpacker!
        </Text>
      </View>
      <View style={{flex: 1, paddingTop: '20%'}}>
        <Button
          title={'Sign up with Facebook'}
          color={'#3b5998'}
          textColor={'white'}
          onPress={() => controller.handleSignupFacebook()} />
        <Button
          title={'Sign up with Google'}
          color={'#dd4b39'}
          textColor={'white'}
          onPress={() => controller.handleSignupGoogle()} />
        <Text
          style={{color: 'white', textAlign: 'center', fontSize: 12, paddingTop: '5%', paddingBottom: '5%'}}>
          I accept the Terms and Conditions and Data Privacy
          </Text>
        <Button
          title={'Continue without Sign up'}
          color={'white'}
          buttonBorderColor={'black'}
          textColor={'black'}
          onPress={() => controller.handleSignupEmail()} />
      </View>
    </ImageBackground>
  </View>
);
