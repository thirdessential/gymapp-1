import React, { PureComponent } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
var _ = require("lodash");
import { connect } from "react-redux";
import cuid from "cuid";
import * as Progress from "react-native-progress";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { spacing } from "../../constants/dimension";
import { appTheme, darkPallet } from "../../constants/colors";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import { screenWidth, screenHeight } from "../../utils/screenDimensions";
import strings from "../../constants/strings";
import RouteNames from "../../navigation/RouteNames";
import { getTodayFormattedDate } from "../../utils/utils";
import { foodTypes } from "../../constants/appConstants";
import * as API from "../../API";
const todaysDate = getTodayFormattedDate();

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

      breakfastRecommend: [],
      snacksRecommend: [],
      lunchRecommend: [],
      dinnerRecommend: [],

      breakFastTotal: 0,
      lunchTotal: 0,
      dinnerTotal: 0,
      snacksTotal: 0,
    };
  }

  async componentDidMount() {
    this.willFocusSubscription = this.props.navigation.addListener(
      "focus",
      async () => {
        console.log("focus");
        this.totalCalculations();
        this.recommend();
      }
    );
    this.totalCalculations();
  }

  recommendHelper = (foodsArray, foodType) => {
    return foodsArray.map((food) => ({
      id: food._id,
      item: food.name,
      quantity: food.quantity,
      total: food.totalEnergy,
      pretotal: food.totalEnergy,
      prefats: food.fats,
      fats: food.fats,
      precarbs: food.carbs,
      carbs: food.carbs,
      preproteins: food.proteins,
      proteins: food.proteins,
      type: foodType,
    }));
  };

  recommend = async () => {
    let result = await API.getRecommendation();
    console.log("compo call him");
    if (result) {
      if (result[foodTypes.BREAKFAST].length > 0) {
        breakfastRecommend = this.recommendHelper(
          result[foodTypes.BREAKFAST],
          foodTypes.BREAKFAST
        );
        console.log(breakfastRecommend);
        this.setState({ breakfastRecommend });
      }
      if (result[foodTypes.LUNCH].length > 0) {
        lunchRecommend = this.recommendHelper(
          result[foodTypes.LUNCH],
          foodTypes.LUNCH
        );
        console.log(lunchRecommend);
        this.setState({ lunchRecommend });
      }
      if (result[foodTypes.SNACKS].length > 0) {
        snacksRecommend = this.recommendHelper(
          result[foodTypes.SNACKS],
          foodTypes.SNACKS
        );
        console.log(snacksRecommend);
        this.setState({ snacksRecommend });
      }
      if (result[foodTypes.DINNER].length > 0) {
        dinnerRecommend = this.recommendHelper(
          result[foodTypes.DINNER],
          foodTypes.DINNER
        );
        console.log(dinnerRecommend);
        this.setState({ dinnerRecommend });
      }
    }
  };
  componentWillUnmount() {
    this.willFocusSubscription();
  }

  totalCalculations = async () => {
    const { calorieData } = this.props;
    if (calorieData) {
      await this.setState({ foodItems: calorieData });
      this.calcTotal();
      this.calculateFoodList();
      this.calculateCalories();
    } else {
      return null;
    }
  };

  calculateFoodList = async () => {
    //breakfast
    const breakFastList = await this.state.foodItems.filter(
      (food) => food.type === foodTypes.BREAKFAST
    );
    let breakFastTotal = 0;
    breakFastList.map((item, index) => (breakFastTotal += item.total));

    //lunch
    const lunchList = await this.state.foodItems.filter(
      (food) => food.type === foodTypes.LUNCH
    );
    let lunchTotal = 0;
    lunchList.map((item, index) => (lunchTotal += item.total));

    //snacks
    const snacksList = await this.state.foodItems.filter(
      (food) => food.type === foodTypes.SNACKS
    );
    let snacksTotal = 0;
    snacksList.map((item, index) => (snacksTotal += item.total));

    //dinner
    const dinnerList = await this.state.foodItems.filter(
      (food) => food.type === foodTypes.DINNER
    );
    let dinnerTotal = 0;
    dinnerList.map((item, index) => (dinnerTotal += item.total));

    this.setState({
      breakFastTotal,
      breakFast: breakFastList,
      lunchTotal,
      lunch: lunchList,
      snacksTotal,
      snacks: snacksList,
      dinnerTotal,
      dinner: dinnerList,
    });
  };

  calcTotal = async () => {
    let initial = 0;
    await this.state.foodItems.map((item, index) => (initial += item.total));
    this.setState({ intakeCal: initial });
  };

  calculateCalories = async () => {
    //protein
    let proteinInitial = 0;
    await this.state.foodItems.map(
      (item, index) => (proteinInitial += item.proteins)
    );

    //fats
    let fatsInitial = 0;
    await this.state.foodItems.map((item, index) => (fatsInitial += item.fats));

    //carbs
    let carbsInitial = 0;
    await this.state.foodItems.map(
      (item, index) => (carbsInitial += item.carbs)
    );

    this.setState({
      proteinIntake: proteinInitial,
      fatsIntake: fatsInitial,
      carbsIntake: carbsInitial,
    });
  };

  capitalize = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
      .join(" ");
    //
  };

  infoCards = (type, typeIntake, color) => (
    <View style={styles.cardView}>
      <Text style={styles.category}>{type}</Text>
      <Text style={styles.calsIntake}>
        {typeIntake} {strings.CALS}
      </Text>
      <Progress.Circle
        style={{ marginVertical: spacing.small }}
        showsText={true}
        size={70}
        textStyle={{ fontSize: fontSizes.h1 }}
        progress={typeIntake / (this.state.intakeCal || 1)}
        animated={false}
        color={color}
      />
    </View>
  );

  optionList = (
    foodType,
    typeTotal,
    listType,
    onPressType,
    recommendedFoods
  ) => (
    <View style={styles.listView}>
      <View style={styles.eachCard}>
        <View style={styles.typeView}>
          <Text style={styles.typeText}>{foodType}</Text>

          <Text style={styles.quantityInteger}>
            {typeTotal} {strings.CALS}
          </Text>
        </View>

        {this.renderSeparator()}
        {listType.map((item, index) => (
          <View key={cuid().toString()} style={styles.foodView}>
            <View style={styles.foodnameFlex}>
              <Text style={styles.foodText}>{this.capitalize(item.item)}</Text>
            </View>
            <View style={styles.foodQuantityFlex}>
              <Text style={styles.foodQuantity}>{item.quantity} g</Text>
            </View>
            <View style={styles.foodQuantityFlex}>
              <Text style={styles.foodCal}>
                {item.total} {strings.CALS}
              </Text>
            </View>
          </View>
        ))}
        <TouchableOpacity
          style={{ marginTop: spacing.small_lg }}
          onPress={() => {
            this.props.navigation.navigate(RouteNames.Calorie1, {
              type: onPressType,
              recommendedFoods,
            });
          }}
        >
          <Text style={styles.addFood}>{strings.ADD_ITEM}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  renderSeparator = () => <View style={styles.separator} />;
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
            {this.infoCards(
              strings.PROTEIN,
              this.state.proteinIntake,
              "#c1ff00"
            )}
            {this.infoCards(strings.CARBS, this.state.carbsIntake, "#ef135f")}
            {this.infoCards(strings.FATS, this.state.fatsIntake, "#54f0f7")}
          </View>

          {this.optionList(
            strings.BREAKFAST,
            this.state.breakFastTotal,
            this.state.breakFast,
            foodTypes.BREAKFAST,
            this.state.breakfastRecommend
          )}
          {this.optionList(
            strings.LUNCH,
            this.state.lunchTotal,
            this.state.lunch,
            foodTypes.LUNCH,
            this.state.lunchRecommend
          )}
          {this.optionList(
            strings.SNACKS,
            this.state.snacksTotal,
            this.state.snacks,
            foodTypes.SNACKS,
            this.state.snacksRecommend
          )}
          {this.optionList(
            strings.DINNER,
            this.state.dinnerTotal,
            this.state.dinner,
            foodTypes.DINNER,
            this.state.dinnerRecommend
          )}
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
    elevation: 4,
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
    marginBottom: spacing.small_lg,
  },
  separator: {
    height: 2,
    width: "100%",
    backgroundColor: "#829da8",
    //marginHorizontal: spacing.medium_sm
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
    marginBottom: spacing.medium_sm,
  },
  eachCard: {
    marginBottom: 3,
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
    color: "#00a1ab",
    fontSize: fontSizes.h1,
    fontFamily: fonts.CenturyGothic,
  },
  foodView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  foodnameFlex: { flex: 1.6 },
  foodQuantityFlex: { flex: 1 },
  foodText: {
    color: darkPallet.skyBlue,
    fontSize: 13,
    fontFamily: fonts.MontserratMedium,
  },
  foodQuantity: {
    color: darkPallet.skyBlue,
    fontSize: 13,
    fontFamily: fonts.MontserratMedium,
  },
  foodCal: {
    color: darkPallet.skyBlue,
    fontSize: 13,
    fontFamily: fonts.MontserratMedium,
    textAlign: "right",
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
