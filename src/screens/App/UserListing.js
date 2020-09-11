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
import {appTheme} from "../../constants/colors";
import RouteNames from "../../navigation/RouteNames";
import * as actionCreators from '../../store/actions';
import {defaultDP, INITIAL_PAGE} from "../../constants/appConstants";
import {spacing} from "../../constants/dimension";
import {generateTrainerHits} from "../../utils/utils";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";

class UserListing extends Component {

  state = {
    nextPage: INITIAL_PAGE // pagination state for user list
  }

  componentDidMount() {
    this.updateUsers();
  }

  updateUsers = async () => {
    const {updateUsersList} = this.props;
    const {nextPage} = this.state;
    if (!!nextPage) // fire this method again and again until list is exhausted
      this.setState({nextPage: await updateUsersList(nextPage)});
  }
  openProfile = (userId) => {
    const {navigation} = this.props;
    navigation.navigate(RouteNames.Profile, {
      userId: userId,
    });
  }
  openPackage = (userId, packageId) => {
    const {navigation} = this.props;
    navigation.navigate(RouteNames.PackagesView, {
      userId,
      packageId
    });
  }
  getPostCount = userId => {
    const {postsForUser} = this.props;
    if (postsForUser[userId])
      return postsForUser[userId].length;
    return 0;
  }

  renderUserThumb = (user, index) => {
    let {name, userType, experience = 0, rating, displayPictureUrl, packages, city, slots} = user;
    if (!displayPictureUrl) displayPictureUrl = defaultDP;
    const postCount = this.getPostCount(user._id);
    return (
      <View style={styles.userContainer}>
        <TrainerThumb
          name={name || 'Trainer'}
          location={city}
          hits={generateTrainerHits({
            transformation: experience,
            slot: slots.length,
            program: packages.length,
            post: postCount
          })}
          dpUrl={displayPictureUrl}
          rating={rating}
          packages={packages}
          onPress={() => this.openProfile(user._id)}
          onPackagePress={(packageId) => this.openPackage(user._id, packageId)}
        />
      </View>
    )
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (nextProps.userList.length !== this.props.userList.length) // fancy way to check if we have to animate new users
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    return true;
  }

  renderHorizontalSeparatorView = () => <View style={styles.itemSeparatorHorizontal}/>

  render() {
    const {userList} = this.props;
    return (<>
        <StatusBar backgroundColor={appTheme.lightBackground}/>
        <View
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
    paddingBottom: spacing.medium,
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
    color: appTheme.textPrimary,
    fontSize: fontSizes.h0,
    fontFamily: fonts.PoppinsRegular
  },
  listContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: appTheme.background,
    width: '100%',
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
  postsForUser: state.social.postsForUser
});

const mapDispatchToProps = (dispatch) => ({
  updateUsersList: (nextPage) => dispatch(actionCreators.updateUsersList(nextPage)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserListing);