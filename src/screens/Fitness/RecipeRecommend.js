import React, {PureComponent} from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
} from "react-native";
import {connect} from "react-redux";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

import {
  appTheme,
} from "../../constants/colors";
import fonts from "../../constants/fonts";
import {screenWidth} from "../../utils/screenDimensions";

class RecipeRecommend extends PureComponent {
  // Experimental WIP screen for recipe recommendations
  state = {
    food: "",
    recipes: [],
    load: false,
  };

  getRecipes = async () => {
    Keyboard.dismiss();
    this.setState({load: !this.state.load});

    const url = `https://api.edamam.com/search?q=${this.state.food}&app_id=e4e8e5c6&app_key=2c3a4d45fb3da291e09c727acdfe22d9`;
    const response = await fetch(url, {
      method: "GET",
    });
    const resData = await response.json();
    await this.setState({recipes: resData.hits});
    await console.log(this.state);
    this.setState({load: !this.state.load});
  };
  itemSeparator = () => <View style={styles.itemSeparator}/>;

  render() {
    return (
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
          style={styles.container}
        >
          <View style={styles.searchSection}>
            <TextInput
              style={styles.input}
              placeholder="Enter food name"
              onChangeText={(food) => {
                this.setState({food});
              }}
              placeholderTextColor={appTheme.darkBackground}
              value={this.state.food}
              underlineColorAndroid="transparent"
            />
            {this.state.load ? (
              <ActivityIndicator
                size="small"
                color="#0000ff"
                style={{marginRight: 5}}
              />
            ) : (
              <TouchableOpacity
                onPress={() => {
                  this.getRecipes();
                }}
              >
                <FontAwesome5Icon
                  style={styles.searchIcon}
                  name="search"
                  size={20}
                  color="#000"
                />
              </TouchableOpacity>
            )}
          </View>
          {this.state.recipes.length > 0 ? (

            <FlatList
              styles={{marginTop: 10, marginHorizontal: 10, paddingHorizontal: 5}}
              data={this.state.recipes}
              ItemSeparatorComponent={this.itemSeparator}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <View style={{margin: 5, marginHorizontal: 5, paddingHorizontal: 5}}>
                  <Text
                    style={{
                      fontSize: 16,
                      alignItems: "flex-start",
                      color: appTheme.greyC,
                      fontFamily: fonts.CenturyGothic,
                      flex: 1, flexWrap: 'wrap'
                    }}
                  >
                    {item.recipe.label}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      alignItems: "flex-end",
                      color: appTheme.greyC,
                      flex: 1, flexWrap: 'wrap'
                    }}
                  >
                    Total calories:
                    {Math.round(item.recipe.calories, 0)}
                  </Text>
                </View>
              )}
            />

          ) : null}
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: appTheme.background,
  },
  searchSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginTop: 15,
    paddingHorizontal: 5,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: "#fff",
    color: appTheme.darkBackground,
    marginLeft: 10,
  },
  itemSeparator: {
    height: 0.5,
    backgroundColor: appTheme.brightContent,
    width: screenWidth * 0.95,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
  },
});

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeRecommend);
