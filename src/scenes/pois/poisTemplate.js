import React from 'react';
import poisStyles from './poisStyles';
import { ListItem } from 'components';

export default (controller) => (
  <ListItem
    dataItem={Object.values(controller.user.getToDos())}
    onClickListItem={(item) => controller.onClickListItemRecommendations(item)}
  />
);
