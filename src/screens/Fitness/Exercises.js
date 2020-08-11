import React, {PureComponent, Component} from "react";
import {
  ActivityIndicator,
  FlatList,
  LayoutAnimation,
  ScrollView,
  StyleSheet,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  Button,
  Alert,
} from "react-native";
import {connect} from "react-redux";

import {appTheme} from "../../constants/colors";
import {spacing} from "../../constants/dimension";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import strings from "../../constants/strings";
import {screenHeight, screenWidth} from "../../utils/screenDimensions";
import * as actionCreators from "../../store/actions";
import RouteNames from "../../navigation/RouteNames";

const categories = [
  {
    url:
      "https://images.unsplash.com/photo-1550259979-ed79b48d2a30?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
    type: "CARDIO",
  },
  {
    url:
      "https://images.unsplash.com/photo-1562771379-eafdca7a02f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
    type: "STRETCH",
  },
  {
    url:
      "https://image.shutterstock.com/mosaic_250/818215/1043370892/stock-photo-fit-young-man-in-sportswear-focused-on-lifting-a-dumbbell-during-an-exercise-class-in-a-gym-1043370892.jpg",
    type: "WORKOUT",
  },
  {
    url:
      "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=626&q=80",
    type: "YOGA",
  },
 
 
  
];

const bodyParts = [
  {
    url:
      "https://3.bp.blogspot.com/-oFwofSWO-XQ/ViiCsb0p_nI/AAAAAAAAEfs/vKzc9-8AXIk/s1600/Six%2BPack%2BAbs%2BHD%2BWallpaper.jpg",
    type: "ABS",
  },
  {
    url:
      "https://images.unsplash.com/photo-1583454122781-8cf8f5af9d2b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
    type: "ARMS",
  },
  {
    url:
      "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    type: "BACK",
  },
  {
    url:
      "https://media.self.com/photos/5dd2f7580e115400090e89be/16:9/w_1600,c_limit/190916_SELF_1101.jpg",
    type: "BUTTOCKS",
  },
  {
    url:
      "https://manofmany.com/wp-content/uploads/2019/03/10-Best-Chest-Exercises-for-Men-1280x720.jpg",
    type: "CHEST",
  },
  {
    url:
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    type: "FULL BODY",
  },
  {
    url:
      "https://cdn-ami-drupal.heartyhosting.com/sites/muscleandfitness.com/files/styles/full_node_image_1090x614/public/quad-exercise-routine-3.jpg?itok=sfR46rrH&timestamp=1370452907",
    type: "LEGS",
  },

  {
    url:
      "https://manofmany.com/wp-content/uploads/2019/03/10-Best-Shoulder-Exercises-for-Men-Man-lifting-weights-shoulder-muscle-1280x720.jpg",
    type: "SHOULDERS",
  },
  
];

class Exercises extends PureComponent {
  // navigation.setOptions({ tabBarVisible: false })
  openSelectExercise = (type) => {
    this.props.navigation.navigate(RouteNames.SelectExercise, {type});
  }

  renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.touchableCards}
      onPress={() => this.openSelectExercise(item.type)}
    >
      <View style={styles.cardView}>
        <ImageBackground
          style={styles.cardImage}
          source={{uri: item.url}}
        >
          <View style={styles.cardTextView}>
            <Text style={styles.cardListText}>{item.type}</Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
  feautred = (uri, type,desc) => (
    <View style={styles.imageContainer}>
      <Image
        style={styles.image}
        source={{
          uri: uri,
        }}
      />
      <View style={styles.imageTitle}>
        <Text style={styles.cardText}>{type}</Text>
        <Text style={styles.imageSubtitle}>{desc}</Text>
      </View>
    </View>
  );

  render() {
    return (
      <>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              marginTop: spacing.medium_sm,
              marginLeft: spacing.space_40,
            }}
          >
            <Text style={styles.featuredText}>{strings.FEATURED_WORKOUT}</Text>
          </View>
          {Math.floor(Math.random() * 10) % 2 == 0
            ? this.feautred(bodyParts[0].url, bodyParts[0].type,'Abdominal exercises affect the abdominal muscles ')
            : this.feautred(bodyParts[5].url, bodyParts[5].type,'Workout that aims to hit all the major muscle groups')}
          <View style={styles.itemContainer}>
            <View style={styles.optionContainer}>
              <View style={{marginLeft: spacing.large_lg}}>
                <Text style={styles.discover}>{strings.DISCOVER}</Text>
              </View>
              <ScrollView>
                <View style={styles.horizontalList}>
                  <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={styles.flatList}
                    keyExtractor={(item) => item.type}
                    data={bodyParts}
                    renderItem={this.renderItem}
                  />
                </View>
                <View style={styles.horizontalList}>
                  <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={styles.flatList}
                    keyExtractor={(item) => item.type}
                    data={categories}
                    renderItem={this.renderItem}
                  />
                </View>
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  gridView: {
    flex: 1,
  },

  container: {
    backgroundColor: appTheme.background,
    flex: 1,
  },
  featuredText: {
    color: appTheme.textPrimary,
    fontSize: fontSizes.h0,
    fontFamily: fonts.CenturyGothic,
  },
  imageContainer: {
    height: 240,
    flexDirection: "row",
    margin: spacing.medium_lg,
  },
  image: {
    width: "100%",
    height: 240,
    position: "absolute",
    borderRadius: 10,
  },
  imageTitle: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    alignSelf: "flex-end",

    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  imageSubtitle: {
    color: appTheme.textPrimary,
    fontWeight: "bold",
    marginLeft: spacing.medium_sm,
    fontSize: fontSizes.h2,
    marginBottom: spacing.small,
  },
  itemContainer: {
    marginTop: spacing.medium_lg,
    backgroundColor: appTheme.darkBackground,
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: screenHeight / 2,
  },
  discover: {
    color: appTheme.textPrimary,
    fontSize: fontSizes.h0,
    fontFamily: fonts.CenturyGothic,
  },

  optionContainer: {
    marginTop: spacing.medium_lg,
  },
  horizontalList: {
    marginTop: spacing.medium_lg,
    marginHorizontal: spacing.small,
  },
  flatList: {height: 120, marginTop: 5},
  touchableCards: {
    width: 200,
    height: "100%",
    marginHorizontal: 10,
  },
  cardView: {
    borderRadius: 20,
    height: "100%",
    width: "100%",
  },
  cardImage: {
    height: "100%",
    width: "100%",
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    overflow: "hidden",
  },
  cardText: {
    color: appTheme.textPrimary,
    fontSize: fontSizes.h0,
    fontFamily: fonts.CenturyGothic,
    margin: spacing.medium_sm,
  },
  cardListText: {
    color: appTheme.textPrimary,
    fontSize: fontSizes.h2,
    fontFamily: fonts.CenturyGothic,
    marginLeft: spacing.medium_sm,
  },
  cardTextView: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    alignSelf: "flex-start",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Exercises);
