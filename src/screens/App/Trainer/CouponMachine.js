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
  TextInput, FlatList
} from 'react-native'
import {connect} from "react-redux";
import Counter from "react-native-counters";
import {spacing} from "../../../constants/dimension";
import * as actionCreators from "../../../store/actions";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {appTheme} from "../../../constants/colors";
import strings, {couponShareBuilder} from "../../../constants/strings";
import fontSizes from "../../../constants/fontSizes";
import fonts from "../../../constants/fonts";

import {groupBy} from "../../../utils/utils";
import {showSuccess} from "../../../utils/notification";
import Coupon from "../../../components/Coupon";
import {textShare} from "../../../utils/share";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import {roundEdgeSeparator} from "../../../components/Trainer/StatementCard";
import {screenWidth} from "../../../utils/screenDimensions";
import {COUPON_GEN} from "../../../constants/appConstants";

class CouponMachine extends PureComponent {

  state = {
    coupons: [],
    submitPending: false,
    changed: false,
    settingInitial: true,
    genCount: 1,
    genValidity: 3,
    genPercentage: 8
  }

  async componentDidMount() {
    await this.props.updateCoupons();
    this.refreshCoupons();
  }

  incrementCount = () => this.setState({genCount: this.state.genCount + 1})
  decrementCount = () => this.setState({genCount: this.state.genCount - 1})
  decrementPercentage = () => this.setState({genPercentage: this.state.genPercentage - 1})
  incrementPercentage = () => {
    if (this.state.genPercentage + 3 > 100)
      this.setState({genPercentage: 100});
    else this.setState({genPercentage: this.state.genPercentage + 3});
  }
  incrementValidity = () => this.setState({genValidity: this.state.genValidity + 1})
  decrementValidity = () => this.setState({genValidity: this.state.genValidity - 1})

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

  shareCoupon = (code, discount, validity) => {
    const message = couponShareBuilder(code, discount, validity);
    textShare(message);
  }
  renderCoupon = (coupon) => {
    const {validTill, couponCode, percentageOff, redeemCount, total} = coupon;
    const validTillDate = (new Date(validTill)).toLocaleDateString();
    let shareEnabled = true;
    let now = new Date();
    if (validTill > now) shareEnabled = false;
    if (redeemCount === total) shareEnabled = false;
    return <View style={{marginBottom: spacing.medium}}>
      <Coupon
        code={couponCode}
        discount={percentageOff}
        validity={validTillDate}
        redeemed={redeemCount}
        count={total}
        onShare={shareEnabled? () => this.shareCoupon(coupon.couponCode, coupon.percentageOff, validTill):null}
      />
    </View>
  }

  renderCouponCount = () => {
    const {genCount} = this.state;
    const minDisabled = genCount <= COUPON_GEN.minGen;
    const maxDisabled = genCount >= COUPON_GEN.maxGen;
    return <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={this.decrementCount}
                        disabled={minDisabled}
                        style={[styles.roundButton, styles.halfLeft, minDisabled && styles.disabled]}>
        <FontAwesome5Icon name={'minus'} size={15} color={'white'}/>
      </TouchableOpacity>
      <Text style={styles.buttonText}>{genCount}</Text>
      <TouchableOpacity onPress={this.incrementCount}
                        disabled={maxDisabled}
                        style={[styles.roundButton, styles.halfRight, maxDisabled && styles.disabled]}>
        <FontAwesome5Icon name={'plus'} size={15} color={'white'}/>
      </TouchableOpacity>
    </View>
  }
  renderCouponDiscount = () => {
    const {genPercentage} = this.state;
    const minDisabled = genPercentage <= COUPON_GEN.minDiscount;
    const maxDisabled = genPercentage >= COUPON_GEN.maxDiscount;
    return <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={this.decrementPercentage}
                        disabled={minDisabled}
                        style={[styles.roundButton, styles.halfLeft, minDisabled && styles.disabled]}>
        <FontAwesome5Icon name={'minus'} size={15} color={'white'}/>
      </TouchableOpacity>
      <Text style={styles.buttonText}>{genPercentage}</Text>
      <TouchableOpacity onPress={this.incrementPercentage}
                        disabled={maxDisabled}
                        style={[styles.roundButton, styles.halfRight, maxDisabled && styles.disabled]}>
        <FontAwesome5Icon name={'plus'} size={15} color={'white'}/>
      </TouchableOpacity>
    </View>
  }
  renderCouponValidity = () => {
    const {genValidity} = this.state;
    const minDisabled = genValidity <= COUPON_GEN.minValidity;
    const maxDisabled = genValidity >= COUPON_GEN.maxValidity;
    return <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={this.decrementValidity}
                        disabled={minDisabled}
                        style={[styles.roundButton, styles.halfLeft, minDisabled && styles.disabled]}>
        <FontAwesome5Icon name={'minus'} size={15} color={'white'}/>
      </TouchableOpacity>
      <Text style={[styles.buttonText, {marginLeft: 'auto', marginRight: 'auto'}]}>{genValidity} {strings.MONTHS}</Text>
      <TouchableOpacity onPress={this.incrementValidity}
                        disabled={maxDisabled}
                        style={[styles.roundButton, styles.halfRight, maxDisabled && styles.disabled]}>
        <FontAwesome5Icon name={'plus'} size={15} color={'white'}/>
      </TouchableOpacity>
    </View>
  }
  renderCreate = () => {
    return (
      <View style={styles.couponContainer}>
        <View style={{marginTop: -12, width: '100%'}}>
          {roundEdgeSeparator(appTheme.background)}
        </View>
        <View style={styles.row}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.subtitle}>{strings.COUPON_COUNT}</Text>
            {this.renderCouponCount()}
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.subtitle}>{strings.DISCOUNT} %</Text>
            {this.renderCouponDiscount()}
          </View>
        </View>

