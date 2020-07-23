import React, {Component} from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity, ScrollView, TextInput,
} from "react-native";

import {appTheme, darkPallet} from "../../../constants/colors";
import {spacing} from "../../../constants/dimension";
import fonts from "../../../constants/fonts";
import strings from "../../../constants/strings";
import fontSizes from "../../../constants/fontSizes";
import {iconBackgrounds} from "../../../constants/images";
import {screenHeight, screenWidth} from "../../../utils/screenDimensions";
import {updateExerciseIndex, updateUserInfo} from "../../../API";
import * as actionCreators from "../../../store/actions";
import {connect} from "react-redux";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

class PhysicalData extends Component {
  state = {
    weight: 60,
    height: 160
  };

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('blur', e => {
      this.submit();
    });
    const {weight = 60, height = 160} = this.props.userData;
    this.setState({weight, height});
  }
  setWeight = weight =>this.setState({weight});
  setHeight = height =>this.setState({height});

  componentWillUnmount() {
    this.unsubscribe();
  }

  submit = async () => {
    await updateUserInfo(this.state);
    this.props.updateUserData();
  }

  render() {
    return (
      <>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'} style={styles.container}>
          <View style={styles.circle}/>
          <Image source={iconBackgrounds.physical} style={styles.image}/>
          <Text style={styles.text}>{strings.PHYSICAL_DATA}</Text>
          <View style={styles.itemContainer}>
            <View style={styles.optionContainer}>
              <Text style={styles.text}>{strings.HEIGHT}</Text>
              <TextInput keyboardType={'numeric'} style={styles.textInput} placeholder='Height (cms)'
                         placeholderTextColor={appTheme.brightContent}
                         value={this.state.height.toString()} onChangeText={this.setHeight}/>
            </View>
            <View style={styles.optionContainer}>
              <Text style={styles.text}>{strings.WEIGHT}</Text>
              <TextInput keyboardType={'numeric'} style={styles.textInput} placeholder='Weight (kg)'
                         placeholderTextColor={appTheme.brightContent}
                         value={this.state.weight.toString()} onChangeText={this.setWeight}/>
            </View>
          </View>
        </KeyboardAwareScrollView>
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
    marginBottom:spacing.medium_sm
  },
  itemContainer: {
    marginTop: 25,
    backgroundColor: appTheme.darkBackground,
    flex: 1,
    margin: -spacing.medium_sm,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    justifyContent: 'center',
    height:screenHeight/2
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
  textInput: {
    backgroundColor: appTheme.background,
    color: darkPallet.hotOrange,
    fontSize: fontSizes.h1,
    fontFamily: fonts.CenturyGothicBold,
    borderRadius: 25,
    width: 250,
    textAlign: 'center',
    marginBottom: 20
  },
});

const mapStateToProps = (state) => ({
  userData: state.user.userData
});

const mapDispatchToProps = (dispatch) => ({
  updateUserData: () => dispatch(actionCreators.updateUserData())
});

export default connect(mapStateToProps, mapDispatchToProps)(PhysicalData);

