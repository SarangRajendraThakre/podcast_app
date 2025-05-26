import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import colors from '../styles/colors';
import {moderateScale, textScale, width} from '../styles/responsiveSize';

const ButtonComp = ({buttonText, onPress,width}) => {
  return (
    <TouchableOpacity onPress={onPress} style={{...styles.btnStyle,width:width}}>
      <Text style={styles.textStyle}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default ButtonComp;

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: colors.btnColor,
    height: moderateScale(55),
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  textStyle: {
    fontSize: textScale(18),
    fontWeight: '600',
    color: colors.white,
  },
});
