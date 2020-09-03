/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {Component} from 'react';
import {View, StyleSheet, ActivityIndicator, LayoutAnimation, Text, TouchableOpacity, FlatList} from 'react-native'
import {connect} from "react-redux";

import * as actionCreators from '../../store/actions';
import {appTheme} from "../../constants/colors";
import SessionCard from "../../components/SessionCard";
import {spacing} from "../../constants/dimension";
import {packageImages, sessionStatus} from "../../constants/appConstants";
import {getHashedImage} from "../../constants/images";
import moment from "moment";

class Sessions extends Component {
  componentDidMount() {
    // this.props.syncSessions();
  }

  renderSession = ({item}) => {
    const date = new Date(item.date);
    const thumbnail = getHashedImage(item._id);
    return (
      <SessionCard
        // thumbnail={packageImages[item.packageId.category]}
        status={item.status}
        thumbnail={thumbnail}
        title={item.packageId.title}
        duration={item.duration}
        time={moment(date).format('LT')}
        date={date}
        type={item.type}
      />
    )
  }

  keyExtractor = (item) => item._id
  separator = () => <View style={styles.separator}/>
  renderSessions = () => {
    return <FlatList
      data={this.props.sessions}
      renderItem={this.renderSession}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={this.separator}
      keyExtractor={this.keyExtractor}
    />
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderSessions()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appTheme.background,
    paddingHorizontal: spacing.medium,
    paddingTop: spacing.medium_sm
  },
  separator: {
    margin: spacing.small
  }

});

const mapStateToProps = (state) => ({
  sessions: state.trainer.sessions,
});

const mapDispatchToProps = (dispatch) => ({
  setUser: (userId) => dispatch(actionCreators.setUser(userId)),
  syncSessions: () => dispatch(actionCreators.syncSessions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sessions);