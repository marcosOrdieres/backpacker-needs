import React from 'react';
import backpackStyles from './backpackStyles';
import { ListItem } from 'components';
import { View, Text, SectionList, TouchableOpacity } from 'react-native';
import CheckMark from '../../assets/svg/CheckMark';
import Palette from '../../common/palette';
import Icon from 'react-native-vector-icons/FontAwesome';

export default (controller) => (
  <View style={{height: '100%'}}>
    <Text
      style={backpackStyles.mainTitle}>Backpack for {controller.user.getChosenRegion()} </Text>
    <Text
      style={backpackStyles.howManyDays}>Still {controller.checkHowManyDays()} days to Go!</Text>
    {controller.user.getRecommendationsOnlyIntemSelected() ?
      <SectionList
        renderItem={({item, index, section}) => {
          return (
            <ListItem
              onBlurAddItem={() => { controller.onBlurAddItem(); }}
              titleAddItem={controller.state.titleAddItem}
              titleAddItemChangeText={(title) => { controller.setState({titleAddItem: title}); }}
              backpackListItem
              dataItem={!controller.state.collapsed[section.key] ? item : []}
              onClickListItem={(item) => controller.onClickListItemBackpack(item)} />);
        }}
        renderSectionHeader={(prop) => {
          return (
            <TouchableOpacity
              onPress={() => {
                const state = controller.state;
                state.collapsed[prop.section.key] = !state.collapsed[prop.section.key];
                controller.setState(state);
              }}
              style={backpackStyles.sectionContainer}>

              <View style={[backpackStyles.iconChevronView, {transform: [{ rotate: controller.state.collapsed[prop.section.key] ? '0deg' : '90deg'}]}]}>
                <Icon name='chevron-right' size={20} color={Palette.white} />
              </View>

              <Text style={backpackStyles.sectionTitle}>{prop.section.key}</Text>
            </TouchableOpacity>
          );
        }}
        sections={controller.user.getInTheBackpackSelected()}
        stickySectionHeadersEnabled />
            :
      <View>
        <Text style={backpackStyles.subtitleNoItemsBackpack}>{controller.i18n.t('backpack.noItems')}</Text>
        <View style={backpackStyles.checkmarkNoItemsBackpack}>
          <CheckMark
            color={Palette.primaryColor75}
            width={150}
            height={150} />
        </View>
      </View>
      }
  </View>
);
