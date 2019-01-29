import React from 'react';
import backpackStyles from './backpackStyles';
import { ListItem } from 'components';
import { View, Text, SectionList, TouchableOpacity } from 'react-native';
import CheckMark from '../../assets/svg/CheckMark';
import Palette from '../../common/palette';
import Icon from 'react-native-vector-icons/FontAwesome';

export default (controller) => (
  <View style={{height: '100%'}}>
    <Text
      style={backpackStyles.mainTitle}>Backpack for {controller.user.getChosenRegion() ? controller.user.getChosenRegion() : controller.user.getChosenCountry()} </Text>
    <Text
      style={backpackStyles.howManyDays}>Still {controller.checkHowManyDays()} days to Go!</Text>
      <SectionList
        renderItem={({item, index, section}) => {
          return (
            <ListItem
              onBlurAddItem={() => { controller.onBlurAddItem(section); }}
              titleAddItem={controller.titleAddItem(section)}
              titleAddItemChangeText={(title) => { controller.titleAddItemChangeText(title, section); }}
              backpackListItem
              dataItem={!controller.state.collapsed[section.key] ? item : item}
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
                <Icon name='chevron-right' size={20} color={Palette.white} />
              </View>

              <Text style={backpackStyles.sectionTitle}>{prop.section.key}</Text>
            </TouchableOpacity>
          );
        }}
        sections={controller.user.getInTheBackpackSelected()}
        stickySectionHeadersEnabled />
  </View>
);
