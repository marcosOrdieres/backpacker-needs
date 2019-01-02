import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import Palette from '../../common/palette';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  destinationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  actionButtonIcon: {
    fontSize: 18,
    height: 18,
    color: 'white'
  },
  modal: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    flex: 1,
    height: 200,
    margin: 0
  },
  modalContent: {
    backgroundColor: Palette.white,
    // justifyContent: 'center',
    height: height,
    flex: 3,
    // alignItems: 'center',
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
  modalContentRest: {
    height: height,
    backgroundColor: Palette.transparent,
    flex: 1
  }
});
