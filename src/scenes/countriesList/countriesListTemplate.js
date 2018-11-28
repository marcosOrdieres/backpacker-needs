import React from 'react';
import countriesListStyles from './countriesListStyles';
import { ListItem } from 'components';
import {
  View, Text
} from 'react-native';

export default (controller) => (
  <ListItem
    dataItem={controller.getDataItem()}
    onClickListItem={controller.onClickListItem()} />
);
