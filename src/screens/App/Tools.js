/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {connect} from "react-redux";
import {FlatGrid} from 'react-native-super-grid';

import {appTheme} from "../../constants/colors";
import {spacing} from "../../constants/dimension";
import {screenWidth} from "../../utils/screenDimensions";
import Feather from "react-native-vector-icons/Feather";
import fonts from "../../constants/fonts";
import strings from "../../constants/strings";
import Entypo from "react-native-vector-icons/Entypo";
import fontSizes from "../../constants/fontSizes";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import RouteNames from "../../navigation/RouteNames";
import {POST_TYPE, userTypes} from "../../constants/appConstants";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ImageCard from "../../components/ImageCard";
import {iconBackgrounds} from "../../constants/images";

class Tools extends Component {

  openPackages = () => this.props.navigation.navigate(RouteNames.Packages)
  openAppointments = () => this.props.navigation.navigate(RouteNames.MyAppointments)
  openSlots = () => this.props.navigation.navigate(RouteNames.SlotsView)
  openSubscriptions = () => this.props.navigation.navigate(RouteNames.Subscriptions)
  openSchedule = () => this.props.navigation.navigate(RouteNames.Schedule)
  openQuestion = () => this.props.navigation.navigate(RouteNames.CreatePost, {type: POST_TYPE.TYPE_QUESTION})

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
    padding: spacing.medium,
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