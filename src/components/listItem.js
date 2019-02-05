import React, {Component} from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Text, Linking } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import CheckMark from '../assets/svg/CheckMark';
import Backpack from '../assets/svg/BackpackNoLetters';
import AmazonLogo from '../assets/svg/AmazonLogo';
import Palette from '../common/palette';
import rootStore from '../stores/root';
import i18n from '../translations';
import Icon from 'react-native-vector-icons/FontAwesome';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  viewButtonStyle: {
    //rightIcon={{name: item.selectedInTheBackpack ? 'check': 'shopping-cart', color: item.selectedInTheBackpack ? Palette.green : null}}
    paddingTop: 5,
    paddingBottom: 5
  },
  buttonStyle: {
    fontSize: 14,
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
          <List containerStyle={{marginTop: -5, marginBottom: -5}}>
            {this.props.dataItem.map((item, key) => (
              <TouchableOpacity
                onPress={this.props.onClickListItem ? this.props.onClickListItem.bind(this, item) : null}>
                <ListItem
                  key={key}
                  keyExtractor={key}
                  title={(item.selectedRecommendations) ? item.value : (item.selectedInTheBackpack ? item.value : item)}
                  subtitle={(item.selectedRecommendations) ? i18n.t('components.listItemSelect') : (item.selectedInTheBackpack ? i18n.t('components.listItemBack') : null)}
                  titleStyle={{fontSize: this.props.fontTitle ? this.props.fontTitle : 20, paddingLeft: this.props.noPaddingLeft ? 0 : 30, color: (item.selectedRecommendations) ? Palette.disabled : (item.selectedInTheBackpack ? Palette.disabled : Palette.totalBlack)}}
                  subtitleStyle={{paddingLeft: 30, color: (item.selectedRecommendations) ? Palette.disabled : (item.selectedInTheBackpack ? Palette.disabled : Palette.totalBlack)}}

                  rightIcon={
                    item.selectedInTheBackpack ?
                      (<Icon size={25} name='check' color={Palette.green} />)
                      :
                      !this.rootStore.getState().isBackpackScreen && !this.props.noIcon ?
                      item === 'Visa' ?
                        ((<TouchableOpacity onPress={this.props.onClickWorldTraveller ? this.props.onClickWorldTraveller.bind(this) : null}><Icon size={25} name='globe' color={Palette.primaryColor} /></TouchableOpacity>))
                        :
                        ((<TouchableOpacity onPress={this.props.onClickAmazon ? this.props.onClickAmazon.bind(this, item) : null}><Icon size={25} name='shopping-cart' color={Palette.primaryColor} /></TouchableOpacity>))

                      :
                      (<Icon size={25} name='check' color={Palette.transparent} />)
                    }

                  leftIcon={!item.selectedInTheBackpack && !this.rootStore.getState().isBackpackScreen && !this.props.noFirstIcon ?
                    (<CheckMark
                      color={item.selectedRecommendations ? Palette.disabled : Palette.primaryColor}
                      width={25}
                      height={25} />)
                    :
                    ((item.selectedInTheBackpack && this.rootStore.getState().isBackpackScreen) || this.props.noIcon ?
                      null
                      :
                      (<Backpack
                        color={item.selectedRecommendations ? Palette.disabled : Palette.primaryColor}
                        width={25}
                        height={25} />)
                    )
                  }
                />

              </TouchableOpacity>
          ))}
            {this.props.backpackListItem ?
              <ListItem
                ref='addItemsBackpack'
                hideTitle
                hideChevron
                textInputPlaceholder='Add item in Backpack...'
                textInputStyle={{ textAlign: 'left', paddingTop: 0, paddingBottom: 0, marginVertical: 3.5}}
                textInputValue={this.props.titleAddItem}
                textInputOnChangeText={this.props.titleAddItemChangeText}
                textInputReturnKeyType={'done'}
                onBlur={this.props.onBlurAddItem}
                leftIcon={(<Icon size={25} name='plus' color={Palette.primaryColor} />)}
                textInputContainerStyle={{flex: 8}}
                textInput />
              :
              null }
          </List>
        </ScrollView>
      </View>
    );
  }
}
