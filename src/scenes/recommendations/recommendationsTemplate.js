import React from 'react';
import recommendationsStyles from './recommendationsStyles';
import { ListItem } from 'components';
import { View, Text, SectionList, ActivityIndicator, TouchableOpacity } from 'react-native';
import Palette from '../../common/palette';
import AirportSvg from '../../assets/svg/Airport';
import Icon from 'react-native-vector-icons/FontAwesome';

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
                <View style={[recommendationsStyles.iconChevronView, {transform: [{ rotate: controller.state.collapsed[prop.section.key] ? '0deg' : '90deg'}]}]}>
                  <Icon name="chevron-right" size={20} color={Palette.white} />
                </View>
               <Text style={recommendationsStyles.sectionTitle}>{prop.section.key}</Text>
             </TouchableOpacity>
           )}}
       sections={controller.user.getRecommendationsSelected()}
       stickySectionHeadersEnabled />
  </View>
);
