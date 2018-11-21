import React from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  TextInput
} from 'react-native';
import homeStyles from './homeStyles';
import {Button} from 'components';
import loginBackgroundImage from '../../assets/images/loginBackgroundImage.png';

export default(controller) => (
  <View style={homeStyles.homeContainer}>
    <ImageBackground
      style={{width: '100%', height: '100%'}}
      source={loginBackgroundImage}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color: 'white', textAlign: 'center', fontSize: 35}}>
			Welcome Backpacker !
		</Text>
      </View>
      <Text style={{color: 'black', textAlign: 'center', fontSize: 12, paddingTop: '5%', paddingBottom: '5%'}}>
	I accept the Terms and Conditions and Data Privacy </Text>
      <Button
        title={'Register for free'}
        color={'white'}
        buttonBorderColor={'black'}
        textColor={'black'}
        onPress={() => {
				    controller.setState({sendCredentialsSignup: true});
				    return controller.props.navigation.navigate('SendCredentials');
        }} />
      <Button
        title={'Sign up with Facebook'}
        color={'#3b5998'}
        textColor={'white'}
        onPress={() => controller.handleSignupFacebook()} />
      <Text style={{color: 'white', textAlign: 'center', fontSize: 12, paddingTop: '5%', paddingBottom: '5%'}}>
						 Are you already a user?
					 </Text>
      <Button
        title={'Log in with your email'}
        color={'white'}
        buttonBorderColor={'black'}
        textColor={'black'}
        onPress={() => {
          controller.setState({sendCredentialsLogin: true});
          return controller.props.navigation.navigate('SendCredentials');
        }} />
    </ImageBackground >
  </View>
);
