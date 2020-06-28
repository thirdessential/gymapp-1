/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {Component} from 'react';
import {View, StyleSheet, TextInput, Text, TouchableOpacity, StatusBar} from 'react-native'
import {connect} from "react-redux";

import {spacing} from "../../constants/dimension";
import * as actionCreators from "../../store/actions";
import colors, {appTheme} from "../../constants/colors";
import strings from "../../constants/strings";
import fonts from "../../constants/fonts";
import fontSizes from "../../constants/fontSizes";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ion from "react-native-vector-icons/Ionicons";

class Packages extends Component {

  state = {
    title: 'Sample Title',
    price: '',
    description: '',
    sessionCount: '',
    sessionsPerWeek: '',
    duration: '0'
  }

  onTitleChange = (title) => this.setState({title});

  setDuration = (sessionCount, sessionsPerWeek) => {
    if (parseInt(sessionsPerWeek) && parseInt(sessionCount)) {
      let duration = Math.floor(sessionCount / sessionsPerWeek);
      this.setState({duration: duration.toString()});
    }
  }
  sessionCountChange = (sessionCount) => {
    const {sessionsPerWeek} = this.state;
    this.setDuration(sessionCount, sessionsPerWeek);
    this.setState({sessionCount});
  }
  sessionsPerWeekChange = (sessionsPerWeek) => {
    let {sessionCount} = this.state;
    this.setDuration(sessionCount, sessionsPerWeek);
    this.setState({sessionsPerWeek});
  }
  priceChange = (price) => {
    this.setState({price:price.replace(/\D+/g, '')});
  }
  descriptionChange = (description) => this.setState({description});

  deletePackage = ()=>{
    this.props.navigation.goBack()

  }
  savePackage = ()=>{
    this.props.navigation.goBack()

  }
  cancelEdit= ()=>{
    this.props.navigation.goBack()
  }

  render() {
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <StatusBar backgroundColor={appTheme.darkBackground} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Title</Text>
          <TextInput
            style={styles.titleTextInput}
            onChangeText={this.onTitleChange}
            value={this.state.title}
          />
        </View>
        <View style={styles.content}>
          <View style={styles.inputRow}>
            <Text style={styles.title}>Sessions</Text>
            <TextInput
              keyboardType={'numeric'}
              style={styles.contentInput}
              onChangeText={this.sessionCountChange}
              value={this.state.sessionCount}
            />
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.title}>Sessions/Week</Text>
            <TextInput
              keyboardType={'numeric'}
              style={styles.contentInput}
              onChangeText={this.sessionsPerWeekChange}
              value={this.state.sessionsPerWeek}
            />
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.title}>{strings.DURATION}</Text>
            <Text style={styles.greyText}>{this.state.duration} {strings.WEEKS}</Text>
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.title}>{strings.DESCRIPTION}</Text>
            <TextInput
              multiline={true}
              style={styles.contentInput}
              numberOfLines={4}
              placeholder={strings.PLAN_DESCRIPTION}
              placeholderTextColor={appTheme.grey}
              onChangeText={this.descriptionChange}
              value={this.state.description}
            />
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.title}>Price</Text>
            <TextInput
              keyboardType={'numeric'}
              style={styles.contentInput}
              onChangeText={this.priceChange}
              value={strings.RUPEE + ' ' + this.state.price}
            />
          </View>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.buttonContainer} onPress={this.cancelEdit}>
            <Ion
              name={'ios-arrow-back'}
              color={colors.appBlue}
              size={22}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} onPress={this.deletePackage}>
            <FontAwesome
              name={'trash'}
              color={colors.rejectRed}
              size={22}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} onPress={this.savePackage}>
            <FontAwesome
              name={'check'}
              color={colors.acceptGreen}
              size={22}
            />
          </TouchableOpacity>


        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appTheme.background,
  },
  titleContainer: {
    flex:1,
    paddingTop: spacing.thumbnailMini,
    paddingLeft: spacing.large,
    paddingRight: spacing.large,
    paddingBottom: spacing.small,
    backgroundColor: appTheme.darkBackground,
  },
  title: {
    color: 'white',
    fontSize: fontSizes.h2,
    fontFamily: fonts.PoppinsRegular
  },
  greyText: {
    color: 'grey',
    marginLeft: spacing.small,
    fontSize: fontSizes.h2,
    fontFamily: fonts.PoppinsRegular
  },
  titleTextInput: {
    color: 'white',
    fontSize: fontSizes.h0,
    fontFamily: fonts.PoppinsRegular,
    paddingLeft: 0
  },
  content: {
    flex: 1,
    paddingLeft: spacing.large,
    paddingRight: spacing.large,

  },
  contentInput: {
    backgroundColor: appTheme.darkBackground,
    borderRadius: 10,
    padding: spacing.small,
    paddingLeft: spacing.medium_lg,
    color: 'white',
    fontSize: fontSizes.h2,
    fontFamily: fonts.PoppinsRegular,
    textAlignVertical: "top"
  },
  inputRow: {
    marginTop: spacing.medium_lg,
  },
  buttonRow:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-around',
    marginTop: spacing.medium_lg,
    paddingLeft: spacing.large,
    paddingRight: spacing.large,
    paddingBottom: spacing.small,
    marginBottom:spacing.large_lg
  },
  buttonContainer:{
    height:60,
    width:60,
    borderRadius: 60,
    backgroundColor: appTheme.darkBackground,
    alignItems:'center',
    justifyContent: 'center'

  }
});

const mapStateToProps = (state) => ({
  users: state.app.users
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Packages);

