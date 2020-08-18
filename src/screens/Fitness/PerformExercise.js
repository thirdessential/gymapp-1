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
import {appTheme, bmiColors} from "../../constants/colors";
import {screenWidth} from "../../utils/screenDimensions";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {hitSlop20} from "../../constants/styles";
import FastImage from "react-native-fast-image";
import {Bar} from "react-native-progress";
import RouteNames from "../../navigation/RouteNames";
import strings from "../../constants/strings";

class PerformExercise extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      reps: this.props.route.params.reps,
      currentRepIndex: 1,
      timer: 0,
      stages: [],
      exercise: {},
      pause: true,
      levelMultiplier:{
        'BEGINNER':4,
        'INTERMEDIATE':3,
        'ADVANCED':2
      },
      level:this.props.route.params.level
    };
  }

  init = async () => {
    await this.setState({
      timer: this.state.reps[parseInt(this.state.currentRepIndex) - 1] *this.state.levelMultiplier[this.state.level] ,
    });
    this.clockCall = setInterval(() => {
      this.decrementClock(this.state.timer > 1 ? this.state.timer : 1, this.state.pause);
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
      : this.setState({
        timer: time - 1,
      },
      async () => {
        if (this.state.timer === 0) {
          //if timer has reached 0 and we havent reached last index then increment
          if (this.state.currentRepIndex !== this.state.reps.length) {
            await this.setState({
              currentRepIndex: this.state.currentRepIndex + 1,
            });
            //set timer according to curent rep index
            await this.setState({
              timer: this.state.reps[this.state.currentRepIndex - 1],
            });
          } else {
            //if timer has reached 0 and all elements of reps array are treaversed then clear interval
            this.decrementClock(this.state.timer, true);
          }
        }
      });
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

  setExerciseData = () => {
    const {restTime, reps, exercise} = this.props.route.params;
    //functions to enter rest time between elements;
    for (i = 0; i < this.state.reps.length; i++) {
      if (i % 2 == 0) {
        this.setState({
          stages: this.state.stages.push(reps[i] * this.state.levelMultiplier[this.state.level]),
        });
        if (i != reps.length - 1) {
          this.setState({stages: this.state.stages.push(restTime)});
        }
      } else {
        this.setState({
          stages: this.state.stages.push(reps[i] * this.state.levelMultiplier[this.state.level]),
        });
        if (i != reps.length - 1) {
          this.setState({stages: this.state.stages.push(restTime)});
        }
      }
    }
    //console.log(this.state.stages);
    this.setState({reps: this.state.stages});
    this.setState({exercise});
  };

  showTime = index => {
    if (index % 2) {
      return this.state.timer ? (
        <View style={styles.centerContent}>
          <Text style={styles.subtitle}>{strings.REST}</Text>
          <Text style={styles.time}>{this.state.timer}</Text>
        </View>
      ) : <Text style={styles.time}>{strings.WELL_DONE}</Text>
    } else return (
      <Text style={styles.time}>
        {this.state.timer ? this.state.timer : strings.WELL_DONE}
      </Text>
    );
  }

  renderProgressBar = (time, reps) => {
    let progress;
    progress = 1 - time / reps;
    return (
      <Bar
        progress={progress ? progress : 0}
        width={null}
        color={bmiColors.blue}
        borderWidth={0}
        borderRadius={0}
        height={4}
        unfilledColor={appTheme.greyC}
      />
    );
  };

  renderExerciseName = () => (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        marginTop: spacing.medium,
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
          this.setState({timer: this.state.reps[0]});
          this.setState({currentRepIndex: 1});
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
          this.setState({pause: !this.state.pause});
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
          if (this.state.currentRepIndex !== this.state.reps.length) {
            this.setState({currentRepIndex: this.state.currentRepIndex + 1});
            this.setState({
              timer: this.state.reps[this.state.currentRepIndex],
            });
          }
        }}
      >
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
      <View style={styles.container}>
        {this.renderExerciseName()}
        {this.renderGif()}

        <View style={styles.numView}>
          {this.state.reps.map((rep, index) =>
            index % 2 === 0 ? (
              <View key={index.toString()}>
                <Text
                  style={
                    [
                      styles.xText,
                      {
                        color:
                          this.state.currentRepIndex > index
                            ? bmiColors.blue
                            : "black",
                      },
                    ]
                    //make it blue when we reach that exercise
                  }
                >
                  x{rep/this.state.levelMultiplier[this.state.level]}
                </Text>
              </View>
            ) : null
          )}
        </View>
        <View style={styles.timerView}>
          {this.state.reps.map((rep, index) =>
            index === this.state.currentRepIndex - 1 ? (
              <>{this.showTime(index)}</>
            ) : null
          )}
        </View>
        <View style={{}}>
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
    // paddingHorizontal: spacing.medium_lg,
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
    textAlign: "center",
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-around",
    // borderColor: appTheme.greyC,
    // borderTopWidth: 1,
    width: screenWidth,
    paddingVertical: spacing.medium_sm,
  },
  centerContent: {
    alignItems: 'center',
    paddingBottom: spacing.medium_sm
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
  subtitle:{
    fontSize: 30,
    fontFamily: fonts.CenturyGothic,
  }
});

export default PerformExercise;
