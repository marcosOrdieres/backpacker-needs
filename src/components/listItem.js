import React, {Component} from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import CheckMark from '../assets/svg/CheckMark';
import Backpack from '../assets/svg/BackpackNoLetters';
import Palette from '../common/palette';
import rootStore from '../stores/root';
import i18n from '../translations';

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
          <List containerStyle={{marginTop: -10, marginBottom: -10}}>
            {this.props.dataItem.map((item, key) => (
              <TouchableOpacity
                onPress={(item.selectedRecommendations) ? null : (item.selectedInTheBackpack ? null : this.props.onClickListItem.bind(this, item))}>
                <ListItem
                  key={key}
                  keyExtractor={key}
                  title={(item.selectedRecommendations) ? item.value : (item.selectedInTheBackpack ? item.value : item)}
                  subtitle={(item.selectedRecommendations) ? i18n.t('components.listItemSelect') : (item.selectedInTheBackpack ? i18n.t('components.listItemBack') : null)}
                  titleStyle={{fontSize: this.props.fontTitle ? this.props.fontTitle : 20,paddingLeft: this.props.noPaddingLeft ? 0 : 30, color: (item.selectedRecommendations) ? Palette.disabled : (item.selectedInTheBackpack ? Palette.disabled : Palette.totalBlack)}}
                  subtitleStyle={{paddingLeft: 30, color: (item.selectedRecommendations) ? Palette.disabled : (item.selectedInTheBackpack ? Palette.disabled : Palette.totalBlack)}}
                  rightIcon={{name: 'check', color: item.selectedInTheBackpack ? Palette.green : Palette.transparent}}
                  leftIcon={!item.selectedInTheBackpack && !this.rootStore.getState().isBackpackScreen && !this.props.noFirstIcon ?
                    (<CheckMark
                      color={item.selectedRecommendations ? Palette.disabled : Palette.primaryColor}
                      width={40}
                      height={40} />)
                    :
                    ((item.selectedInTheBackpack && this.rootStore.getState().isBackpackScreen) || this.props.noIcon ?
                      null
                      :
                      (<Backpack
                        color={item.selectedRecommendations ? Palette.disabled : Palette.primaryColor}
                        width={40}
                        height={40} />)
                    )
                  }
                />
              </TouchableOpacity>
          ))}
          </List>
        </ScrollView>
      </View>
    );
  }
}
