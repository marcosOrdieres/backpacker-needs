import { StyleSheet } from 'react-native';
import Palette from '../../common/palette';

export default StyleSheet.create({
  generalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainTitle: {
    textAlign: 'center',
    color: Palette.primaryColor,
    fontSize: 24,
    marginTop: 30,
    fontFamily: 'Calibri'
  }
});
