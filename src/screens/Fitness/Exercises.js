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
  Alert,
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { appTheme } from "../../constants/colors";
import { spacing } from "../../constants/dimension";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import strings from "../../constants/strings";
import { screenHeight, screenWidth } from "../../utils/screenDimensions";
import { updateExerciseIndex, updateUserInfo } from "../../API";
import * as actionCreators from "../../store/actions";
import { bodyParts, categories } from "../../constants/appConstants";

class Exercises extends PureComponent {
  // navigation.setOptions({ tabBarVisible: false })
 
  renederItems = ({ item }) => (
    <TouchableOpacity
      style={styles.touchableCards}
      onPress={() => Alert.alert(`Show card for ${item.type}`)}
    >
      <View style={styles.cardView}>
        <ImageBackground
          style={styles.cardImage}
          source={{ uri: `${item.url}` }}
        >
          <View style={styles.cardTextView}>
            <Text style={styles.cardListText}>{item.type}</Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
  feautred = (uri, type) => (
    <View style={styles.imageContainer}>
      <Image
        style={styles.image}
        source={{
          uri: uri,
        }}
      />
      <View style={styles.imageTitle}>
        <Text style={styles.cardText}>{type}</Text>
        <Text style={styles.imageSubtitle}>50 min</Text>
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
            <Text style={styles.feautredText}>{strings.FEATURED_WORKOUT}</Text>
          </View>
          {Math.floor(Math.random() * 10) % 2 == 0
            ? this.feautred(bodyParts[0].url, bodyParts[0].type)
            : this.feautred(bodyParts[5].url, bodyParts[5].type)}
          <View style={styles.itemContainer}>
            <View style={styles.optionContainer}>
              <View style={{ marginLeft: spacing.large_lg }}>
                <Text style={styles.discover}>{strings.DISCOVER}</Text>
              </View>
              <ScrollView>
                <View style={styles.horizontalList}>
                  <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={styles.flatlist}
                    keyExtractor={(item) => item.type}
                    data={bodyParts}
                    renderItem={this.renederItems}
                  />
                </View>
                <View style={styles.horizontalList}>
                  <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={styles.flatlist}
                    keyExtractor={(item) => item.type}
                    data={categories}
                    renderItem={this.renederItems}
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
  flatlist: { height: 120, marginTop: 5 },
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
