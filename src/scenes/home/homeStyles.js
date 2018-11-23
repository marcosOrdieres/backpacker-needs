import { StyleSheet } from 'react-native';
import Palette from '../../common/palette';

export default StyleSheet.create({
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textDataPrivacy: {
    color: Palette.black,
    textAlign: 'center',
    fontSize: 14,
    paddingTop: '5%',
    paddingBottom: '5%',
    fontFamily: 'Calibri'
  },
  mainTitleView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainTitleText: {
    color: Palette.white,
    textAlign: 'center',
    fontSize: 35,
    fontFamily: 'Calibri'
  },
  areYouUserText: {
    color: Palette.white,
    textAlign: 'center',
    fontSize: 12,
    paddingTop: '5%',
    paddingBottom: '5%',
    fontFamily: 'Calibri'
  }
});
