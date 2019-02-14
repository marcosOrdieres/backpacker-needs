import React, { Component } from 'react';
import { View, Image, StatusBar, Dimensions, Text } from 'react-native';
import Swiper from 'react-native-swiper';
import Palette from '../common/palette';
import { Button } from 'components';

import region from '../assets/images/WhatRegion.png';
import country from '../assets/images/WhatCountry.png';
import selectDay from '../assets/images/WhatSelectDay.png';
import recommendations from '../assets/images/WhatRecommendations.png';
import backpack from '../assets/images/WhatBackpack.png';
import map from '../assets/images/WhatMap.png';

const { width, height } = Dimensions.get('window');

const localStyles = {
  firstSlide: {
    flex: 1,
    backgroundColor: Palette.white
  },
  secondSlide: {
    flex: 1,
    backgroundColor: Palette.white
  },
  thirdSlide: {
    flex: 1,
    backgroundColor: Palette.white
  },
  fourthSlide: {
    flex: 1,
    backgroundColor: Palette.white
  },
  fifthSlide: {
    flex: 1,
    backgroundColor: Palette.white
  },
  container: {
    flex: 1
  },
  textTitle:{
    fontSize:25,
    fontFamily:'Calibri',
    color: Palette.primaryColor,
    textAlign:'center'
  },
  imgBackground: {
    width,
    height,
    backgroundColor: 'transparent',
    position: 'absolute'
  },
  imageTwo: {
    height: height - 350,
    width: width / 2.7,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageOne: {
    height: height /1.8,
    width: width / 2,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageLast: {
    height: height /2.3,
    width: width / 2.5,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dotStyles:{
    backgroundColor: Palette.primaryColor75,
    opacity: 0.3,
    width: 13,
    height: 13,
    borderRadius: 7,
    marginLeft: 7,
    marginRight: 7
  },
  activeDots:{
    backgroundColor: Palette.primaryColor,
    width: 13,
    height: 13,
    borderRadius: 7,
    marginLeft: 7,
    marginRight: 7
   }
};

export default class SwipperComponent extends Component {
  render () {
    return (
      <View style={localStyles.container}>
        <StatusBar barStyle='light-content' />
        <Swiper style={localStyles.wrapper}
          dot={<View style={localStyles.dotStyles} />}
          activeDot={<View style={localStyles.activeDots} />}
          paginationStyle={{ bottom: width - (width - 30) }}
          loop={false}>
          <View style={localStyles.firstSlide}>
            {/*VIEW OF THE FIRST SLIDE*/}
            <View style={{flex:0.2, alignItems:'center', justifyContent:'center'}}><Text style={localStyles.textTitle}>{this.props.firstSwipperText}</Text></View>
              <View style={{flex: 0.8, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                <Image
                  style={localStyles.imageTwo}
                  source={region}
                  resizeMode='cover'
                />
              <View><Text style={localStyles.textTitle}>{this.props.firstSwipperTextOr}</Text></View>
                <Image
                  style={localStyles.imageTwo}
                  source={country}
                  resizeMode='cover'
                />
              </View>
          </View>
          <View style={localStyles.secondSlide}>
            {/*VIEW OF THE SECONS SLIDE*/}
              <View style={{flex:0.2, alignItems:'center', justifyContent:'center'}}><Text style={localStyles.textTitle}>{this.props.secondSwipperText}</Text></View>
                <View style={{flex: 0.8, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                  <Image
                    style={localStyles.imageOne}
                    source={selectDay}
                    resizeMode='cover'
                  />
            </View>
          </View>
          <View style={localStyles.thirdSlide}>
            {/*VIEW OF THE THIRD SLIDE*/}
              <View style={{flex:0.2, alignItems:'center', justifyContent:'center'}}><Text style={localStyles.textTitle}>{this.props.thirdSwipperText}</Text></View>
                <View style={{flex: 0.8, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                  <Image
                    style={localStyles.imageOne}
                    source={map}
                    resizeMode='cover'
                  />
            </View>
          </View>
          <View style={localStyles.fourthSlide}>
            {/*VIEW OF THE FOURTH SLIDE*/}
              <View style={{flex:0.2, alignItems:'center', justifyContent:'center'}}><Text style={localStyles.textTitle}>{this.props.fourthSwipperText}</Text></View>
                <View style={{flex: 0.8, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                  <Image
                    style={localStyles.imageOne}
                    source={recommendations}
                    resizeMode='cover'
                  />
            </View>
          </View>
          <View style={localStyles.fifthSlide}>
            {/*VIEW OF THE FIFTH TITLE*/}
            <View style={{flex:0.2, alignItems:'center', justifyContent:'center'}}><Text style={localStyles.textTitle}>{this.props.fifthSwipperText}</Text></View>
              {/*VIEW OF THE Image and the Button*/}
              <View style={{flex: 0.7, flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                <View style={{flex: 0.8, width:'100%', alignItems:'center', justifyContent:'center'}}>
                  {/*VIEW OF THE Image*/}
                  <Image
                    style={localStyles.imageLast}
                    source={backpack}
                    resizeMode='cover'
                  />
                </View>
                {/*VIEW OF THE BUTTON*/}
                <View style={{flex: 0.2,width:'100%', alignItems:'center', justifyContent:'center'}}>
                  <Button
                    title={this.props.fifthSwipperButton}
                    color={Palette.primaryColor}
                    buttonBorderColor={Palette.black}
                    textColor={Palette.white}
                    onPress={this.props.onPressTravel.bind(this)}
                    />
                </View>
              </View>
              <View style={{flex:0.1, alignItems:'center', justifyContent:'flex-end'}}></View>
          </View>
        </Swiper>
      </View>
    );
  }
}
