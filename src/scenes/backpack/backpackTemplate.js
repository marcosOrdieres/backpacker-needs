import React from 'react';
import backpackStyles from './backpackStyles';
import { ListItem } from 'components';
import { View, Text, SectionList } from 'react-native';
import CheckMark from '../../assets/svg/CheckMark';
import Palette from '../../common/palette';

export default (controller) => (
  <View>
    <Text
      style={backpackStyles.mainTitle}>Backpack for {controller.user.getChosenRegion()} </Text>
    {controller.user.getRecommendationsOnlyIntemSelected() ?
      <SectionList
        renderItem={({item, index, section}) =>
          <ListItem
            dataItem={item}
            onClickListItem={(item) => controller.onClickListItemBackpack(item)} />}
        renderSectionHeader={({section: {key}}) => (
          <View style={backpackStyles.sectionContainer}>
            <Text style={backpackStyles.sectionTitle}>{key}</Text>
          </View>
            )}
        sections={controller.user.getInTheBackpackSelected()}
        //keyExtractor={(item, index) => item + index}
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
