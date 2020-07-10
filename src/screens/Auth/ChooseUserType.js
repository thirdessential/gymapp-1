/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native'
import {connect} from "react-redux";

import * as actionCreators from "../../store/actions";
import {userTypes} from "../../constants/appConstants";
import {appTheme} from "../../constants/colors";
import {syncUserType} from "../../API";
import messaging from "@react-native-firebase/messaging";
import auth from "@react-native-firebase/auth";
import {showError} from "../../utils/notification";

class ChooseUserType extends Component {

  syncApi = async (userType) => {
    const {syncFirebaseAuth} = this.props;
    let fcmToken = await messaging().getToken();
    let idToken = await auth().currentUser.getIdToken(true);
    let response = await syncUserType(idToken, userType);
    if (response.success) {
      await syncFirebaseAuth(idToken, fcmToken);
    } else {
      showError('Error, try again');
    }
  }
  setUser = () => {
    this.syncApi(userTypes.USER);
  }
  setTrainer = () => {
    this.syncApi(userTypes.TRAINER)
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={0.9} style={styles.darkButton} onPress={this.setUser}>
          <Text style={styles.lightText}>
            {userTypes.USER}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.lightButton} onPress={this.setTrainer}>
          <Text style={styles.darkText}>
            {userTypes.TRAINER}
          </Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  darkButton: {
    flex: 1,
    backgroundColor: appTheme.darkBackground,
    justifyContent: 'center',
    alignItems: 'center'
  },
  lightButton: {
    flex: 1,
    backgroundColor: '#e4f9ff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  lightText: {
    color: 'white',
    fontSize: 50,
    fontWeight: 'bold'
  },
  darkText: {
    color: 'black',
    fontSize: 50,
    fontWeight: 'bold'
  }
});

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  syncFirebaseAuth: (idToken, fcmToken) => dispatch(actionCreators.syncFirebaseAuth(idToken, fcmToken)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChooseUserType);