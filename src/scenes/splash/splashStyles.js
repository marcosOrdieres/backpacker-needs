import { StyleSheet } from 'react-native';
import Palette from '../../common/palette';

export default StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Palette.primaryColor
  },

  image: {
    height: 200,
    width: 200,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
