import React from 'react';
import recommendationsStyles from './recommendationsStyles';
import { ListItem } from 'components';
import { View, Text, SectionList, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import Palette from '../../common/palette';
import AirportSvg from '../../assets/svg/Airport';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AdMobBanner } from 'react-native-admob';
const {width, height} = Dimensions.get('window');
// my ad id is: ca-app-pub-9901220615892956/7187593211

export default (controller) => (
  <View style={{height: '100%'}}>
    <Text
      style={recommendationsStyles.mainTitle}>Recommendations for { controller.user.getChosenRegion() ? controller.user.getChosenRegion() : controller.user.getChosenCountry()} </Text>
    <Text
      style={recommendationsStyles.howManyDays}>Still {controller.checkHowManyDays()} days to Go!</Text>
    <SectionList
      renderItem={({item, index, section}) => {
        return (
          <ListItem
            dataItem={!controller.state.collapsed[section.key] ? item : []}
            onClickAmazon={(item) => controller.onClickAmazonItems(item)}
            onClickWorldTraveller={() => controller.onClickWorldTraveller()}
            onClickListItem={(item) => controller.onClickListItemRecommendations(item)} />);
      }}
      renderSectionHeader={(prop) => {
        return (
          <TouchableOpacity
            onPress={() => {
              const state = controller.state;
              state.collapsed[prop.section.key] = !state.collapsed[prop.section.key];
              controller.setState(state);
            }}
            style={recommendationsStyles.sectionContainer}>
            <View style={[recommendationsStyles.iconChevronView, {transform: [{ rotate: controller.state.collapsed[prop.section.key] ? '0deg' : '90deg'}]}]}>
              <Icon name='chevron-right' size={20} color={Palette.white} />
            </View>
            <Text style={recommendationsStyles.sectionTitle}>{prop.section.key}</Text>
          </TouchableOpacity>
        );
      }}
      sections={controller.user.getRecommendationsSelected()}
      stickySectionHeadersEnabled />
    {/* <View>
      <AdMobBanner
        adSize='smartBannerPortrait'
        adUnitID='ca-app-pub-3940256099942544/6300978111'
        testDevices={[AdMobBanner.simulatorId]}
        onAdFailedToLoad={error => console.warn(error)}
      />
    </View> */}
  </View>
);
