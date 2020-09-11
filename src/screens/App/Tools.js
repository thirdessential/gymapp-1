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
  openSessions = () => this.props.navigation.navigate(RouteNames.Sessions);
  openQuestion = () => this.props.navigation.navigate(RouteNames.CreatePost, {type: POST_TYPE.TYPE_QUESTION})
  openBMI = () => this.props.navigation.navigate(RouteNames.BMI);
  openCouponMachine = () => this.props.navigation.navigate(RouteNames.CouponMachine);
  openAccountDash = () => this.props.navigation.navigate(RouteNames.AccountDash);
  openSpeech = () => this.props.navigation.navigate(RouteNames.Speech);
  openSelectExercise = () => this.props.navigation.navigate(RouteNames.SelectExercise);
  openMyStreams = () => this.props.navigation.navigate(RouteNames.MyStreams);
  openWater = () => this.props.navigation.navigate(RouteNames.Water)
  openCalorie = () => this.props.navigation.navigate(RouteNames.CalorieCounter)
  openRecipe = () => this.props.navigation.navigate(RouteNames.RecipeRecommend)
  state = {
    toolsData: []
  }

  componentDidMount() {
    const {userType} = this.props;
    // Initialise user/trainer specific and common screens
    const toolsData = [
      {
        title: strings.PACKAGES,
        image: iconBackgrounds.packages,
        callback: this.openPackages,
        enabled: userType === userTypes.TRAINER
      },
      {
        title: strings.SESSIONS,
        image: iconBackgrounds.days,
        callback: this.openSessions,
        enabled: true
      },
      {
        title: strings.CALL_REQUESTS,
        image: iconBackgrounds.appointments,
        callback: this.openCallRequests,
        enabled: userType === userTypes.TRAINER
      },
      {
        title: userType === userTypes.USER ? strings.SUBSCRIPTIONS : strings.MY_CLIENTS,
        image: iconBackgrounds.subscriptions,
        callback: this.openClients,
        enabled: true
      },

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
        title: strings.MY_LIVE_STREAMS,
        image: iconBackgrounds.calorie,
        callback: this.openMyStreams,
        enabled: userType === userTypes.TRAINER
      },
      {
        title: strings.WATER,
        image: iconBackgrounds.subscriptions,
        callback: this.openWater,
        enabled: true
      },
      {
        title: strings.CALORIE_COUNTER,
        image: iconBackgrounds.subscriptions,
        callback: this.openCalorie,
        enabled: true
      },
    ]
    this.setState({toolsData: toolsData.filter(toolData => toolData.enabled)}); // pick out enabled screens
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