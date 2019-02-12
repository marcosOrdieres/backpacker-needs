import React, {Component} from 'react';
import { View, StyleSheet, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import Palette from '../common/palette';
import DatePicker from 'react-native-datepicker';
import i18n from '../translations';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  whenView: {
    width: width,
    backgroundColor: Palette.transparent,
    alignItems: 'center',
    justifyContent: 'center'

  },
  datePickerView: {
    position: 'absolute',
    width: 150,
    height: 150,
    alignItems: 'center'
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
        <View>
          <Image
            style={styles.image}
            source={this.props.logo} />
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
                borderColor: Palette.transparent
              },
              dateText: {
                color: Palette.transparent,
                fontSize: 18,
                fontFamily: 'Calibri'
              }
            }}
            onDateChange={this.props.onDateChange}
            />
        </View>
      </View>
    );
  }
}
