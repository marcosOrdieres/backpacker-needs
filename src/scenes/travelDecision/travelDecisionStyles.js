import { StyleSheet } from 'react-native';
import Palette from '../../common/palette';
import { Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  topBar: {
    height: 100,
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
    backgroundColor: Palette.disabled,
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
    color: Palette.black,
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
    justifyContent: 'flex-start',
    backgroundColor: Palette.white
  },
  dividerDynamic: {
    height: 50,
    backgroundColor: Palette.white
  },
  textDividerStatic: {
    color: Palette.primaryColorTransparent,
    textAlign: 'center',
    fontFamily: 'Calibri',
    fontSize: 18
  },
  whenView: {
    width: width/2,
    height: 300,
    backgroundColor: Palette.primaryColorTransparent,
    borderRightWidth:1,
    borderRightColor: Palette.black,
    borderTopRightRadius:2
  },
  howManyDaysView: {
    width: width/2,
    height: 300,
    backgroundColor: Palette.primaryColorTransparent
  }
});
