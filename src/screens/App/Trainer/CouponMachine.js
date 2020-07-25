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
import { screenWidth} from "../../../utils/screenDimensions";

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
  incrementPercentage = () => this.setState({genPercentage: this.state.genPercentage + 3})
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
    const validTill = (new Date(coupon.validTill)).toLocaleDateString();
    return <View style={{marginBottom: spacing.medium}}>
      <Coupon
        code={coupon.couponCode}
        discount={coupon.percentageOff}
        validity={validTill}
        redeemed={coupon.redeemCount}
        count={coupon.total}
        onShare={() => this.shareCoupon(coupon.couponCode, coupon.percentageOff, validTill)}
      />
    </View>
  }

  renderCouponCount = () => {
    const {genCount} = this.state;
    return <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={this.decrementCount}
                        disabled={genCount < 2}
                        style={[styles.roundButton, styles.halfLeft, genCount < 2 && styles.disabled]}>
        <FontAwesome5Icon name={'minus'} size={15} color={'white'}/>
      </TouchableOpacity>
      <Text style={styles.buttonText}>{genCount}</Text>
      <TouchableOpacity onPress={this.incrementCount}
                        disabled={genCount > 9}
                        style={[styles.roundButton, styles.halfRight, genCount > 9 && styles.disabled]}>
        <FontAwesome5Icon name={'plus'} size={15} color={'white'}/>
      </TouchableOpacity>
    </View>
  }
  renderCouponDiscount = () => {
    const {genPercentage} = this.state;
    return <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={this.decrementPercentage}
                        disabled={genPercentage < 4}
                        style={[styles.roundButton, styles.halfLeft, genPercentage < 4 && styles.disabled]}>
        <FontAwesome5Icon name={'minus'} size={15} color={'white'}/>
      </TouchableOpacity>
      <Text style={styles.buttonText}>{genPercentage}</Text>
      <TouchableOpacity onPress={this.incrementPercentage}
                        disabled={genPercentage > 14}
                        style={[styles.roundButton, styles.halfRight, genPercentage > 14 && styles.disabled]}>
        <FontAwesome5Icon name={'plus'} size={15} color={'white'}/>
      </TouchableOpacity>
    </View>
  }
  renderCouponValidity = () => {
    const {genValidity} = this.state;
    return <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={this.decrementValidity}
                        disabled={genValidity < 2}
                        style={[styles.roundButton, styles.halfLeft, genValidity < 2 && styles.disabled]}>
        <FontAwesome5Icon name={'minus'} size={15} color={'white'}/>
      </TouchableOpacity>
      <Text style={[styles.buttonText, {marginLeft: 'auto', marginRight: 'auto'}]}>{genValidity} {strings.MONTHS}</Text>
      <TouchableOpacity onPress={this.incrementValidity}
                        disabled={genValidity > 5}
                        style={[styles.roundButton, styles.halfRight, genValidity > 5 && styles.disabled]}>
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