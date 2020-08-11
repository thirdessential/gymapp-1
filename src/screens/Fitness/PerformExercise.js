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

import {spacing} from "../../constants/dimension";
import {appTheme} from "../../constants/colors";
import {screenWidth} from "../../utils/screenDimensions";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {hitSlop20} from "../../constants/styles";
import FastImage from "react-native-fast-image";


class PerformExercise extends PureComponent {

  renderExercise = () => {
    return (
      <View style={styles.exerciseContainer}>
        <FastImage
          style={styles.image}
          resizeMode='contain'
          source={{uri: 'https://res.cloudinary.com/matrim/image/upload/v1596808238/00031305-air-bike-m_waist_FIX_360_ovvibt.gif'}}/>
      </View>
    )
  }
  renderContent = () => {
    return (
      <View>

      </View>
    )
  }
  renderControls = () => {
    return (
      <View style={styles.controlGroup}>
        <TouchableOpacity hitSlop={hitSlop20}>
          <MaterialCommunityIcons color={appTheme.darkBackground} name={'reload'} size={30}/>
        </TouchableOpacity>
        <TouchableOpacity hitSlop={hitSlop20}>
          <Ionicons color={appTheme.darkBackground} name={'pause'} size={30}/>
        </TouchableOpacity>
        <TouchableOpacity hitSlop={hitSlop20}>
          <Ionicons color={appTheme.darkBackground} name={'play-skip-forward'} size={30}/>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderExercise()}
        {this.renderContent()}
        {this.renderControls()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: "100%",
    padding: spacing.medium_lg,
    paddingBottom: spacing.space_40,
    backgroundColor: appTheme.textPrimary,
    // alignItems: 'center',
    // justifyContent: 'center'
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
    // backgroundColor:appTheme.textPrimary,
    borderRadius: 10
  },
  exerciseContainer: {
    // backgroundColor: appTheme.textPrimary,
    // flex:1
    // width:screenWidth/1.2,
    // height:200
  },
  controlGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderColor: appTheme.greyC,
    borderTopWidth: 1,
    width: screenWidth,
    position: 'absolute',
    bottom: 0,
    paddingVertical: spacing.medium_sm
  }
});

export default PerformExercise;
