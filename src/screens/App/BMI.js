import React, {PureComponent} from 'react';
import {
  ActivityIndicator,
  FlatList, LayoutAnimation,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard
} from "react-native";
import {connect} from "react-redux";
import {Bar} from 'react-native-progress';
import {spacing} from "../../constants/dimension";
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US');
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

import colors, {appTheme, bmiColors, darkPallet} from "../../constants/colors";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import {screenWidth} from "../../utils/screenDimensions";
import strings from "../../constants/strings";
import BmiBar from "../../components/BmiBar";
import {calculateBmi, getBmiVerdict, toTitleCase} from "../../utils/utils";
import Feather from "react-native-vector-icons/Feather";
import CustomLineChart from "../../components/CustomLineChart";
import Avatar from "../../components/Avatar";
import RouteNames from "../../navigation/RouteNames";
import * as actionCreators from "../../store/actions";
import {hitSlop20} from "../../constants/styles";
import {WEEK_DAYS} from "../../constants/appConstants";
import RBSheet from "react-native-raw-bottom-sheet";
import DatePicker from "react-native-datepicker";

const rbContentType = {
  WEIGHT: 'WEIGHT',
  TARGET: 'TARGET'
}

class BMI extends PureComponent {

  state = {
    weight: {
      initial: {
        value: 100,
        date: '2020-05-21T13:12:39.415Z'
      },
      target: {
        value: 50,
        date: '2020-07-20T14:06:33.879Z'
      },
      current: {
        value: 75,
        date: '2020-09-18T13:13:25.194Z'
      }
    },
    graphType: 'day',
    graphHeaderText: strings.LAST_DAYS,
    target: null,
    selectedWeight: 2,
    newWeight: '',
    submitting: false,
    rbType: rbContentType.WEIGHT,
    targetWeight: '',
    targetDate: ''
  }

  componentDidMount() {
    this.props.updateBmiRecords();
  }

