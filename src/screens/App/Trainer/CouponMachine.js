/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {PureComponent} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  LayoutAnimation,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  TextInput
} from 'react-native'
import {connect} from "react-redux";
import Counter from "react-native-counters";
import {spacing} from "../../../constants/dimension";
import * as actionCreators from "../../../store/actions";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import colors, {appTheme, darkPallet} from "../../../constants/colors";
import strings, {couponShareBuilder} from "../../../constants/strings";
import fontSizes from "../../../constants/fontSizes";
import fonts from "../../../constants/fonts";

import Slot from "../../../components/Slot";
import {dateToString, groupBy} from "../../../utils/utils";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {showSuccess} from "../../../utils/notification";
import PillButton from "../../../components/PillButton";
import Coupon from "../../../components/Coupon";
import {textShare} from "../../../utils/share";

class CouponMachine extends PureComponent {

  state = {
    coupons: [],
    submitPending: false,
    changed: false,
    settingInitial: true,
    genCount: 1,
    genValidity: 3,
    genPercentage: 5
  }

  async componentDidMount() {
    await this.props.updateCoupons();
    this.refreshCoupons();
  }

  changeCount = genCount => this.setState({genCount});
  changeValidity = genValidity => this.setState({genValidity});
  changePercentage = genPercentage => this.setState({genPercentage});
  createCoupons = async () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({submitPending: true});
    const {genValidity, genPercentage, genCount} = this.state;
    await this.props.createCoupons(genCount, genPercentage, genValidity);
    this.refreshCoupons();
    showSuccess(strings.COUPONS_CREATED);
  }

  refreshCoupons = async () => {
    const {coupons} = this.props;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (coupons && coupons.length > 0) {
      const localCoupons = this.mapCouponsToLocal(coupons);
      this.setState({coupons: localCoupons, settingInitial: false, submitPending: false});
    } else this.setState({settingInitial: false, submitPending: false})
  }
  sortCoupons = (a, b) => {
    if (a.createdOn < b.createdOn) {
      return 1;
    }
    if (a.createdOn > b.createdOn) {
      return -1;
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
      couponObj.total = totalCoupons;
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
  shareCoupon = (code, discount,validity) => {
    const message = couponShareBuilder(code,discount,validity);
    textShare(message);
  }
  renderCoupons = () => {
    return this.state.coupons.map((coupon, index) => {
      const validTill = (new Date(coupon.validTill)).toLocaleDateString();
      return <View key={coupon._id} style={{marginBottom: spacing.medium}}>
        <Coupon
          code={coupon.couponCode}
          discount={coupon.percentageOff}
          validity={validTill}
          redeemed={coupon.redeemCount}
          count={coupon.total}
          onShare={() => this.shareCoupon(coupon.couponCode, coupon.percentageOff, validTill)}
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

  renderCreate = () => {
    return (
      <View style={styles.couponContainer}>
        <View style={styles.row}>
          <Text style={[styles.subtitle, {marginRight: spacing.medium}]}>{strings.COUNT}</Text>
          <Counter
            start={this.state.genCount}
            onChange={this.changeCount}
            min={1}
            max={10}
            buttonStyle={{borderColor: appTheme.brightContent}}
            buttonTextStyle={{color: appTheme.brightContent}}
            countTextStyle={{color: appTheme.brightContent}}
          />
        </View>
        <View style={styles.row}>
          <Text style={[styles.subtitle, {marginRight: spacing.medium}]}>{strings.DISCOUNT} %</Text>
          <Counter
            start={this.state.genPercentage}
            onChange={this.changePercentage}
            min={3}
            max={15}
            buttonStyle={{borderColor: appTheme.brightContent}}
            buttonTextStyle={{color: appTheme.brightContent}}
            countTextStyle={{color: appTheme.brightContent}}
          />
        </View>
        <View style={styles.row}>
          <Text style={[styles.subtitle, {marginRight: spacing.medium}]}>{strings.VALIDITY} (months)</Text>
          <Counter
            start={this.state.genValidity}
            onChange={this.changeValidity}
            min={1}
            max={6}
            buttonStyle={{borderColor: appTheme.brightContent}}
            buttonTextStyle={{color: appTheme.brightContent}}
            countTextStyle={{color: appTheme.brightContent}}
          />
        </View>
        {!this.state.submitPending &&
        <View style={{width: 100, alignItems: 'center', alignSelf: 'flex-end', marginTop: spacing.medium_sm}}>
          <PillButton title={strings.GENERATE} onPress={this.createCoupons}/>
        </View>
        }
        {
          this.state.submitPending &&
          <View style={{marginTop: spacing.medium_sm}}>
            <ActivityIndicator size={24} color={appTheme.brightContent}/>
          </View>
        }
      </View>
    )
  }

  render() {
    return (
      <View
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
                {this.renderCreate()}
                <this.renderCoupons/>
              </View>
            </KeyboardAwareScrollView>
          )
        }
        <this.fab/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appTheme.background
  },
  listContainer: {
    justifyContent: 'center',
    marginTop: spacing.medium_lg,
    marginLeft: spacing.medium,
    marginRight: spacing.medium,
    flex: 1,
  },
  couponContainer: {
    backgroundColor: appTheme.darkBackground,
    borderRadius: 8,
    marginBottom: spacing.medium_lg,
    padding: spacing.medium,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 270,
    marginBottom: spacing.medium_sm
  },
  textInput: {
    color: appTheme.brightContent,
    fontFamily: fonts.CenturyGothic
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
  subtitle: {
    color: 'white',
    fontSize: fontSizes.h2,
    fontFamily: fonts.CenturyGothicBold
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