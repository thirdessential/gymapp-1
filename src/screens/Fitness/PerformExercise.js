import React, {PureComponent} from "react";
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
import {connect} from "react-redux";
import fonts from "../../constants/fonts";
import fontSizes from "../../constants/fontSizes";
import {spacing} from "../../constants/dimension";
import {appTheme} from "../../constants/colors";
import {screenWidth} from "../../utils/screenDimensions";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {hitSlop20} from "../../constants/styles";
import FastImage from "react-native-fast-image";
import {Bar} from "react-native-progress";

class PerformExercise extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: "Push Ups",
      gifUrl:
        "http://res.cloudinary.com/primefitness/image/upload/v1596903078/exercise-gifs/360/3-4-Sit-Up.gif",
      noOfSets: 3,
      reps: [1, 1, 1],
      currentRepIndex: 1,
      timer: 0,
      exercise: {}
    };
  }

  init = async () => {
    await this.setState({
      timer: this.state.reps[parseInt(this.state.currentRepIndex) - 1] * 4,
    });
    this.clockCall = setInterval(() => {
      this.decrementClock();
    }, 1000);
  }

  componentDidMount() {
    this.init();
    this.setExerciseData();
  }

  decrementClock = () => {
    this.setState(
      (prevstate) => ({
        timer: prevstate.timer - 1,
      }),
      async () => {
        if (this.state.timer === 0) {
          if (this.state.currentRepIndex !== this.state.reps.length) {
            await this.setState({
              currentRepIndex: this.state.currentRepIndex + 1,
            });
            await this.setState({
              timer: this.state.reps[this.state.currentRepIndex - 1] * 4,
            });
          } else {
            clearInterval(this.clockCall);
          }
        }
      }
    );
  };

  componentWillUnmount() {
    clearInterval(this.clockCall);
  }

  setExerciseData = () => {
    const {exercise, level} = this.props.route.params;
    // exercise.exerciseData = exercise.exerciseData.filter(data => data.level === level)[0];
    this.setState({exercise});
  }

  showTime = () => (
    // <Text style={{ fontSize: 40 }}>{this.calculateTime(this.state.reps[index] * 4)}</Text>
    <Text style={{fontSize: fontSizes.midTitle * 2, fontFamily: fonts.CenturyGothic}}>
      {this.state.timer ? (this.state.timer === 0 ? "Time ups" : this.state.timer) : "Time up"}
    </Text>
  );
  renderProgressBar = (time, reps) => {
    let progress;
    progress = 1 - time / (reps * 4);
    // console.log(progress);
    return (
      <Bar progress={progress ? progress : 0} width={null} color="green"/>
    );
  };
  renderGif = () => (
    <View
      style={styles.gifView}
    >
      <FastImage
        style={styles.image}
        resizeMode="contain"
        source={{uri: this.state.exercise.contentUrls && this.state.exercise.contentUrls['360']}}
      />
    </View>
  );
  renderExerciseName = () => (
    <View
      style={{justifyContent: "center", alignItems: "center", marginTop: 30}}
    >
      <Text
        style={styles.exerciseName}
      >
        {this.state.exercise.name}
      </Text>
    </View>
  );
  renderButtons = () => (
    <View
      style={styles.buttonView}
    >
      <TouchableOpacity hitSlop={hitSlop20}>
        <MaterialCommunityIcons
          color={appTheme.darkBackground}
          name={"reload"}
          size={30}
        />
      </TouchableOpacity>
      <TouchableOpacity hitSlop={hitSlop20}>
        <Ionicons color={appTheme.darkBackground} name={"pause"} size={30}/>
      </TouchableOpacity>
      <TouchableOpacity hitSlop={hitSlop20}>
        <Ionicons
          color={appTheme.darkBackground}
          name={"play-skip-forward"}
          size={30}
        />
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <View
        style={styles.container}
      >
        {this.renderExerciseName()}
        {this.renderGif()}

        <View
          style={styles.numView}
        >
          {this.state.reps.map((rep, index) => (
            <View>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "bold",
                  color: this.state.currentRepIndex > index ? "green" : "black",
                }}
              >
                x1
              </Text>
            </View>
          ))}
        </View>
        <View style={{alignItems: "center", flex: 1}}>
          {this.state.reps.map((rep, index) =>
            index === this.state.currentRepIndex - 1 ? (
              <>{this.showTime()}</>
            ) : null
          )}
        </View>
        <View style={{marginTop: 0, flex: 1}}>
          {this.renderProgressBar(
            this.state.timer,
            this.state.reps[this.state.currentRepIndex - 1]
          )}
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
    height: "50%",
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
    marginTop: 10,
    flex: 1,
  },
  numText: {},
});

export default PerformExercise;
