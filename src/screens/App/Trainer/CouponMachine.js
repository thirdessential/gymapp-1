/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {PureComponent} from 'react';
import {View, StyleSheet, StatusBar, LayoutAnimation, TouchableOpacity, ActivityIndicator} from 'react-native'
import {connect} from "react-redux";
import cuid from 'cuid';
import {spacing} from "../../../constants/dimension";
import * as actionCreators from "../../../store/actions";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import colors, {appTheme, darkPallet} from "../../../constants/colors";
import strings from "../../../constants/strings";
import fontSizes from "../../../constants/fontSizes";
import fonts from "../../../constants/fonts";

import {WEEK_DAYS} from "../../../constants/appConstants";
import Slot from "../../../components/Slot";
import {dateToString, groupBy} from "../../../utils/utils";
import BarButton from "../../../components/BarButton";
import LinearGradient from "react-native-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {showSuccess} from "../../../utils/notification";

class CouponMachine extends PureComponent {

  state = {
    coupons: [],
    submitPending: false,
    changed: false,
    settingInitial: true
  }

  async componentDidMount() {
    await this.props.updateCoupons();
    this.refreshCoupons();
  }

  createCoupons = async () => {
    console.log('created');
  }

  refreshCoupons = async () => {
    const {coupons} = this.props;
    if (coupons && coupons.length > 0) {
      const localCoupons = this.mapCouponsToLocal(coupons);
      this.setState({coupons: localCoupons, settingInitial: false});
    } else this.setState({settingInitial: false})
  }
  sortCoupons = (a, b) => {
    if (a.createdOn < b.createdOn) {
      return -1;
    }
    if (a.createdOn > b.createdOn) {
      return 1;
    }
    return 0;
  }

  mapCouponsToLocal = (coupons) => {
    const localCoupons = [];
    const couponsByCode = groupBy(coupons, 'couponCode');
    Object.keys(couponsByCode).map(couponCode => {
      let groupedCoupons = couponsByCode[couponCode];
      const couponObj = groupedCoupons[0];
      let redeemCount = 0, totalCoupons = groupedCoupons.length;
      groupedCoupons.map(coupon => coupon.redeemedOn ? redeemCount++ : null);
      couponObj.redeemCount = redeemCount;
      couponObj.totalCoupons = totalCoupons;
      localCoupons.push(couponObj);
    })
    return localCoupons.sort(this.sortCoupons);
  }

  setChangedDirty = () => {
    if (this.state.changed === false) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({changed: true});
    }
  }

  renderCoupons = () => {
    return this.state.coupons.map((coupon, index) => {
      return null;
      return <View key={coupon._id} style={styles.slotContainer}>
        <Slot
          days={slot.days}
          duration={slot.duration}
          index={index + 1}
          time={slot.time}
          onTimeChange={disabled ? null : (time) => this.handleTimeChange(slot._id, time)}
          onDurationChange={disabled ? null : duration => this.handleDurationChange(slot._id, duration)}
          onDaysChange={days => this.handleDaysChange(slot._id, days)}
          onDelete={disabled ? null : () => this.deleteSlot(slot._id)}
          disabledDays={disabledDays}
        />
      </View>

    })
  }
  fab = () => {
    if (!this.state.changed) return null;
    return (
      <TouchableOpacity style={[styles.fab, styles.fabPosition]} onPress={this.createCoupons}>
        {
          this.state.submitPending && (
            <ActivityIndicator size={28} color={'white'}/>
          )
        }
        {
          !this.state.submitPending && (
            <FontAwesome
              name={'check'}
              color={'white'}
              size={22}
            />
          )
        }
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <LinearGradient
        colors={[darkPallet.darkBlue, darkPallet.extraDarkBlue]}
        style={styles.container}>
        {
          this.state.settingInitial &&
          <ActivityIndicator style={{position: 'absolute'}} color={appTheme.brightContent} size={50}/>
        }
        {
          !this.state.settingInitial && (
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
              <StatusBar backgroundColor={appTheme.lightBackground}/>
              <View style={styles.listContainer}>
                <this.renderCoupons/>
              </View>
              <View style={styles.addButtonContainer}>
                <BarButton onPress={this.createCoupons}/>
              </View>
            </KeyboardAwareScrollView>
          )
        }
        <this.fab/>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listContainer: {
    justifyContent: 'center',
    marginTop: spacing.medium_lg,
    marginLeft: spacing.medium,
    marginRight: spacing.medium,
    flex: 1,
  },
  slotContainer: {
    marginBottom: spacing.medium_lg
  },
  titleContainer: {
    paddingTop: spacing.medium_sm,
    paddingLeft: spacing.large,
    paddingRight: spacing.large,
    paddingBottom: spacing.medium_sm,
    marginBottom: spacing.medium_sm,
    backgroundColor: appTheme.darkBackground,
    alignItems: 'center'
  },
  title: {
    color: 'white',
    fontSize: fontSizes.h0,
    fontFamily: fonts.PoppinsRegular
  },
  addButtonContainer: {
    paddingTop: spacing.medium,
    paddingBottom: spacing.medium_sm,
    alignItems: 'center',
  },
  fab: {
    height: spacing.space_50,
    width: spacing.space_50,
    borderRadius: spacing.thumbnailMini / 2,
    elevation: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.acceptGreen,
  },
  fabPosition: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});

const mapStateToProps = (state) => ({
  coupons: state.trainer.coupons
});

const mapDispatchToProps = (dispatch) => ({
  createCoupons: (count, percentageOff, validity) => dispatch(actionCreators.generateCoupons(count, percentageOff, validity)),
  updateCoupons: () => dispatch(actionCreators.syncCoupons()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CouponMachine);