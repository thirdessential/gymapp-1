import React, {PureComponent} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Picker} from '@react-native-community/picker';
import {connect} from "react-redux";
import {Bar} from 'react-native-progress';
import {spacing} from "../../constants/dimension";
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US');

import {appTheme, bmiColors, darkPallet} from "../../constants/colors";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import {screenWidth} from "../../utils/screenDimensions";
import strings from "../../constants/strings";
import BmiBar from "../../components/BmiBar";
import {getBmiVerdict, toTitleCase} from "../../utils/utils";
import Feather from "react-native-vector-icons/Feather";
import CustomLineChart from "../../components/CustomLineChart";
import Avatar from "../../components/Avatar";
import RouteNames from "../../navigation/RouteNames";
import * as actionCreators from "../../store/actions";
import {hitSlop20} from "../../constants/styles";
import {WEEK_DAYS} from "../../constants/appConstants";

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
    target: null,
    selectedWeight:2
  }

  componentDidMount() {
    this.props.updateBmiRecords();
  }

  openProfile = () => {
    this.props.navigation.navigate(RouteNames.MyProfile);
  }
  renderHeader = () => {
    const {displayPictureUrl} = this.props.userData;
    return (
      <View style={{
        flexDirection: 'row',
        marginBottom: spacing.small,
        marginTop: spacing.medium,
        justifyContent: 'space-between'
      }}>
        <TouchableOpacity onPress={this.openProfile} style={{marginRight: 'auto', flex: 1}}>
          <Avatar roundedMultiplier={1} size={spacing.thumbnailMini} url={displayPictureUrl}/>
        </TouchableOpacity>
        <View style={{width: 170, borderColor: appTheme.grey, borderWidth: 1, borderRadius: 8}}>
          <Picker
            mode={'dropdown'}
            selectedValue={this.state.graphType}
            style={{flex: 1, color: appTheme.greyC, padding: 0, alignItems: 'center'}}
            // itemStyle={{backgroundColor: 'lightgrey', marginLeft: 0, }}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({graphType: itemValue})
            }>
            <Picker.Item label="Last 7 days" value="day"/>
            {/*<Picker.Item label="Last 6 months" value="month"/>*/}
          </Picker>
        </View>
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
      weights.push(record.weight);
      labels.push(Object.keys(WEEK_DAYS)[dayIndex])
    });
    return (
      <CustomLineChart data={weights} labels={labels}/>
    )
  }

  renderProgressBar = () => {
    const {weight, target} = this.state;
    if (!target) return null;
    const progress = (weight.current.value - weight.target.value) / (weight.initial.value - weight.target.value);
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
    const {bmiRecords} = this.props;
    if (!bmiRecords || bmiRecords.length === 0)
      return null;
    const latestRecord = bmiRecords[0];
    const {bmi, weight: currentWeight, date} = latestRecord;
    let initialRecord = {weight: currentWeight, date, bmi};
    if (bmiRecords.length > 1) initialRecord = bmiRecords[bmiRecords.length - 1];

    const {weight, targetWeight} = this.state;
    const initialDate = new Date(initialRecord.date);
    const targetDate = new Date(weight.target.date);

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
                  <Text style={styles.subtitle}>{weight.target.value}</Text>
                  <Text
                    style={[styles.subtitle_sm, {marginBottom: spacing.small, marginLeft: spacing.small_sm}]}>kg</Text>
                </View>
                <Text style={styles.subtitle_sm}>{targetDate.toLocaleDateString()}</Text>
              </View>
            )
          }
          {
            !targetWeight && (
              <TouchableOpacity hitSlop={hitSlop20} style={{padding: spacing.small}}>
                <Text style={styles.subtitle_sm}>{strings.SET_TARGET}</Text>
              </TouchableOpacity>
            )
          }
        </View>
        {this.renderProgressBar()}
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
            <Text style={[styles.subtitle, {color: appTheme.textPrimary}]}>{bmi}</Text>
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
    <TouchableOpacity activeOpacity={0.7} style={styles.blueButton}>
      <Text style={styles.buttonText}>{strings.NEW_WEIGHT}</Text>
    </TouchableOpacity>
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
    width: '50%',
    position: 'absolute',
    bottom: spacing.medium,
    alignSelf: 'center',
  },
  buttonText: {
    fontFamily: fonts.CenturyGothicBold,
    fontSize: fontSizes.h3
  }
});

const mapStateToProps = (state) => ({
  userData: state.user.userData,
  bmiRecords: state.fitness.bmiRecords
});

const mapDispatchToProps = (dispatch) => ({
  updateBmiRecords: () => dispatch(actionCreators.updateBmiRecords()),
  submitBmi: (bmi, weight) => dispatch(actionCreators.submitBmi(bmi, weight))
});

export default connect(mapStateToProps, mapDispatchToProps)(BMI);
