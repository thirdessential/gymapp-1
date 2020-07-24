/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {PureComponent} from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  TextInput,
  LayoutAnimation,
  Keyboard,
  Button,
  Image
} from "react-native";
import {connect} from "react-redux";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ion from "react-native-vector-icons/Ionicons";
import {Table, Row, Rows} from "react-native-table-component";
import RazorpayCheckout from "react-native-razorpay";
import {iconBackgrounds} from '../../../constants/images'
import {spacing} from "../../../constants/dimension";
import * as actionCreators from "../../../store/actions";
import colors, {appTheme} from "../../../constants/colors";
import strings from "../../../constants/strings";
import fonts from "../../../constants/fonts";
import fontSizes from "../../../constants/fontSizes";
import LinearGradient from "react-native-linear-gradient";
import {militaryTimeToString, toTitleCase} from "../../../utils/utils";
import {appName, paymentKey} from "../../../constants/appConstants";
import {showError, showSuccess} from "../../../utils/notification";
import {sendPaymentData, subscribeRollback} from "../../../API";
import PillButton from "../../../components/PillButton";
import {getCouponDiscount} from "../../../API/user";

class Packages extends PureComponent {
  state = {
    subscribeLoading: false,
    couponLoading: false,
    couponCode: "",
    discount: null,
    price: "0",
    finalPrice: null,
  };

  componentDidMount() {
    const {route} = this.props;
    const {metadata} = route.params;
    const {price} = metadata;
    this.setState({price});
  }

