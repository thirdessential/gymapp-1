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

class RecipeRecommend extends PureComponent {
  state = {
    food: "",
    recipes: [],
    load: false,
  };

  componentDidMount() {}
  componentWillUnmount() {}
  getRecipes = async () => {
      Keyboard.dismiss();
    this.setState({ load: !this.state.load });

    const url = `https://api.edamam.com/search?q=${this.state.food}&app_id=e4e8e5c6&app_key=2c3a4d45fb3da291e09c727acdfe22d9`;
    const response = await fetch(url, {
      method: "GET",
    });
    const resData = await response.json();
    //  console.log(resData.hits[0].recipe.label);

    //  console.log(resData.hits[1].recipe.label);
    await this.setState({ recipes: resData.hits });
    await console.log(this.state);
    this.setState({ load: !this.state.load });
  };
  itemSeparator = () => <View style={styles.itemSeparator} />;
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
                  this.getRecipes();
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
          {this.state.recipes.length > 0 ? (
            
              <FlatList
              styles={{marginTop:10,marginHorizontal: 10,paddingHorizontal:5}}
                data={this.state.recipes}
                ItemSeparatorComponent={this.itemSeparator}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={{ margin: 5,marginHorizontal:5,paddingHorizontal:5 }}>
                    <Text
                      style={{
                        fontSize: 16,
                        alignItems: "flex-start",
                        color: appTheme.greyC,
                        fontFamily:fonts.CenturyGothic,
                        flex: 1, flexWrap: 'wrap'
                      }}
                    >
                      {item.recipe.label}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        alignItems: "flex-end",
                        color: appTheme.greyC,
                        flex: 1, flexWrap: 'wrap'
                      }}
                    >
                    Total calories:
                      {Math.round(item.recipe.calories, 0)} 
                    </Text>
                  </View>
                )}
              />
          
          ) : null}
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
    marginTop: 15,
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
  itemSeparator: {
    height: 0.5,
    backgroundColor: appTheme.brightContent,
    width:screenWidth*0.95,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
    
  },
});

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeRecommend);
