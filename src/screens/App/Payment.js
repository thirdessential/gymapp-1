/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {Component} from 'react';
import {View, StyleSheet, TextInput, Text, TouchableOpacity, StatusBar} from 'react-native'
import {connect} from "react-redux";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ion from "react-native-vector-icons/Ionicons";

import {spacing} from "../../constants/dimension";
import * as actionCreators from "../../store/actions";
import colors, {appTheme, darkPallet} from "../../constants/colors";
import strings from "../../constants/strings";
import fonts from "../../constants/fonts";
import fontSizes from "../../constants/fontSizes";
import {validatePackage} from "../../utils/validators";
import LinearGradient from "react-native-linear-gradient";
import {string} from "prop-types";
import {militaryTimeToString} from "../../utils/utils";
import {appName, paymentKey} from "../../constants/appConstants";
import RazorpayCheckout from "react-native-razorpay";
import {showError, showSuccess} from "../../utils/notification";
import {sendPaymentData} from "../../API";

class Packages extends Component {

  renderRow = (title, value) => {
    return (
      <View style={styles.row}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{value}</Text>
      </View>
    )
  }

  renderPackageCard = () => {
    const {route} = this.props;
    const {metadata} = route.params;
    // const metadata = {
    //   packageName: 'random title',
    //   sessionCount: 23,
    //   price: 2342,
    //   time: '0500',
    //   days: ['MON', 'TUE'],
    //   approxDuration: 50,
    //   subscriptionId: 'dasffs',
    //   trainerName: 'Random name'
    // };
    const {packageName, sessionCount, price, time, days} = metadata;
    return (<>
        {this.renderRow(strings.PACKAGE_NAME, packageName)}
        {this.renderRow(strings.SESSIONS, sessionCount)}
        {this.renderRow(strings.PRICE_TITLE, strings.RUPEE + ' ' + (parseInt(price) / 100))}
        {this.renderRow(strings.TIMING, militaryTimeToString(time))}
        {this.renderRow(strings.RUNNING_DAYS, days.toString())}
      </>
    )
  }

  onBackPress = () => {
    this.props.navigation.goBack();
  }

  onConfirmPress = () => {
    const {route, userData, navigation} = this.props;
    const {orderId, metadata} = route.params;
    const {packageName, price} = metadata;

    const options = {
      description: packageName,
      image: 'https://about.wodup.com/wp-content/uploads/2018/11/a84f9b3b-a46c-4a3c-9ec9-ba87b216548a-300x300.jpg',
      currency: 'INR',
      key: paymentKey,
      amount: price,
      name: appName,
      order_id: orderId,
      prefill: {
        email: userData.email || '',
        contact: '',
        name: userData.name || ''
      },
      theme: {color: appTheme.background, backgroundColor: 'red'}
    }

    RazorpayCheckout.open(options).then((data) => {
      // handle success
      showSuccess("Payment successful");
      navigation.popToTop();
      sendPaymentData(data);
      console.log("payment success",data)
    }).catch((error) => {
      // handle failure
      showError('Payment Failed, try again');
      console.log(error);
    });
  }

  render() {
    return (
      <LinearGradient
        colors={[appTheme.darkGrey, appTheme.background]}
        style={styles.container}>
        <KeyboardAwareScrollView style={styles.container} enableOnAndroid={true} keyboardShouldPersistTaps={'handled'}>
          <StatusBar backgroundColor={appTheme.darkBackground}/>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{strings.PACKAGE_SUMMARY}</Text>
          </View>
          <View style={styles.content}>
            <this.renderPackageCard/>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.buttonContainer} onPress={this.onBackPress}>
              <Ion
                name={'ios-arrow-back'}
                color={colors.appBlue}
                size={24}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer} onPress={this.onConfirmPress}>
              <FontAwesome
                name={'check'}
                color={appTheme.brightContent}
                size={24}
              />
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
  },
  titleContainer: {
    flex: 1,
    paddingTop: spacing.medium,
    paddingLeft: spacing.large,
    paddingRight: spacing.large,
  },
  title: {
    color: 'white',
    fontSize: fontSizes.h2,
    fontFamily: fonts.PoppinsRegular
  },
  titleText: {
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
  subtitle: {
    backgroundColor: appTheme.darkBackground,
    borderRadius: 10,
    padding: spacing.small,
    paddingLeft: spacing.medium_lg,
    color: 'white',
    fontSize: fontSizes.h2,
    fontFamily: fonts.PoppinsRegular,
    textAlignVertical: "top"
  },
  row: {
    marginTop: spacing.medium,
  },
  buttonRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: spacing.medium_lg,
    paddingLeft: spacing.large,
    paddingRight: spacing.large,
    paddingBottom: spacing.small,
    marginBottom: spacing.large_lg
  },
  buttonContainer: {
    height: 60,
    width: 60,
    borderRadius: 60,
    backgroundColor: appTheme.darkBackground,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const mapStateToProps = (state) => ({
  userData: state.user.userData
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Packages);

