import React from 'react';
import poisStyles from './poisStyles';
import { ListItem } from 'components';

export default (controller) => (
  <ListItem
    dataItem={controller.user.getToDos() ? Object.values(controller.user.getInTheBackpackSelected()) : []}
    onClickListItem={(item) => controller.onClickListItemRecommendations(item)}
  />
);
