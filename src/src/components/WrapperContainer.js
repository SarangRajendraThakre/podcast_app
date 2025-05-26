import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../styles/colors';
import {moderateScale} from '../styles/responsiveSize';

const WrapperContainer = ({children}) => {
  return (
    <SafeAreaView style={{backgroundColor: colors.white, flex: 1}}>
      <StatusBar backgroundColor={colors.white} />
      <View style={{flex: 1, marginHorizontal: moderateScale(38)}}>
        {children}
      </View>
    </SafeAreaView>
  );
};

export default WrapperContainer;

const styles = StyleSheet.create({});
