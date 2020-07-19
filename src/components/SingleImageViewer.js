import {Modal, TouchableOpacity} from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import React from "react";
import {appTheme} from "../constants/colors";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {spacing} from "../constants/dimension";

const imageViewer = ({imageUrl, isOpen, close}) => {
  const image = [{
    url: imageUrl
  }]
  return <Modal
    onDismiss={close}
    onRequestClose={close}
    visible={isOpen}
    transparent={true}>
    <TouchableOpacity onPress={close}>
    <FontAwesome style={{alignSelf:'flex-end', marginTop:spacing.large, marginRight:spacing.medium_sm}} size={24} name={'close'} color={appTheme.grey}/>
    </TouchableOpacity>
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