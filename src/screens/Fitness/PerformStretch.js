import React, { PureComponent } from "react";
import {
  StyleSheet,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  Button,
} from "react-native";
import { connect } from "react-redux";
import fonts from "../../constants/fonts";
import fontSizes from "../../constants/fontSizes";
import { spacing } from "../../constants/dimension";
import { appTheme } from "../../constants/colors";
import { screenWidth } from "../../utils/screenDimensions";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { hitSlop20 } from "../../constants/styles";
import FastImage from "react-native-fast-image";
import { Bar } from "react-native-progress";
import RouteNames from "../../navigation/RouteNames";

class PerformStretch extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      exercise: {},
    };
  }

  componentDidMount() {
    this.setExerciseData();
  }

  renderGif = () => (
    <View style={styles.gifView}>
      <FastImage
        style={styles.image}
        resizeMode="contain"
        source={{
          uri:
            this.state.exercise.contentUrls &&
            this.state.exercise.contentUrls["360"],
        }}
      />
    </View>
  );

  setExerciseData = () => {
    const { exercise } = this.props.route.params;

    this.setState({ exercise });
  };

  renderExerciseName = () => (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        marginTop: spacing.large_lg,
      }}
    >
      <Text style={styles.exerciseName}>{this.state.exercise.name}</Text>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        {this.renderExerciseName()}
        {this.renderGif()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.medium_lg,
    backgroundColor: appTheme.textPrimary,
  },
  gifView: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 10,
  },
  exerciseName: {
    fontSize: 40,
    color: "black",
    fontFamily: fonts.CenturyGothicBold,
    textAlign: "center",
    
  },
});

export default PerformStretch;
