import React from 'react';
import recommendationsStyles from './recommendationsStyles';
import { ListItem } from 'components';
import { View, Text, SectionList } from 'react-native';

export default (controller) => (
  <View>
    <Text
      style={recommendationsStyles.mainTitle}>Recommendations for {controller.user.getChosenRegion()} </Text>
    <SectionList
      renderItem={({item}) =>
        <ListItem
          dataItem={item}
          onClickListItem={(item) => controller.onClickListItemRecommendations(item)} />}
      renderSectionHeader={({section: {title}}) => (
        <View style={recommendationsStyles.sectionContainer}>
          <Text style={recommendationsStyles.sectionTitle}>{title}</Text>
        </View>
          )}
      sections={controller.user.getRecommendationsSelected()}
      stickySectionHeadersEnabled
 />
  </View>
);
