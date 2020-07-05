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
  LayoutAnimation
} from 'react-native'
import {connect} from "react-redux";

import TrainerThumb from '../../components/Trainer/TrainerThumb';
import colors, {appTheme} from "../../constants/colors";
import RouteNames, {TabRoutes} from "../../navigation/RouteNames";
import * as actionCreators from '../../store/actions';
import {userTypes} from "../../constants/appConstants";
import UserThumb from "../../components/Trainer/UserThumb";
import {spacing} from "../../constants/dimension";
import requestCameraAndAudioPermission from "../../utils/permission";
import {generateTrainerHits, generateUserHits, initialiseVideoCall} from "../../utils/utils";

const defaultDP = 'https://media.istockphoto.com/photos/middle-aged-gym-coach-picture-id475467038';

class UserListing extends Component {

  componentDidMount() {
    const {updateUsersList, updateUserData, navigation} = this.props;
    updateUserData();
    this.unsubscribeFocus = navigation.addListener('focus', e => {
      updateUsersList();
    })
  }

  componentWillUnmount() {
    this.unsubscribeFocus()
  }

  openProfile = (userId, initialRouteName=TabRoutes.Packages) => {
    const {navigation} = this.props;
    navigation.navigate(RouteNames.Profile, {
      userId: userId,
      initialRouteName
    });
  }

  callClicked = async (userId) => {
    const permissionGranted = await requestCameraAndAudioPermission();

    if (permissionGranted) {
      await initialiseVideoCall(userId);
    } else console.log("Cant initiate video call without permission");
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
              onPackagePress={()=>this.openProfile(user._id, TabRoutes.Packages)}
              callClicked={() => this.callClicked(user._id)}
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
        <StatusBar backgroundColor={appTheme.darkBackground}/>
        <View style={styles.listContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={styles.container}
            data={userList}
            renderItem={({item, index}) => this.renderUserThumb(item, index)}
            keyExtractor={(item, index) => item._id}
            ItemSeparatorComponent={this.renderHorizontalSeparatorView}
            ListFooterComponent={() => <View style={{height: 100}}/>}
          />
          {
            userList.length === 0 && (
              <ActivityIndicator style={{position: 'absolute'}} color={appTheme.lightContent} size={50}/>
            )
          }
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingLeft: spacing.medium,
    paddingRight: spacing.medium,
    paddingTop: spacing.space_40,
    paddingBottom: spacing.medium,
    backgroundColor: appTheme.background,
  },
  listContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: appTheme.background,
    width: '100%',
    paddingTop: spacing.large,
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
  updateUsersList: () => dispatch(actionCreators.updateUsersList()),
  updateUserData: () => dispatch(actionCreators.updateUserData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserListing);