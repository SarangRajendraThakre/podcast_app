import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { gql, useMutation } from '@apollo/client';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';
import { mmkvStorage } from '../../state/storage';

type Props = NativeStackScreenProps<RootStackParamList, 'Otp'>;

const VERIFY_OTP = gql`
  mutation VerifyOtp($phone: String!, $code: String!) {
    verifyOtp(phone: $phone, code: $code) {
      success
      message
      token
    }
  }
`;

const OtpScreen: React.FC<Props> = ({ route, navigation }) => {
  const { phone } = route.params;
  const [otp, setOtp] = useState('');
  const [verifyOtp, { loading }] = useMutation(VERIFY_OTP);

  const handleVerifyOtp = async () => {
    if (!otp) {
      Alert.alert('Please enter OTP');
      return;
    }

    try {
      const { data } = await verifyOtp({ variables: { phone, code: otp } });
      if (data.verifyOtp.success) {
        mmkvStorage.setItem('accessToken', data.verifyOtp.token);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home', params: { phone } }],
        });
      } else {
        Alert.alert('Error', data.verifyOtp.message);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text>OTP sent to {phone}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        keyboardType="number-pad"
        value={otp}
        onChangeText={setOtp}
      />
      <Button title={loading ? 'Verifying...' : 'Verify OTP'} onPress={handleVerifyOtp} disabled={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginVertical: 10,
    borderRadius: 6,
  },
});

export default OtpScreen;
