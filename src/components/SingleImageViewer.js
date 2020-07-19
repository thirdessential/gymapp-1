import {Modal} from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import React from "react";
import {appTheme} from "../constants/colors";

const imageViewer = ({imageUrl, isOpen, close}) => {
  const image = [{
    url: imageUrl
  }]
  return <Modal
    onDismiss={close}
    onRequestClose={close}
    visible={isOpen}
    transparent={true}>
    <ImageViewer
      imageUrls={image}
      renderIndicator={()=>null}
      useNativeDriver={true}
      backgroundColor={appTheme.darkBackground+99}
      onCancel={close}
    />
  </Modal>
}

export default imageViewer;