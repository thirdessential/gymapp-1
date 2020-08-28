import React, {PureComponent} from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {connect} from "react-redux";
import {spacing} from "../../constants/dimension";

import {appTheme} from "../../constants/colors";
import fontSizes from "../../constants/fontSizes";
import strings from "../../constants/strings";
import {getTodayFormattedDate} from "../../utils/utils";
import * as actionCreators from "../../store/actions";
import HcdWaveView from "../../components/HcdWaveView";
import {waterIntake} from "../../API";

const date = getTodayFormattedDate();

class Water extends PureComponent {
  state = {
    waterIntake: 0,
    target: 5000,
  };

  async componentDidMount() {
    // console.log(this.props.waterIntake);
    const {waterIntake} = this.props;
    if (waterIntake) {
      this.setState({waterIntake});
    }
    this.unsubscribe = this.props.navigation.addListener("blur", (e) => {
      this.submit();
    });
  }

  submit = async () => {
    let record = await waterIntake(date, this.state.waterIntake);

    // console.log(record);
  };
  updateWaterState = async (count) => {
    await this.setState({waterIntake: this.state.waterIntake + count});
    this.updateWaterIntake();
  };
  updateWaterIntake = async () => {
    let result = await this.props.addWaterIntake(this.state.waterIntake);
    // console.log(result);
  };

  render() {
    return (
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
          style={{backgroundColor: "#FF7800"}}
        />
        <View style={styles.mainView}>
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
          <Text style={{color: "white", fontSize: 20}}>
            {strings.TARGET_TEXT} : {this.state.target / 1000} Litres
          </Text>
        </View>
        <View style={styles.counterView}>
          <Text style={styles.increaseText}>
            {strings.ACHIEVED} : {this.state.waterIntake} ml's
          </Text>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  waterIntake: state.fitness.waterIntake[date],
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
  increaseText: {color: appTheme.textPrimary, fontSize: fontSizes.h1},
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
  increaseMargin: {marginHorizontal: spacing.medium},
});
