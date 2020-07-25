/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {PureComponent} from 'react';
import {
  View,
  StyleSheet, FlatList,
} from 'react-native'
import {connect} from "react-redux";

import {appTheme} from "../../../constants/colors";
import {openDrawerButtonDark} from "../../../navigation/openDrawerButton";

import StatementCard from "../../../components/Trainer/StatementCard";
import {spacing} from "../../../constants/dimension";

class AccountStatement extends PureComponent {
  renderStatement = (data) => {
    return (
      <StatementCard {...data}/>
    )
  }
  separator = ()=><View style={{marginTop: spacing.medium}}/>

  render() {
    return (
      <View showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.content}>
          <FlatList
            data={this.props.statements}
            ListHeaderComponent={this.separator}
            ListFooterComponent={this.separator }
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => this.renderStatement(item)}
            keyExtractor={data =>data.transactionDetails.orderId}
            ItemSeparatorComponent={this.separator}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appTheme.brightContent,
  },
  content: {
    backgroundColor: appTheme.darkBackground,
    flex: 1,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingTop: spacing.medium,
    paddingHorizontal: spacing.medium
  },
});

const mapStateToProps = (state) => ({
  statements: state.trainer.statements || []
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AccountStatement);
