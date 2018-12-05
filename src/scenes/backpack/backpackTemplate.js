import React from 'react';
import backpackStyles from './backpackStyles';
import { ListItem } from 'components';
import { View, Text } from 'react-native';

export default (controller) => (
  <View>
    <Text
      style={backpackStyles.mainTitle}>Backpack for {controller.user.getChosenRegion()} </Text>
    <ListItem
      dataItem={controller.user.getInTheBackpackSelected() ? Object.values(controller.user.getInTheBackpackSelected()).sort() : []}
      onClickListItem={(item) => controller.onClickListItemBackpack(item)} />
  </View>

);
