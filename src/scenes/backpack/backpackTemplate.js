import React from 'react';
import backpackStyles from './backpackStyles';
import { ListItem } from 'components';
import { View, Text, SectionList, TouchableOpacity } from 'react-native';
import CheckMark from '../../assets/svg/CheckMark';
import Palette from '../../common/palette';

export default (controller) => (
  <View>
    <Text
      style={backpackStyles.mainTitle}>Backpack for {controller.user.getChosenRegion()} </Text>
    {controller.user.getRecommendationsOnlyIntemSelected() ?
      <SectionList
        renderItem={({item, index, section}) => {
          return (
          <ListItem
            dataItem={!controller.state.collapsed[section.key] ? item : []}
            onClickListItem={(item) => controller.onClickListItemBackpack(item)} />)}}
            renderSectionHeader={(prop) => {
               return (
                <TouchableOpacity
                  onPress={() => {
                    const state = controller.state;
                    state.collapsed[prop.section.key] = !state.collapsed[prop.section.key]
                    controller.setState(state)
                  }}
                   style={backpackStyles.sectionContainer}>
                  <Text style={backpackStyles.sectionTitle}>{prop.section.key}</Text>
                </TouchableOpacity>
            )}}
        sections={controller.user.getInTheBackpackSelected()}
        stickySectionHeadersEnabled />
            :
      <View>
        <Text style={backpackStyles.subtitleNoItemsBackpack}>
        There are not items in the Backpack! Please choose some in Recommendations
        </Text>
        <View style={backpackStyles.checkmarkNoItemsBackpack}>
          <CheckMark
            color={Palette.primaryColor75}
            width={150}
            height={150} />
        </View>
      </View>
      }
  </View>
);
