import { StyleSheet } from 'react-native';
import Palette from '../../common/palette';

export default StyleSheet.create({
  recommendationsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainTitle: {
    textAlign: 'center',
    color: Palette.primaryColor,
    fontSize: 25,
    marginTop: 25,
    marginBottom: 25,
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
  }
});
