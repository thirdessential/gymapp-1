/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {PureComponent} from 'react';
import {StyleSheet, View} from 'react-native'
import {connect} from "react-redux";
import {FlatGrid} from 'react-native-super-grid';

import {appTheme} from "../../constants/colors";
import {spacing} from "../../constants/dimension";
import fonts from "../../constants/fonts";
import strings from "../../constants/strings";
import fontSizes from "../../constants/fontSizes";
import RouteNames from "../../navigation/RouteNames";
import {POST_TYPE, userTypes} from "../../constants/appConstants";
import ImageCard, {cardSize} from "../../components/ImageCard";
import {iconBackgrounds} from "../../constants/images";

class Tools extends PureComponent {

  openPackages = () => this.props.navigation.navigate(RouteNames.Packages)
  openAppointments = () => this.props.navigation.navigate(RouteNames.MyAppointments)
  openSlots = () => this.props.navigation.navigate(RouteNames.SlotsView)
  openSubscriptions = () => {
    const {userType} = this.props;
    if (userType === userTypes.TRAINER)
      this.props.navigation.navigate(RouteNames.Subscriptions);
    else this.openSlots();
  }
  openSchedule = () => this.props.navigation.navigate(RouteNames.Schedule)
  openQuestion = () => this.props.navigation.navigate(RouteNames.CreatePost, {type: POST_TYPE.TYPE_QUESTION})
  openBMI = () => this.props.navigation.navigate(RouteNames.BMI);
  openCouponMachine = () => this.props.navigation.navigate(RouteNames.CouponMachine);

  state = {
    toolsData: []
  }

  componentDidMount() {
    const {userType} = this.props;

    const toolsData = [
      {
        title: strings.PACKAGES,
        image: iconBackgrounds.packages,
        callback: this.openPackages,
        enabled: userType === userTypes.TRAINER
      }, {
        title: strings.APPOINTMENTS,
        image: iconBackgrounds.appointments,
        callback: this.openAppointments,
        enabled: true
      }, {
        title: strings.SLOTS,
        image: iconBackgrounds.slots,
        callback: this.openSlots,
        enabled: userType === userTypes.TRAINER

      }, {
        title: strings.SUBSCRIPTIONS,
        image: iconBackgrounds.subscriptions,
        callback: this.openSubscriptions,
        enabled: true,
      }, {
        title: strings.SCHEDULE,
        image: iconBackgrounds.workouts,
        callback: this.openSchedule,
        enabled: userType === userTypes.USER
      }, {
        title: strings.ASK_EXPERT,
        image: iconBackgrounds.waterIntake,
        callback: this.openQuestion,
        enabled: userType === userTypes.USER
      }, {
        title: strings.BMI_CALCULATOR,
        image: iconBackgrounds.bmr,
        callback: this.openBMI,
        enabled: true
      }, {
        title: strings.COUPONS,
        image: iconBackgrounds.coupon,
        callback: this.openCouponMachine,
        enabled: userType === userTypes.TRAINER
      },
    ]
    this.setState({toolsData: toolsData.filter(toolData => toolData.enabled)});
  }

  renderCard = (item) => (
    <ImageCard title={item.title} onPress={item.callback} image={item.image}/>
  )

  render() {
    return (
      <View style={styles.container}>
        <FlatGrid
          itemDimension={cardSize}
          showsVerticalScrollIndicator={false}
          data={this.state.toolsData}
          renderItem={({item}) => this.renderCard(item)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: appTheme.background,
    flex: 1,
    padding: spacing.medium_sm,
    paddingTop: spacing.small
  },
  separator: {
    borderBottomWidth: 0.4,
    borderColor: appTheme.grey,
  },
  toolContainer: {
    padding: spacing.medium_sm,
    paddingBottom: spacing.medium,
    paddingTop: spacing.medium,
    flexDirection: 'row',
    alignItems: 'center'
  },
  toolText: {
    color: 'white',
    fontFamily: fonts.MontserratMedium,
    marginLeft: spacing.medium_lg,
    marginRight: 'auto',
    fontSize: fontSizes.h1
  }


});

const mapStateToProps = (state) => ({
  userType: state.user.userType
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Tools);