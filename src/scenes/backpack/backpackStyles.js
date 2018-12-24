import { StyleSheet } from 'react-native';
import Palette from '../../common/palette';

export default StyleSheet.create({
  backpackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainTitle: {
    textAlign: 'center',
    color: Palette.primaryColor,
    fontSize: 25,
    marginTop: 25,
    marginBottom: 10,
    fontFamily: 'Calibri'
  },
  howManyDays: {
    textAlign: 'center',
    color: Palette.primaryColor,
    fontSize: 18,
    marginTop: 5,
    marginBottom: 10,
    fontFamily: 'Calibri'
  },
  sectionContainer: {
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderBottomColor: Palette.primaryColor15,
    backgroundColor: Palette.primaryColor75
  },
  sectionTitle: {
    textAlign: 'center',
    color: 'black',
    fontFamily: 'Calibri',
    fontSize: 18,
    marginBottom: 20,
    marginTop: 20
  },
  subtitleNoItemsBackpack: {
    borderTopWidth: 2,
    borderTopColor: Palette.black,
    paddingTop: '25%',
    textAlign: 'center',
    color: Palette.primaryColor75,
    fontSize: 20,
    fontFamily: 'Calibri'
  },
  checkmarkNoItemsBackpack: {
    paddingTop: '25%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconChevronView: {
    position: 'absolute',
    paddingTop: '35%',
    paddingLeft: '40%',
    width: 65,
    height: 65
  }
});
