import { StyleSheet } from 'react-native';
import Palette from '../../common/palette';

export default StyleSheet.create({
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textDataPrivacy: {
    color: Palette.white,
    fontSize: 14,
    fontFamily: 'Calibri'
  },
  textDataPrivacyLink: {
    color: Palette.blueFacebook,
    fontSize: 14,
    fontFamily: 'Calibri',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: Palette.blueFacebook
  },
  mainTitleView: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '30%'
  },
  mainTitleText: {
    color: Palette.primaryColor15,
    textAlign: 'center',
    fontSize: 35,
    fontFamily: 'Calibri',
    fontWeight: 'bold',
    paddingRight:'2%',
    paddingLeft:'2%'
  },
  areYouUserText: {
    color: Palette.white,
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Calibri'
  }
});
