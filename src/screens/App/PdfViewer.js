import React from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import Pdf from 'react-native-pdf';
import {screenHeight, screenWidth} from "../../utils/screenDimensions";
import {appTheme} from "../../constants/colors";

class PdfViewer extends React.Component {
  render() {
    // source must be in the format {uri:url}, or must be a direct reference to an asset
    const {source} = this.props.route.params;

    return (
      <View style={styles.container}>
        <Pdf
          source={source}
          onPressLink={(uri) => {
            console.log(`Link pressed: ${uri}`)
          }}
          style={styles.pdf}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  pdf: {
    flex: 1,
    width: screenWidth,
    height: screenHeight,
    backgroundColor:appTheme.background
  }
});

export default PdfViewer;