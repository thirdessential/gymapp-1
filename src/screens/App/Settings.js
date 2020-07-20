import React, {PureComponent} from 'react';
import {Text, View} from "react-native";
import {appTheme} from "../../constants/colors";

class Settings extends PureComponent {
  render() {
    return (
      <View style={{flex: 1, backgroundColor:appTheme.darkBackground ,justifyContent: 'center', alignItems: 'center'}}>
        {/*<Text>Settings</Text>*/}
      </View>
    );
  }
}

export default Settings;