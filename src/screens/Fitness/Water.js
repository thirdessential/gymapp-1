import React, { PureComponent } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { connect } from "react-redux";
import { spacing } from "../../constants/dimension";

import colors, {
  appTheme,
  bmiColors,
  darkPallet,
} from "../../constants/colors";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import strings from "../../constants/strings";
import { getTodayFormattedDate } from "../../utils/utils";
import * as actionCreators from "../../store/actions";
import HcdWaveView from "../../components/HcdWaveView";
import { waterIntake } from "../../API";
import { screenWidth, screenHeight } from "../../utils/screenDimensions";
import RouteNames from "../../navigation/RouteNames";
const date = getTodayFormattedDate();

class Water extends PureComponent {
  state = {
    final:0,
    waterIntake: 0,
    target: 5000,
    show: true,
  };
  async componentDidMount() {
     this.willFocusSubscription = this.props.navigation.addListener(
      "focus",
      async () => {
        const { bmiRecords,waterIntake } = this.props;
        bmiRecords.length > 0
          ? this.setState({ show: true })
          : this.setState({ show: false });
        if (waterIntake) {
          this.setState({ waterIntake,final:waterIntake });
        }
      }
    );

    this.unsubscribe = this.props.navigation.addListener("blur", (e) => {
      if((this.state.waterIntake-this.state.final)>0){
        this.submit();
      }
      
    });
  }

  componentWillUnmount() {
    this.willFocusSubscription();
    this.unsubscribe();
  }

  submit = async () => {
    let record = await waterIntake(date, this.state.waterIntake);

    console.log(record);
  };
  updateWaterState = async (count) => {
    await this.setState({ waterIntake: this.state.waterIntake + count });
    this.updateWaterIntake();
  };
  updateWaterIntake = async () => {
    let result = await this.props.addWaterIntake(this.state.waterIntake);
    // console.log(result);
  };

  render() {
    return this.state.show ? (
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
          <Text style={{ color: appTheme.textPrimary, fontSize: fontSizes.h0 }}>
            {strings.TARGET_TEXT} : {this.state.target / 1000} Litres
          </Text>
        </View>
        <View style={styles.counterView}>
          <Text style={styles.increaseText}>
            {strings.ACHIEVED} : {this.state.waterIntake} ml's
          </Text>
        </View>
      </ScrollView>
    ) : (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
        style={styles.container}
      >
        <View style={styles.updateView}>
          <Text style={styles.textView}>{strings.ADDBMI}</Text>
          <View style={styles.addbuttonView}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate(RouteNames.BMI);
              }}
              activeOpacity={0.7}
              style={styles.blueButton}
            >
              <Text style={styles.buttonText}>{strings.ADD_BMI}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  waterIntake: state.fitness.waterIntake[date],
  userData: state.user.userData,
  bmiRecords: state.fitness.bmiRecords,
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
  buttonText: {
    fontFamily: fonts.CenturyGothicBold,
    fontSize: fontSizes.h3,
  },
  blueButton: {
    padding: spacing.medium_sm,
    backgroundColor: bmiColors.lightBlue,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  increaseText: { color: appTheme.textPrimary, fontSize: fontSizes.h0 },
  counterView: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: spacing.medium_sm,
    flex: 1,
  },
  updateView: {
    alignItems: "center",
    justifyContent: "center",
  },
  mainView: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: spacing.medium_sm,
    flex: 1,
  },
  addbuttonView: { marginTop: spacing.medium_lg },
  textView: {
    fontFamily: fonts.CenturyGothicBold,
    fontSize: fontSizes.bigTitle,
    textAlign: "center",
    marginTop: screenHeight / 3,
    color: appTheme.greyC,
  },
  increaseMargin: { marginHorizontal: spacing.medium },
});
