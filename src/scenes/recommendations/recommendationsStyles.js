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
    borderBottomColor: Palette.primaryColor15,
    backgroundColor: Palette.primaryColor75,

    flex: 1,
    flexDirection: 'row',
    height: 50,
    alignItems: 'center'
  },
  containerSpinner: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Palette.white,
    opacity: 0.5
  },
  horizontalSpinner: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
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
