import React from 'react';
import countriesListStyles from './countriesListStyles';
import { ListItem } from 'components';

export default (controller) => (
  <ListItem
    dataItem={Object.keys(controller.user.getCountries()).sort()}
    onClickListItem={(itemTitle) => controller.onClickListItem(itemTitle)} />
);
