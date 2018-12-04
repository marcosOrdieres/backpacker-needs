import React, {Component} from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import CheckMark from '../assets/svg/CheckMark';
import Backpack from '../assets/svg/BackpackNoLetters';
import Palette from '../common/palette';
import rootStore from '../stores/root';

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
    this.rootStore = rootStore;
  }

  render () {
    return (
      <View style={[this.props.viewButtonStyle, styles.viewButtonStyle]}>
        <ScrollView>
          <List>
            {this.props.dataItem.map((item) => (
              <TouchableOpacity
                onPress={(item.selectedRecommendations) ? null : (item.selectedInTheBackpack ? null : this.props.onClickListItem.bind(this, item))}>
                <ListItem
                  key={(item.selectedRecommendations) ? item.value : (item.selectedInTheBackpack ? item.value : item)}
                  title={(item.selectedRecommendations) ? item.value : (item.selectedInTheBackpack ? item.value : item)}
                  subtitle={(item.selectedRecommendations) ? '(Already Selected)' : null}
                  titleStyle={{paddingLeft: 30, fontSize: 20, color: (item.selectedRecommendations) ? Palette.disabled : (item.selectedInTheBackpack ? 'blue' : 'black')}}
                  subtitleStyle={{paddingLeft: 30, color: (item.selectedRecommendations) ? Palette.disabled : (item.selectedInTheBackpack ? 'blue' : 'black')}}
                  leftIcon={!item.selectedInTheBackpack ? // La scene en la que estoy
                    (<CheckMark
                      color={item.selectedRecommendations ? Palette.disabled : Palette.primaryColor}
                      width={40}
                      height={40} />)
                    :
                    (<Backpack
                      color={item.selectedRecommendations ? Palette.disabled : Palette.primaryColor}
                      width={40}
                      height={40} />)
                  }

                  // leftIcon={item.selectedInTheBackpack ? // La scene en la que estoy
                  //   (<Backpack
                  //     color={item.selectedRecommendations ? Palette.disabled : Palette.primaryColor}
                  //     width={40}
                  //     height={40} />)
                  //   :
                  //   (this.rootStore.getState().user.isBackpackScreen ?
                  //   (<CheckMark
                  //     color={item.selectedRecommendations ? Palette.disabled : Palette.primaryColor}
                  //     width={40}
                  //     height={40} />)
                  //     :
                  //     null
                  //   )
                  // }
                />
              </TouchableOpacity>
          ))}
          </List>
        </ScrollView>
      </View>
    );
  }
}
