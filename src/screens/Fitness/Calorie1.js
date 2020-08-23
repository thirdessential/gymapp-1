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
import cuid from "cuid";
import { Bar } from "react-native-progress";
import { spacing } from "../../constants/dimension";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo("en-US");

import colors, {
  appTheme,
  bmiColors,
  darkPallet,
} from "../../constants/colors";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import { screenWidth } from "../../utils/screenDimensions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import strings from "../../constants/strings";
import Feather from "react-native-vector-icons/Feather";
import * as actionCreators from "../../store/actions";
import { hitSlop20 } from "../../constants/styles";
import { WEEK_DAYS } from "../../constants/appConstants";
import DatePicker from "react-native-datepicker";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import { showError, showSuccess } from "../../utils/notification";
import { TabRouter } from "@react-navigation/native";
class Calorie1 extends PureComponent {
  state = {
    food: "",
    type: "",
    load: false,
    foods: [
      // {
      //   item: "egg",
      //   quantity: 100,
      //   carbs: 3,
      //   precarbs: 3,
      //   fats: 88,
      //   prefats: 88,
      //   proteins: 52,
      //   preproteins: 52,
      //   id: cuid(),
      //   total: 143,
      //   pretotal: 143,
      //   type: "BREAKFAST",
      // },
      // {
      //   carbs: 19,
      //   fats: 29,
      //   id: cuid(),
      //   item: "milk",
      //   proteins: 13,
      //   quantity: 400,
      //   total: 244,
      //   pretotal: 61,
      //   type: "LUNCH",
      // },
      // {
      //   carbs: 195,
      //   fats: 29,
      //   id: cuid(),
      //   item: "bread",
      //   proteins: 43,
      //   quantity: 400,
      //   total: 1068,
      //   pretotal: 267,
      //   type: "SNACKS",
      // },
      // {
      //   carbs: 195,
      //   fats: 29,
      //   id: cuid(),
      //   item: "bread",
      //   proteins: 43,
      //   quantity: 100,
      //   total: 267,
      //   pretotal: 267,
      //   type: "BREAKFAST",
      // },
    ],
  };
  componentDidMount() {
    const type = this.props.route.params.type;
    this.setState({ type });
  }
  addFoodData = async () => {
    let result = await this.props.addCalorieData(this.state.foods);
    console.log(result);
    showSuccess("Items added successfully");
    this.props.navigation.goBack();
  };
  getCalories = async () => {
    if (this.state.food === "") {
      showError("Please enter food to be searched.");
      return null;
    }
    Keyboard.dismiss();
    this.setState({ load: !this.state.load });
    const url =
      "https://api.edamam.com/api/nutrition-details?app_id=3794d72a&app_key=97878e1f8b135ae65328bd7fbbcc0453";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "morning breakfast",
        ingr: [`100 gram of ${this.state.food}`],
      }),
    });
    const resData = await response.json();
    if (resData.totalNutrientsKCal) {
      const foodItem = {
        id: cuid(),
        type: this.state.type,
        item: this.state.food,
        quantity: 100,
        total: resData.totalNutrientsKCal.ENERC_KCAL.quantity,
        pretotal: resData.totalNutrientsKCal.ENERC_KCAL.quantity,
        prefats: resData.totalNutrientsKCal.FAT_KCAL.quantity,
        fats: resData.totalNutrientsKCal.FAT_KCAL.quantity,
        precarbs: resData.totalNutrientsKCal.CHOCDF_KCAL.quantity,
        carbs: resData.totalNutrientsKCal.CHOCDF_KCAL.quantity,
        preproteins: resData.totalNutrientsKCal.PROCNT_KCAL.quantity,
        proteins: resData.totalNutrientsKCal.PROCNT_KCAL.quantity,
      };
      const foods = [...this.state.foods];
      foods.push(foodItem);
      this.setState({ foods });
      await this.setState({ food: "" });
      await this.setState({ load: !this.state.load });
    } else {
      showError("Unable to find food.");
      await this.setState({ food: "" });
      await this.setState({ load: !this.state.load });
    }
  };
  fab = () => {
    if (this.state.foods.length === 0) return null;
    return (
      <TouchableOpacity
        style={[styles.fab, styles.fabPosition]}
        onPress={() => {
          this.addFoodData();
        }}
      >
        {/* {
          this.state.submitPending && (
            <ActivityIndicator size={28} color={'white'}/>
          )
        } */}
        {
          //!this.state.submitPending &&
          <FontAwesome name={"check"} color={"white"} size={22} />
        }
      </TouchableOpacity>
    );
  };

  deleteItem = (foodId) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const filteredFoods = this.state.foods.filter((food) => food.id !== foodId);
    this.setState({ foods: filteredFoods });
  };

  getFood = (foodId) => {
    const filteredFoods = this.state.foods.filter((food) => food.id == foodId);
    if (filteredFoods.length == 0) return null;
    return { ...filteredFoods[0] };
  };
  updateFood = (foodId, updatedFood) => {
    let foods = this.state.foods.map((food) =>
      food.id === foodId ? updatedFood : food
    );
    this.setState({ foods });
  };
  decreaseQuantity = (foodId) => {
    const food = this.getFood(foodId);

    food.quantity = food.quantity - 100;
    food.total -= food.pretotal;
    food.carbs-=food.precarbs
    food.fats-=food.prefats
    food.proteins-=food.preproteins
    this.updateFood(foodId, food);
  };
  increaseQuantity = (foodId) => {
    const food = this.getFood(foodId);

    food.quantity = food.quantity + 100;
    food.total += food.pretotal;
    food.carbs+=food.precarbs
    food.fats+=food.prefats
    food.proteins+=food.preproteins
    this.updateFood(foodId, food);
  };

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
        >
          <View style={styles.searchSection}>
            <TextInput
              style={styles.input}
              placeholder="Enter food name"
              autoCapitalize="words"
              onChangeText={(food) => {
                this.setState({ food });
              }}
              placeholderTextColor={appTheme.darkBackground}
              value={this.state.food}
            />
            {this.state.load ? (
              <ActivityIndicator
                size="small"
                color="#0000ff"
                style={{ marginRight: 5 }}
              />
            ) : (
              <TouchableOpacity
                onPress={() => {
                  this.getCalories();
                }}
              >
                <FontAwesome5Icon
                  style={styles.searchIcon}
                  name="plus"
                  size={20}
                  color="#000"
                />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.listView}>
            {this.state.foods.map((food, index) => (
              <View key={food.id} style={styles.eachCardOuter}>
                <View style={styles.eachCard}>
                  <View style={styles.nameView}>
                    <Text style={styles.nameText}>{food.item}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        this.deleteItem(food.id);
                      }}
                      hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                    >
                      <FontAwesome
                        name={"trash"}
                        color={colors.rejectRed}
                        size={22}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.quantityView}>
                    <Text style={styles.quanityText1}>Quantity</Text>
                    <TouchableOpacity
                      style={styles.minus}
                      disabled={food.quantity > 100 ? false : true}
                      onPress={() => {
                        this.decreaseQuantity(food.id);
                      }}
                    >
                      <FontAwesome5Icon name="minus" size={20} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.quantityAndTotal}>
                      {food.quantity} grams
                    </Text>
                    <TouchableOpacity
                      style={styles.plus}
                      onPress={() => {
                        this.increaseQuantity(food.id);
                      }}
                    >
                      <FontAwesome5Icon name="plus" size={20} color="white" />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.categoryView}>
                    <Text style={styles.totalText}>Total</Text>

                    <Text style={styles.quantityAndTotal}>
                      {food.total} {strings.CALS}
                    </Text>
                  </View>
                  <View style={styles.categoryView}>
                    <View>
                      <Text style={[styles.categoryText, { color: "#c1ff00" }]}>
                        {strings.PROTEIN}
                      </Text>

                      <Text style={styles.valueText}>
                        {food.proteins} {strings.CALS}
                      </Text>
                    </View>
                    <View>
                      <Text style={[styles.categoryText, { color: "#ef135f" }]}>
                        {strings.CARBS}
                      </Text>

                      <Text style={styles.valueText}>
                        {food.carbs} {strings.CALS}
                      </Text>
                    </View>
                    <View>
                      <Text style={[styles.categoryText, { color: "#54f0f7" }]}>
                        {strings.FATS}
                      </Text>

                      <Text style={styles.valueText}>
                        {food.fats} {strings.CALS}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </KeyboardAwareScrollView>
        <this.fab />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  addCalorieData: (foods) => dispatch(actionCreators.addCalorieData(foods)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Calorie1);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    // paddingLeft: spacing.medium_lg,
    // paddingRight: spacing.medium_lg,

    backgroundColor: appTheme.background,
  },
  searchSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginTop: 10,
    paddingHorizontal: 5,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: "#fff",
    color: appTheme.darkBackground,
    marginLeft: 10,
  },
  listView: {
    justifyContent: "center",
    marginTop: spacing.medium_lg,
    marginLeft: spacing.medium,
    marginRight: spacing.medium,
  },
  eachCardOuter: {
    backgroundColor: appTheme.darkBackground,
    marginBottom: spacing.medium_lg,
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
  nameView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nameText: {
    color: appTheme.brightContent,
    fontSize: fontSizes.h1,
    fontFamily: fonts.MontserratMedium,
  },
  quantityView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  quanityText1: {
    color: appTheme.greyC,
    fontSize: fontSizes.h2,
    fontFamily: fonts.MontserratMedium,
    marginRight: 20,
  },
  minus: { marginLeft: 20, justifyContent: "center" },
  plus: { justifyContent: "center" },
  quantityAndTotal: {
    fontSize: 16,
    fontFamily: fonts.CenturyGothic,
    color: appTheme.textPrimary,
  },
  categoryView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  categoryText: {
    fontSize: fontSizes.h2,
    fontFamily: fonts.MontserratMedium,
    marginRight: 20,
  },
  totalText: {
    color: appTheme.greyC,
    fontSize: fontSizes.h2,
    fontFamily: fonts.MontserratMedium,
    marginRight: 20,
  },
  valueText: {
    fontSize: fontSizes.h2,
    fontFamily: fonts.CenturyGothic,
    color: appTheme.textPrimary,
  },
  fab: {
    height: spacing.space_50,
    width: spacing.space_50,
    borderRadius: spacing.thumbnailMini / 2,
    elevation: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.acceptGreen,
  },
  fabPosition: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});

