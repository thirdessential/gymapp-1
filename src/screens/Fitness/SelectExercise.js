import React, {PureComponent} from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,

} from "react-native";
import {connect} from "react-redux";
import Carousel from 'react-native-snap-carousel';
import FastImage from "react-native-fast-image";

import {spacing} from "../../constants/dimension";
import {appTheme} from "../../constants/colors";
import {screenHeight, screenWidth} from "../../utils/screenDimensions";
import fonts from "../../constants/fonts";
import fontSizes from "../../constants/fontSizes";
import strings from "../../constants/strings";
import {getRandomImage} from "../../constants/images";
import exerciseData from '../../../assets/exercises.json';

class SelectExercise extends PureComponent {

  renderCard = ({item, source}) => {
    const uri = item.contentUrls['360'];
    return (
      <View
        style={styles.cardContainer}>
        <FastImage
          resizeMode={FastImage.resizeMode.contain}
          style={styles.image}
          source={{uri}}
        />
        <Text style={styles.brightText}>{item.name.toUpperCase()}</Text>
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
          data={exerciseData.slice(0, 10)}
          renderItem={this.renderCard}
          sliderWidth={screenWidth / 1.2}
          layout={'stack'}
          layoutCardOffset={18}
          itemWidth={screenWidth / 1.4}
          contentContainerCustomStyle={{alignItems: 'center'}}
          firstItem={9}
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
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    height: '100%',
    width: '100%',
  },
  brightText: {
    color: appTheme.darkBackground,
    fontFamily: fonts.CenturyGothicBold,
    fontSize: fontSizes.h0,
    position: 'absolute',
    bottom: 70,
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
    bottom: -1
  }
});

export default SelectExercise;
