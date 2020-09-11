import React, {Component} from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
} from "react-native";
import {TextInput} from "react-native";

import {spacing} from "../../constants/dimension";

import {appTheme} from "../../constants/colors";

import Tts from 'react-native-tts';

// Experimental screen for testing TTS and proximity module
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
            placeholderTextColor={appTheme.textPrimary}
            style={{color: appTheme.textPrimary}}
          />
          <Button title="Press to speak" onPress={this.speak}/>
          <Text style={{color: "white", fontSize: 16}}>
            {this.state.proximity}
          </Text>
          <Text style={{color: "white", fontSize: 16}}>
            {this.state.distance}
          </Text>
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
    backgroundColor: appTheme.background,
  },
});

export default Speech;
