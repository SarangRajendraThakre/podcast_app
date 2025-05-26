import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import WrapperContainer from '../../components/WrapperContainer';
import imagePath from '../../constants/imagePath';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {moderateScale, textScale} from '../../styles/responsiveSize';
import colors from '../../styles/colors';
import OTPTextInput from 'react-native-otp-textinput';
import ButtonComp from '../../components/ButtonComp';
import navigationStrings from '../../constants/navigationStrings';
const OtpScreen = ({navigation}) => {
  return (
    <WrapperContainer>
      <KeyboardAwareScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={imagePath.back_arrow} />
        </TouchableOpacity>
        <View style={{marginTop: moderateScale(60)}}>
          <Text style={styles.codeTextStyle}>Verification Code</Text>
          <Text style={styles.weHaveTextstyle}>
            We have sent the verification code to your email address
          </Text>
          <OTPTextInput
            containerStyle={{
              marginTop: moderateScale(48),
              marginBottom: moderateScale(56),
            }}
            textInputStyle={styles.textInputStyle}
            inputCount={4}
            tintColor={colors.btnColor}
            offTintColor={colors.offColor}
            keyboardType="number-pad"
          />
          <ButtonComp 
          onPress={()=>navigation.navigate(navigationStrings.SUCCESS)}
          buttonText={'Confirm'} />
        </View>
      </KeyboardAwareScrollView>
    </WrapperContainer>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  codeTextStyle: {
    fontSize: textScale(22),
    fontWeight: '600',
    color: colors.black,
  },
  weHaveTextstyle: {
    fontSize: textScale(16),
    color: colors.black60,
    fontWeight: '500',
    marginTop: moderateScale(6),
  },
  textInputStyle: {
    borderWidth: 0.5,
    borderRadius: 20,
    height: moderateScale(70),
    width: moderateScale(70),
  },
});
