import React, {PureComponent} from "react";
import {
  StyleSheet,
  Image, ImageBackground,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  Button,
} from "react-native";
import {connect} from "react-redux";
import Carousel from 'react-native-snap-carousel';

import {spacing} from "../../constants/dimension";
import {appTheme} from "../../constants/colors";
import {screenHeight, screenWidth} from "../../utils/screenDimensions";
import fonts from "../../constants/fonts";
import fontSizes from "../../constants/fontSizes";
import strings from "../../constants/strings";
import {getRandomImage} from "../../constants/images";

class SelectExercise extends PureComponent {

  state = {
    entries: [
      {
        title: 'Shoulder'
      }, {
        title: 'Pain'
      }, {
        title: 'Chest bump'
      }, {
        title: 'Nice'
      }, {
        title: 'Nice'
      }, {
        title: 'Nice'
      }, {
        title: 'Nice'
      },
    ]
  }
  renderCard = ({item, source}) => {
    return (
      <View
        borderRadius={20}
        // resizeMethod={'scale'}
        resizeMode={'cover'}
        imageStyle={{height:'100%'}}
        style={styles.cardContainer}
        source={getRandomImage()}
      >
        <Image  style={styles.image} source={{uri:'https://res.cloudinary.com/matrim/image/upload/v1596808238/00031305-air-bike-m_waist_FIX_360_ovvibt.gif'}}/>
        <Text style={styles.brightText}>{item.title.toUpperCase()}</Text>
        <TouchableOpacity activeOpacity={0.8} style={styles.brightButton}>
          <Text style={styles.darkText}>{strings.START}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Carousel
          ref={(c) => {
            this._carousel = c;
          }}
          data={this.state.entries}
          renderItem={this.renderCard}
          sliderWidth={screenWidth / 1.2}
          layout={'stack'}
          layoutCardOffset={18}
          itemWidth={screenWidth / 1.4}
          contentContainerCustomStyle={{alignItems: 'center'}}
          firstItem={this.state.entries.length-1}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: spacing.medium_lg,
    backgroundColor: appTheme.background,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardContainer: {
    height: '80%',
    backgroundColor: appTheme.textPrimary,
    borderRadius: 20,
    elevation:8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image:{
    height:'30%',
    width:'95%',
    // backgroundColor:appTheme.textPrimary,
    borderRadius:10
  },
  brightText: {
    color: appTheme.darkBackground,
    fontFamily: fonts.CenturyGothicBold,
    fontSize: fontSizes.bigTitle,
    position: 'absolute',
    bottom: 80,
    textAlign: 'center'
  },
  darkText: {
    color: appTheme.textPrimary,
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: fontSizes.h1,
    textAlign: 'center'
  },
  brightButton: {
    backgroundColor: appTheme.darkBackground,
    width: '101%',
    borderRadius: 20,
    borderTopEndRadius: 0,
    borderTopStartRadius: 0,
    height: 50,
    justifyContent: 'center',
    position: 'absolute',
    bottom:-1
  }
});

export default SelectExercise;
