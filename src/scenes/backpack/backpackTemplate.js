import React from 'react';
import backpackStyles from './backpackStyles';
import { ListItem } from 'components';
import { View, Text, SectionList } from 'react-native';

export default (controller) => (
  <View>
    <Text
      style={backpackStyles.mainTitle}>Backpack for {controller.user.getChosenRegion()} </Text>
    <SectionList
      renderItem={({item}) =>
        <ListItem
          dataItem={item}
          onClickListItem={(item) => controller.onClickListItemBackpack(item)} />}
      renderSectionHeader={({section: {title}}) => (
        <View style={backpackStyles.sectionContainer}>
          <Text style={backpackStyles.sectionTitle}>{title}</Text>
        </View>
      )}
      sections={controller.user.getInTheBackpackSelected()}
      stickySectionHeadersEnabled
 />
  </View>

);
