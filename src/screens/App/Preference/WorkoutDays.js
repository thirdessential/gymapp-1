import React, {Component} from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity, ScrollView,
} from "react-native";

import {appTheme} from "../../../constants/colors";
import {spacing} from "../../../constants/dimension";
import fonts from "../../../constants/fonts";
import strings from "../../../constants/strings";
import fontSizes from "../../../constants/fontSizes";
import {iconBackgrounds} from "../../../constants/images";
import {screenHeight, screenWidth} from "../../../utils/screenDimensions";
import {updateExerciseIndex} from "../../../API";
import * as actionCreators from "../../../store/actions";
import {connect} from "react-redux";

class WorkoutDays extends Component {
  state = {
    index: 3,
  };

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('blur', e => {
      this.submit();
    });
    const {exerciseIndex} = this.props;
    this.setState({index: exerciseIndex})
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  submit = () => {
    this.props.updateExerciseIndex(this.state.index);
  }
  data = [
    {
      title: '1 to 2',
      value: 1
    },
    {
      title: '3 to 4',
      value: 3
    },
    {
      title: '5 to 6',
      value: 5
    },
    {
      title: '7 or more',
      value: 7
    },
  ]
  setIndex = index => this.setState({index})
  renderButton = ({title, value}) => {
    const {index} = this.state;
    const active = index === value;
    return (
      <TouchableOpacity activeOpacity={0.7} key={title} onPress={() => this.setIndex(value)} style={styles.options}>
        <Text style={[styles.optionText, active ? styles.active : null]}>{title}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <>
        <ScrollView showsVerticalScrollIndicator={false} enableOnAndroid={true} keyboardShouldPersistTaps={'handled'}
                    style={styles.container}>
          <View style={styles.circle}/>
          <Image source={iconBackgrounds.days} style={styles.image}/>
          <Text style={styles.text}>{strings.DAYS}</Text>
          <View style={styles.itemContainer}>
            <Text style={styles.describe}>{strings.DESCRIBEDAYS}</Text>
            <View style={styles.optionContainer}>
              {
                this.data.map(item => this.renderButton(item))
              }
            </View>
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
    fontWeight: "bold"
  },
  itemContainer: {
    marginTop: 25,
    backgroundColor: "#20222f",
    flex: 1,
    margin: -spacing.medium_sm,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  describe: {
    color: appTheme.brightContent,
    fontFamily: fonts.CenturyGothicBold,
    fontSize: fontSizes.h4,
    marginHorizontal: screenWidth * 0.1,
    marginTop: spacing.space_50,
    textAlign: "center",
  },
  optionContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  options: {
    marginVertical: spacing.medium_sm,
    backgroundColor: appTheme.background,
    width: "60%",
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  optionText: {
    color: "#fff",
    fontFamily: fonts.CenturyGothicBold,
  },
  active: {
    color: appTheme.brightContent
  }
});

const mapStateToProps = (state) => ({
  exerciseIndex: state.fitness.exerciseIndex || 3,
});

const mapDispatchToProps = (dispatch) => ({
  updateExerciseIndex: (index) => dispatch(actionCreators.updateExerciseIndex(index))
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutDays);

