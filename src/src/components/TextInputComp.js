import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {moderateScale, textScale} from '../styles/responsiveSize';
import imagePath from '../constants/imagePath';
import colors from '../styles/colors';

const TextInputComp = ({value, onChangeText, rightIcon,placeholder,keyboardType}) => {
  return (
    <View style={styles.viewStyle}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={styles.textInputStyle} 
        placeholder={placeholder}
        keyboardType={keyboardType}
      />

      {rightIcon && <Image source={imagePath.Editicon} />}
    </View>
  );
};

export default TextInputComp;

const styles = StyleSheet.create({
  viewStyle: {
    height: moderateScale(70),
    borderWidth: 0.5,
    borderRadius: 20,
    borderColor: colors.black60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(18),
    marginBottom: moderateScale(50),
  },
  textInputStyle: {
    flex: 1,
    height: moderateScale(70),
    fontSize: textScale(18),
    color: colors.black60,
  },
});
