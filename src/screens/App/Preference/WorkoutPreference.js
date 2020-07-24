import React, {Component} from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList, TouchableOpacity,
} from "react-native";

import {appTheme} from "../../../constants/colors";
import {spacing} from "../../../constants/dimension";
import fonts from "../../../constants/fonts";
import strings from "../../../constants/strings";
import fontSizes from "../../../constants/fontSizes";
import {CheckBox} from "react-native-elements";
import {iconBackgrounds} from "../../../constants/images";
import {screenHeight, screenWidth} from "../../../utils/screenDimensions";
import * as actionCreators from "../../../store/actions";
import {connect} from "react-redux";

class WorkoutPreference extends Component {
  state = {
    data: [
      {id: 0, text: "Fat Loss", checked: false},
      {id: 1, text: "Weight Loss", checked: false},
      {id: 2, text: "Weight Gain", checked: false},
      {id: 3, text: "Muscle Gain", checked: false},
      {id: 4, text: "Body mass Gain", checked: false},
      {id: 5, text: "Lean Body Mass", checked: false},
      {id: 6, text: "Power Lifting", checked: false},
      {id: 7, text: "Strength Gain", checked: false},
    ],
  };

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('blur', e => {
      this.submit();
    });
    this.updateLocalState();
  }

  updateLocalState = () => {
    const {preferences} = this.props;
    let data = [...this.state.data];
    preferences.map(preference => {
      data = data.map(dataPoint => {
        if (dataPoint.text === preference) {
          dataPoint.checked = true;
        }
        return dataPoint;
      })
    });
    this.setState({data});
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  submit = () => {
    const {data} = this.state;
    const preferences = [];
    data.map(preference => {
      if (preference.checked) preferences.push(preference.text);
    });
    this.props.updatePreferences(preferences);
  }
  checked = (id, condition) => {
    condition
      ? (this.state.data[id].checked = false)
      : (this.state.data[id].checked = true);

    this.setState({data: this.state.data});
  };
  renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => this.checked(item.id, item.checked)}
      activeOpacity={0.7}
      style={styles.listScroll}>
      <View style={styles.options}>
        <View style={styles.item}>
          <View style={styles.textList}>
            <Text style={styles.optionText}>{item.text}</Text>
          </View>
          <View style={styles.checkboxView}>
            <CheckBox
              style={styles.checkBox}
              checked={item.checked}
              disabled={true}
              checkedColor="#FF7F50"
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  render() {
    return (
      <>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
          <View style={styles.circle}/>
          <Image source={iconBackgrounds.preference} style={styles.image}/>
          <Text style={styles.text}>{strings.PREFERENCES}</Text>
          <View style={styles.itemContainer}>
            <FlatList
              data={this.state.data}
              keyExtractor={(item) => item.id}
              renderItem={this.renderItem}
            />
          </View>
        </ScrollView>
        <View style={{paddingTop: spacing.medium_sm, marginBottom: spacing.space_50}}/>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: appTheme.background,
    flex: 1,
  },
  circle: {
    height: screenHeight * 0.2,
    width: screenHeight * 0.2,
    marginTop: -screenHeight * 0.1,
    marginLeft: -screenHeight * 0.1,
    borderRadius: screenHeight * 0.2,
    backgroundColor: appTheme.brightContent,
  },
  image: {
    height: 184,
    width: 217,
    marginLeft: "20%",
    marginRight: "30%",
    marginTop: -screenHeight * 0.05,
  },
  text: {
    fontFamily: fonts.CenturyGothicBold,
    color: "#fff",
    fontSize: fontSizes.h1,
    marginHorizontal: screenWidth * 0.1,
    textAlign: "center",
    fontWeight: "bold",
  },
  itemContainer: {
    marginTop: 25,
    backgroundColor: appTheme.darkBackground,
    flex: 1,
    margin: -spacing.medium_sm,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingTop: 30,
  },
  options: {
    marginVertical: 10,
    backgroundColor: appTheme.background,
    width: "80%",
    height: 60,
    borderRadius: 50,
    flexDirection: "row",
  },
  optionText: {
    color: "#fff",
    fontSize: fontSizes.h1,
    fontFamily: fonts.CenturyGothic,
    marginLeft: 30,
  },
  listScroll: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    flexDirection: "row",
    flex: 1,
  },
  textList: {flex: 8, justifyContent: "center"},
  checkboxView: {flex: 2, justifyContent: "center"},
});

const mapStateToProps = (state) => ({
  preferences: state.fitness.preferences ||[],
});

const mapDispatchToProps = (dispatch) => ({
  updatePreferences: (preferences) => dispatch(actionCreators.updatePreferences(preferences))
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutPreference);
