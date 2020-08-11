import React, {PureComponent} from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,

} from "react-native";
import {connect} from "react-redux";
import Carousel from 'react-native-snap-carousel';
import FastImage from "react-native-fast-image";
import LinearGradient from "react-native-linear-gradient";

import {spacing} from "../../constants/dimension";
import {appTheme} from "../../constants/colors";
import {screenHeight, screenWidth} from "../../utils/screenDimensions";
import fonts from "../../constants/fonts";
import fontSizes from "../../constants/fontSizes";
import strings from "../../constants/strings";
import {getRandomImage} from "../../constants/images";
import exerciseData from '../../../assets/exercises.json';
import ExerciseCard from "../../components/ExerciseCard";

class SelectExercise extends PureComponent {

  renderCard = ({item, source}) => {
    const uri = item.contentUrls['360'];
    return <ExerciseCard uri={uri} name={item.name}/>
  }

  render() {
    return (
      <View style={styles.container}>
        <Carousel
          ref={(c) => {
            this._carousel = c;
          }}
          data={exerciseData.slice(0, 10)}
          renderItem={this.renderCard}
          sliderWidth={screenWidth / 1.2}
          layout={'stack'}
          layoutCardOffset={18}
          itemWidth={screenWidth / 1.4}
          contentContainerCustomStyle={{alignItems: 'center'}}
          firstItem={9}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: spacing.large_lg,
    backgroundColor: appTheme.background,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default SelectExercise;
