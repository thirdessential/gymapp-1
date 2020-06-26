
import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, FlatList, Image, StatusBar, Text } from 'react-native'
import { connect } from "react-redux";
import RouteNames from "../../navigation/RouteNames";
import * as actionCreators from '../../store/actions';
import { userTypes } from "../../constants/appConstants";
import UserThumbTwo from '../../components/Trainer/UserThumbTwo';
import TrainerThumbTwo from '../../components/Trainer/TrainerThumbTwo'

const defaultDP = 'https://media.istockphoto.com/photos/middle-aged-gym-coach-picture-id475467038';

class UserListingTwo extends Component {
  async componentDidMount() {
    const { updateTrainers, authToken } = this.props;
    updateTrainers();
    // global.socket = await initialiseSocket(authToken);
    // console.log(global.socket)
  }

  openTrainer = (trainerId) => {
    const { navigation } = this.props;
    navigation.navigate('ProfileTwo', {
      userId: trainerId
    });
  }

  renderUserThumb = (user, index) => {
    console.log('===============' + index)
    const { userType } = user;
    if (!userType)
      return <View
      />
    let { name, totalSlots = 0, usedSlots = 0, experience = 0, rating, displayPictureUrl } = user;
    if (!displayPictureUrl) displayPictureUrl = defaultDP;

    if (!userType === userTypes.USER) return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.userContainer}
        onPress={() => this.openTrainer(user._id)}
      >
        <UserThumbTwo
          name={name}
          dpUrl={displayPictureUrl}
          onPress={() => this.openTrainer(user._id)}
        />
      </TouchableOpacity>


    )
    else
      return <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => this.openTrainer(user._id)}
      >
        <TrainerThumbTwo
          name={name}
          slots={{
            remaining: totalSlots - usedSlots,
            used: usedSlots
          }}
          dpUrl={displayPictureUrl}
          experience={experience}
          rating={rating}
        />
      </TouchableOpacity>
  }

  render() {
    let users = this.props.trainers;
    if (users.length % 2)
      users.push({});

     // list view

    // return (
    //   <View style={{ backgroundColor: '#F3F5F7', height: '100%', marginRight: 15 }}>
    //     <View style={{ marginLeft: 20 }}>
    //       <StatusBar backgroundColor='#F3F5F7' />
    //       <FlatList
    //         data={users}
    //         renderItem={({ item, index }) => this.renderUserThumb(item, index)}
    //         keyExtractor={(item, index) => item._id}

    //       ></FlatList>
    //     </View>
    //   </View>
    // );

    //grid view
    return (<View style={styles.container}>
        <View style={styles.subContainer}>
        <StatusBar backgroundColor='#F3F5F7'/>

        <FlatList
            data={users}
            renderItem={({item, index}) => this.renderUserThumb(item, index)}
            keyExtractor={(item, index) => item._id}
            numColumns={2}
        ></FlatList>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#F3F5F7',
    height:'100%'
  },
  subContainer:{
    marginLeft:20
  },
  userContainer: {
    width: '50%',
  }
});

const mapStateToProps = (state) => ({
  trainers: state.app.trainers,
  authToken: state.user.authToken,
});

const mapDispatchToProps = (dispatch) => ({
  updateTrainers: () => dispatch(actionCreators.updateTrainers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserListingTwo);