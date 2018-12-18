import React from 'react';
import recommendationsStyles from './recommendationsStyles';
import { ListItem } from 'components';
import { View, Text, SectionList, ActivityIndicator, TouchableOpacity } from 'react-native';
import Palette from '../../common/palette';
import AirportSvg from '../../assets/svg/Airport';
import * as Animatable from 'react-native-animatable';


handleTextRef = ref => this.text = ref;

export default (controller) => (
  <View>
    {  /*
      <View style={[controller.state.spinnerVisible ? recommendationsStyles.containerSpinner : null ,  controller.state.spinnerVisible ? recommendationsStyles.horizontalSpinner : null]}>
     {controller.state.spinnerVisible ?
      <ActivityIndicator
        animating={controller.state.spinnerVisible}
         size="large"
         color={Palette.primaryColor15} />
       :
       null
     } */}
     <Text
       style={recommendationsStyles.mainTitle}>Recommendations for {controller.user.getChosenRegion()} </Text>
     <SectionList
       renderItem={({item, index, section}) => {
         return (
         <ListItem
           dataItem={!controller.state.collapsed[section.key] ? item : []}
           onClickListItem={(item) => controller.onClickListItemRecommendations(item)} />)}}
           renderSectionHeader={(prop) => {
              return (
               <TouchableOpacity
                 onPress={() => {
                   const state = controller.state;
                   state.collapsed[prop.section.key] = !state.collapsed[prop.section.key]
                   controller.setState(state)
                 }}
                  style={recommendationsStyles.sectionContainer}>
                 <Text style={recommendationsStyles.sectionTitle}>{prop.section.key}</Text>
               </TouchableOpacity>
           )}}
       sections={controller.user.getRecommendationsSelected()}
       stickySectionHeadersEnabled />
  </View>
);
