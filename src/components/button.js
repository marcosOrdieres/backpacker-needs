import React, {Component} from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import Color from '../common/colors';

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%'
  },

  buttonStyle: {
    borderRadius: 3,
    height: 56,
    width: '100%'
  },

  buttonTextStyle: {
    fontSize: 20,
    fontFamily: 'Hind-Medium'
  }
});

export default class ButtonComponent extends Component {
  constructor (args) {
    super(args);
  }

  render () {
    return (
      <View style={[styles.buttonContainer, this.props.style]}>
        <Button
          containerViewStyle={{marginLeft: 0, marginRight: 0}}
          onPress={this.props.onPress}
          buttonStyle={[styles.buttonStyle, this.props.buttonStyle]}
          backgroundColor={this.props.color != null ? this.props.color : Color.shineGreen}
          large
          title={this.props.title}
          textStyle={[styles.buttonTextStyle, this.props.textStyle]} />
      </View>
    );
  }
}
