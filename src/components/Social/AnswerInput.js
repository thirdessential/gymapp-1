import React, {useState} from "react";
import {LayoutAnimation, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";

import strings from "../../constants/strings";
import {MAX_POST_LENGTH, userTypes,INITIAL_USER_TYPE} from "../../constants/appConstants";
import {appTheme} from "../../constants/colors";
import {spacing} from "../../constants/dimension";
import fonts from "../../constants/fonts";

const answerInput = (props) => {
  const [isAnswerOpen, setAnswerOpen] = useState(false);
  const [answerText, setAnswerText] = useState('');
  const toggleAnswerOpen = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setAnswerOpen(!isAnswerOpen);
  }
  const close = () => {
    toggleAnswerOpen();
    setAnswerText('');
  }
  const submit = () => {
    console.log(answerText.length)
    if(answerText.length !== 0){props.onSubmit(answerText)}
    close();
  }
  return (
    <View>
      {
        isAnswerOpen &&
          <View>
            <View style = {{flexDirection:"row", justifyContent: "flex-end"}}>
              <Text style={[styles.title, { color: appTheme.brightContent }]}>
                {answerText.length}/{MAX_POST_LENGTH}
              </Text>
            </View>
            <TextInput
            numberOfLines={2}
            multiline={true}
            value={answerText}
            onChangeText={setAnswerText}
            style={[styles.title, styles.textInput]}
            underlineColorAndroid={'transparent'}
            maxLength={MAX_POST_LENGTH}
          />
        </View>
      }
      <View style={{flexDirection: 'row'}}>
      {userTypes.TRAINER ===INITIAL_USER_TYPE && <TouchableOpacity onPress={isAnswerOpen ? submit : toggleAnswerOpen}>
          <Text style={styles.answerButton}>{strings.ANSWER}</Text>
        </TouchableOpacity>}  
        {
          isAnswerOpen && <TouchableOpacity onPress={close}>
            <Text style={[styles.answerButton, {color: appTheme.grey}]}>{strings.CANCEL}</Text>
          </TouchableOpacity>
        }
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  answerButton: {
    fontFamily: fonts.CenturyGothicBold,
    color: appTheme.brightContent,
    marginTop: spacing.medium_sm,
    marginBottom: spacing.medium_sm,
    marginRight: spacing.medium
  },
  title: {
    color: appTheme.textPrimary,
    fontFamily: fonts.CenturyGothic,
    fontWeight: '700'
  },
  textInput: {
    backgroundColor: appTheme.background,
    borderRadius: 10,
    marginTop: spacing.medium_sm,
    textAlignVertical: 'top',
    paddingLeft: spacing.small,
    paddingRight: spacing.small
  },
});

export default React.memo(answerInput);