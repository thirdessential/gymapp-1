import React, { PureComponent } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { connect } from "react-redux";
import { waterIntake } from "../../API";
import HcdWaveView from "../../components/HcdWaveView";
import { appTheme, bmiColors } from "../../constants/colors";
import { spacing } from "../../constants/dimension";
import fonts from "../../constants/fonts";
import fontSizes from "../../constants/fontSizes";
import strings from "../../constants/strings";
import RouteNames from "../../navigation/RouteNames";
import * as actionCreators from "../../store/actions";
import { screenHeight } from "../../utils/screenDimensions";
import { getTodayFormattedDate } from "../../utils/utils";
const date = getTodayFormattedDate();

class Water extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      final: 0, //final water intake for today
      waterIntake: 0, //todays water intake
      target: 4000, //target water intake
      show: true, //if user has updated bmi then only show this screen therefore boolean to mane screen
      data: [], //data which will be sent by redux in array consisting of date and amount of water intake
      lengthOfData: 0, //length of data to calculate average intake
      totalIntakeAverage: 0, //to hold average intake of water
    };
  }
  async componentDidMount() {
    let result = await this.props.getWaterIntake(); //get result i.e. array from redux
    //console.log(result);
    await this.setState({ data: result }); //set it to data

    const { bmiRecords, waterIntake } = this.props; //get bmi  and todays water intake from redux

    // console.log(waterIntake);
    //if not bmi show text otherwise screen
    bmiRecords.length > 0
      ? this.setState({ show: true })
      : this.setState({ show: false });
    if (waterIntake) {
      this.setState({ waterIntake, final: waterIntake }); //if we have water consumption of today then set it otherwise 0
    }

    this.unsubscribe = this.props.navigation.addListener("blur", (e) => {
      //call api only if user changes water intake
      if (Math.abs(this.state.waterIntake - this.state.final) > 0) {
        this.submit();
      }
    });
    //get array of last 7 days to calculate average intake
    var lastSevenDays = this.state.data.slice(
      Math.abs(this.state.data.length - 7)
    );
    //console.log(lastSevenDays);
    let total = 0; //to calculate total intake of water
    lastSevenDays.forEach((item) => {
      total += item.intake;
    }); //calculate total

    this.setState({
      //set length of data it can be 7 or less that seven from upper slice function
      lengthOfData: lastSevenDays.length,
      totalIntakeAverage: Math.round(total / (lastSevenDays.length || 1), 2), //calculate avrage water intake
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  submit = async () => {
    let record = await waterIntake(date, this.state.waterIntake);
    //redux function to update water intake
    // console.log(record);
  };
  updateWaterState = async (count) => {
    //function to change waterintake in state
    await this.setState({ waterIntake: this.state.waterIntake + count });
    this.updateWaterIntake();
  };
  updateWaterIntake = async () => {
    //redux  function which sends this data to database for update
    let result = await this.props.addWaterIntake(this.state.waterIntake);
    // console.log(result);
  };
  renderItem = (item, heightPercent) => {
    //send height percent from parent to cacluate height of lines
    //{"date":"03/09","intake":1250}//this is how each element of array looks
    return (
      <View style={styles.lineView}>
        <Text style={styles.intakeText}>{item.intake}</Text>

        <LinearGradient
          colors={["#185cc9", "#58D3F7"]}
          style={{
            height: `${heightPercent}%`,
            width: 15,
            borderRadius: 10,
            marginLeft: 15,
            elevation: 4,
          }}
        />

        <Text style={styles.dateText}>{item.date}</Text>
      </View>
    );
  };
  render() {
    return this.state.show ? ( //check if bmi is there or not
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
        style={styles.container}
      >
        <View style={styles.waterView}>
          <View style={styles.iconView}>
            <TouchableOpacity //decrease count of water intake
              style={styles.minus}
              disabled={this.state.waterIntake > 250 ? false : true}
              onPress={() => this.updateWaterState(-250)}
            >
              <FontAwesome5Icon name="minus" size={30} color={appTheme.greyC} />
            </TouchableOpacity>
          </View>
          <HcdWaveView
            surfaceWidth={200}
            surfaceHeigth={200}
            //send percentage from here
            powerPercent={parseInt(
              (this.state.waterIntake / this.state.target) * 100
            )}
            type="dc"
            style={{ backgroundColor: "#FF7800" }}
          />
          <View style={styles.iconView}>
            <TouchableOpacity
              style={styles.minus}
              //increase by 250 ml
              onPress={() => this.updateWaterState(250)}
            >
              <FontAwesome5Icon name="plus" size={30} color={appTheme.greyC} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <Text
            //target text
            style={styles.targetText}
          >
            {this.state.target} ml
          </Text>
        </View>
        <View style={{ flex: 1, marginTop: 10 }}>
          <Text style={styles.quickAdd}>Quick add</Text>
        </View>
        <View style={styles.mainView}>
          <View style={styles.increaseTextView}>
            <TouchableOpacity
              style={styles.increaseMargin}
              onPress={() => this.updateWaterState(100)}
            >
              <Text style={styles.increaseText}>+ 100 ml</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.increaseTextView}>
            <TouchableOpacity
              style={styles.increaseMargin}
              onPress={() => this.updateWaterState(250)}
            >
              <Text style={styles.increaseText}>+ 250 ml</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.increaseTextView}>
            <TouchableOpacity
              style={styles.increaseMargin}
              onPress={() => this.updateWaterState(500)}
            >
              <Text style={styles.increaseText}>+ 500 ml</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flex: 1, width: "100%", paddingHorizontal: 10 }}>
          {this.state.data.length > 0 ? ( //show ony if we have data to show othewsie show text which is down
            <View style={styles.displayView}>
              <Text style={styles.hydrateText}>HYDRATION (ml)</Text>

              <Text style={styles.avgText}>
                Avg :{this.state.totalIntakeAverage} ml
              </Text>
            </View>
          ) : null}
          {this.state.data.length > 0 ? (
            <View style={styles.flatlistView}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                style={{ marginVertical: 15 }}
                data={this.state.data}
                keyExtractor={(item, index) => index.toString()}
                horizontal={true}
                renderItem={({ item }) =>
                  //send item and percent of height to of each liine maximum is 90% of container and min can be 0 therfore math.min perecent is (intake/target)*90
                  this.renderItem(
                    item,
                    Math.min(90, (item.intake * 90) / this.state.target)
                  )
                }
              />
            </View>
          ) : (
            <Text style={styles.addIntake}>
              Add your water intake to start tracking it.
            </Text>
          )}
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
  waterIntake: state.fitness.waterIntake[date], //we are getting this date from imports above which sends waterIntake of that particular date
  userData: state.user.userData,
  bmiRecords: state.fitness.bmiRecords,
});

