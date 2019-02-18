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
    color: Palette.white
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
    height: height,
    flex: 3,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
  modalContentRest: {
    height: height,
    backgroundColor: Palette.transparent,
    flex: 1
  },
  hamburguerView: {
    width: 30,
    height: 30,
    backgroundColor: Palette.primaryColor,
    marginTop: 5,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  questionView: {
    width: 30,
    height: 30,
    backgroundColor: Palette.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    marginLeft: width - 35,
    marginTop: 5
  },
  logoutView: {
    width: 30,
    height: 30,
    backgroundColor: Palette.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    marginLeft: width - 35,
    marginTop: 5
  }
});
