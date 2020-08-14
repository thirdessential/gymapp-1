/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {PureComponent} from "react";
import {
  View,
  StyleSheet, Image, Text, TextInput, KeyboardAvoidingView, TouchableOpacity, LayoutAnimation,
} from "react-native";
import {connect} from "react-redux";
import DateTimePicker from '@react-native-community/datetimepicker';

import {appTheme, bmiColors} from "../../constants/colors";
import * as actionCreators from "../../store/actions";
import {spacing} from "../../constants/dimension";
import {iconBackgrounds} from "../../constants/images";
import strings from "../../constants/strings";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {formattedDayDate, formattedMilitaryRange, roundTimeQuarterHour} from "../../utils/utils";
import {Menu, MenuOption, MenuOptions, MenuTrigger} from "react-native-popup-menu";

class LiveScheduler extends PureComponent {

  state = {
    title: '',
    date: Date.now(),
    time: roundTimeQuarterHour(Date.now()),
    duration: '60',
    instantLive: false,
    pickerVisible: false,
    pickerMode: 'date',
    today: Date.now(),
    futureDate: new Date().setDate(new Date().getDate() + 10)
  }
  isInputValid = () => {
    const {title, date, time, duration} = this.state;
    return title.length >= 3;
  }
  toggleInstantLive = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({instantLive: !this.state.instantLive});
  }

  onTitleChange = title => this.setState({title});
  onDatePress = () => {
    this.showMode('date');
  }
  onDateChange = (result) => {
    const {timestamp} = result.nativeEvent;
    if (!timestamp) return;
    if (this.state.pickerMode === 'date') {
      this.setState({date: timestamp, pickerVisible: false})
    } else {
      this.setState({time: timestamp, pickerVisible: false});
    }
  }
  onTimePress = () => {
    this.showMode('time');
  }
  setDuration = (duration) => this.setState({duration})

  showMode = (pickerMode) => {
    this.setState({pickerVisible: true, pickerMode});
  };


  render() {
    const inputsValid = this.isInputValid();
    return (
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.centerAlign}
                               style={styles.container}>
        <Image style={styles.image} resizeMode={'contain'} source={iconBackgrounds.physical}/>
        <Text style={styles.title}>{strings.GO_LIVE}</Text>
        <Text style={styles.subtitle}>{strings.STREAM_INFO}</Text>

        <TextInput
          style={styles.titleInput}
          placeholder={strings.TITLE}
          placeholderTextColor={appTheme.greyC}
          value={this.state.title}
          onChangeText={this.onTitleChange}
        />

        <TouchableOpacity activeOpacity={0.8} onPress={this.toggleInstantLive} style={styles.row}>
          <View style={styles.iconButton}>
            <FontAwesome5Icon name={'check'} color={this.state.instantLive ? bmiColors.yellow : appTheme.grey}
                              size={20}/>
          </View>
          <Text style={styles.infoText}>{strings.GO_LIVE_NOW}</Text>
        </TouchableOpacity>
        {
          !this.state.instantLive && (
            <>
              <TouchableOpacity onPress={this.onDatePress} activeOpacity={0.8} style={styles.row}>
                <View style={styles.iconButton}>
                  <FontAwesome5Icon name={'calendar-alt'} color={appTheme.brightContent} size={20}/>
                </View>
                <Text style={styles.infoText}>{formattedDayDate(this.state.date)}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onTimePress} activeOpacity={0.8} style={styles.row}>
                <View style={styles.iconButton}>
                  <FontAwesome5Icon name={'clock'} color={bmiColors.blue} size={20}/>
                </View>
                <Text style={styles.infoText}>{formattedMilitaryRange(this.state.time, this.state.duration)}</Text>
              </TouchableOpacity>
            </>
          )
        }

        <Menu style={styles.menuContainer}>
          <MenuTrigger >
            <View style={[styles.row,{marginTop:0}]}>
              <View style={styles.iconButton}>
                <FontAwesome5Icon name={'hourglass-half'} color={bmiColors.lightBlue} size={20}/>
              </View>
              <Text style={styles.infoText}>{this.state.duration} {strings.MINUTES}</Text>
            </View>
          </MenuTrigger>
          <MenuOptions customStyles={styles.menu}>
            <MenuOption style={styles.menuButton} onSelect={()=>this.setDuration('30')}>
              <Text style={styles.menuText}>30 {strings.MINUTES}</Text>
            </MenuOption>
            <MenuOption style={styles.menuButton} onSelect={()=>this.setDuration('45')}>
              <Text style={styles.menuText}>45 {strings.MINUTES}</Text>
            </MenuOption>
            <MenuOption style={styles.menuButton} onSelect={()=>this.setDuration('60')}>
              <Text style={styles.menuText}>60 {strings.MINUTES}</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>

        <TouchableOpacity disabled={!inputsValid} activeOpacity={0.7}
                          style={[styles.submitButton, {backgroundColor: inputsValid ? bmiColors.red : bmiColors.redFaded}]}>
          <Text style={styles.submitText}>{this.state.instantLive ? strings.GO_LIVE : strings.SCHEDULE}</Text>
        </TouchableOpacity>
        {this.state.pickerVisible && (
          <DateTimePicker
            value={this.state.date}
            mode={this.state.pickerMode}
            is24Hour={false}
            display="default"
            onChange={this.onDateChange}
            minimumDate={this.state.today}
            maximumDate={this.state.futureDate}
          />
        )}
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // width: "100%",
    padding: spacing.large_lg,
    paddingTop: spacing.small,
    backgroundColor: appTheme.background,
    flex: 1,
  },
  centerAlign: {
    alignItems: 'center'
  },
  image: {
    height: 200,
  },
  title: {
    fontSize: fontSizes.h0,
    color: appTheme.textPrimary,
    fontFamily: fonts.CenturyGothicBold
  },
  subtitle: {
    marginVertical: spacing.medium_sm,
    fontSize: fontSizes.h2,
    color: appTheme.textPrimary,
    fontFamily: fonts.CenturyGothic
  },
  titleInput: {
    marginVertical: spacing.medium_sm,
    backgroundColor: appTheme.lightBackground,
    borderRadius: 14,
    width: '100%',
    color: appTheme.textPrimary,
    paddingHorizontal: spacing.large,
    fontFamily: fonts.CenturyGothic
  },
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    borderColor: appTheme.grey,
    borderWidth: 0.6,
    elevation: 8,
    borderRadius: 5,
    backgroundColor: appTheme.background,
    marginRight: spacing.large,
    marginLeft: spacing.small_sm
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: spacing.medium
  },
  infoText: {
    fontSize: fontSizes.h2,
    color: appTheme.textPrimary,
    fontFamily: fonts.CenturyGothicBold
  },
  submitButton: {
    marginVertical: spacing.large,
    backgroundColor: bmiColors.red,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.medium_sm,
    borderRadius: 14
  },
  submitText: {
    fontSize: fontSizes.h1,
    color: appTheme.greyC,
    fontFamily: fonts.CenturyGothicBold
  },
  menuContainer: {
    width:'100%',
    marginTop: spacing.medium
  },
  menuTitle: {
    color: appTheme.brightContent,
    fontFamily: fonts.CenturyGothicBold,
    fontSize: fontSizes.h3
  },
  menu: {
    backgroundColor: appTheme.darkBackground,
  },
  menuButton: {
    flexDirection: 'row',
    backgroundColor: appTheme.darkBackground,
    alignItems: 'center',
    justifyContent:'center',
    padding: spacing.small_lg,
  },
  menuText: {
    color: appTheme.textPrimary,
    fontFamily: fonts.CenturyGothicBold,
    fontSize: fontSizes.h2,
  },
});

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(LiveScheduler);