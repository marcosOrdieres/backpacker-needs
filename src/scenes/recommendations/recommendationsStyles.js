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
    backgroundColor: Palette.primaryColor75
  },
  sectionTitle: {
    textAlign: 'center',
    color: Palette.totalBlack,
    fontFamily: 'Calibri',
    fontSize: 18,
    marginBottom: 16,
    marginTop: 16
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
    position: 'absolute',
    paddingTop: '25%',
    paddingLeft: '40%',
    width: 65,
    height: 65
  }
});
