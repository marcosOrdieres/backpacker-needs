import React from 'react';
import generalStyles from './generalStyles';
import { ListItem } from 'components';
import { View, Text } from 'react-native';

export default (controller) => (
  <View>
    <Text
      style={generalStyles.mainTitle}>Recommendations for {controller.user.getChosenRegion()} </Text>
    <ListItem
      dataItem={Object.values(controller.user.getRecommendationsSelected()).sort()}
      onClickListItem={(item) => controller.onClickListItemRecommendations(item)} />
  </View>
);
