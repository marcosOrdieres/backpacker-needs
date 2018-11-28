import React, {Component} from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { List, ListItem } from 'react-native-elements';

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

export default class ListItemComponent extends Component {
  constructor (args) {
    super(args);
  }

  render () {
    return (
      <View style={[this.props.viewButtonStyle, styles.viewButtonStyle]}>
        <List>
          {this.props.dataItem.map((item) => (
            <TouchableOpacity onPress={this.props.onClickListItem()}>
              <ListItem
                key={item.title}
                title={item.title}
              />
            </TouchableOpacity>
          ))}
        </List>
      </View>
    );
  }
}
