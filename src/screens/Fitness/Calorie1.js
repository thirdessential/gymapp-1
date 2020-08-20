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
import strings from "../../constants/strings";
import BmiBar from "../../components/BmiBar";
import { calculateBmi, getBmiVerdict, toTitleCase } from "../../utils/utils";
import Feather from "react-native-vector-icons/Feather";
import CustomLineChart from "../../components/CustomLineChart";
import Avatar from "../../components/Avatar";
import RouteNames from "../../navigation/RouteNames";
import * as actionCreators from "../../store/actions";
import { hitSlop20 } from "../../constants/styles";
import { WEEK_DAYS } from "../../constants/appConstants";
import RBSheet from "react-native-raw-bottom-sheet";
import DatePicker from "react-native-datepicker";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import HcdWaveView from "./HcdWaveView";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

class Calorie1 extends PureComponent {
  state = {
    food: "",
    foodItems: [],
    total: 1,
    showChart: false,
    proteins: 1.8,
    fats: 1,
    carbs: 1.5,
    load: false,
  };

  componentDidMount() {}
  componentWillUnmount() {}
  getCalories = async () => {
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
        ingr: [this.state.food],
      }),
    });
    const resData = await response.json();
    // console.log(resData.totalNutrientsKCal);
    await this.setState({
      total: resData.totalNutrientsKCal.ENERC_KCAL.quantity,
    });
    await this.setState({
      proteins: resData.totalNutrientsKCal.PROCNT_KCAL.quantity,
    });
    await this.setState({ fats: resData.totalNutrientsKCal.FAT_KCAL.quantity });
    await this.setState({
      carbs: resData.totalNutrientsKCal.CHOCDF_KCAL.quantity,
    });

    console.log(this.state);
    await this.setState({ food: "" });
    await this.setState({ showChart: true });
    await this.setState({ load: !this.state.load });
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
          {this.state.showChart&&
            <>
              <ProgressChart
                data={{
                  labels: ["Proteins", "Fats", "Carbs"], // optional
                  data: [
                    this.state.proteins / this.state.total,
                    this.state.fats / this.state.total,
                    this.state.carbs / this.state.total,
                  ],
                }}
                width={screenWidth * 0.9}
                height={220}
                strokeWidth={16}
                radius={32}
                chartConfig={{
                  backgroundGradientFrom: appTheme.background,
                  backgroundGradientFromOpacity: 0,
                  backgroundGradientTo: appTheme.background,
                  backgroundGradientToOpacity: 0.5,
                  color: (opacity = 1) => `rgba(255, 127, 80, ${opacity})`,
                  strokeWidth: 2, // optional, default 3
                  barPercentage: 0.5,
                  labelColor: (opacity = 1) => appTheme.greyC,
                  useShadowColorFromDataset: false, // optional
                }}
                hideLegend={false}
              />
              <Text
                style={{
                  color: appTheme.greyC,
                  fontSize: 18,
                  textAlign: "center",
                }}
              >
                Total : {this.state.total} kcals.
              </Text>
            </>
          }

          <View style={styles.searchSection}>
            <TextInput
              style={styles.input}
              placeholder="Enter food name"
              onChangeText={(food) => {
                this.setState({ food });
              }}
              placeholderTextColor={appTheme.darkBackground}
              value={this.state.food}
              underlineColorAndroid="transparent"
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
                  name="search"
                  size={20}
                  color="#000"
                />
              </TouchableOpacity>
            )}
          </View>
          <View>
            
          </View>
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    // paddingLeft: spacing.medium_lg,
    // paddingRight: spacing.medium_lg,

    backgroundColor: appTheme.background,
  },
  searchSection: {
    flex: 1,
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
  buttonText: {
    fontFamily: fonts.CenturyGothicBold,
    fontSize: fontSizes.h3,
    textAlign: "center",
  },
});

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Calorie1);
