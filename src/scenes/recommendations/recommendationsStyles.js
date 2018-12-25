import { StyleSheet } from 'react-native';
import Palette from '../../common/palette';

export default StyleSheet.create({
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
    color: Palette.totalBlack,
    fontFamily: 'Calibri',
    fontSize: 18,
    marginBottom: 20,
    marginTop: 20
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
    paddingTop: '35%',
    paddingLeft: '40%',
    width: 65,
    height: 65
  }
});
