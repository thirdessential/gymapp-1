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

class CalorieCounter extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      foodItems: [],

      targetCal: 2000,
      intakeCal: 1,
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
    this.willFocusSubscription = this.props.navigation.addListener(
      'focus',
    async  () => {
       this.functionCalls();
      }
    );
  
    this.functionCalls();
   
  }
functionCalls=async()=>{
  const { calorieData } = this.props;
  console.log(calorieData);
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
    console.log(initial+" prote")
    this.setState({ proteinIntake: initial });
  };
  calcFats = async () => {
    let initial = 0;
    await this.state.foodItems.map((item, index) => (initial += item.fats));
   console.log(initial+" fats")
    this.setState({ fatsIntake: initial });
  };
  calcCarbs = async () => {
    let initial = 0;
    await this.state.foodItems.map((item, index) => (initial += item.carbs));
   console.log(initial+" carbs")
    this.setState({ carbsIntake: initial });
  };
  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }

  renderIcon = () => (
    <FontAwesome5Icon
      style={styles.iconStyle}
      name="plus"
      size={20}
      color="white"
    />
  );

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
          <View style={{ margin: 10, flex: 1, alignItems: "center" }}>
            <Progress.Circle
              style={{ marginVertical: 5 }}
              showsText={true}
              thickness={7}
              size={170}
              borderWidth={4}
              textStyle={{ fontSize: 25 }}
              progress={this.state.intakeCal / (this.state.targetCal || 1)}
              animated={false}
              color="#1177f3"
            />
          </View>

          <Text style={styles.calorieText}>
            {strings.CALORIE_INTAKE_TEXT} : {this.state.intakeCal} cals
          </Text>
          <View style={{ marginTop: 10 }}>
            <Text style={styles.calorieText}>
              {strings.TARGET_TEXT} : {this.state.targetCal} cals
            </Text>
          </View>
          <View style={styles.mainCardsView}>
            <View style={styles.cardView}>
              <Text style={styles.category}>{strings.PROTEIN}</Text>
              <Text
                style={{
                  textAlign: "center",
                  color: appTheme.greyC,
                  marginVertical: 6,
                }}
              >
                {this.state.proteinIntake} cals
              </Text>
              <Progress.Circle
                style={{ marginVertical: 5 }}
                showsText={true}
                size={70}
                textStyle={{ fontSize: 18 }}
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
                {this.state.carbsIntake} cals
              </Text>
              <Progress.Circle
                style={{ marginVertical: 5 }}
                showsText={true}
                size={70}
                textStyle={{ fontSize: 18 }}
                progress={this.state.carbsIntake / (this.state.intakeCal || 1)}
                animated={false}
                color="#ef135f"
              />
            </View>

            <View style={styles.cardView}>
              <Text style={styles.category}>{strings.FATS}</Text>
              <Text style={styles.calsIntake}>
                {" "}
                {this.state.fatsIntake} cals
              </Text>
              <Progress.Circle
                style={{ marginVertical: 5 }}
                showsText={true}
                size={70}
                textStyle={{ fontSize: 18 }}
                progress={this.state.fatsIntake / (this.state.intakeCal || 1)}
                animated={false}
                color="#54f0f7"
              />
            </View>
          </View>

          {/* <View style={styles.cardMainView}>
            <View style={styles.optionView}>
              <Text style={styles.optionText}>{strings.BREAKFAST}</Text>

              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate(RouteNames.Calorie1, {
                    type: "BREAKFAST",
                  });
                }}
              >
                {this.renderIcon()}
              </TouchableOpacity>
            </View>
            <View style={styles.optionView}>
              <Text style={styles.optionText}>{strings.LUNCH}</Text>

              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate(RouteNames.Calorie1, {
                    type: "LUNCH",
                  });
                }}
              >
                {this.renderIcon()}
              </TouchableOpacity>
            </View> */}

          {/* <View style={styles.optionView}>
              <Text style={styles.optionText}>{strings.SNACKS}</Text>

              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate(RouteNames.Calorie1, {
                    type: "SNACKS",
                  });
                }}
              >
                {this.renderIcon()}
              </TouchableOpacity>
            </View> */}

          {/* <View style={styles.optionView}>
            <Text style={styles.optionText}>{strings.DINNER}</Text>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate(RouteNames.Calorie1, {
                  type: "DINNER",
                });
              }}
            >
              {this.renderIcon()}
            </TouchableOpacity>
          </View> */}
          <View style={styles.listView}>
            <View style={styles.eachContainer}>
              <View style={styles.eachCard}>
                <View style={styles.typeView}>
                  <Text style={styles.typeText}>Breakfast</Text>

                  <Text style={styles.quantityInteger}>
                    {this.state.breakFastTotal} cals
                  </Text>
                </View>
                {this.state.breakFast.map((item, index) => (
                  <View key={item.id} style={styles.foodView}>
                    <Text style={styles.foodText}>{item.item}</Text>
                    <Text style={styles.foodQuantity}>{item.quantity} g</Text>
                    <Text style={styles.foodCal}>{item.total}</Text>
                  </View>
                ))}
                <TouchableOpacity style={{ marginTop: 8 }}
                onPress={() => {
                  this.props.navigation.navigate(RouteNames.Calorie1, {
                    type: "BREAKFAST",
                  });
                }}>
                  <Text style={styles.addFood}>Add item</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.listView}>
            <View style={styles.eachContainer}>
              <View style={styles.eachCard}>
                <View style={styles.typeView}>
                  <Text style={styles.typeText}>Lunch</Text>

                  <Text style={styles.quantityInteger}>
                    {this.state.lunchTotal} cals
                  </Text>
                </View>
                {this.state.lunch.map((item, index) => (
                  <View key={item.id} style={styles.foodView}>
                    <Text style={styles.foodText}>{item.item}</Text>
                    <Text style={styles.foodQuantity}>{item.quantity} g</Text>
                    <Text style={styles.foodCal}>{item.total}</Text>
                  </View>
                ))}
                <TouchableOpacity style={{ marginTop: 8 }}
                onPress={() => {
                  this.props.navigation.navigate(RouteNames.Calorie1, {
                    type: "LUNCH",
                  });
                }}>
                  <Text style={styles.addFood}>Add item</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.listView}>
            <View style={styles.eachContainer}>
              <View style={styles.eachCard}>
                <View style={styles.typeView}>
                  <Text style={styles.typeText}>Snacks</Text>

                  <Text style={styles.quantityInteger}>
                    {this.state.snacksTotal}  cals
                  </Text>
                </View>
                {this.state.snacks.map((item, index) => (
                  <View key={item.id} style={styles.foodView}>
                    <Text style={styles.foodText}>{item.item}</Text>
                    <Text style={styles.foodQuantity}>{item.quantity} g</Text>
                    <Text style={styles.foodCal}>{item.total}</Text>
                  </View>
                ))}
                <TouchableOpacity style={{ marginTop: 8 }}
                onPress={() => {
                  this.props.navigation.navigate(RouteNames.Calorie1, {
                    type: "SNACKS",
                  });
                }}>
                  <Text style={styles.addFood}>Add item</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.listView}>
            <View style={styles.eachContainer}>
              <View style={styles.eachCard}>
                <View style={styles.typeView}>
                  <Text style={styles.typeText}>Dinner</Text>

                  <Text style={styles.quantityInteger}>
                    {this.state.dinnerTotal} cals
                  </Text>
                </View>
                {this.state.dinner.map((item, index) => (
                  <View key={item.id} style={styles.foodView}>
                    <Text style={styles.foodText}>{item.item}</Text>
                    <Text style={styles.foodQuantity}>{item.quantity} g</Text>
                    <Text style={styles.foodCal}>{item.total}</Text>
                  </View>
                ))}
                <TouchableOpacity style={{ marginTop: 8 }}
                onPress={() => {
                  this.props.navigation.navigate(RouteNames.Calorie1, {
                    type: "DINNER",
                  });
                }}>
                  <Text style={styles.addFood}>Add item</Text>
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
  calorieData: state.fitness.calorieData,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CalorieCounter);
