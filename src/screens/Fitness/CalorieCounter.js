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
  Button,
  Alert,
} from "react-native";
import { connect } from "react-redux";
import { Bar } from "react-native-progress";
import { spacing } from "../../constants/dimension";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ActivityRings from "react-native-activity-rings";
import * as Progress from "react-native-progress";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
TimeAgo.addLocale(en);
const timeAgo = new TimeAgo("en-US");
import FontAwesome from "react-native-vector-icons/FontAwesome";

import colors, { appTheme } from "../../constants/colors";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import { screenWidth, screenHeight } from "../../utils/screenDimensions";
import strings from "../../constants/strings";
import RouteNames from "../../navigation/RouteNames";
import * as actionCreators from "../../store/actions";
import { hitSlop20 } from "../../constants/styles";
import { WEEK_DAYS } from "../../constants/appConstants";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { getTodayFormattedDate } from "../../utils/utils";
const todaysDate=getTodayFormattedDate();

class CalorieCounter extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      foodItems: [],

      targetCal: 2000,
      intakeCal: 0,
      proteinIntake: 0,
      fatsIntake: 0,
      carbsIntake: 0,

      breakFast: [],
      dinner: [],
      snacks: [],
      lunch: [],

      breakFastTotal: 0,
      lunchTotal: 0,
      dinnerTotal: 0,
      snacksTotal: 0,
    };
  }

  async componentDidMount() {
    // console.log(this.props.calorieData);

    this.willFocusSubscription = this.props.navigation.addListener(
      "focus",
      async () => {
        this.functionCalls();
      }
    );
    this.functionCalls();
  }

  componentWillUnmount() {
    this.willFocusSubscription();
  }

  functionCalls = async () => {
    const { calorieData } = this.props;
if(calorieData){
  await this.setState({ foodItems: calorieData });
  this.calcTotal();
  this.calcProtein();
  this.calcFats();
  this.calcCarbs();
  this.calcBreakfast();
  this.calcDinner();
  this.calcLunch();
  this.calcSnacks();
}
   else{
     return null;
   }
  };

  calcBreakfast = () => {
    const filteredList = this.state.foodItems.filter(
      (food) => food.type === "BREAKFAST"
    );

    let breakFastTotal = 0;
    filteredList.map((item, index) => (breakFastTotal += item.total));

    this.setState({ breakFastTotal });
    this.setState({ breakFast: filteredList });
  };
  calcDinner = () => {
    const filteredList = this.state.foodItems.filter(
      (food) => food.type === "DINNER"
    );

    let dinnerTotal = 0;
    filteredList.map((item, index) => (dinnerTotal += item.total));

    this.setState({ dinnerTotal });
    this.setState({ dinner: filteredList });
  };
  calcLunch = () => {
    const filteredList = this.state.foodItems.filter(
      (food) => food.type === "LUNCH"
    );

    let lunchTotal = 0;
    filteredList.map((item, index) => (lunchTotal += item.total));

    this.setState({ lunchTotal });
    this.setState({ lunch: filteredList });
  };
  calcSnacks = () => {
    const filteredList = this.state.foodItems.filter(
      (food) => food.type === "SNACKS"
    );

    let snacksTotal = 0;
    filteredList.map((item, index) => (snacksTotal += item.total));

    this.setState({ snacksTotal });
    this.setState({ snacks: filteredList });
  };
  calcTotal = async () => {
    let initial = 0;
    await this.state.foodItems.map((item, index) => (initial += item.total));

    this.setState({ intakeCal: initial });
  };
  calcProtein = async () => {
    let initial = 0;
    await this.state.foodItems.map((item, index) => (initial += item.proteins));

    this.setState({ proteinIntake: initial });
  };
  calcFats = async () => {
    let initial = 0;
    await this.state.foodItems.map((item, index) => (initial += item.fats));

    this.setState({ fatsIntake: initial });
  };
  calcCarbs = async () => {
    let initial = 0;
    await this.state.foodItems.map((item, index) => (initial += item.carbs));

    this.setState({ carbsIntake: initial });
  };

  render() {
    return (
      <View
        // showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
        style={styles.container}
      >
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
        >
          <View style={styles.totalCircle}>
            <Progress.Circle
              style={{ marginVertical: spacing.small }}
              showsText={true}
              thickness={7}
              size={170}
              borderWidth={4}
              textStyle={{ fontSize: fontSizes.midTitle }}
              progress={
                this.state.intakeCal / (this.state.targetCal || 1) > 1
                  ? 1
                  : this.state.intakeCal / (this.state.targetCal || 1)
              }
              animated={false}
              color="#1177f3"
            />
          </View>

          <Text style={styles.calorieText}>
            {strings.CALORIE_INTAKE_TEXT} : {this.state.intakeCal}{" "}
            {strings.CALS}
          </Text>
          <View style={{ marginTop: spacing.medium_sm }}>
            <Text style={styles.calorieText}>
              {strings.TARGET_TEXT} : {this.state.targetCal} {strings.CALS}
            </Text>
          </View>
          <View style={styles.mainCardsView}>
            <View style={styles.cardView}>
              <Text style={styles.category}>{strings.PROTEIN}</Text>
              <Text style={styles.calsIntake}>
                {this.state.proteinIntake} {strings.CALS}
              </Text>
              <Progress.Circle
                style={{ marginVertical: spacing.small }}
                showsText={true}
                size={70}
                textStyle={{ fontSize: fontSizes.h1 }}
                progress={
                  this.state.proteinIntake / (this.state.intakeCal || 1)
                }
                animated={false}
                color="#c1ff00"
              />
            </View>

            <View style={styles.cardView}>
              <Text style={styles.category}>{strings.CARBS}</Text>
              <Text style={styles.calsIntake}>
                {" "}
                {this.state.carbsIntake} {strings.CALS}
              </Text>
              <Progress.Circle
                style={{ marginVertical: spacing.small }}
                showsText={true}
                size={70}
                textStyle={{ fontSize: fontSizes.h1 }}
                progress={this.state.carbsIntake / (this.state.intakeCal || 1)}
                animated={false}
                color="#ef135f"
              />
            </View>

            <View style={styles.cardView}>
              <Text style={styles.category}>{strings.FATS}</Text>
              <Text style={styles.calsIntake}>
                {" "}
                {this.state.fatsIntake} {strings.CALS}
              </Text>
              <Progress.Circle
                style={{ marginVertical: spacing.small }}
                showsText={true}
                size={70}
                textStyle={{ fontSize: fontSizes.h1 }}
                progress={this.state.fatsIntake / (this.state.intakeCal || 1)}
                animated={false}
                color="#54f0f7"
              />
            </View>
          </View>
          <View style={styles.listView}>
            <View style={styles.eachContainer}>
              <View style={styles.eachCard}>
                <View style={styles.typeView}>
                  <Text style={styles.typeText}>{strings.BREAKFAST}</Text>

                  <Text style={styles.quantityInteger}>
                    {this.state.breakFastTotal} {strings.CALS}
                  </Text>
                </View>
                {this.state.breakFast.map((item, index) => (
                  <View key={item.id} style={styles.foodView}>
                    <Text style={styles.foodText}>{item.item}</Text>
                    <Text style={styles.foodQuantity}>{item.quantity} g</Text>
                    <Text style={styles.foodCal}>{item.total}</Text>
                  </View>
                ))}
                <TouchableOpacity
                  style={{ marginTop: spacing.small_lg }}
                  onPress={() => {
                    this.props.navigation.navigate(RouteNames.Calorie1, {
                      type: "BREAKFAST",
                    });
                  }}
                >
                  <Text style={styles.addFood}>{strings.ADD_ITEM}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.listView}>
            <View style={styles.eachContainer}>
              <View style={styles.eachCard}>
                <View style={styles.typeView}>
                  <Text style={styles.typeText}>{strings.LUNCH}</Text>

                  <Text style={styles.quantityInteger}>
                    {this.state.lunchTotal} {strings.CALS}
                  </Text>
                </View>
                {this.state.lunch.map((item, index) => (
                  <View key={item.id} style={styles.foodView}>
                    <Text style={styles.foodText}>{item.item}</Text>
                    <Text style={styles.foodQuantity}>{item.quantity} g</Text>
                    <Text style={styles.foodCal}>{item.total}</Text>
                  </View>
                ))}
                <TouchableOpacity
                  style={{ marginTop: spacing.small_lg }}
                  onPress={() => {
                    this.props.navigation.navigate(RouteNames.Calorie1, {
                      type: "LUNCH",
                    });
                  }}
                >
                  <Text style={styles.addFood}>{strings.ADD_ITEM}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.listView}>
            <View style={styles.eachContainer}>
              <View style={styles.eachCard}>
                <View style={styles.typeView}>
                  <Text style={styles.typeText}>{strings.SNACKS}</Text>

                  <Text style={styles.quantityInteger}>
                    {this.state.snacksTotal} {strings.CALS}
                  </Text>
                </View>
                {this.state.snacks.map((item, index) => (
                  <View key={item.id} style={styles.foodView}>
                    <Text style={styles.foodText}>{item.item}</Text>
                    <Text style={styles.foodQuantity}>{item.quantity} g</Text>
                    <Text style={styles.foodCal}>{item.total}</Text>
                  </View>
                ))}
                <TouchableOpacity
                  style={{ marginTop: spacing.small_lg }}
                  onPress={() => {
                    this.props.navigation.navigate(RouteNames.Calorie1, {
                      type: "SNACKS",
                    });
                  }}
                >
                  <Text style={styles.addFood}>{strings.ADD_ITEM}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.listView}>
            <View style={styles.eachContainer}>
              <View style={styles.eachCard}>
                <View style={styles.typeView}>
                  <Text style={styles.typeText}>{strings.DINNER}</Text>

                  <Text style={styles.quantityInteger}>
                    {this.state.dinnerTotal} {strings.CALS}
                  </Text>
                </View>
                {this.state.dinner.map((item, index) => (
                  <View key={item.id} style={styles.foodView}>
                    <Text style={styles.foodText}>{item.item}</Text>
                    <Text style={styles.foodQuantity}>{item.quantity} g</Text>
                    <Text style={styles.foodCal}>{item.total}</Text>
                  </View>
                ))}
                <TouchableOpacity
                  style={{ marginTop: spacing.small_lg }}
                  onPress={() => {
                    this.props.navigation.navigate(RouteNames.Calorie1, {
                      type: "DINNER",
                    });
                  }}
                >
                  <Text style={styles.addFood}>{strings.ADD_ITEM}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  calorieData: state.fitness.calorieData[todaysDate],
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CalorieCounter);
const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: appTheme.background,
    flex: 1,
  },
  totalCircle: { margin: 10, flex: 1, alignItems: "center" },
  calorieText: {
    color: appTheme.textPrimary,
    fontSize: fontSizes.h1,
    textAlign: "center",
    fontFamily: fonts.CenturyGothic,
  },
  cardView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: appTheme.darkBackground,
    borderRadius: 10,
    padding: 12,
    flex: 1,
    marginHorizontal: 5,
    elevation:4
  },
  category: {
    textAlign: "center",
    color: appTheme.greyC,
    fontSize: fontSizes.h1,
    marginBottom: 6,
  },
  mainCardsView: {
    flex: 1,
    flexDirection: "row",
    width: screenWidth * 0.95,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 20,
    marginBottom:spacing.small_lg
  },
  calsIntake: {
    textAlign: "center",
    color: appTheme.greyC,
    marginVertical: 6,
  },
  listView: {
    justifyContent: "center",
    marginTop: 5,
    marginLeft: spacing.medium,
    marginRight: spacing.medium,
    marginBottom:spacing.medium_sm
  },
  eachContainer: {
    // backgroundColor: appTheme.darkBackground,
    marginBottom: 3,
  },
  eachCard: {
    elevation: 4,
    width: "99%",
    padding: spacing.medium,
    borderRadius: 4,
    paddingLeft: spacing.large,
    paddingRight: spacing.large,
    margin: 2,
    backgroundColor: appTheme.darkBackground,
  },
  typeView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  typeText: {
    color: appTheme.brightContent,
    fontSize: fontSizes.h1,
    fontFamily: fonts.CenturyGothic,
  },
  quantityInteger: {
    color: appTheme.textPrimary,
    fontSize: fontSizes.h1,
    fontFamily: fonts.MontserratMedium,
  },
  foodView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  foodText: {
    color: appTheme.greyC,
    fontSize: fontSizes.h2,
    fontFamily: fonts.MontserratMedium,
    marginRight: 20,
  },
  foodQuantity: {
    color: appTheme.greyC,
    fontSize: fontSizes.h2,
    fontFamily: fonts.MontserratMedium,
    marginRight: 20,
  },
  foodCal: {
    color: appTheme.greyC,
    fontSize: fontSizes.h2,
    fontFamily: fonts.MontserratMedium,
  },
  addFood: {
    alignSelf: "flex-end",
    color: appTheme.brightContent,
    fontSize: 14,
    fontStyle: "italic",
  },
});
// White = "#ffffff",
// LightGray = "#cccccc",
// Gray = "#323232",
// // Light Theme
// Green = "#50eba9",
// Red = "#E02020",
// Canary = "#FAEB3F",
// // Dark Theme
// Move = "#54f0f7",
// Exercise = "#c1ff00",
// Stand = "#ef135f"
