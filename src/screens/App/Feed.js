import * as React from "react";
import {Text, View} from "react-native";
import {appTheme} from "../../constants/colors";

class Feed extends React.Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor:appTheme.darkBackground ,justifyContent: 'center', alignItems: 'center'}}>
        {/*<Text>Feed</Text>*/}
      </View>
    );
  }
}

export default Feed;