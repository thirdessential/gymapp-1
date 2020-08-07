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
  openCallRequests = () => this.props.navigation.navigate(RouteNames.CallRequests)
  openClients = () => this.props.navigation.navigate(RouteNames.SubscriptionsView)
  // openBrowseSlots = () => this.props.navigation.navigate(RouteNames.BrowseSlots)
  openQuestion = () => this.props.navigation.navigate(RouteNames.CreatePost, {type: POST_TYPE.TYPE_QUESTION})
  openBMI = () => this.props.navigation.navigate(RouteNames.BMI);
  openCouponMachine = () => this.props.navigation.navigate(RouteNames.CouponMachine);
  openAccountDash = () => this.props.navigation.navigate(RouteNames.AccountDash);
  openSpeech=()=>this.props.navigation.navigate(RouteNames.Speech);
  openStreamingScreen = () => this.props.navigation.navigate(RouteNames.StreamScreen);
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
        title: strings.CALL_REQUESTS,
        image: iconBackgrounds.appointments,
        callback: this.openCallRequests,
        enabled: userType===userTypes.TRAINER
      }, {
        title: strings.MY_CLIENTS,
        image: iconBackgrounds.slots,
        callback: this.openClients,
        enabled: userType === userTypes.TRAINER

      }, {
        title: strings.SUBSCRIPTIONS,
        image: iconBackgrounds.subscriptions,
        callback: this.openClients,
        enabled: userType === userTypes.USER,
      },
      // {
      //   title: strings.BROWSE_SLOTS,
      //   image: iconBackgrounds.workouts,
      //   callback: this.openBrowseSlots,
      //   enabled: userType === userTypes.USER
      // },
      {
        title: strings.ASK_EXPERT,
        image: iconBackgrounds.waterIntake,
        callback: this.openQuestion,
        enabled: userType === userTypes.USER
      }, {
        title: strings.BMI_CALCULATOR,
        image: iconBackgrounds.bmr,
        callback: this.openBMI,
        enabled: true
      },
      {
        title: strings.SPEECH,
        image: iconBackgrounds.waterIntake,
        callback: this.openSpeech,
        enabled: userType === userTypes.USER
      },
      {
        title: strings.COUPONS,
        image: iconBackgrounds.coupon,
        callback: this.openCouponMachine,
        enabled: userType === userTypes.TRAINER
      },
      {
        title: strings.ACCOUNT_LOWER,
        image: iconBackgrounds.graphMan,
        callback: this.openAccountDash,
        enabled: userType === userTypes.TRAINER
      },
      {
        title: strings.STREAM,
        image: iconBackgrounds.graphMan,
        callback: this.openStreamingScreen,
        enabled: true
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
    paddingHorizontal: spacing.medium_sm,
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