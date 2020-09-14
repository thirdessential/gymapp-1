import React, {useState} from "react";
import {FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {appTheme, bmiColors} from "../../constants/colors";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import {getImageFromCloudinaryPdf} from "../../utils/utils";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {spacing} from "../../constants/dimension";
import ImageViewer from "../ImageViewer";

const certificateList = (props) => {
  const [imageViewer, setImageViewer] = useState(null);
  const showImage = url => imageViewer.openViewer(url);
  const card = (data) => {
    const url = getImageFromCloudinaryPdf(data.contentUrl);
    return (
      <TouchableOpacity onPress={() => showImage(url)}>
        <ImageBackground
          style={styles.element}
          borderRadius={8}
          source={{uri: url}}>
          <MaterialCommunityIcons style={styles.ribbon} name={'certificate-outline'} color={bmiColors.blue} size={35}/>
        </ImageBackground>
        <Text style={styles.speciality}>{data.speciality}</Text>
      </TouchableOpacity>
    )
  }
  const separator = () => <View style={styles.separator}/>

  return (
    <View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.container}
        data={props.data}
        renderItem={({item}) => card(item)}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={separator}
      />
      <ImageViewer
        onRef={ref => setImageViewer(ref)}/>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    height: 140
  },
  element: {
    borderColor: appTheme.greyC,
    borderWidth: 1,
    borderRadius: 15,
    width: 150,
    marginTop: 10,
    flex: 1,
  },
  speciality: {
    fontSize: fontSizes.h2,
    color: appTheme.greyC,
    margin: spacing.small,
    marginTop: spacing.small_sm,
    fontFamily: fonts.CenturyGothicBold,
    textAlign: 'center',

  },
  ribbon: {
    alignSelf: 'flex-end',
    margin: spacing.small
  },
  separator: {
    marginHorizontal: spacing.medium_sm
  }
});


export default React.memo(certificateList);