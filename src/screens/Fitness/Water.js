import React, { PureComponent } from "react";
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
import { connect } from "react-redux";
import { Bar } from "react-native-progress";
import { spacing } from "../../constants/dimension";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo("en-US");

import colors, {
  appTheme,
  bmiColors,
  darkPallet,
} from "../../constants/colors";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import { screenWidth } from "../../utils/screenDimensions";
import strings from "../../constants/strings";
import BmiBar from "../../components/BmiBar";
import { calculateBmi, getBmiVerdict, toTitleCase } from "../../utils/utils";
import Feather from "react-native-vector-icons/Feather";
import CustomLineChart from "../../components/CustomLineChart";
import Avatar from "../../components/Avatar";
import RouteNames from "../../navigation/RouteNames";
import * as actionCreators from "../../store/actions";
import { hitSlop20 } from "../../constants/styles";
import { WEEK_DAYS } from "../../constants/appConstants";
import RBSheet from "react-native-raw-bottom-sheet";
import DatePicker from "react-native-datepicker";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import HcdWaveView from "./HcdWaveView";

class Water extends PureComponent {
  state = {
      water:0,
      target:5000,

  };

  componentDidMount() {}
  componentWillUnmount() {}

  render() {
      var percent=(this.state.water/this.state.target)*100;
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
          <HcdWaveView
            surfaceWidth={230}
            surfaceHeigth={230}
            powerPercent={percent>100?100:percent}
            type="dc"
            style={{ backgroundColor: "#FF7800" }}
          ></HcdWaveView>
          <View style={{flexDirection: 'row',justifyContent: 'space-between', margin: spacing.medium_sm,flex:1}}>
              <TouchableOpacity style={{marginHorizontal:10}} onPress={()=>this.setState({water:this.state.water+50})}><Text style={{color: 'white',fontSize:20}}>+50ml</Text></TouchableOpacity>
              <TouchableOpacity style={{marginHorizontal:10}} onPress={()=>this.setState({water:this.state.water+250})}><Text style={{color: 'white',fontSize:20}}>+250ml</Text></TouchableOpacity>
              <TouchableOpacity style={{marginHorizontal:10}} onPress={()=>this.setState({water:this.state.water+500})}><Text style={{color: 'white',fontSize:20}}>+500ml</Text></TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row',justifyContent: 'space-between', margin: spacing.medium_sm,flex:1}}>
          <Text style={{color: 'white',fontSize:20}}>Target : {this.state.target/1000}{" "}Litres</Text>
          </View>
          <View style={{flexDirection: 'row',justifyContent: 'space-between', margin: spacing.medium_sm,flex:1}}>
          <Text style={{color: 'white',fontSize:20}}>Achieved : {this.state.water}{" "}ml's</Text>
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
});

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Water);
