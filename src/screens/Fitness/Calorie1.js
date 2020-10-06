import React, {PureComponent} from "react";
import {
  ActivityIndicator,
  LayoutAnimation,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  Switch
} from "react-native";
import {connect} from "react-redux";
import cuid from "cuid";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import strings from "../../constants/strings";
import {spacing} from "../../constants/dimension";
import colors, {appTheme, bmiColors} from "../../constants/colors";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import * as actionCreators from "../../store/actions";
import {showError, showSuccess} from "../../utils/notification";
import {getFormattedDate} from "../../utils/utils";
import * as API from "../../API";
import {hitSlop20} from "../../constants/styles";
import RouteNames from "../../navigation/RouteNames";
import { copilot, walkthroughable, CopilotStep } from "react-native-copilot";

const currentDate = getFormattedDate();
const WalkthroughableView = walkthroughable(View);
class Calorie1 extends PureComponent {
  state = {
    food: "",//to get name of food
    type: "",//type tp hold breakfast lunch or dinner
    load: false,//loading indicator
    foods: [],//to hold object of food with fats proteins tec
    fabLoading: false,//loading icon
    recommendationText: false,//if we get recommendation from backend then show this text
    active : false //for qty or gram control of the food item
  };

  async componentDidMount() {
    const type = this.props.route.params.type;//type i.e Breakfast lunh dinner snacks
        //to show copilot walkthrough
        const { copilotScreens, updateScreenCopilots } = this.props;//copilot is for walkthrough updatescreencopilots make that screen true in redux so that it is shown only once
        if (!!!copilotScreens[RouteNames.Calorie1]) {
          this.props.start();
        }
        //copilot functions to track them
        //this.props.copilotEvents.on("stepChange", this.handleStepChange);
        this.props.copilotEvents.on("stop", () => {
          //after finished set copilot as done in redux
          updateScreenCopilots(RouteNames.Calorie1);
        });
    const recommendedFoods = this.props.route.params.recommendedFoods;//we get this from parent as navigation props
    if (recommendedFoods.length > 0) {
      this.setState({foods: recommendedFoods, recommendationText: true});
    }
    this.setState({type});//type   i.e Breakfast lunh dinner snacks for current food ITems
  }


