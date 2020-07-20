/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  StatusBar,
  ActivityIndicator,
  LayoutAnimation,
} from 'react-native'
import {connect} from "react-redux";

import TrainerThumb from '../../components/Trainer/TrainerThumb';
import  {appTheme, darkPallet} from "../../constants/colors";
import RouteNames from "../../navigation/RouteNames";
import * as actionCreators from '../../store/actions';
import {defaultDP, INITIAL_PAGE, userTypes} from "../../constants/appConstants";
import UserThumb from "../../components/Trainer/UserThumb";
import {spacing} from "../../constants/dimension";
import {generateTrainerHits, generateUserHits} from "../../utils/utils";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import LinearGradient from "react-native-linear-gradient";
import {setAvailable} from "../../API";

class UserListing extends Component {

  state = {
    nextPage: INITIAL_PAGE
  }

  componentDidMount() {
    setAvailable();
    const { navigation,getActivities,getAppointments} = this.props;
    getAppointments();
    getActivities();
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

  openProfile = (userId) => {
    const {navigation} = this.props;
    navigation.navigate(RouteNames.Profile, {
      userId: userId,
    });
  }
  openPackage = (userId,packageId)=>{
    const {navigation} = this.props;
    navigation.navigate(RouteNames.PackagesView, {
      userId,
      packageId
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
              onPackagePress={(packageId) => this.openPackage(user._id, packageId)}
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

  render() {
    const {userList} = this.props;
    return (<>
        <StatusBar backgroundColor={appTheme.lightBackground}/>
        <LinearGradient
          colors={[darkPallet.darkBlue, darkPallet.extraDarkBlue]}
          style={styles.listContainer}>
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
  getActivities: ()=>dispatch(actionCreators.getActivities()),
  getAppointments: ()=>dispatch(actionCreators.getAppointments())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserListing);