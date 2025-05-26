import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WrapperContainer from '../../components/WrapperContainer';
import {moderateScale, textScale, width} from '../../styles/responsiveSize';
import colors from '../../styles/colors';
import ButtonComp from '../../components/ButtonComp';
import imagePath from '../../constants/imagePath';

const Success = () => {
  return (
    <WrapperContainer>
      <View style={styles.containerView}>
        <Image
          style={{marginBottom: moderateScale(16)}}
          source={imagePath.successIc}
        />
        <Text style={styles.successTextStyle}>Success!</Text>
        <Text style={styles.congratulationTextStyle}>
          Congratulations! You have been successfully authenticated
        </Text>
        <View>
          <ButtonComp 
          width={width/1.2}
          buttonText={'Continue'} />
        </View>
      </View>
    </WrapperContainer>
  );
};

export default Success;

const styles = StyleSheet.create({
  containerView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  successTextStyle: {
    fontSize: textScale(22),
    fontWeight: '600',
    color: colors.black,
  },
  congratulationTextStyle: {
    textAlign: 'center',
    marginTop: moderateScale(8),
    color: colors.black60,
    fontSize: textScale(18),
    fontWeight: '500',
    marginBottom: moderateScale(77),
  },
});
