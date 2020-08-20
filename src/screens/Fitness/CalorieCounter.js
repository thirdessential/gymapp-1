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
TimeAgo.addLocale(en);
const timeAgo = new TimeAgo("en-US");

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
      food: "",
      foodItems: [],
      total: 1000,
      showChart: false,
      proteins: 0.2,
      fats: 0.6,
      carbs: 0.5,
      load: false,
    };
  }

  componentDidMount() {}
  componentWillUnmount() {}

  renderIcon = () => (
    <FontAwesome5Icon
      style={styles.iconStyle}
      name="plus"
      size={20}
      color="white"
    />
  );

  activityData = [
    {
      label: "Total calories",
      value: 0.6, // ring will use color from theme
      color: "#1177f3",
    },
  ];
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
          <View style={{ margin: 10 }}>
            <ActivityRings
              legend={true}
              data={this.activityData}
              config={{
                width: 170,
                height: 170,
                radius: 62,
                ringSize: 15,
              }}
            />
          </View>

          <Text style={styles.calorieText}>
            {strings.CALORIE_INTAKE_TEXT} : 600 cals.
          </Text>
          <View style={{ marginTop: 10 }}>
            <Text style={styles.calorieText}>
              {strings.TARGET_TEXT} : {this.state.total} cals.
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
                300 cals
              </Text>
              <Progress.Circle
                style={{ marginVertical: 5 }}
                size={30}
                strokeCap="round"
                showsText={true}
                size={50}
                textStyle={{ fontSize: 18 }}
                progress={0.5}
                animated={false}
                color="#c1ff00"
              />
            </View>

            <View style={styles.cardView}>
              <Text style={styles.category}>{strings.CARBS}</Text>
              <Text style={styles.calsIntake}>120 cals</Text>
              <Progress.Circle
                style={{ marginVertical: 5 }}
                size={30}
                showsText={true}
                size={50}
                textStyle={{ fontSize: 18 }}
                progress={0.2}
                animated={false}
                color="#ef135f"
              />
            </View>

            <View style={styles.cardView}>
              <Text style={styles.category}>{strings.FATS}</Text>
              <Text style={styles.calsIntake}>180 cals</Text>
              <Progress.Circle
                style={{ marginVertical: 5 }}
                size={30}
                showsText={true}
                size={50}
                textStyle={{ fontSize: 18 }}
                progress={0.3}
                animated={false}
                color="#54f0f7"
              />
            </View>
          </View>
          <View style={styles.cardMainView}>
            <View style={styles.optionView}>
              <Text style={styles.optionText}>{strings.BREAKFAST}</Text>

              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate(RouteNames.Calorie1);
                }}
              >
                {this.renderIcon()}
              </TouchableOpacity>
            </View>
            <View style={styles.optionView}>
              <Text style={styles.optionText}>{strings.LUNCH}</Text>

              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate(RouteNames.Calorie1);
                }}
              >
                {this.renderIcon()}
              </TouchableOpacity>
            </View>
            <View style={styles.optionView}>
              <Text style={styles.optionText}>{strings.SNACKS}</Text>

              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate(RouteNames.Calorie1);
                }}
              >
                {this.renderIcon()}
              </TouchableOpacity>
            </View>
            <View style={styles.optionView}>
              <Text style={styles.optionText}>{strings.DINNER}</Text>

              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate(RouteNames.Calorie1);
                }}
              >
                {this.renderIcon()}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CalorieCounter);
const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: appTheme.background,
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
    flexDirection: "row",
    width: screenWidth * 0.95,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  calsIntake: {
    textAlign: "center",
    color: appTheme.greyC,
    marginVertical: 6,
  },
});
