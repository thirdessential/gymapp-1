// /**
//  * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
//  */
// import React, {Component} from 'react';
// import {View, StyleSheet, FlatList, Text, TouchableOpacity, LayoutAnimation} from 'react-native'
// import {connect} from "react-redux";
//
// import {spacing} from "../../constants/dimension";
// import * as actionCreators from "../../store/actions";
// import colors, {appTheme} from "../../constants/colors";
// import RouteNames from "../../navigation/RouteNames";
// import PackageFlatList from "../../components/Trainer/PackageFlatList";
// import fontSizes from "../../constants/fontSizes";
// import fonts from "../../constants/fonts";
// import strings from "../../constants/strings";
// import BarButton from '../../components/BarButton';
// import Appointment from "../../components/Appointment";
// import ClientCard from "../../components/ClientCard";
// import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
//
// const defaultDP = 'https://media.istockphoto.com/photos/middle-aged-gym-coach-picture-id475467038';
//
// class MyClients extends Component {
//
//   componentDidMount() {
//     const {syncSubscriptions} = this.props;
//     syncSubscriptions()
//   }
//
//   renderClients = () => {
//     return this.props.subscriptions.map((subscription, index) => {
//       const user = subscription.subscribedBy;
//       const {name, city} = user;
//       const {totalSessions, heldSessions} = subscription;
//       const sessions = `${heldSessions}/${totalSessions}`;
//       return (
//         <View key={index} style={styles.appointmentContainer}>
//           <ClientCard displayName={name} location={city} imageUrl={defaultDP} sessions={sessions}/>
//         </View>
//       )
//     })
//   }
//
//
//   render() {
//     return (
//       <KeyboardAwareScrollView style={styles.container}>
//         <View style={styles.titleContainer}>
//           <Text style={styles.title}>{strings.MY_CLIENTS}</Text>
//         </View>
//         <View style={styles.listContainer}>
//           <this.renderClients/>
//         </View>
//       </KeyboardAwareScrollView>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: appTheme.darkBackground,
//
//   },
//   titleContainer: {
//     paddingTop: spacing.medium_sm,
//     paddingLeft: spacing.large,
//     paddingRight: spacing.large,
//     paddingBottom: spacing.medium_sm,
//     marginBottom: spacing.medium_sm,
//     backgroundColor: appTheme.background,
//     alignItems: 'center'
//   },
//   listContainer: {
//     marginLeft: spacing.medium_lg,
//     marginRight: spacing.medium_lg,
//     flex: 1
//   },
//   title: {
//     color: 'white',
//     fontSize: fontSizes.h0,
//     fontFamily: fonts.PoppinsRegular
//   },
//   addButtonContainer: {
//     paddingTop: spacing.medium_sm,
//     paddingBottom: spacing.medium_sm,
//     backgroundColor: appTheme.background,
//     alignItems: 'center'
//   }
// });
//
// const mapStateToProps = (state) => ({
//   subscriptions: state.trainer.subscriptions
// });
//
// const mapDispatchToProps = (dispatch) => ({
//   syncSubscriptions: () => dispatch(actionCreators.syncSubscriptions())
// });
//
// export default connect(mapStateToProps, mapDispatchToProps)(MyClients);