import React, {PureComponent} from "react";
import {
  ActivityIndicator,
  FlatList,
  LayoutAnimation,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
} from "react-native";
import {connect} from "react-redux";
import {spacing} from "../../constants/dimension";
import {
  appTheme,
} from "../../constants/colors";

import HcdWaveView from "./HcdWaveView";

class Water extends PureComponent {
  state = {
    waterIntake: 0,
    target: 5000,

  };

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    //var percent=(this.state.waterIntake/this.state.target)*100;
    return (
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.center}
          style={styles.container}
        >
          <HcdWaveView
            surfaceWidth={230}
            surfaceHeigth={230}
            powerPercent={(this.state.waterIntake / this.state.target) * 100}
            type="ac"
            style={styles.water}
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: spacing.medium_sm, flex: 1}}>
            <TouchableOpacity style={{marginHorizontal: 10}}
                              onPress={() => this.setState({waterIntake: this.state.waterIntake + 50})}><Text
              style={{color: 'white', fontSize: 20}}>+50ml</Text></TouchableOpacity>
            <TouchableOpacity style={{marginHorizontal: 10}}
                              onPress={() => this.setState({waterIntake: this.state.waterIntake + 250})}><Text
              style={{color: 'white', fontSize: 20}}>+250ml</Text></TouchableOpacity>
            <TouchableOpacity style={{marginHorizontal: 10}}
                              onPress={() => this.setState({waterIntake: this.state.waterIntake + 500})}><Text
              style={{color: 'white', fontSize: 20}}>+500ml</Text></TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: spacing.medium_sm, flex: 1}}>
            <Text style={{color: 'white', fontSize: 20}}>Target : {this.state.target / 1000}{" "}Litres</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: spacing.medium_sm, flex: 1}}>
            <Text style={{color: 'white', fontSize: 20}}>Achieved : {this.state.waterIntake}{" "}ml's</Text>
          </View>
        </ScrollView>
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
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  water: {
    backgroundColor: "#FF7800"
  }
});

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Water);