//     await this.setState({
//       total: resData.totalNutrientsKCal.ENERC_KCAL.quantity,
//     });
//     await this.setState({
//       proteins: resData.totalNutrientsKCal.PROCNT_KCAL.quantity,
//     });
//     await this.setState({ fats: resData.totalNutrientsKCal.FAT_KCAL.quantity });
//     await this.setState({
//       carbs: resData.totalNutrientsKCal.CHOCDF_KCAL.quantity,
//     });
//
//     await this.setState({ food: "" });
//     await this.setState({ showDetails: true });
//     await this.setState({ load: !this.state.load });
//   };
//   showNotification=async()=>{
//     showSuccess("Food added successfully.");
// await this.setState({ showDetails: false,quantity:1 });
// {this.state.showDetails && (
//   <View>
//     <View
//       style={{
//         flexDirection: "row",
//         flex: 1,
//         backgroundColor: appTheme.darkBackground,
//         alignItems: "center",
//         paddingHorizontal: 15,
//         paddingVertical: 10,
//         marginHorizontal: 20,
//         marginTop: 10,
//         borderRadius: 10,
//       }}
//     >
//       <TouchableOpacity style={{ flex: 1 }} disabled={this.state.quantity>1?false:true} onPress={()=>this.setState({quantity:this.state.quantity-1})}>
//         <FontAwesome5Icon
//           style={styles.iconStyle}
//           name="minus"
//           size={20}
//           color="white"
//         />
//       </TouchableOpacity>
//       <Text
//         style={{
//           fontSize: 16,
//           fontFamily: fonts.CenturyGothic,
//           color: appTheme.textPrimary,
//           flex: 2,
//         }}
//       >
//         Quantity {this.state.quantity*100} grams
//       </Text>
//       <TouchableOpacity style={{ flex: 1 }} onPress={()=>this.setState({quantity:this.state.quantity+1})} >
//         <FontAwesome5Icon
//           style={styles.iconStyle}
//           name="plus"
//           size={20}
//           color="white"
//         />
//       </TouchableOpacity>
//       <Button
//         title="ADD"
//         onPress={()=>this.showNotification()}
//         style={{ justifyContent: "flex-end", borderRadius: 20 }}
//         color={appTheme.brightContent}
//       />
//     </View>
//     <View
//       style={{
//         flex: 1,
//         backgroundColor: appTheme.darkBackground,
//         width: "90%",
//         //marginTop: 10,
//         paddingHorizontal: 15,
//         paddingVertical: 10,
//         margin: 20,
//         marginTop: 10,
//         borderRadius: 10,
//       }}
//     >
//       <View
//         style={{
//           flexDirection: "row",
//           justifyContent: "space-between",
//           marginVertical: 10,
//         }}
//       >
//         <Text
//           style={{
//             color: appTheme.greyC,
//             fontSize: 18,
//             fontFamily: fonts.CenturyGothic,
//           }}
//         >
//           Total: {this.state.total * this.state.quantity} kcal
//         </Text>

//         <Text
//           style={{
//             color: appTheme.greyC,
//             fontSize: 18,
//             fontFamily: fonts.CenturyGothic,
//           }}
//         >
//           Carbs: {this.state.carbs * this.state.quantity} kcal
//         </Text>
//       </View>
//       <View
//         style={{
//           flexDirection: "row",
//           justifyContent: "space-between",
//         }}
//       >
//         <Text
//           style={{
//             color: appTheme.greyC,
//             fontSize: 18,
//             fontFamily: fonts.CenturyGothic,
//           }}
//         >
//           Fats: {this.state.fats * this.state.quantity} kcal
//         </Text>
//         <Text
//           style={{
//             color: appTheme.greyC,
//             fontSize: 18,
//             fontFamily: fonts.CenturyGothic,
//           }}
//         >
//           Protein: {this.state.proteins * this.state.quantity} kcal
//         </Text>
//       </View>
//     </View>
//   </View>
// )}
