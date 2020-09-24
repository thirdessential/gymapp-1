import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import {TermsURL} from '../constants/appConstants'

class MyWebComponent extends Component {
  render() {
    return <WebView source={{ uri: TermsURL  }} />;
  }
}

export default MyWebComponent