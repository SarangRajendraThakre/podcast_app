import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, Text, StyleSheet } from 'react-native';
import { OTPWidget } from '@msg91comm/sendotp-react-native';
import { mmkvStorage } from '../../state/storage'; // Optional local storage
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';

const widgetId = 'Y35657768534f303531353530'; // Replace with your MSG91 widget ID
const tokenAuth = '453113A4DxRrpgfRuy682e038aP1'; // Replace with your MSG91 Auth Key

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const OTPAuthScreen: React.FC<Props> = ({ navigation }) => {
  const [step, setStep] = useState<'PHONE' | 'OTP'>('PHONE');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [reqId, setReqId] = useState('');

  useEffect(() => {
    OTPWidget.initializeWidget(widgetId, tokenAuth);
  }, []);

  const handleSendOtp = async () => {
    if (!phone || phone.length < 10) {
      Alert.alert('Invalid phone number');
      return;
    }

    const formattedPhone = `91${phone.trim()}`;
    try {
      const response = await OTPWidget.sendOTP({ identifier: formattedPhone });
      console.log('OTP sent:', response);

      if (response.success && response.reqId) {
        setReqId(response.reqId);
        setStep('OTP');
        Alert.alert('OTP sent to', `+91 ${phone}`);
      } else {
        Alert.alert('Error', response.message || 'Failed to send OTP');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to send OTP');
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      Alert.alert('Please enter OTP');
      return;
    }

    try {
      const verifyRes = await OTPWidget.verifyOTP({ reqId, otp });
      console.log('Verification result:', verifyRes);

      if (verifyRes.success) {
        // You can optionally store token or navigate to home
        mmkvStorage.setItem('isLoggedIn', 'true'); // Optional
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home', params: { phone: `+91${phone}` } }],
        });
      } else {
        Alert.alert('Verification failed', verifyRes.message || 'Invalid OTP');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to verify OTP');
    }
  };

  return (
    <View style={styles.container}>
      {step === 'PHONE' ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter phone number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
          <Button title="Send OTP" onPress={handleSendOtp} />
        </>
      ) : (
        <>
          <Text>OTP sent to +91 {phone}</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            keyboardType="number-pad"
            value={otp}
            onChangeText={setOtp}
          />
          <Button title="Verify OTP" onPress={handleVerifyOtp} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 10,
    borderRadius: 6,
  },
});

export default OTPAuthScreen;
