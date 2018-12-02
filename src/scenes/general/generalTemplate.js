import React from 'react';
import generalStyles from './generalStyles';
import { ListItem } from 'components';

export default (controller) => (
  <ListItem
    dataItem={Object.values(controller.user.getRecommendationsSelected())}
    onClickListItem={(item) => { controller.onClickListItemRecommendations(item); }}
  />
);
