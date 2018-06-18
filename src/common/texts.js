import {StyleSheet} from 'react-native';
import Color from './colors';

export default StyleSheet.create({

  // GROUP 1.
  // Used for labeling inputfields and diagrams.
  label: {
    fontFamily: 'Hind-Light',
    fontSize: 12,
    lineHeight: 16,
    color: Color.DarkGrey
  },

  // GROUP 2.
  h6: {
    fontFamily: 'Hind-Bold',
    fontSize: 14,
    lineHeight: 18,
    color: Color.Anthrazit
  },

  switchlabel: {
    fontFamily: 'Hind-Medium',
    fontSize: 14,
    lineHeight: 18,
    color: Color.Anthrazit
  },

  // Called 'Subcopy' in the styles guide.
  subtitle: {
    fontFamily: 'Hind-Light',
    fontSize: 14,
    lineHeight: 18,
    color: Color.Anthrazit
  },

  // GROUP 3.
  // Values set on secondary fields.
  h5: {
    fontFamily: 'Hind-Bold',
    fontSize: 16,
    lineHeight: 22,
    color: Color.Anthrazit
  },

  // Default text. Called 'Copy' in the styles guide.
  defaultText: {
    fontFamily: 'Hind-Light',
    fontSize: 16,
    lineHeight: 22,
    color: Color.Anthrazit
  },

  blurbText: {
    fontFamily: 'Hind-Medium',
    fontSize: 16,
    lineHeight: 20,
    color: Color.Anthrazit
  },

  // Pager/Top Menu Label.
  secondaryInputPlaceholder: {
    fontFamily: 'Hind-Light',
    fontSize: 16,
    lineHeight: 22,
    color: Color.Gray
  },

  // GROUP 4.
  // Active label for Pager/Top Menu.
  h4: {
    fontFamily: 'Hind-Medium',
    fontSize: 18,
    lineHeight: 26,
    color: Color.Anthrazit
  },

  leadCopy: {
    fontFamily: 'Hind-Light',
    fontSize: 20,
    lineHeight: 26,
    color: Color.Anthrazit
  },

  // GROUP 5.
  // Values set on input fields in the signup process.
  h3: {
    fontFamily: 'Hind-Medium',
    fontSize: 20,
    lineHeight: 26,
    color: Color.Anthrazit
  },

  // Placeholder for input fields in the sign up process.
  inputStyle: {
    fontFamily: 'Hind-Light',
    fontSize: 20,
    lineHeight: 26,
    color: Color.Anthrazit
  },

  // Placeholder for input fields in the sign up process.
  inputPlaceholder: {
    fontFamily: 'Hind-Light',
    fontSize: 20,
    lineHeight: 26,
    color: Color.Gray
  },

  // GROUP 6.
  // Default headline marking the purpose of a screen.
  title: {
    fontFamily: 'Hind-Medium',
    fontSize: 24,
    lineHeight: 30,
    color: Color.shineGreen,
    textAlign: 'center'
  },

  // Links. (Skip/Cancel/MoreInfo).
  textLink: {
    fontFamily: 'Hind-Medium',
    fontSize: 16,
    lineHeight: 21,
    color: Color.Gray,
    fontWeight: 'bold'
  },

  textLinkInText: {
    textDecorationLine: 'underline'
  },

  // OTHERS.
  tariffSupplierRecommendation: {
    fontFamily: 'Hind-Medium',
    fontSize: 16,
    lineHeight: 22,
    color: Color.Anthrazit
  },

  enumNumber: {
    paddingRight: 10,
    fontFamily: 'Hind-Medium',
    fontSize: 22,
    color: Color.Anthrazit
  },

  amountCoins: {
    fontFamily: 'Hind-Medium',
    fontSize: 24,
    lineHeight: 30,
    color: Color.shineGreen
  },

  bannerTitle: {
    fontFamily: 'Hind-Bold',
    fontSize: 30,
    lineHeight: 20,
    color: Color.shineGreenDark
  }
});