const mapDispatchToProps = (dispatch) => ({
  addWaterIntake: (water) => dispatch(actionCreators.addWaterIntake(water)), //to add waterIntake
  getWaterIntake: () => dispatch(actionCreators.getWaterIntake()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Water);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",

    backgroundColor: appTheme.background,
  },
  hydrateText: {
    color: appTheme.greyC,
    fontSize: 16,
    fontFamily: fonts.CenturyGothic,
    marginLeft: 10,
  },
  flatlistView: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 10,
    backgroundColor: appTheme.darkBackground,
    marginTop: 20,
    borderRadius: 10,
  },
  avgText: {
    color: appTheme.greyC,
    fontSize: 16,
    fontFamily: fonts.CenturyGothic,
    marginRight: 10,
  },
  addIntake: {
    color: appTheme.greyC,
    fontSize: fontSizes.midTitle,
    fontFamily: fonts.CenturyGothic,
  },
  intakeText: {
    color: appTheme.greyC,
    textAlign: "center",
    fontSize: 12,
    marginBottom: 5,
  },
  displayView: {
    flexDirection: "row",
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
    marginTop: 10,
  },
  iconView: {
    justifyContent: "center",
    alignContent: "center",
    margin: 30,
  },
  quickAdd: {
    textAlign: "center",
    color: appTheme.textPrimary,
    fontSize: 16,
  },
  increaseTextView: {
    backgroundColor: appTheme.darkBackground,
    height: 50,
    justifyContent: "center",
    marginHorizontal: 4,
    borderRadius: 5,
  },
  waterView: { flex: 1, flexDirection: "row", marginTop: 20 },
  dateText: {
    color: appTheme.greyC,
    textAlign: "center",
    fontSize: 12,
    marginTop: 5,
  },
  buttonText: {
    fontFamily: fonts.CenturyGothicBold,
    fontSize: fontSizes.h3,
  },
  targetText: {
    color: appTheme.greyC,
    fontSize: fontSizes.h0,
    margin: 3,
  },
  blueButton: {
    padding: spacing.medium_sm,
    backgroundColor: bmiColors.lightBlue,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  increaseText: {
    color: appTheme.textPrimary,
    fontSize: fontSizes.h0,
    fontFamily: fonts.CenturyGothic,
  },
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
  lineView: { margin: 7, height: 200, justifyContent: "flex-end" },
  increaseMargin: { marginHorizontal: spacing.small_lg },
});
