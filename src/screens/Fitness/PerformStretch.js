import React, { PureComponent } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
      timer: 45,
      pause: true,
    };
  }

  componentDidMount() {
    this.setExerciseData();
  }

  init = async () => {
    this.clockCall = setInterval(() => {
      this.decrementClock(
        this.state.timer > 0 ? this.state.timer : 1,
        this.state.pause
      );
    }, 1000);
  };

  componentDidMount() {
    this.setExerciseData();
    this.init();
  }

  decrementClock = (time, pause) => {
    //if paused then dont decrement timer
    pause
      ? this.setState({
          timer: time,
        })
      : this.setState(
          {
            timer: time - 1,
          },
          async () => {
            if (this.state.timer === 0) {
              this.decrementClock(this.state.timer, true);
            }
          }
        );
  };

  componentWillUnmount() {
    clearInterval(this.clockCall);
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
  showTime = () => (
    <Text style={styles.time}>
      {this.state.timer ? this.state.timer : "Well done"}
    </Text>
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

  renderButtons = () => (
    <View style={styles.buttonView}>
      <TouchableOpacity
        hitSlop={hitSlop20}
        onPress={() => {
          this.setState({ timer: 45 });
        }}
      >
        <MaterialCommunityIcons
          color={appTheme.darkBackground}
          name={"reload"}
          size={30}
        />
      </TouchableOpacity>
      <TouchableOpacity
        hitSlop={hitSlop20}
        onPress={() => {
          this.setState({ pause: !this.state.pause });
        }}
      >
        <Ionicons
          color={appTheme.darkBackground}
          name={this.state.pause ? "play" : "pause"}
          size={30}
        />
      </TouchableOpacity>
      <TouchableOpacity
        hitSlop={hitSlop20}
        onPress={() => {
          this.props.navigation.pop();
        }}
      >
        <Ionicons
          color={appTheme.darkBackground}
          name={"backspace"}
          size={30}
        />
      </TouchableOpacity>
    </View>
  );
  showTime = () => (
    <Text style={styles.time}>
      {this.state.timer ? this.state.timer : "Well done"}
    </Text>
  );

  renderProgressBar = () => {
    let progress;
    progress = 1 - this.state.timer / 45;
    return <Bar progress={progress} width={null} color="green" />;
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderExerciseName()}
        {this.renderGif()}
        <View style={styles.timerView}>{this.showTime()}</View>
        <View style={{ flex: 1 }}>
          {this.renderProgressBar({
            /* this.state.timer,
            this.state.reps[this.state.currentRepIndex - 1] */
          })}
        </View>
        {this.renderButtons()}
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
    height: "60%",
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

  buttonView: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderColor: appTheme.greyC,
    borderTopWidth: 1,
    width: screenWidth,
    position: "absolute",
    bottom: 0,
    paddingVertical: spacing.medium_sm,
  },
  numView: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",

    flex: 1,
  },
  time: {
    fontSize: fontSizes.midTitle * 2,
    fontFamily: fonts.CenturyGothic,
  },
  timerView: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    marginTop: -10,
  },
  xText: {
    fontSize: 25,
    fontWeight: "bold",
  },
});

export default PerformStretch;
