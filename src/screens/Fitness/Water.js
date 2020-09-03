import React, { PureComponent } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { connect } from "react-redux";
import { spacing } from "../../constants/dimension";

import colors, {
  appTheme,
  bmiColors,
  darkPallet,
} from "../../constants/colors";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import strings from "../../constants/strings";
import { getTodayFormattedDate } from "../../utils/utils";
import * as actionCreators from "../../store/actions";
import HcdWaveView from "../../components/HcdWaveView";
import { waterIntake } from "../../API";
import { screenWidth, screenHeight } from "../../utils/screenDimensions";
import PureChart from 'react-native-pure-chart';
import RouteNames from "../../navigation/RouteNames";
import {
  BarChart,
} from "react-native-chart-kit";
const date = getTodayFormattedDate();

class Water extends PureComponent {
  constructor(props) {
    super(props);
    this.state =  {
    final:0,
    waterIntake: 0,
    target: 5000,
    show: true,
    labels:[],
    data:[],
    send:[]
  }};
  async componentDidMount() {
    let result=await this.props.getWaterIntake();
    console.log(result);
   await  this.setState({send:result});

        const { bmiRecords,waterIntake } = this.props;
        //  console(bmiRecords[0]["weight"] );
        console.log(bmiRecords);
        console.log(waterIntake);
        bmiRecords.length > 0
          ? this.setState({ show: true })
          : this.setState({ show: false });
        if (waterIntake) {
          this.setState({ waterIntake,final:waterIntake});
        }
    

    this.unsubscribe = this.props.navigation.addListener("blur", (e) => {
      if((this.state.waterIntake-this.state.final)>0){
        this.submit();
      }
      
    });
  }

  componentWillUnmount() {
    
    this.unsubscribe();
  }

  submit = async () => {
    let record = await waterIntake(date, this.state.waterIntake);

    console.log(record);
  };
  updateWaterState = async (count) => {
    await this.setState({ waterIntake: this.state.waterIntake + count });
    this.updateWaterIntake();
  };
  updateWaterIntake = async () => {
    let result = await this.props.addWaterIntake(this.state.waterIntake);
    // console.log(result);
  };
  renderChart=()=>{
    const data = {
      labels: this.state.labels,
      datasets: [
        {
          data: this.state.data
        }
      ]
    };

  

 
    return (
      <View style={{marginLeft:15,marginRight:-5}}>
      <Text style={{fontSize:20,fontFamily:fonts.CenturyGothicBold,color:appTheme.textPrimary,textAlign:'center'}}>Weekly water intake</Text>
  <BarChart
    //style={graphStyle}
    data={data}
    width={screenWidth }
    height={220}
    yAxisSuffix="mL"
    chartConfig={{
    backgroundGradientFrom: appTheme.background,
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: appTheme.background,
    
    decimalPlaces: 0,
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(255,127,80, 0.4)`,
    fillShadowGradientOpacity:1,
    labelColor: (opacity = 1) => appTheme.greyC,
    propsForBackgroundLines: {
       //strokeDasharray: "" // solid background lines with no dashes
       strokeWidth: 0
  },
    fillShadowGradient:appTheme.brightContent,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  }}
    verticalLabelRotation={0}
  />
  
  </View>
    )
  }

  render() {
    let sampleData = [
      {data:this.state.send,
      color: '#297AB1'
      }] 
    return this.state.show ? (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
        style={styles.container}
      >
      <View style={{flex:1,flexDirection:'row'}}>
     
      
        <HcdWaveView
          surfaceWidth={200}
          surfaceHeigth={200}
          powerPercent={parseInt(
            (this.state.waterIntake / this.state.target) * 100
          )}
          type="dc"
          style={{ backgroundColor: "#FF7800" }}
        />
       
        </View>
        <View style={styles.mainView}>
          <TouchableOpacity
            style={styles.increaseMargin}
            onPress={() => this.updateWaterState(50)}
          >
            <Text style={styles.increaseText}>+50ml</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.increaseMargin}
            onPress={() => this.updateWaterState(250)}
          >
            <Text style={styles.increaseText}>+250ml</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.increaseMargin}
            onPress={() => this.updateWaterState(500)}
          >
            <Text style={styles.increaseText}>+500ml</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.counterView}>
          <Text style={{ color: appTheme.textPrimary, fontSize: fontSizes.h0 }}>
            {strings.TARGET_TEXT} : {this.state.target / 1000} Litres
          </Text>
        </View>
        <View style={styles.counterView}>
          <Text style={styles.increaseText}>
            {strings.ACHIEVED} : {this.state.waterIntake} ml's
          </Text>
        </View>
        {/* {this.renderChart()} */}
        <View >
        <PureChart data={sampleData} height={250} type='bar' width={'100%'} 
backgroundColor="rgba(0,0,0,0)"
            highlightColor={appTheme.brightContent}
             primaryColor="blue"
             labelColor={appTheme.brightContent}
             numberOfYAxisGuideLine={this.state.send.length} 
             showEvenNumberXaxisLabel={false}
             yAxisGridLineColor={appTheme.greyC}
            

        />
        </View>
      </ScrollView>
    ) : (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
        style={styles.container}
      >
        <View style={styles.updateView}>
          <Text style={styles.textView}>{strings.ADDBMI}</Text>
          <View style={styles.addbuttonView}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate(RouteNames.BMI);
              }}
              activeOpacity={0.7}
              style={styles.blueButton}
            >
              <Text style={styles.buttonText}>{strings.ADD_BMI}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  waterIntake: state.fitness.waterIntake[date],
  userData: state.user.userData,
  bmiRecords: state.fitness.bmiRecords,
});

const mapDispatchToProps = (dispatch) => ({
  addWaterIntake: (water) => dispatch(actionCreators.addWaterIntake(water)),
  getWaterIntake:()=>dispatch(actionCreators.getWaterIntake())
});

export default connect(mapStateToProps, mapDispatchToProps)(Water);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    // paddingLeft: spacing.medium_lg,
    // paddingRight: spacing.medium_lg,

    backgroundColor: appTheme.background,
  },
  buttonText: {
    fontFamily: fonts.CenturyGothicBold,
    fontSize: fontSizes.h3,
  },
  blueButton: {
    padding: spacing.medium_sm,
    backgroundColor: bmiColors.lightBlue,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  increaseText: { color: appTheme.textPrimary, fontSize: fontSizes.h0 },
  counterView: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: spacing.medium_sm,
    flex: 1,
  },
  updateView: {
    alignItems: "center",
    justifyContent: "center",
  },
  mainView: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: spacing.medium_sm,
    flex: 1,
  },
  addbuttonView: { marginTop: spacing.medium_lg },
  textView: {
    fontFamily: fonts.CenturyGothicBold,
    fontSize: fontSizes.bigTitle,
    textAlign: "center",
    marginTop: screenHeight / 3,
    color: appTheme.greyC,
  },
  increaseMargin: { marginHorizontal: spacing.medium },
});