        <Text style={[styles.subtitle, {
          marginVertical: spacing.medium_sm,
          marginHorizontal: spacing.small
        }]}>{strings.COUPON_VALIDITY} </Text>
        {this.renderCouponValidity()}
        <TouchableOpacity disabled={this.state.submitPending} onPress={this.createCoupons} style={styles.pillButton}>
          {!this.state.submitPending &&
          <Text style={[styles.buttonText, {fontSize: fontSizes.h2}]}>{strings.GENERATE}</Text>}
          {this.state.submitPending && <ActivityIndicator size={24} color={appTheme.textPrimary}/>}
        </TouchableOpacity>
      </View>
    )
  }
  separator = () => <View style={{marginTop: spacing.medium_lg}}/>

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
          {this.renderCreate()}
          {
            !this.state.settingInitial && this.state.coupons.length > 0 &&
            <FlatList
              contentContainerStyle={styles.listContainer}
              data={this.state.coupons}
              ListHeaderComponent={this.separator}
              ListFooterComponent={this.separator}
              ItemSeparatorComponent={this.separator}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => this.renderCoupon(item)}
              keyExtractor={(item) => item._id}
            />
          }
          {
            this.state.settingInitial &&
            <ActivityIndicator color={appTheme.brightContent} size={50}/>
          }
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: appTheme.background,
  },
  listContainer: {
    backgroundColor: appTheme.darkBackground,
    flex: 1,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: spacing.medium,
    paddingTop: spacing.medium_lg

  },
  couponContainer: {
    backgroundColor: appTheme.darkBackground,
    borderRadius: 8,
    marginBottom: spacing.space_40,
    paddingBottom: spacing.medium,
    paddingHorizontal: spacing.large_lg + 5,
    marginHorizontal: spacing.medium,
    marginTop: spacing.medium_lg
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.medium_sm
  },
  subtitle: {
    color: appTheme.brightContentFaded,
    fontSize: fontSizes.h3,
    fontFamily: fonts.CenturyGothicBold,
    marginBottom: spacing.medium_sm
  },
  buttonContainer: {
    borderRadius: 100,
    backgroundColor: appTheme.background,
    flexDirection: 'row',
    alignItems: 'center'
  },
  roundButton: {
    padding: spacing.medium_sm,
    backgroundColor: appTheme.brightContent,
    justifyContent: 'center',
    alignItems: 'center'
  },
  halfLeft: {
    borderBottomLeftRadius: 100,
    borderTopLeftRadius: 100,
    paddingLeft: spacing.medium_sm + 2
  },
  halfRight: {
    borderBottomRightRadius: 100,
    borderTopRightRadius: 100,
    paddingRight: spacing.medium_sm + 2
  },
  buttonText: {
    color: appTheme.textPrimary,
    fontFamily: fonts.CenturyGothic,
    paddingHorizontal: spacing.medium_lg
  },
  disabled: {
    backgroundColor: appTheme.grey
  },
  pillButton: {
    width: screenWidth / 2.3,
    padding: spacing.medium_sm,
    borderRadius: 100,
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: appTheme.brightContent,
    marginTop: spacing.medium_lg,
    marginBottom: -spacing.large_lg - 5
  }
});

const mapStateToProps = (state) => ({
  coupons: state.trainer.coupons
});

const mapDispatchToProps = (dispatch) => ({
  createCoupons: (count, percentageOff, validity) => dispatch(actionCreators.generateCoupons(count, percentageOff, validity)),
  updateCoupons: () => dispatch(actionCreators.syncCoupons()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CouponMachine);