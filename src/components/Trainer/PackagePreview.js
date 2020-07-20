/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native'
import strings from "../../constants/strings";
import {spacing} from "../../constants/dimension";
import {appTheme} from "../../constants/colors";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";

const packagePreview = (props) => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <View>
        <Text style={styles.session}>{props.count} {strings.SESSIONS}</Text>
        <Text style={styles.price}>Rs {props.price}</Text>
      </View>
    </View>
  );
}

packagePreview.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: "center",
    backgroundColor: appTheme.darkBackground,
    borderRadius: 10,
    padding: spacing.medium_sm,
    width: 120,
    elevation: 9,
  },
  title: {
    color: 'white',
    fontSize: fontSizes.h2,
    textAlign: 'center',
    marginBottom: spacing.medium_sm,
    fontFamily: fonts.MontserratMedium,
  },
  session: {
    color: 'grey',
    fontSize: fontSizes.h4,
    textAlign: 'center',
    marginBottom: spacing.medium_sm,
    fontFamily: fonts.MontserratMedium,
  },
  price: {
    color: appTheme.brightContent,
    fontSize: fontSizes.h3,
    textAlign: 'center',
    fontFamily: fonts.MontserratSemiBold,
  }
});

export default React.memo(packagePreview);