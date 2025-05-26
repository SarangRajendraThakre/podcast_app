import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import navigationStrings from '../../constants/navigationStrings';
import WrapperContainer from '../../components/WrapperContainer';
import imagePath from '../../constants/imagePath';
import {moderateScale, textScale} from '../../styles/responsiveSize';
import colors from '../../styles/colors';
import TextInputComp from '../../components/TextInputComp';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ButtonComp from '../../components/ButtonComp';

const Login = ({navigation}) => {
  const [emial, setEmail] = useState('');
  const [number, setNumber] = useState('');
  console.log(number, 'number', emial, 'emial');

  return (
    <WrapperContainer>
      <KeyboardAwareScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}>
        <Image style={styles.imageStyle} source={imagePath.logoImage} />
        <View>
          <Text style={styles.textStyle}>OTP Verification</Text>
          <Text style={styles.enterEmailText}>
            Enter  phone number to send one time Password
          </Text>
          <View style={styles.inputViewStyle}>
           
            <TextInputComp
              value={number}
              onChangeText={text => setNumber(text)}
              placeholder={'Phone number'}
              keyboardType={'number-pad'}
            />
            <ButtonComp
              onPress={() => navigation.navigate(navigationStrings.OTP_SCREEN)}
              buttonText={'Continue'}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </WrapperContainer>
  );
};

export default Login;

const styles = StyleSheet.create({
  imageStyle: {
    alignSelf: 'center',
  },
  textStyle: {
    fontSize: textScale(22),
    fontWeight: '700',
    color: colors.black,
    marginTop: moderateScale(70),
  },
  enterEmailText: {
    fontSize: textScale(18),
    color: colors.black60,
    fontWeight: '500',
    marginTop: moderateScale(15),
  },
  inputViewStyle: {
    marginTop: moderateScale(50),
  },
});