  renderPackageCard = () => {
    const {route, userData} = this.props;
    const {metadata} = route.params;
    const {name} = userData;
    const {
      packageName,
      sessionCount,
      price,
      time,
      days,
      trainerName,
    } = metadata;
    const today = new Date().toLocaleDateString();
    const endDate = new Date();
    const estWeeks = Math.floor(sessionCount / days.length);
    endDate.setDate(endDate.getDate() + estWeeks * 7);
    let tableHead = [
      strings.PACKAGE_NAME,
      strings.SESSIONS,
      strings.PRICE_TITLE,
    ];
    let tableData = [[packageName, sessionCount, price + "/-"]];
    return (
      <View style={styles.card}>
        {/*<Text style={styles.sectionTitle}>{strings.USER_DETAILS}</Text>*/}
        {/*<Text style={styles.detail}>{strings.NAME}: {name}</Text>*/}
        <Text
          style={[
            styles.sectionTitle,
            {
              textAlign: "center",
              marginTop: spacing.medium,
            },
          ]}
        >
          {strings.SUBSCRIPTION_DETAILS}
        </Text>
        <View style={styles.separator}>
          <Text style={styles.detail}>
            {strings.TRAINER}: {trainerName}
          </Text>
          <Text style={styles.detail}>
            {strings.BOOKING_DATE}: {today}
          </Text>
          <Text
            style={[
              styles.detail,
              {
                color: appTheme.brightContent,
                marginBottom: spacing.small,
                marginTop: spacing.medium_sm,
                fontSize: fontSizes.default + 1,
              },
            ]}
          >
            {strings.SESSION_DETAILS}
          </Text>
          <Text style={styles.detail}>
            {strings.TIMING}: {militaryTimeToString(time)}
          </Text>
          <Text style={styles.detail}>
            {strings.DATE}: {today} - {endDate.toLocaleDateString()}
          </Text>
          <View style={styles.daysContainer}>
            {days.map((day) => (
              <Text key={day} style={styles.dayBox}>
                {toTitleCase(day)}
              </Text>
            ))}
          </View>
          <Table
            style={styles.packageBox}
            borderStyle={{borderColor: "transparent"}}
          >
            <Row
              data={tableHead}
              flexArr={[2, 1, 1]}
              style={[
                styles.packageTitleRow,
                {backgroundColor: appTheme.darkBackground},
              ]}
              textStyle={styles.packageTitle}
            />
            <Rows
              data={tableData}
              flexArr={[2, 1, 1]}
              style={[styles.packageTitleRow, {paddingBottom: 5}]}
              textStyle={styles.packageValue}
            />
          </Table>

          {this.renderCouponInput()}
          {this.state.discount && (
            <View style={styles.mainDiscount}>
              <View style={{flex: 1}}><Image source={iconBackgrounds.discount} style={{height: 78, width: 112}}/></View>
              <View style={{flex: 2, alignItems: 'center', marginLeft: 20}}>
                <Text style={styles.congrats}>Congratulations!</Text>
                <Text
                  style={{color: '#FFF'}}
                >
                  {strings.DISCOUNT}: {this.state.discount}% off
                </Text>
                <Text
                  style={styles.finalamount}
                >
                  {strings.TOTAl}: {this.state.finalPrice}
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  };
  applyCoupon = async () => {
    Keyboard.dismiss();
    this.setState({couponLoading: true});
    const {route} = this.props;
    const {metadata, userId: trainerId} = route.params;
    const {price} = metadata;
    const {couponCode} = this.state;

    const {discount} = await getCouponDiscount(couponCode, trainerId);
    if (!discount) {
      showError(strings.INVALID_COUPON);
      this.setState({couponLoading:false});
      return;
    }

    const finalPrice = price - (price * discount) / 100;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({discount, finalPrice, couponLoading: false});
  };
  onCouponCodeChange = (couponCode) =>
    this.setState({couponCode: couponCode.toUpperCase().slice(0, 9)});
  renderCouponInput = () => {
    const submitDisabled = this.state.couponLoading || this.state.couponCode.length<6;
    return (
      <View
        style={styles.applyCoupon}
      >
        <TextInput
          autoCorrect={false}
          value={this.state.couponCode.toUpperCase()}
          style={styles.applyCouponinput}
          placeholder={strings.ENTER_COUPON_CODE}
          placeholderTextColor={appTheme.grey}
          onChangeText={this.onCouponCodeChange}
          maxLength={9}
        />

        <TouchableOpacity
          onPress={this.applyCoupon}
          style={[styles.applyCouponbutton, submitDisabled?styles.disabled:null]}
          disabled={submitDisabled}
        >
          {this.state.couponLoading && <ActivityIndicator color={appTheme.textPrimary} size={20}/>}
          {!this.state.couponLoading && <Text style={{color: "#fff"}}>{strings.APPLY}</Text>}
        </TouchableOpacity>

      </View>
    );
  };

  onBackPress = () => {
    this.props.navigation.goBack();
  };

  onConfirmPress = async () => {
    const {couponCode} = this.state;
    this.setState({subscribeLoading: true});
    const {route, userData, navigation, syncSubscriptions} = this.props;
    const {metadata, userId, packageId} = route.params;
    const {time, days} = metadata;
    const {packageName, price} = metadata;

    let result = await this.props.subscribePackage(
      userId,
      packageId,
      time,
      days,
      couponCode
    );
    if (result && result.success) {
      const {orderId, subscriptionId} = result;
      const options = {
        description: packageName,
        image:
          "https://about.wodup.com/wp-content/uploads/2018/11/a84f9b3b-a46c-4a3c-9ec9-ba87b216548a-300x300.jpg",
        currency: "INR",
        key: paymentKey,
        amount: price,
        name: appName,
        order_id: orderId,
        prefill: {
          email: userData.email || "",
          contact: "",
          name: userData.name || "",
        },
        theme: {color: appTheme.background, backgroundColor: "red"},
      };

      RazorpayCheckout.open(options)
        .then((data) => {
          showSuccess("Payment successful");
          navigation.popToTop();
          sendPaymentData(data);
          syncSubscriptions();
          console.log("payment success", data);
        })
        .catch((error) => {
          console.log(subscriptionId, orderId);
          subscribeRollback(subscriptionId, orderId);
          showError("Payment Failed, try again");
          console.log(error);
        });
    } else {
      showError(strings.SLOT_BOOKING_ERROR);
    }
    this.setState({subscribeLoading: false});
  };

  render() {
    return (
      <LinearGradient
        colors={[appTheme.darkGrey, appTheme.background]}
        style={styles.container}
      >
        <KeyboardAwareScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          enableOnAndroid={true}
          contentContainerStyle={{marginTop: spacing.large_lg}}
          keyboardShouldPersistTaps={"handled"}
        >
          <StatusBar backgroundColor={appTheme.background}/>

          <this.renderPackageCard/>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.onBackPress}
            >
              <Ion name={"ios-arrow-back"} color={colors.appBlue} size={24}/>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.onConfirmPress}
            >
              {this.state.subscribeLoading && (
                <ActivityIndicator size={28} color={appTheme.brightContent}/>
              )}
              {!this.state.subscribeLoading && (
                <FontAwesome
                  name={"check"}
                  color={appTheme.brightContent}
                  size={24}
                />
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.medium_sm,
    paddingVertical:0
  },
  subtitle: {
    backgroundColor: appTheme.darkBackground,
    borderRadius: 10,
    padding: spacing.small,
    paddingLeft: spacing.medium_lg,
    color: "white",
    fontSize: fontSizes.h2,
    fontFamily: fonts.PoppinsRegular,
    textAlignVertical: "top",
  },
  row: {
    marginTop: spacing.medium,
  },
  card: {
    backgroundColor: appTheme.darkBackground,
    borderRadius: 2,
    padding: spacing.medium,
    paddingTop: 0,
    paddingBottom: spacing.medium_lg,
    elevation: 5,
    flex: 4,
  },
  sectionTitle: {
    color: appTheme.brightContent,
    fontSize: fontSizes.h1,
    fontFamily: fonts.CenturyGothicBold,
    marginBottom: spacing.small,
  },
  detail: {
    color: "white",
    fontSize: fontSizes.h3,
    fontFamily: fonts.CenturyGothic,
    marginBottom: spacing.small_sm,
  },
  separator: {
    borderWidth: 1,
    borderColor: appTheme.grey,
    borderRadius: 3,
    padding: spacing.medium,
    paddingTop: spacing.small,
    marginTop: spacing.small_sm,
    // marginTop: spacing.medium_sm,
    // marginBottom: spacing.medium_sm
  },
  buttonRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: spacing.medium_lg,
    paddingLeft: spacing.large,
    paddingRight: spacing.large,
    paddingBottom: spacing.small,
    marginBottom: spacing.large_lg,
  },
  buttonContainer: {
    height: 60,
    width: 60,
    borderRadius: 60,
    backgroundColor: appTheme.darkBackground,
    alignItems: "center",
    justifyContent: "center",
  },
  dateRange: {
    width: "100%",
    backgroundColor: appTheme.brightContentFaded,
    marginTop: spacing.small,
    marginBottom: spacing.small,
    padding: spacing.medium_sm,
    borderRadius: 5,
    color: "white",
    textAlign: "center",
    fontFamily: fonts.CenturyGothicBold,
  },
  daysContainer: {
    flexDirection: "row",
    width: "100%",
    margin: spacing.small,
    marginBottom: spacing.medium,
  },
  dayBox: {
    padding: spacing.medium_sm - 2,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 6,
    borderColor: appTheme.brightContent,
    fontFamily: fonts.Monospace,
    fontWeight: "bold",
    fontSize: fontSizes.h4,
    textAlign: "center",
    marginRight: spacing.small,
  },
  packageBox: {
    backgroundColor: "white",
    borderRadius: 6,
    padding: spacing.small,
  },
  packageTitleRow: {
    justifyContent: "space-between",
    borderRadius: 6,
    flexDirection: "row",
    padding: spacing.medium_sm,
  },
  packageTitle: {
    color: "white",
    fontFamily: fonts.CenturyGothicBold,
    fontSize: fontSizes.h4,
  },
  packageValue: {
    fontSize: fontSizes.h4,
    color: "#20222f",
  },
  mainDiscount: {flexDirection: 'row', flex: 1, marginTop: '10%'},
  congrats: {color: '#FFF', fontSize: 14, fontWeight: 'bold', fontFamily: fonts.CenturyGothicBold},
  finalamount: {color: '#ff7f50', fontSize: 14, fontWeight: 'bold', fontFamily: fonts.CenturyGothicBold},
  applyCoupon: {
    flexDirection: "row",
    alignContent: "center",
    marginTop: 20,
    flex: 1,

  },
  applyCouponinput: {
    color: appTheme.textPrimary,

    borderWidth: 1,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    height: 40,
    backgroundColor: '#2b2e41',
    borderColor: "#20222f",
    // padding: spacing.small,
    paddingTop: 7,
    paddingLeft: 27,
    flex: 6
  },
  applyCouponbutton: {
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    marginLeft: -3,
    borderWidth: 1,
    backgroundColor: "#ff7f50",
    flex: 3,
    borderColor: "#20222f",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: 14,
    fontFamily: fonts.CenturyGothic,
  },
  disabled:{
    backgroundColor:appTheme.grey
  }
});

const mapStateToProps = (state) => ({
  userData: state.user.userData,
});

const mapDispatchToProps = (dispatch) => ({
  syncSubscriptions: () => dispatch(actionCreators.syncSubscriptions()),
  subscribePackage: (trainerId, packageId, time, days, couponCode) =>
    dispatch(
      actionCreators.subscribePackage(
        trainerId,
        packageId,
        time,
        days,
        couponCode
      )
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Packages);
