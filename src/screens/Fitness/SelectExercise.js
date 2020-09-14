import React, {PureComponent} from "react";
import {
  LayoutAnimation, ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Carousel from 'react-native-snap-carousel';

import {spacing} from "../../constants/dimension";
import {appTheme} from "../../constants/colors";
import {screenWidth} from "../../utils/screenDimensions";
import fonts from "../../constants/fonts";
import fontSizes from "../../constants/fontSizes";
import exerciseData from '../../../assets/exercises.json';
import ExerciseCard from "../../components/ExerciseCard";
import {bodyParts, equipmentTypes, exerciseLevels, fitnessCategories} from "../../constants/appConstants";
import {toTitleCase} from "../../utils/utils";
import RouteNames from "../../navigation/RouteNames";

const cardWidth = screenWidth / 1.4;

class SelectExercise extends PureComponent {

  state = {
    level: exerciseLevels.BEGINNER,
    exercises: [],
    filteredExercises: [],
    equipment: [],
    selectedEquipment: equipmentTypes.ALL
  }

  componentDidMount() {
    const {type} = this.props.route.params;
    this.props.navigation.setOptions({title: type});
    let exercises = [];
    if (fitnessCategories[type])
      exercises = exerciseData.filter(exercise => exercise.category === type);
    else if (bodyParts[type])
      exercises = exerciseData.filter(exercise => exercise.bodyPart.includes(type));

    const equipment = new Set([equipmentTypes.ALL]);
    exercises.map(exercise => !!exercise.equipment ? equipment.add(exercise.equipment) : null);
    this.setState({exercises, filteredExercises: exercises, equipment: Array.from(equipment)});
  }

  selectLevel = (level) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({level});
  }

  openPerformExercise = (exercise) => {
    const data = exercise.exerciseData.filter((exercise) => exercise.level === this.state.level)[0];
    if (data) {
      const {reps, restTime} = data
      const {level} = this.state;
      return this.props.navigation.navigate(RouteNames.PerformExercise, {exercise, level, reps, restTime});
    } else {
      return this.props.navigation.navigate(RouteNames.PerformStretch, {exercise});
    }
  }
  renderCard = ({item, source}) => {
    const uri = item.contentUrls['360'];
    let {exerciseData} = item;
    exerciseData = exerciseData.filter(data => data.level === this.state.level)[0] || {};
    return (
      <ExerciseCard
        uri={uri}
        name={item.name}
        minutes={exerciseData.time || ''}
        sets={exerciseData.sets || ''}
        level={toTitleCase(this.state.level)}
        selectLevel={this.selectLevel}
        onStart={() => this.openPerformExercise(item)}
      />
    )
  }

  renderPill = (title, selected, callback) => (
    <TouchableOpacity key={title} onPress={callback} style={[styles.pill, selected ? styles.active : styles.inactive]}>
      <Text style={styles.pillText}>{title}</Text>
    </TouchableOpacity>
  )
  toggleEquipment = (type) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (type === equipmentTypes.ALL)
      this.setState({selectedEquipment: type, filteredExercises: this.state.exercises});
    else {
      const filteredExercises = this.state.exercises.filter(exercise => exercise.equipment === type);
      this.setState({filteredExercises, selectedEquipment: type});
      this._carousel.snapToItem(0);
    }

  }
  renderFilters = () => {
    const {equipment, selectedEquipment} = this.state;
    if (equipment.length === 1) return null;
    return (
      <ScrollView style={{height: 0, width: cardWidth}} showsHorizontalScrollIndicator={false}
                  horizontal={true}>
        {equipment.map(equipmentType => this.renderPill(equipmentType, selectedEquipment === equipmentType, () => this.toggleEquipment(equipmentType)))}
      </ScrollView>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderFilters()}
        <Carousel
          ref={(c) => {
            this._carousel = c;
          }}
          data={this.state.filteredExercises}
          renderItem={this.renderCard}
          sliderWidth={screenWidth}
          layoutCardOffset={18}
          itemWidth={cardWidth}
          contentContainerCustomStyle={{alignItems: 'center'}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingVertical: spacing.large_lg,
    backgroundColor: appTheme.background,
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row'
  },
  pill: {
    padding: spacing.small,
    paddingHorizontal: spacing.medium,
    borderRadius: 20,
    marginRight: spacing.medium_sm,
    justifyContent: 'center',
    height: 35,
    alignSelf: 'flex-end'
  },
  pillText: {
    fontFamily: fonts.MontserratMedium,
    fontSize: fontSizes.h4
  },
  active: {
    backgroundColor: appTheme.brightContent
  },
  inactive: {
    backgroundColor: appTheme.grey
  },
  button: {
    marginRight: spacing.medium_sm
  },
  menuTitle: {
    color: appTheme.brightContent,
    fontFamily: fonts.CenturyGothicBold,
    fontSize: fontSizes.h4
  },
  menu: {
    backgroundColor: appTheme.darkBackground,
  },
  menuButton: {
    flexDirection: 'row',
    backgroundColor: appTheme.background,
    alignItems: 'center',
    padding: spacing.small_lg,
    paddingHorizontal: spacing.medium_lg
  },
  menuText: {
    color: appTheme.brightContent,
    fontFamily: fonts.CenturyGothicBold,
    fontSize: fontSizes.h3,
  },
});

export default SelectExercise;
