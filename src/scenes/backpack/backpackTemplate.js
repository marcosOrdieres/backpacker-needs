import React from 'react';
import backpackStyles from './backpackStyles';
import { ListItem } from 'components';

export default (controller) => (
  <ListItem
    dataItem={controller.user.getInTheBackpackSelected() ? Object.values(controller.user.getInTheBackpackSelected()) : []}
    onClickListItem={(item) => controller.onClickListItemBackpack(item)}
  />
);
