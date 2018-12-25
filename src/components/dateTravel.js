import React, {Component} from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import Palette from '../common/palette';
import DatePicker from 'react-native-datepicker';
import Calendar from '../assets/svg/Calendar';
import i18n from '../translations';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  whenView: {
    width: width,
    backgroundColor: Palette.white,
    alignItems: 'center'
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
    paddingTop: 40,
    width: '80%',
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
        <Text style={styles.textWhen}>{i18n.t('components.dateWhen')}</Text>
        <View style={{paddingTop: 15, width: 100, height: 100}}>
          <Calendar color={Palette.primaryColor75} width={100} height={100} />
        </View>
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
              marginLeft: '3%',
              borderWidth: 3,
              borderColor: Palette.primaryColor75
            },
            dateText: {
              color: Palette.primaryColor75,
              fontSize: 18,
              fontFamily: 'Calibri'
            }
          }}
          onDateChange={this.props.onDateChange}
        />
      </View>
    );
  }
}
