import { StyleSheet } from 'react-native';
import Palette from '../../common/palette';

export default StyleSheet.create({
  sendCredentialsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Palette.primaryColor
  },
  textInputPassword: {
    width: '100%',
    color: Palette.white,
    fontSize: 18,
    fontFamily: 'Calibri',
    marginTop: '15%'
  },
  textInputUserName: {
    width: '100%',
    color: Palette.white,
    fontSize: 18,
    fontFamily: 'Calibri'
  }
});