const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: appTheme.background,
    flex: 1,
  },
  optionView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: appTheme.darkBackground,
    marginTop: 10,
    paddingHorizontal: 5,
    marginHorizontal: 15,
    borderRadius: 10,
  },
  optionText: {
    flex: 1,
    padding: 10,
    fontSize: 18,
    fontFamily: fonts.CenturyGothic,
    color: appTheme.textPrimary,
  },
  iconStyle: {
    padding: 10,
  },
  calorieText: {
    color: appTheme.textPrimary,
    fontSize: 18,
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
  },
  category: {
    textAlign: "center",
    color: appTheme.greyC,
    fontSize: 18,
    marginBottom: 6,
  },
  cardMainView: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "flex-end",
    marginTop: 10,
  },
  mainCardsView: {
    flex: 1,
    flexDirection: "row",
    width: screenWidth * 0.95,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 20,
  },
  calsIntake: {
    textAlign: "center",
    color: appTheme.greyC,
    marginVertical: 6,
  },
  listView: {
    justifyContent: "center",
    marginTop:5,
    marginLeft: spacing.medium,
    marginRight: spacing.medium,
  },
  eachContainer: {
    backgroundColor: appTheme.darkBackground,
    marginBottom: 3,
  },
  eachCard: {
    elevation: 14,
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
