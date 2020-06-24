// /**
//  * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
//  */
// import React, {Component} from 'react';
// import {View, StyleSheet, Text} from 'react-native'
// import {connect} from "react-redux";
//
// import {spacing} from "../../constants/dimension";
// import * as actionCreators from "../../store/actions";
//
// class ReceivingCall extends Component {
//
//   render() {
//     return (
//      <View style={styles.container}>
//        <Text>Receiving a call</Text>
//      </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     justifyContent: 'center',
//     // marginLeft: spacing.medium_lg,
//     // marginRight:spacing.medium_lg
//   },
//   packageContainer: {
//     marginTop: spacing.medium,
//     marginBottom: spacing.medium
//   }
// });
//
// const mapStateToProps = (state) => ({
//   users: state.app.users
// });
//
// const mapDispatchToProps = (dispatch) => ({
// });
//
// export default connect(mapStateToProps, mapDispatchToProps)(ReceivingCall);