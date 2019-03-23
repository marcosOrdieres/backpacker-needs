import { StyleSheet } from 'react-native';
import Palette from '../../common/palette';

export default StyleSheet.create({
  mainTitle: {
    textAlign: 'center',
    color: Palette.primaryColor,
    fontSize: 20,
    marginTop: 20,
    marginBottom: 5,
    fontFamily: 'Calibri'
  },
  howManyDays: {
    textAlign: 'center',
    color: Palette.primaryColor,
    fontSize: 14,
    marginBottom: 5,
    fontFamily: 'Calibri'
  },
  sectionContainer: {
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderBottomColor: 'black',
    backgroundColor: '#e6e6e6',

    flex: 1,
    flexDirection: 'row',
    height: 50,
    alignItems: 'center'
  },
  subtitleNoItemsBackpack: {
    borderTopWidth: 2,
    borderTopColor: Palette.black,
    paddingTop: '25%',
    textAlign: 'center',
    color: Palette.primaryColor75,
    fontSize: 16,
    fontFamily: 'Calibri'
  },
  checkmarkNoItemsBackpack: {
    paddingTop: '25%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconChevronView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.15
  },
  sectionTitle: {
    justifyContent: 'center',
    textAlign: 'left',
    color: Palette.totalBlack,
    fontFamily: 'Calibri',
    fontSize: 18
  },
  sectionTitleView: {
    flex: 0.85
  }
});
