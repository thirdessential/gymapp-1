import React, {Component} from "react";
import {
  StyleSheet,
  Image, ImageBackground,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  Button,
} from "react-native";
import {TextInput} from "react-native";
import {connect} from "react-redux";

import {spacing} from "../../constants/dimension";

import {appTheme} from "../../constants/colors";

import Tts from 'react-native-tts';

class Speech extends Component {
  state = {
    text: "",
    proximity: false,
    distance: 0,
  };

  // componentDidMount(){
  //   Proximity.addListener(this._proximityListener);
  //  }


  //   _proximityListener(data) {
  //     console.log(data);
  //     this.setState({
  //       proximity: data.proximity,
  //       distance: data.distance // Android-only 
  //     });
  //     console.log(this.state);
  //   }

  //  componentWillUnmount() {
  //    Proximity.removeListener(this._proximityListener);
  //  }

  speak = () => {
    Tts.setDefaultRate(0.4);
    console.log("speaking");
    Tts.speak(`${this.state.text}`);
  };
  onChangeText = (text) => {
    this.setState({text: text});
  };


  render() {
    return (
      <>
        <View style={styles.container}>
          <TextInput
            placeholder="Enter text here"
            value={this.state.text}
            onChangeText={(text) => this.onChangeText(text)}
            placeholderTextColor="white"
            style={{color: "white"}}
          />
          <Button title="Press to speaks" onPress={this.speak}/>
          <Text></Text>
          <Text style={{color: "white", fontSize: 16}}>
            {this.state.proximity}
          </Text>
          <Text style={{color: "white", fontSize: 16}}>
            {this.state.distance}
          </Text>
          <Image
            source={{uri: 'http://www.clicktorelease.com/code/gif/1.gif'}}
            style={{width: 100, height: 100}}
          />
          <Text></Text>
          <Image

            source={require('../../../assets/images/Elbow-To-Knee-Twists_Cardio_720.gif')}
            style={{width: 200, height: 200}}
          />

        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingLeft: spacing.medium_lg,
    paddingRight: spacing.medium_lg,
    // paddingTop: spacing.medium_lg,
    backgroundColor: appTheme.background,
  },
});

export default Speech;
