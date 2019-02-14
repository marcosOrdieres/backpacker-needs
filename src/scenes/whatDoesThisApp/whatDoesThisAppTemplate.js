import React from 'react';
import { View, Image } from 'react-native';
import whatDoesThisAppStyles from './whatDoesThisAppStyles';
import { Swipper } from 'components';

export default (controller) => (
  <Swipper
    firstSwipperText={controller.i18n.t("whatThisAppDoes.click")}
    firstSwipperTextOr={controller.i18n.t("whatThisAppDoes.or")}
    secondSwipperText={controller.i18n.t("whatThisAppDoes.selectDay")}
    thirdSwipperText={controller.i18n.t("whatThisAppDoes.check")}
    fourthSwipperText={controller.i18n.t("whatThisAppDoes.recos")}
    fifthSwipperText={controller.i18n.t("whatThisAppDoes.pack")}
    fifthSwipperButton={controller.i18n.t("whatThisAppDoes.button")}
    onPressTravel={()=>{
      if(controller.rootStore.getState().isDestinationToWhatScreen){
        controller.rootStore.dispatch({ type: 'FROM_DESTINATION_TO_WHAT', isDestinationToWhatScreen: false});
        controller.navigateTo('Menu');
      } else{
        controller.navigateTo('TravelDecision');
      }
    }}/>
);
