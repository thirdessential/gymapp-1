/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  StatusBar,
  ActivityIndicator,
  LayoutAnimation, Text, TouchableHighlight
} from 'react-native'
import {connect} from "react-redux";
import RazorpayCheckout from 'react-native-razorpay';

import TrainerThumb from '../../components/Trainer/TrainerThumb';
import colors, {appTheme, bluePallet, darkPallet} from "../../constants/colors";
import RouteNames, {TabRoutes} from "../../navigation/RouteNames";
import * as actionCreators from '../../store/actions';
import {appName, INITIAL_PAGE, paymentKey, userTypes} from "../../constants/appConstants";
import UserThumb from "../../components/Trainer/UserThumb";
import {spacing} from "../../constants/dimension";
import {requestCameraAndAudioPermission} from "../../utils/permission";
import {generateTrainerHits, generateUserHits, initialiseVideoCall} from "../../utils/utils";
import strings from "../../constants/strings";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import LinearGradient from "react-native-linear-gradient";
import {setAvailable} from "../../API";

const defaultDP = 'https://media.istockphoto.com/photos/middle-aged-gym-coach-picture-id475467038';

class UserListing extends Component {

  state = {
    nextPage: INITIAL_PAGE
  }

  componentDidMount() {
    setAvailable();
    const {updateUserData, navigation} = this.props;
    updateUserData();

    this.unsubscribeFocus = navigation.addListener('focus', e => {
      this.updateUsers();
    })
  }

  updateUsers = async () => {
    const {updateUsersList} = this.props;
    const {nextPage} = this.state;
   if (!!nextPage)
      this.setState({nextPage: await updateUsersList(nextPage)});
  }

  componentWillUnmount() {
    this.unsubscribeFocus()
  }

  openProfile = (userId, initialRouteName = TabRoutes.Packages) => {
    const {navigation} = this.props;
    navigation.navigate(RouteNames.Profile, {
      userId: userId,
      initialRouteName
    });
  }

  renderUserThumb = (user, index) => {
    let {name, userType, experience = 0, rating, displayPictureUrl, packages, city, slots} = user;
    if (!displayPictureUrl) displayPictureUrl = defaultDP;

    return (
      <View style={styles.userContainer}>
        {
          userType === userTypes.USER && (
            <UserThumb
              name={name || 'User'}
              dpUrl={displayPictureUrl}
              location={city}
              plan={Math.random() > 0.5 ? 'Basic' : 'Advanced'}
              onPress={() => this.openProfile(user._id)}
              hits={generateUserHits({})}
            />
          )
        }
        {
          userType === userTypes.TRAINER && (
            <TrainerThumb
              name={name || 'Trainer'}
              location={city}
              hits={generateTrainerHits({transformation: experience, slot: slots.length, program: packages.length})}
              dpUrl={displayPictureUrl}
              description={"No description provided for this trainer"}
              rating={rating}
              packages={packages}
              onPress={() => this.openProfile(user._id)}
              onPackagePress={() => this.openProfile(user._id, TabRoutes.Packages)}
              // callClicked={() => this.callClicked(user._id)}
            />
          )
        }
      </View>
    )
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (nextProps.userList.length !== this.props.userList.length)
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    return true;
  }

  renderHorizontalSeparatorView = () => <View style={styles.itemSeparatorHorizontal}/>

  testPayment = () => {
    var options = {
      description: 'Predator build plan',
      image: 'https://about.wodup.com/wp-content/uploads/2018/11/a84f9b3b-a46c-4a3c-9ec9-ba87b216548a-300x300.jpg',
      currency: 'INR',
      key: paymentKey,
      amount: '5000',
      name: appName,
      order_id: 'order_FBGgv5CRazLlgM',
      prefill: {
        email: 'yatan.vesh@gmail.com',
        contact: '',
        name: 'Yatan vesh'
      },
      theme: {color: appTheme.background, backgroundColor: 'red'}
    }

    RazorpayCheckout.open(options).then((data) => {
      // handle success
      alert(`Success: ${data.razorpay_payment_id}`);
    }).catch((error) => {
      // handle failure
      alert(`Error: ${error.code} | ${error.description}`);
    });

  }

  render() {
    const {userList} = this.props;
    return (<>
        <StatusBar backgroundColor={appTheme.darkBackground}/>
        <LinearGradient
          colors={[darkPallet.darkBlue, darkPallet.extraDarkBlue]}
          style={styles.listContainer}>
          {/*<TouchableHighlight onPress={this.testPayment}>*/}
          {/*  <Text style={styles.title}>Pay</Text>*/}
          {/*</TouchableHighlight>*/}

          <FlatList
            showsVerticalScrollIndicator={false}
            style={styles.container}
            data={userList}
            renderItem={({item, index}) => this.renderUserThumb(item, index)}
            keyExtractor={(item, index) => item._id}
            ItemSeparatorComponent={this.renderHorizontalSeparatorView}
            ListHeaderComponent={() => <View style={{height: spacing.large}}/>}
            ListFooterComponent={() => <View style={{height: spacing.large_lg}}/>}
            onEndReached={this.updateUsers}
            onEndReachedThreshold={0.5}
          />
          {
            userList.length === 0 && (
              <ActivityIndicator style={{position: 'absolute'}} color={appTheme.brightContent} size={50}/>
            )
          }
        </LinearGradient>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingLeft: spacing.medium,
    paddingRight: spacing.medium,
    paddingBottom: spacing.medium,
    // backgroundColor: appTheme.background,
  },
  titleContainer: {
    paddingTop: spacing.medium_sm,
    paddingLeft: spacing.large,
    paddingRight: spacing.large,
    paddingBottom: spacing.medium_sm,
    backgroundColor: appTheme.darkBackground,
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: fontSizes.h0,
    fontFamily: fonts.PoppinsRegular
  },
  listContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: appTheme.background,
    width: '100%',
    // paddingTop: spacing.large,
  },
  itemSeparatorHorizontal: {
    height: 1,
    marginTop: spacing.medium_lg,
    marginBottom: spacing.medium_lg,
    backgroundColor: appTheme.grey,
  },
  userContainer: {
    width: '100%'
  }
});

const mapStateToProps = (state) => ({
  userList: state.app.userList,
});

const mapDispatchToProps = (dispatch) => ({
  updateUsersList: (nextPage) => dispatch(actionCreators.updateUsersList(nextPage)),
  updateUserData: () => dispatch(actionCreators.updateUserData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserListing);