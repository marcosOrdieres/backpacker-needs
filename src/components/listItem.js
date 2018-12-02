import React, {Component} from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
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
        <ScrollView>
          <List>
            {this.props.dataItem.map((item) => (
              // change the listItem to work as for the selectedRecommendations. a ? b : (c ? d : e)
              <TouchableOpacity
                onPress={item.selectedRecommendations ? null : this.props.onClickListItem.bind(this, item)}>
                <ListItem
                  key={item.selectedRecommendations ? item.value : item}
                  titleStyle={{ color: item.selectedRecommendations ? 'red' : 'black'}}
                  title={item.selectedRecommendations ? item.value : item} />
              </TouchableOpacity>
          ))}
          </List>
        </ScrollView>
      </View>
    );
  }
}
