import React from 'react';
import { View, Image } from 'react-native';
import whatDoesThisAppStyles from './whatDoesThisAppStyles';
import { Swipper } from 'components';

export default (controller) => (
  <Swipper
    onPressTravel={()=>{
      if(controller.rootStore.getState().isDestinationToWhatScreen){
        controller.rootStore.dispatch({ type: 'FROM_DESTINATION_TO_WHAT', isDestinationToWhatScreen: false});
        controller.navigateTo('Menu');
      } else{
        controller.navigateTo('TravelDecision');
      }
    }}/>
);
