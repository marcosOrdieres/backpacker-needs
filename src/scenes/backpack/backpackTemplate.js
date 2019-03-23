import React from 'react';
import backpackStyles from './backpackStyles';
import { ListItem } from 'components';
import { View, Text, SectionList, TouchableOpacity } from 'react-native';
import CheckMark from '../../assets/svg/CheckMark';
import Palette from '../../common/palette';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast, {DURATION} from 'react-native-easy-toast';

export default (controller) => (
  <View style={{height: '100%'}}>
    <Text
      style={backpackStyles.mainTitle}>{controller.i18n.t('backpack.backpackFor')} {controller.user.getChosenRegion() ? controller.user.getChosenRegion() : controller.user.getChosenCountry()} </Text>
    <Text
      style={backpackStyles.howManyDays}>{controller.i18n.t('backpack.still')} {controller.checkHowManyDays()} {controller.i18n.t('backpack.daysToGo')}</Text>
    <Toast
      ref='toastBackpack'
      style={{backgroundColor: Palette.primaryColor30, width: '70%'}}
      position='top'
      positionValue={200}
      fadeInDuration={3000}
      fadeOutDuration={2000}
      opacity={0.7}
      textStyle={{color: Palette.white, fontSize: 18, fontFamily: 'Calibri', textAlign: 'center' }} />
    <SectionList
      renderItem={({item, index, section}) => {
        return (
          <ListItem
            onBlurAddItem={() => {
              if (controller.state.titleAddItem === '') {
                controller.showToastNoItem();
              } else {
                controller.onBlurAddItem(section);
              }
            }}
            titleAddItem={controller.state.blurAddItem ? controller.noAddItem() : controller.titleAddItem(section)}
            titleAddItemChangeText={(title) => { controller.titleAddItemChangeText(title, section); }}
            backpackListItem
            dataItem={!controller.state.collapsed[section.key] ? item : []}
            textInputPlaceholderBackpack={controller.i18n.t('backpack.textInputPlaceholderBackpack')}
            onClickListItem={(item) => controller.onClickListItemBackpack(item)} />);
      }}
      renderSectionHeader={(prop) => {
        return (
          <TouchableOpacity
            onPress={() => {
              const state = controller.state;
              state.collapsed[prop.section.key] = !state.collapsed[prop.section.key];
              controller.setState(state);
            }}
            style={backpackStyles.sectionContainer}>

            <View style={[backpackStyles.iconChevronView, {transform: [{ rotate: controller.state.collapsed[prop.section.key] ? '0deg' : '90deg'}]}]}>
              <Icon name='chevron-right' size={20} color={Palette.primaryColor} />
            </View>

            <View style={backpackStyles.sectionTitleView}>
              <Text style={backpackStyles.sectionTitle}>{prop.section.key}</Text>
            </View>

          </TouchableOpacity>
        );
      }}
      sections={controller.user.getInTheBackpackSelected()}
      stickySectionHeadersEnabled />
  </View>
);
