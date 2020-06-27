import React from "react";

const colors = {
  appBlue: '#1177f3',
  bgGrey: '#f1f1f1',
  lightGrey: '#CEDCCE',
  darkGrey: '#A9A9A9',
  goldenStar: '#fddc68',
  acceptGreen:'#4bd35f',
  rejectRed:'#f7392e'
}
const darkPallet = {
  darkBlue: '#2d2f45',
  lightBlue: '#384053',
  extraLightBlue: '#63687b',
  greyBlue: '#686e80',
  hotPink: '#ea8380',
  darkPink:'#DD3180',
  skyBlue: '#829da8',
  orangeGradient: ['#f86676', '#fbb287']
}

export const appTheme = {
  background: darkPallet.darkBlue,
  gradient: darkPallet.orangeGradient,
  brightContent: darkPallet.hotPink,
  lightBackground: darkPallet.lightBlue,
  content: darkPallet.extraLightBlue,
  lightContent: darkPallet.skyBlue,
  grey: darkPallet.greyBlue,
  
}

export default colors;