  openProfile = () => {
    this.props.navigation.navigate(RouteNames.MyProfile);
  }
  setDays = () => this.setState({graphType: 'day', graphHeaderText: strings.LAST_DAYS})
  setMonths = () => this.setState({graphType: 'month', graphHeaderText: strings.LAST_MONTHS})
  setWeight = (newWeight) => this.setState({newWeight})
  setTargetWeight = (targetWeight) => this.setState({targetWeight})
  setTargetDate = (targetDate) => this.setState({targetDate})
  renderHeader = () => {
    const {displayPictureUrl, height, name} = this.props.userData;
    return (
      <View style={{
        flexDirection: 'row',
        marginBottom: spacing.small,
        marginTop: spacing.medium,
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <TouchableOpacity onPress={this.openProfile}
                          style={{marginRight: 'auto', flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <Avatar roundedMultiplier={1} size={spacing.thumbnailMini} url={displayPictureUrl}/>
          <View>
            <Text style={[styles.menuText, {fontSize: fontSizes.h1}]}>{name.split(' ')[0]}</Text>
            <Text style={styles.menuText}>{height} cms</Text>
          </View>
        </TouchableOpacity>
        <Menu style={styles.menuContainer}>
          <MenuTrigger customStyles={{padding: spacing.small_lg}}>
            <Text style={styles.menuTitle}>{this.state.graphHeaderText}</Text>
          </MenuTrigger>
          <MenuOptions customStyles={styles.menu}>
            <MenuOption style={styles.menuButton} onSelect={this.setDays}>
              <Text style={styles.menuText}>{strings.LAST_DAYS}</Text>
            </MenuOption>
            <MenuOption style={styles.menuButton} onSelect={this.setMonths}>
              <Text style={styles.menuText}>{strings.LAST_MONTHS}</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
    )
  }
  renderProgressChart = () => {
    const {bmiRecords} = this.props;
    if (!bmiRecords || bmiRecords.length === 0)
      return null;
    const weights = [];
    const labels = [];
    bmiRecords.slice(0, 7).map(record => {
      const dayIndex = (new Date(record.date)).getDay()
      weights.unshift(record.weight);
      labels.unshift(Object.keys(WEEK_DAYS)[dayIndex])
    });
    return (
      <CustomLineChart data={weights} labels={labels}/>
    )
  }

  renderProgressBar = (initial, current, target) => {
    if (!initial || !current || !target) return null;
    let progress = 0;
    const currentFromInitial = Math.abs(initial - current);
    const targetFromCurrent = Math.abs(target - current);
    progress = currentFromInitial / targetFromCurrent;
    return (
      <Bar
        progress={progress}
        borderWidth={0}
        color={bmiColors.lightBlue}
        unfilledColor={appTheme.grey}
        width={screenWidth - 2 * spacing.medium_lg}/>
    )
  }
  renderWeightProgress = () => {
    const {bmiRecords, targetWeight, targetDate} = this.props;
    if (!bmiRecords || bmiRecords.length === 0)
      return null;
    const latestRecord = bmiRecords[0];
    const {bmi, weight: currentWeight, date} = latestRecord;
    let initialRecord = {weight: currentWeight, date, bmi};
    if (bmiRecords.length > 1) initialRecord = bmiRecords[bmiRecords.length - 1];

    const initialDate = new Date(initialRecord.date);
    const targetDateObj = new Date(targetDate);

    return (
      <View style={{marginTop: spacing.medium}}>
        <View style={styles.weightRow}>
          <View style={styles.subtitleContainer}>
            <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
              <Text style={styles.subtitle}>{initialRecord.weight}</Text>
              <Text style={[styles.subtitle_sm, {marginBottom: spacing.small, marginLeft: spacing.small_sm}]}>kg</Text>
            </View>
            <Text style={styles.subtitle_sm}>{initialDate.toLocaleDateString()}</Text>
          </View>

          <Text style={styles.title}>{currentWeight}</Text>
          {
            targetWeight && (
              <View style={[styles.subtitleContainer, {alignItems: 'flex-end'}]}>
                <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                  <Text style={styles.subtitle}>{targetWeight}</Text>
                  <Text
                    style={[styles.subtitle_sm, {marginBottom: spacing.small, marginLeft: spacing.small_sm}]}>kg</Text>
                </View>
                <Text style={styles.subtitle_sm}>{targetDateObj.toLocaleDateString()}</Text>
              </View>
            )
          }
          {
            !targetWeight && (
              <TouchableOpacity onPress={this.openTargetInput} style={{padding: spacing.small}}>
                <Text style={styles.menuText}>{strings.SET_TARGET}</Text>
              </TouchableOpacity>
            )
          }
        </View>
        {this.renderProgressBar(initialRecord.weight, latestRecord.weight, targetWeight)}
        {
          targetWeight && (
            <TouchableOpacity onPress={this.openTargetInput} style={{padding: spacing.small,marginTop:spacing.small, alignSelf:'flex-end'}}>
              <Text style={styles.menuText}>{strings.SET_TARGET}</Text>
            </TouchableOpacity>
          )
        }
      </View>
    )
  }
  renderVerdict = (bmi) => {
    const {text, color} = getBmiVerdict(bmi);
    return <Text style={{
      color: color,
      fontWeight: 'bold',
      marginBottom: spacing.small_sm,
      marginLeft: spacing.medium_sm
    }}>{text}</Text>
  }
  renderBMI = () => {
    const {bmiRecords} = this.props;
    if (!bmiRecords || bmiRecords.length === 0)
      return null;
    const {bmi} = bmiRecords[0];
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.subtitle}>{strings.BMI_CALCULATOR}</Text>
        <View style={[styles.lightCard, {marginTop: spacing.medium_sm}]}>
          <View style={{flexDirection: 'row', alignItems: 'flex-end', marginBottom: spacing.medium}}>
            <Text style={[styles.subtitle, {color: appTheme.textPrimary}]}>{bmi.toPrecision(3)}</Text>
            {this.renderVerdict(bmi)}
          </View>
          <View style={{alignItems: 'center'}}>
            <BmiBar value={bmi}/>
          </View>
        </View>
      </View>
    )
  }
  historyCard = data => {
    const {difference = 0, weight, date} = data;
    const differenceStyle = {color: difference > 0 ? bmiColors.red : bmiColors.lightBlue};
    return (
      <View style={[styles.lightCard, {flexDirection: 'row', justifyContent: 'space-between'}]}>
        <View>
          <Text
            style={[styles.subtitle_sm, {fontSize: fontSizes.h3}]}>{toTitleCase(timeAgo.format(new Date(date)))}</Text>
          {
            difference !== 0 &&
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Feather size={18} color={differenceStyle.color} name={difference > 0 ? 'arrow-up' : 'arrow-down'}/>
              <Text style={[styles.difference, differenceStyle]}>{Math.abs(difference)} kg</Text>
            </View>
          }
        </View>
        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
          <Text style={styles.subtitle}>{weight}</Text>
          <Text style={[styles.subtitle_sm, {marginBottom: spacing.small, marginLeft: spacing.small_sm}]}>kg</Text>
        </View>
      </View>
    )
  }
  renderHistory = () => {
    const {bmiRecords} = this.props;
    if (!bmiRecords || bmiRecords.length === 0)
      return null;
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.subtitle}>{strings.HISTORY}</Text>
        <FlatList
          data={bmiRecords}
          renderItem={({item}) => this.historyCard(item)}
          keyExtractor={({item, index}) => index}
          ListHeaderComponent={() => <View style={{height: spacing.small_lg}}/>}
          ListFooterComponent={() => <View style={{height: spacing.medium}}/>}
          ItemSeparatorComponent={() => <View style={{height: spacing.small_lg}}/>}
        />
      </View>
    )
  }
  renderAddWeight = () => (
    <TouchableOpacity onPress={this.openWeightInput} activeOpacity={0.7}
                      style={[styles.blueButton, styles.attachBottom]}>
      <Text style={styles.buttonText}>{strings.NEW_WEIGHT}</Text>
    </TouchableOpacity>
  )
  openRbSheet = () => this.RBSheet.open()
  openWeightInput = () => {
    this.setState({rbType: rbContentType.WEIGHT});
    this.openRbSheet();
  }
  openTargetInput = () => {
    this.setState({rbType: rbContentType.TARGET});
    this.openRbSheet();
  }
  closeRbSheet = () => {
    this.RBSheet.close();
  }
  submitBmi = async () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({submitting: true});
    Keyboard.dismiss();
    const {newWeight} = this.state;
    const {height} = this.props.userData;
    const bmi = calculateBmi(newWeight, height);
    await this.props.submitBmi(bmi, newWeight);
    this.closeRbSheet();
    this.setState({newWeight: '', submitting: false});
  }
  submitTarget = async () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({submitting: true});
    Keyboard.dismiss();
    const {targetDate, targetWeight} = this.state;
    const targetDateObj = new Date();
    const daysToAchieve = parseInt(targetDate) * 7;
    targetDateObj.setDate(targetDateObj.getDate() + daysToAchieve);
    await this.props.updateTarget(targetWeight, targetDateObj);
    this.closeRbSheet();
    this.setState({submitting: false});
  }
  rbSheet = () => (<RBSheet
      ref={ref => {
        this.RBSheet = ref;
      }}
      animationType={'slide'}
      closeOnDragDown={true}
      customStyles={{
        container: {
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: appTheme.lightBackground,
        },
        wrapper: {
          backgroundColor: 'transparent'
        }
      }}
    >
      {this.state.rbType === rbContentType.WEIGHT && this.renderWeightInput()}
      {this.state.rbType === rbContentType.TARGET && this.renderTargetInput()}
    </RBSheet>
  )
  renderWeightInput = () => (
    <>
      <Text style={styles.subtitle}>{strings.ENTER_WEIGHT} </Text>
      <TextInput keyboardType={'numeric'} style={styles.textInput} placeholder='Weight (kg)'
                 placeholderTextColor={appTheme.brightContent}
                 value={this.state.newWeight.toString()} onChangeText={this.setWeight}
      />
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.medium_sm}}>
        {!this.state.submitting &&
        <TouchableOpacity onPress={this.closeRbSheet} activeOpacity={0.7}
                          style={[styles.blueButton, {backgroundColor: bmiColors.red, marginRight: spacing.large}]}>
          <Text style={styles.buttonText}>{strings.CANCEL}</Text>
        </TouchableOpacity>}
        <TouchableOpacity onPress={this.submitBmi} activeOpacity={0.7} style={[styles.blueButton]}>
          {this.state.submitting && <ActivityIndicator color={styles.buttonText.color} size={20}/>}
          {!this.state.submitting && <Text style={styles.buttonText}>{strings.DONE}</Text>}
        </TouchableOpacity>
      </View>
    </>
  )
  renderTargetInput = () => (
    <>
      <Text style={styles.menuText}>{strings.ENTER_TARGET} </Text>
      <TextInput keyboardType={'numeric'} style={styles.textInput} placeholder='Target Weight (kg)'
                 placeholderTextColor={appTheme.brightContent}
                 value={this.state.targetWeight} onChangeText={this.setTargetWeight}
      />
      <TextInput keyboardType={'numeric'} style={styles.textInput} placeholder='Weeks to achieve'
                 placeholderTextColor={appTheme.brightContent}
                 value={this.state.targetDate} onChangeText={this.setTargetDate}
      />

      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.medium_sm}}>
        {!this.state.submitting &&
        <TouchableOpacity onPress={this.closeRbSheet} activeOpacity={0.7}
                          style={[styles.blueButton, {backgroundColor: bmiColors.red, marginRight: spacing.large}]}>
          <Text style={styles.buttonText}>{strings.CANCEL}</Text>
        </TouchableOpacity>}
        <TouchableOpacity onPress={this.submitTarget} activeOpacity={0.7} style={[styles.blueButton]}>
          {this.state.submitting && <ActivityIndicator color={styles.buttonText.color} size={20}/>}
          {!this.state.submitting && <Text style={styles.buttonText}>{strings.DONE}</Text>}
        </TouchableOpacity>
      </View>
    </>
  )


  render() {
    return (
      <>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{justifyContent: 'center'}}
                    style={styles.container}>
          {this.renderHeader()}
          {this.renderProgressChart()}
          {this.renderWeightProgress()}
          {this.renderBMI()}
          {this.renderHistory()}
        </ScrollView>
        {this.renderAddWeight()}
        {this.rbSheet()}
      </>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingLeft: spacing.medium_lg,
    paddingRight: spacing.medium_lg,
    // paddingTop: spacing.medium_lg,
    backgroundColor: appTheme.background,
  },
  weightRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: spacing.small
  },
  subtitleContainer: {},
  subtitle: {
    color: appTheme.greyC,
    fontFamily: fonts.CenturyGothicBold,
    fontSize: fontSizes.bigTitle
  },
  title: {
    color: appTheme.textPrimary,
    fontFamily: fonts.CenturyGothicBold,
    fontSize: fontSizes.largeTitle
  },
  subtitle_sm: {
    color: appTheme.greyC,
    fontFamily: fonts.CenturyGothicBold,
    fontSize: fontSizes.h4
  },
  sectionContainer: {
    marginTop: spacing.large
  },
  lightCard: {
    backgroundColor: appTheme.lightBackground,
    borderRadius: 6,
    padding: spacing.medium,
  },
  difference: {
    fontFamily: fonts.CenturyGothicBold,
    fontSize: fontSizes.h2,
    marginLeft: spacing.small_sm
  },
  blueButton: {
    padding: spacing.medium_sm,
    backgroundColor: bmiColors.lightBlue,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  attachBottom: {
    position: 'absolute',
    bottom: spacing.medium,
    alignSelf: 'center',
    width: '50%',
  },
  buttonText: {
    fontFamily: fonts.CenturyGothicBold,
    fontSize: fontSizes.h3
  },
  menuContainer: {
    borderColor: appTheme.grey,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    padding: spacing.medium_sm
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
    backgroundColor: appTheme.background,
    alignItems: 'center',
    padding: spacing.small_lg,
    paddingHorizontal: spacing.medium_lg
  },
  menuText: {
    marginLeft: spacing.medium_sm,
    color: appTheme.brightContent,
    fontFamily: fonts.CenturyGothicBold,
    fontSize: fontSizes.h2,
  },
  textInput: {
    backgroundColor: appTheme.background,
    color: appTheme.brightContent,
    fontSize: fontSizes.h1,
    fontFamily: fonts.CenturyGothicBold,
    borderRadius: 25,
    width: 220,
    textAlign: 'center',
    marginTop: spacing.medium_lg
  },

});

const mapStateToProps = (state) => ({
  userData: state.user.userData,
  bmiRecords: state.fitness.bmiRecords,
  targetWeight: state.fitness.targetWeight,
  targetDate: state.fitness.targetDate
});

const mapDispatchToProps = (dispatch) => ({
  updateBmiRecords: () => dispatch(actionCreators.updateBmiRecords()),
  submitBmi: (bmi, weight) => dispatch(actionCreators.submitBmi(bmi, weight)),
  updateTarget: (weight, date) => dispatch(actionCreators.updateTarget(weight, date))
});

export default connect(mapStateToProps, mapDispatchToProps)(BMI);
