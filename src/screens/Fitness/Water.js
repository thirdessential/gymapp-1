import React, { PureComponent } from "react";
import {
  ActivityIndicator,
  FlatList,
  LayoutAnimation,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
} from "react-native";
import { connect } from "react-redux";
import { Bar } from "react-native-progress";
import { spacing } from "../../constants/dimension";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo("en-US");

import colors, { appTheme } from "../../constants/colors";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import { screenWidth } from "../../utils/screenDimensions";
import strings from "../../constants/strings";
import { getTodayFormattedDate } from "../../utils/utils";
import * as actionCreators from "../../store/actions";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import HcdWaveView from "../../components/HcdWaveView";
const todaysDate = getTodayFormattedDate();
class Water extends PureComponent {
  state = {
    waterIntake: 0,
    target: 5000,
  };

  async componentDidMount() {
    //console.log(this.props.waterIntake);
    const { waterIntake } = this.props;
    if (waterIntake) {
      this.setState({ waterIntake });
    }

    //console.log(todaysDate);
  }
  updateWaterState = async (count) => {
    await this.setState({ waterIntake: this.state.waterIntake + count });
    this.updateWaterIntake();
  };
  updateWaterIntake = async () => {
    let result = await this.props.addWaterIntake(this.state.waterIntake);
    console.log(result);
  };
  render() {
    return (
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
          style={styles.container}
        >
          <HcdWaveView
            surfaceWidth={230}
            surfaceHeigth={230}
            powerPercent={parseInt(
              (this.state.waterIntake / this.state.target) * 100
            )}
            type="dc"
            style={{ backgroundColor: "#FF7800" }}
          ></HcdWaveView>
          <View
            style={styles.mainView}
          >
            <TouchableOpacity
              style={styles.increaseMargin}
              onPress={() => this.updateWaterState(50)}
            >
              <Text style={styles.increaseText}>+50ml</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.increaseMargin}
              onPress={() => this.updateWaterState(250)}
            >
              <Text style={styles.increaseText}>+250ml</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.increaseMargin}
              onPress={() => this.updateWaterState(500)}
            >
              <Text style={styles.increaseText}>+500ml</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.counterView}>
            <Text style={{ color: "white", fontSize: 20 }}>
              {strings.TARGET_TEXT} : {this.state.target / 1000} Litres
            </Text>
          </View>
          <View style={styles.counterView}>
            <Text style={styles.increaseText}>
              {strings.ACHIEVED} : {this.state.waterIntake} ml's
            </Text>
          </View>
        </ScrollView>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  waterIntake: state.fitness.waterIntake[todaysDate],
});

const mapDispatchToProps = (dispatch) => ({
  addWaterIntake: (water) => dispatch(actionCreators.addWaterIntake(water)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Water);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingLeft: spacing.medium_lg,
    paddingRight: spacing.medium_lg,

    backgroundColor: appTheme.background,
  },
  increaseText: { color: appTheme.textPrimary, fontSize: fontSizes.h1 },
  counterView: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: spacing.medium_sm,
    flex: 1,
  },
  mainView: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: spacing.medium_sm,
    flex: 1,
  },
  increaseMargin: { marginHorizontal: spacing.medium },
});
