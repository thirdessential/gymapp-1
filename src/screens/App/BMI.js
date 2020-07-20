import React, {PureComponent} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {connect} from "react-redux";
import {Bar} from 'react-native-progress';
import {spacing} from "../../constants/dimension";

import {appTheme, bmiColors, darkPallet} from "../../constants/colors";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import {screenWidth} from "../../utils/screenDimensions";
import strings from "../../constants/strings";
import BmiBar from "../../components/BmiBar";
import {getBmiVerdict} from "../../utils/utils";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";

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
    bmi: 25.23,
    weightHistory: [
      {
        date: '2020-07-20T14:06:33.879Z',
        value: 62.5,
        difference: 0.5
      },
      {
        value: 100,
        date: '2020-05-21T13:12:39.415Z',
        difference: 0.5
      },
      {
        value: 75,
        date: '2020-09-18T13:13:25.194Z',
        difference: 0.5
      },
      {
        value: 75,
        date: '2020-09-18T13:13:25.194Z',
        difference: -0.8
      },
      {
        value: 75,
        date: '2020-09-18T13:13:25.194Z',
        difference: -0.3
      }
    ]

  }
  renderWeightProgress = () => {
    const {weight} = this.state;
    const initialDate = new Date(weight.initial.date);
    const targetDate = new Date(weight.target.date);
    const today = new Date();
    const progress = (weight.current.value - weight.target.value) / (weight.initial.value - weight.target.value)
    return (
      <View style={{marginTop:spacing.medium}}>
        <View style={styles.weightRow}>
          <View style={styles.subtitleContainer}>
            <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
              <Text style={styles.subtitle}>{weight.initial.value}</Text>
              <Text style={[styles.subtitle_sm, {marginBottom: spacing.small, marginLeft: spacing.small_sm}]}>kg</Text>
            </View>
            <Text style={styles.subtitle_sm}>{initialDate.toLocaleDateString()}</Text>
          </View>
          <Text style={styles.title}>{weight.current.value}</Text>
          <View style={[styles.subtitleContainer, {alignItems: 'flex-end'}]}>
            <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
              <Text style={styles.subtitle}>{weight.target.value}</Text>
              <Text style={[styles.subtitle_sm, {marginBottom: spacing.small, marginLeft: spacing.small_sm}]}>kg</Text>
            </View>
            <Text style={styles.subtitle_sm}>{targetDate.toLocaleDateString()}</Text>
          </View>
        </View>
        <Bar
          progress={progress}
          borderWidth={0}
          color={appTheme.brightContent}
          unfilledColor={appTheme.grey}
          width={screenWidth - 2 * spacing.medium_lg}/>
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
    const {bmi} = this.state;
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
    const {difference, value, date} = data;
    const differenceStyle = {color: difference > 0 ? bmiColors.red : bmiColors.lightBlue};
    return (
      <View style={[styles.lightCard, {flexDirection: 'row', justifyContent: 'space-between'}]}>
        <View>
          <Text style={[styles.subtitle_sm, {fontSize: fontSizes.h3}]}>Today</Text>
          <View style={{flexDirection: 'row', alignItems:'center'}}>
            <Feather size={18} color={differenceStyle.color} name={difference>0?'arrow-up':'arrow-down'}/>
            <Text style={[styles.difference, differenceStyle]}>{Math.abs(data.difference)} kg</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
          <Text style={styles.subtitle}>{data.value}</Text>
          <Text style={[styles.subtitle_sm, {marginBottom: spacing.small, marginLeft: spacing.small_sm}]}>kg</Text>
        </View>
      </View>
    )
  }
  renderHistory = () => {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.subtitle}>{strings.HISTORY}</Text>
        <FlatList
          data={this.state.weightHistory}
          renderItem={({item}) => this.historyCard(item)}
          keyExtractor={({item, index}) => index}
          ListHeaderComponent={() => <View style={{height: spacing.small_lg}}/>}
          ListFooterComponent={() => <View style={{height: spacing.medium}}/>}
          ItemSeparatorComponent={() => <View style={{height: spacing.small_lg}}/>}
        />
      </View>
    )
  }

  render() {
    return (
      <LinearGradient
        colors={[darkPallet.darkBlue, darkPallet.extraDarkBlue]}
        style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
          {this.renderWeightProgress()}
          {this.renderBMI()}
          {this.renderHistory()}
        </ScrollView>
      </LinearGradient>
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
    marginLeft:spacing.small_sm
  }

});

const mapStateToProps = (state) => ({
  userData: state.user.userData,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(BMI);
