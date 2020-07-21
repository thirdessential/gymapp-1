import React from "react";
import {
  LineChart,
} from "react-native-chart-kit";
import {appTheme, bmiColors} from "../constants/colors";
import {spacing} from "../constants/dimension";
import {screenWidth} from "../utils/screenDimensions";

const customLineChart = (props) => (
  <LineChart
    withInnerLines={false}
    withOuterLines={false}
    data={{
      labels: props.labels,
      datasets: [
        {
          data: props.data
        }
      ]
    }}
    width={screenWidth - spacing.medium_lg*2}
    height={180}
    yAxisSuffix="kg"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: appTheme.darkBackground,
      backgroundGradientFrom: appTheme.darkBackground,
      backgroundGradientTo: appTheme.darkBackground,
      fillShadowGradient:bmiColors.lightBlue,
      decimalPlaces: 1, // optional, defaults to 2dp
      color: ()=>bmiColors.lightBlue,//(opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor:()=> appTheme.grey,// (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16,
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke:bmiColors.blue
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
)

export default customLineChart;