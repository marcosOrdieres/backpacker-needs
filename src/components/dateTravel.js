import React, {Component} from 'react';
import { View, StyleSheet, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import Palette from '../common/palette';
import DatePicker from 'react-native-datepicker';
import i18n from '../translations';
import logo from '../assets/images/backpackerNeeds.png';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  whenView: {
    width: width,
    backgroundColor: Palette.white,
    alignItems: 'center',
    justifyContent: 'center',

  },
  textWhen: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: Palette.primaryColor75,
    fontSize: 25,
    paddingTop: 15,
    fontFamily: 'Calibri'
  },
  datePickerView: {
    position: 'absolute',
    width: '44.5%',
    alignItems: 'center',
    paddingTop: 30
  },
  image: {
    height: 150,
    width: 150,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default class DateTravelComponent extends Component {
  constructor (args) {
    super(args);
  }

  render () {
    return (
      <View style={styles.whenView}>
        <TouchableOpacity>
          <Image
            style={styles.image}
            source={logo} />
            <DatePicker
              style={styles.datePickerView}
              date={this.props.date}
              mode='date'
              placeholder='select date'
              format='YYYY-MM-DD'
              minDate='2018-05-01'
              maxDate='2019-12-01'
              confirmBtnText='Confirm'
              cancelBtnText='Cancel'
              customStyles={{
                dateIcon: {
                  width: 0,
                  height: 0
                },
                dateInput: {
                  backgroundColor:'grey',
                  borderWidth: 2,
                  borderColor: 'yellow'
                },
                dateText: {
                  color: 'black',
                  fontSize: 18,
                  fontFamily: 'Calibri'
                }
              }}
              onDateChange={this.props.onDateChange}
            />
        </TouchableOpacity>
      </View>
    );
  }
}
