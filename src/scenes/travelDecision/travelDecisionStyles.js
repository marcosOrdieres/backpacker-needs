import { StyleSheet } from 'react-native';
import Palette from '../../common/palette';
import { Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  topBar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Palette.primaryColor,
    shadowColor: Palette.primaryColor15,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 10
  },
  textTopBar: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: Palette.white,
    fontSize: 25,
    fontFamily: 'Calibri'
  },
  destinyView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    elevation: 3
  },
  aboutTheTripView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  destinyText: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Calibri'
  },
  dividerStatic: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Palette.primaryColor75
  },
  dividerDynamicLoco: {
    height: 50,
    backgroundColor: Palette.white
  },
  dividerDynamic: {
    height: 50,
    backgroundColor: Palette.white
  },
  textDividerStatic: {
    color: Palette.white,
    textAlign: 'center',
    fontFamily: 'Calibri',
    fontSize: 18
  },
  modal: {
    justifyContent: 'flex-end',
    width: width,
    margin: 0
  },
  modalContent: {
    backgroundColor: Palette.white,
    padding: 22,
    justifyContent: 'center',
    height: '50%',
    width: width,
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
  hideModalButton: {
    backgroundColor: Palette.primaryColor75,
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
  countryTextOverlay: {
    zIndex: 100,
    position: 'absolute',
    top: 260,
    backgroundColor: Palette.white,
    width: width,
    borderColor: Palette.black,
    borderRadius: 3,
    borderWidth: 1
  },
  textInputCountry: {
    height: '100%',
    fontFamily: 'Calibri',
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  textChoseRegion: {
    paddingTop: '2.5%',
    paddingLeft: 5,
    height: '100%',
    fontFamily: 'Calibri',
    fontSize: 16
  }
});
