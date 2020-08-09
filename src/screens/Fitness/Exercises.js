import React, { PureComponent, Component } from "react";
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
  TextInput,
  TouchableHighlight, TouchableNativeFeedback, TouchableWithoutFeedback,
  Alert
} from "react-native";
import { FlatGrid, SectionGrid } from "react-native-super-grid";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import colors, { appTheme, darkPallet } from "../../constants/colors";
import { spacing } from "../../constants/dimension";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import { iconBackgrounds } from "../../constants/images";
import strings from "../../constants/strings";
import { screenHeight, screenWidth } from "../../utils/screenDimensions";
import { updateExerciseIndex, updateUserInfo } from "../../API";
import * as actionCreators from "../../store/actions";




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
      "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
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
      "https://manofmany.com/wp-content/uploads/2019/03/10-Best-Shoulder-Exercises-for-Men-Man-lifting-weights-shoulder-muscle-1280x720.jpg",
    type: "SHOULDERS",
  },
  {
    url:
      "https://cdn-ami-drupal.heartyhosting.com/sites/muscleandfitness.com/files/styles/full_node_image_1090x614/public/quad-exercise-routine-3.jpg?itok=sfR46rrH&timestamp=1370452907",
    type: "LEGS",
  },
];
const categories = [
  {
    url:
      "https://thewallpaper.co//wp-content/uploads/2016/03/yoga-high-resolution-wallpaper-images-full-free-for-desktop-background-widescreen-display-samsung-backgrounds-1920x1280.jpg",
    type: "YOGA",
  },
  {
    url:
      "https://us.123rf.com/450wm/vadymvdrobot/vadymvdrobot1509/vadymvdrobot150900418/45024728-portrait-of-a-fitness-man-doing-stretching-exercises-at-gym.jpg?ver=6",
    type: "STRETCH",
  },
  {
    url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQToXUY2WuidMG6tCZBmujFN9wtIjSEL_WLvA&usqp=CAU",
    type: "EXERCISE",
  },
 
];
class Exercises extends PureComponent {
  // navigation.setOptions({ tabBarVisible: false })
  constructor(props) {
    super(props);
    this.state = {
     bodyParts:bodyParts,
      categories: categories,
    };
  }
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
            <Text style={styles.feautredText}>{strings.FEATURED_WORKOUT}</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{
                uri:
                  "https://static.independent.co.uk/s3fs-public/thumbnails/image/2020/04/17/12/istock-623619166.jpg?w968h681",
              }}
            />
            <View style={styles.imageTitle}>
              <Text
                style={{
                  color: appTheme.textPrimary,
                  fontSize: fontSizes.h0,
                  fontFamily: fonts.CenturyGothic,
                  margin: spacing.medium_sm,
                }}
              >
                {strings.FULL_BODY_WORKOUT.toUpperCase()}
              </Text>
              <Text style={styles.imageSubtitle}>50 min</Text>
            </View>
          </View>
          <View style={styles.itemContainer}>
            <View style={styles.optionContainer}>
              <View style={{ marginLeft: spacing.large_lg }}>
                <Text style={styles.discover}>{strings.DISCOVER}</Text>
              </View>
              <ScrollView>
                <View
                  style={{
                    marginTop: 20,
                    marginHorizontal: 5,
                    borderRadius: 20,
                  }}
                >
                  <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{ height: 120 }}
                    keyExtractor={(item) => item.type}
                    data={this.state.bodyParts}
                    renderItem={({ item }) => (
                     <TouchableOpacity style={{width: 200,height:'100%', marginHorizontal: 10 }} onPress={()=>Alert.alert(`Show card for ${item.type}`)} >
                      <View style={{ borderRadius: 20, height: "100%",
                            width: '100%', }}  >
                        <ImageBackground
                          style={{
                            height: "100%",
                            width: '100%',
                            borderRadius: 10,
                            flex: 1,
                            flexDirection: "row",
                            overflow: "hidden",
                          }}
                          source={{ uri: `${item.url}` }}
                        >
                          <View
                            style={{
                              flex: 1,
                              backgroundColor: "rgba(0, 0, 0, 0.4)",
                              alignSelf: "flex-start",
                              borderTopRightRadius: 10,
                              borderTopLeftRadius: 10,
                            }}
                          >
                            <Text
                              style={{
                                color: appTheme.textPrimary,
                                fontSize: fontSizes.h2,
                                fontFamily: fonts.CenturyGothic,
                                marginLeft: spacing.medium_sm,
                              }}
                            >
                              {item.type}
                            </Text>
                          </View>
                        </ImageBackground>
                      </View>
                      </TouchableOpacity>
                     
                    )}
                  />
                </View>
                <View style={{ marginTop: 10, marginHorizontal: 5 }}>
                  <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{ height: 120, marginTop: 20 }}
                    keyExtractor={(item) => item.type}
                    data={this.state.categories}
                    renderItem={({ item }) => (
                      <TouchableOpacity style={{width: 200,height:'100%', marginHorizontal: 10 }} onPress={()=>Alert.alert(`Show card for ${item.type}`)} >
                      <View style={{ borderRadius: 20, height: "100%",
                            width: '100%', }}  >
                        <ImageBackground
                          style={{
                            height: "100%",
                            width: 200,
                            borderRadius: 10,

                            flex: 1,
                            flexDirection: "row",
                            overflow: "hidden",
                          }}
                          source={{ uri: `${item.url}` }}
                        >
                          <View
                            style={{
                              flex: 1,
                              backgroundColor: "rgba(0, 0, 0, 0.4)",
                              alignSelf: "flex-start",
                              borderTopRightRadius: 10,
                              borderTopLeftRadius: 10,
                            }}
                          >
                            <Text
                              style={{
                                color: appTheme.textPrimary,
                                fontSize: 16,
                                fontFamily: fonts.CenturyGothic,
                                marginLeft: 10,
                              }}
                            >
                              {item.type}
                            </Text>
                          </View>
                        </ImageBackground>
                        
                      </View>
                      </TouchableOpacity>
                    )}
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
  feautredText: {
    color: appTheme.textPrimary,
    fontSize: fontSizes.h0,
    fontFamily: fonts.CenturyGothic,
  },
  imageContainer: {
    height: 220,
    flexDirection: "row",
    margin: spacing.medium_lg,
  },
  image: {
    width: "100%",
    height: 220,
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
    marginTop: spacing.large,
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
});

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Exercises);

{
  /* <FlatGrid
                  itemDimension={120}
                  horizontal={true}
                  data={this.state.data}
                  style={styles.gridView}
                  spacing={10}
                  renderItem={({ item }) => (
                    <View style={{ borderRadius: 10 }}>
                      <ImageBackground
                        style={{
                          height: 110,
                          width: 150,
                          borderRadius: 10,
                          flex: 1,
                          flexDirection: "row",
                        }}
                        source={{ uri: `${item.url}` }}
                      >
                        <View
                          style={{
                            flex: 1,
                            backgroundColor: "rgba(0, 0, 0, 0.4)",
                            alignSelf: "flex-start",
                          }}
                        >
                          <Text style={{ color: appTheme.textPrimary, fontSize: 16,fontFamily: fonts.CenturyGothic}}>
                            {item.type}
                          </Text>
                        </View>
                      </ImageBackground>
                    </View>
                  )}
                /> */
}