  addFoodData = async () => {//send to redux and database
    this.setState({fabLoading: true});
    let result = await API.updateMealIntake(currentDate, this.state.foods);
    let response = await this.props.addCalorieData(this.state.foods);
    showSuccess("Items added successfully");
    this.setState({fabLoading: false});
    this.props.navigation.goBack();
    this.setState({foods: [], recommendationText: false});
  };
  getCalories = async () => {
    const { active } = this.state
    if (this.state.food === "") {
      showError("Please enter food to be searched.");
      return null;
    }
    Keyboard.dismiss();
    this.setState({load: !this.state.load});
    let result = await API.searchFood(this.state.food, active);

    if (result)
      if (result.foodItem) {
        //we get this data from API edaMam
        //orefats precarbs varible are to get initial values so that we can increase pr decrease by that quantity 
        const newFoodItem = {
          id: result.foodItem._id,
          type: this.state.type,
          measure : active ? "Qty" : "grams",
          item: this.state.food,
          quantity: active ? 1 : 100,//user can increase quantity
          total: result.foodItem.totalEnergy,
          pretotal: result.foodItem.totalEnergy,
          prefats: result.foodItem.fats,
          fats: result.foodItem.fats,
          precarbs: result.foodItem.carbs,
          carbs: result.foodItem.carbs,
          preproteins: result.foodItem.proteins,
          proteins: result.foodItem.proteins,
        };
        
        const foods = [...this.state.foods];
        foods.push(newFoodItem);
        await this.setState({foods, food: ""});
      } else {
        showError("Food with this name does not exist.");
        await this.setState({food: "", load: false});
      }
    else {
      showError("Food with this name does not exist.");
      await this.setState({food: "", load: false});
    }

    this.setState({load: false});
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
        {this.state.fabLoading ? (
          <ActivityIndicator size={28} color={'white'}/>
        ) : (

          <FontAwesome name={"check"} color={"white"} size={28}/>
        )
        }
      </TouchableOpacity>
    );
  };

  deleteItem = (foodId) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const filteredFoods = this.state.foods.filter((food) => food.id !== foodId);
    this.setState({foods: filteredFoods});
  };

  getFood = (foodId) => {
    const filteredFoods = this.state.foods.filter((food) => food.id == foodId);
    if (filteredFoods.length == 0) return null;
    return {...filteredFoods[0]};
  };
  updateFood = (foodId, updatedFood) => {
    let foods = this.state.foods.map((food) =>
      food.id === foodId ? updatedFood : food
    );
    this.setState({foods});
  };
  decreaseQuantity = (foodId) => {
    const food = this.getFood(foodId);
    const { active } = this.state
    food.quantity = active ? food.quantity - 1  : food.quantity - 100;
    food.total -= food.pretotal;
    food.carbs -= food.precarbs;
    food.fats -= food.prefats;
    food.proteins -= food.preproteins;
    this.updateFood(foodId, food);
  };
  increaseQuantity = (foodId) => {
    const food = this.getFood(foodId);
    const { active } = this.state
    food.quantity = active ? food.quantity + 1  : food.quantity + 100;
    food.total += food.pretotal;
    food.carbs += food.precarbs;
    food.fats += food.prefats;
    food.proteins += food.preproteins;
    this.updateFood(foodId, food);
  };
  toggleActive = (value) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({active: value})
  }
  renderSwitch = () => {
    const {active} = this.state;
    return (
      
      <View>
      <CopilotStep
        text="You can search nutritions values of a food item with measures in either grams or
        by specifing quantity. You can change options for measuring by clicking on this switch."
        order={2}
        name="hello2"
      >
        <WalkthroughableView>
          <View style={[styles.row, styles.center]}>
                    <Text style={styles.title}>{active ? "Qty" : "Grams"}</Text>
          <Switch
            trackColor={{false: appTheme.grey, true: bmiColors.blue}}
            thumbColor={this.state.active ? bmiColors.yellow : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={this.toggleActive}
            value={this.state.active}
          />
        </View>
        </WalkthroughableView>
      </CopilotStep>
    </View>
    )
  }
  
  renderQty = (food) => {
    const {active} = this.state;
  //  console.log(food)
    if(active){
      return(
        <View style={styles.quantityView}>
          <Text style={styles.quanityText1}>{strings.QUANTITY}</Text>
            <TouchableOpacity
              style={styles.minus}
              disabled={food.quantity > 1 ? false : true}
              onPress={() => {this.decreaseQuantity(food.id);}}
            >
              <FontAwesome5Icon name="minus" size={20} color="white"/>
            </TouchableOpacity>
            <Text style={styles.quantityAndTotal}>
              {food.quantity} Qty
            </Text>
            <TouchableOpacity
              style={styles.plus}
              onPress={() => {this.increaseQuantity(food.id) }}
             >
              <FontAwesome5Icon name="plus" size={20} color="white"/>
            </TouchableOpacity>
        </View>
      )
    }else{
      return(
        <View style={styles.quantityView}>
          <Text style={styles.quanityText1}>{strings.QUANTITY}</Text>
          <TouchableOpacity
            style={styles.minus}
            disabled={food.quantity > 100 ? false : true}
            onPress={() => {
              this.decreaseQuantity(food.id);
            }}
          >
            <FontAwesome5Icon name="minus" size={20} color="white"/>
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
            <FontAwesome5Icon name="plus" size={20} color="white"/>
          </TouchableOpacity>
        </View>                 
      )
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={{flex: 1}}
        >
          <View style={styles.searchSection}>
            <TextInput
              style={styles.input}
              placeholder="Enter food name"
              autoCapitalize="words"
              onSubmitEditing={this.getCalories}

              onChangeText={(foodname) => {
                this.setState({food: foodname.replace(/\s+/g, ' ').trimStart()});
              }}
              placeholderTextColor={appTheme.darkBackground}
              value={this.state.food}
            />
             {this.renderSwitch()}
            {this.state.load ? (
              <ActivityIndicator
                size="small"
                color="#0000ff"
                style={{marginRight: spacing.small}}
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
            {this.state.recommendationText &&
            <Text style={styles.recommendationText}>Recommended on your diet routine.</Text>}
            {this.state.foods.map((food, index) => (
              <View key={cuid().toString()} style={styles.eachCardOuter}>
                <View style={styles.eachCard}>
                  <View style={styles.nameView}>
                    <Text style={styles.nameText}>{food.item}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        this.deleteItem(food.id);
                      }}
                      hitSlop={hitSlop20}
                    >
                      <FontAwesome
                        name={"trash"}
                        color={colors.rejectRed}
                        size={22}
                      />
                    </TouchableOpacity>
                  </View>
                  {this.renderQty(food)}
                  <View style={styles.categoryView}>
                    <Text style={styles.totalText}>{strings.TOTAL}</Text>

                    <Text style={styles.quantityAndTotal}>
                      {food.total} {strings.CALS}
                    </Text>
                  </View>
                  <View style={styles.categoryView}>
                    <View>
                      <Text style={[styles.categoryText, {color: "#c1ff00"}]}>
                        {strings.PROTEIN}
                      </Text>

                      <Text style={styles.valueText}>
                        {food.proteins} g
                      </Text>
                    </View>
                    <View>
                      <Text style={[styles.categoryText, {color: "#ef135f"}]}>
                        {strings.CARBS}
                      </Text>

                      <Text style={styles.valueText}>
                        {food.carbs} g
                      </Text>
                    </View>
                    <View>
                      <Text style={[styles.categoryText, {color: "#54f0f7"}]}>
                        {strings.FATS}
                      </Text>

                      <Text style={styles.valueText}>
                        {food.fats} g
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </KeyboardAwareScrollView>
        <this.fab/>
      </View>
    )
      ;
  }
}

const mapStateToProps = (state) => ({
  copilotScreens: state.app.copilotScreen,
});

const mapDispatchToProps = (dispatch) => ({
  updateScreenCopilots: (screenName) => dispatch(actionCreators.updateScreenCopilots(screenName)),
  addCalorieData: (foods) => dispatch(actionCreators.addCalorieData(foods)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  copilot({
    verticalOffset: 27,
    overlay: "svg", // or 'view'
    animated: true, // or false
  })(Calorie1)
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: appTheme.background,
  },
  title: {
    color: appTheme.lightBackground,
    fontSize: fontSizes.h2,
    fontFamily: fonts.PoppinsRegular
  },
  row: {
    flexDirection: 'row',
  },
  center: {
    alignItems: 'center'
  },
  searchSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginTop: spacing.medium_sm,
    paddingHorizontal: spacing.small,
    marginHorizontal: spacing.medium_lg,
    borderRadius: spacing.medium_sm,
  },
  searchIcon: {
    padding: spacing.medium_sm,
  },
  input: {
    flex: 1,
    paddingTop: spacing.medium_sm,
    paddingRight: spacing.medium_sm,
    paddingBottom: spacing.medium_sm,
    paddingLeft: 0,
    backgroundColor: "#fff",
    color: appTheme.darkBackground,
    marginLeft: spacing.medium_sm,
  },
  listView: {
    justifyContent: "center",
    marginTop: spacing.medium_lg,
    marginLeft: spacing.medium,
    marginRight: spacing.medium,
  },
  recommendationText: {
    color: appTheme.greyC,
    fontFamily: fonts.CenturyGothic,
    fontSize: fontSizes.h2,
    marginBottom: spacing.medium_sm,
    marginLeft: spacing.small
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
    marginRight: spacing.medium_lg,
  },
  minus: {marginLeft: spacing.medium_lg, justifyContent: "center"},
  plus: {justifyContent: "center"},
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
    marginRight: spacing.medium_lg,
  },
  totalText: {
    color: appTheme.greyC,
    fontSize: fontSizes.h2,
    fontFamily: fonts.MontserratMedium,
    marginRight: spacing.medium_lg,
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
    bottom: spacing.medium_lg,
    right: spacing.medium_lg,
  },
});