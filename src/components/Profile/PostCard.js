import React, {Component} from "react";
import {Text, StyleSheet, View, Image, TouchableOpacity} from "react-native";
import {spacing} from "../../constants/dimension";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import HitCounter from "./HitCounter";
import size from "../../constants/fontSizes";
import colors, {appTheme} from "../../constants/colors";
import fonts from "../../constants/fonts";

export default class PostCard extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.topRow}>
          <View style={styles.profilePicContainer}>
            <Image
              source={ this.props.profilePicUri}
              style={styles.profilepic}
              resizeMode={'contain'}
            />
          </View>
          <View style={{flex: 6, paddingLeft: spacing.medium_sm}}>
            <View style={styles.titileContainer}>
              <Text numberOfLines={1} style={styles.title}>
                {/*{this.props.title}*/}
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text
                numberOfLines={1}
                style={{color: appTheme.grey, fontSize: size.h1}}
              >
                {/*{this.props.bio}*/}
              </Text>
            </View>
          </View>
          {/*<View style={styles.editIcon}>*/}
          {/*  <TouchableOpacity>*/}
          {/*    <FontAwesome color={'white'} name="ellipsis-v" size={spacing.medium_lg}/>*/}
          {/*  </TouchableOpacity>*/}
          {/*</View>*/}
        </View>

        <View style={styles.desrepContainer}>
          <Text
            // numberOfLines={4}
            style={{fontSize: size.h2, color: 'white', textAlign: "justify"}}
          >
            {this.props.discription}
          </Text>
        </View>
        {
          this.props.postPicSrc && (
            <View>
              <Image
                source={this.props.postPicSrc}
                style={styles.postImage}
              />
            </View>
          )
        }
        {/*<View style={styles.hitCounterContainer}>*/}
        {/*  <HitCounter icon="thumbs-up" iconValue={this.props.like}/>*/}
        {/*  <HitCounter icon="comment" iconValue={this.props.comment}/>*/}
        {/**/}
        {/*  <View style={styles.timeStatusContainer}>*/}
        {/*    <Text style={{fontSize: 18, color: colors.darkGrey}}>*/}
        {/*      {this.props.timeStatus}*/}
        {/*    </Text>*/}
        {/*  </View>*/}
        {/*</View>*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: spacing.medium_sm,
    backgroundColor: appTheme.darkBackground,
    borderRadius: spacing.medium,
    elevation: 4,
    paddingLeft: spacing.medium,
    paddingRight: spacing.medium
  },
  topRow: {
    flex: 1,
    flexDirection: "row",
    marginBottom: spacing.medium_sm,
  },
  profilePicContainer: {
    flex: 2,

    justifyContent: "center",
    alignItems: "center",
  },
  profilepic: {
    height: spacing.thumbnailMiniPlus+10,
    width: spacing.thumbnailMiniPlus+10,
    borderRadius: 8,
  },
  titileContainer: {
    flex: 1,

    justifyContent: "flex-end",
  },
  title: {
    color: 'white',
    fontFamily: fonts.MontserratMedium,
    fontSize: spacing.large
  },
  editIcon: {
    // flex: 1,
    justifyContent: "center",
    // alignItems: "center",
  },
  desrepContainer: {
    flex: 1,

    marginBottom: spacing.medium_sm,
  },
  postImage: {
    height: spacing.coverImageSize,
    width: "100%",
    borderRadius: spacing.medium_lg,
  },
  hitCounterContainer: {
    flex: 1,
    flexDirection: "row",
    margin: spacing.medium_sm,
  },
  timeStatusContainer: {
    flex: 2,

    justifyContent: "center",
    alignItems: "flex-end",
  },
  buttonContainer: {marginTop: spacing.medium_sm, flexDirection: "row"},
  buttonSubContainer: {
    flex: 3,

    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    height: 30,
    width: "95%",
    backgroundColor: "black",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 5,
  },
});
