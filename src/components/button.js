import React, {Component} from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import Color from '../common/colors';

const styles = StyleSheet.create({
  viewButtonStyle: {
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    fontSize: 20,
    fontFamily: 'Hind-Medium',
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 50,
    borderWidth: 2
  },
  buttonTextStyle: {
    textAlign: 'center'
  }
});

export default class ButtonComponent extends Component {
  constructor (args) {
    super(args);
  }

  render () {
    return (
      <View style={[this.props.viewButtonStyle, styles.viewButtonStyle]}>
        <Button
          containerViewStyle={{marginLeft: 0, marginRight: 0}}
          onPress={this.props.onPress}
          activeOpacity={0.5}
          buttonStyle={[{borderColor: this.props.buttonBorderColor ? this.props.buttonBorderColor : 'transparent'}, this.props.buttonStyle, styles.buttonStyle]}
          backgroundColor={this.props.color != null ? this.props.color : 'white'}
          title={this.props.title}
          textStyle={[{textAlign: 'center', color: this.props.textColor ? this.props.textColor : 'black'}, this.props.textStyle]} />
      </View>
    );
  }
}
