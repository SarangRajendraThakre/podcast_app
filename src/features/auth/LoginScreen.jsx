import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { gql, useMutation } from '@apollo/client';
import { mmkvStorage } from '../../state/storage';

const SEND_OTP = gql`
  mutation SendOtp($phone: String!) {
    sendOtp(phone: $phone) {
      success
      message
    }
  }
`;

export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState('');
  const [sendOtp, { loading }] = useMutation(SEND_OTP);

const handleSendOtp = async () => {
  if (!phone || phone.length < 10) {
    Alert.alert('Invalid phone number');
    return;
  }

  // Automatically add country code
  const formattedPhone = `+91${phone.trim()}`;

  console.log("Sending phone:", formattedPhone);

  try {
    const { data } = await sendOtp({
      variables: {
        phone: formattedPhone,
      },
    });
    console.log("GraphQL Response:", data);
    if (data.sendOtp.success) {
  mmkvStorage.setItem('phone', formattedPhone);
  navigation.navigate('Otp', { phone: formattedPhone });
} else {
      Alert.alert('Error', data.sendOtp.message);
    }
  } catch (error) {
    Alert.alert('Error', error.message);
  }
};

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter phone number"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />
      <Button title={loading ? 'Sending...' : 'Send OTP'} onPress={handleSendOtp} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 10,
    borderRadius: 6,
  },
});
