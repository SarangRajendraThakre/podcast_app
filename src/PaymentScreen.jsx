import React from 'react';
import {View, Button, Alert} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import axios from 'axios';

const PaymentScreen = () => {
  const handlePayment = () => {
    const contact = '7410755975'; // actual user phone number (without +91)
    const name = 'Vidya'; // actual customer name

    const options = {
      description: 'Payment for Agri Product',
      image: 'https://images.seeklogo.com/logo-png/8/1/lexus-logo-png_seeklogo-83673.png',
      currency: 'INR',
      key: 'rzp_live_BeGbYWHL8ZEJ3B', // public key
      amount: 1, // ₹500
      name: 'Kavya Agri App',
      prefill: {
        email: 'customer@example.com',
        contact: contact,
        name: name,
      },
      theme: {color: '#53a20e'},
    };

    RazorpayCheckout.open(options)
      .then(async (data) => {
        const paymentId = data.razorpay_payment_id;
        Alert.alert('✅ Payment Successful', `ID: ${paymentId}`);

        // Call your backend to verify and send WhatsApp message
        try {
          const response = await axios.post('http://<YOUR_LOCAL_IP>:5000/api/payments/verify', {
            razorpay_payment_id: paymentId,
            contact,
            name,
          });

          if (response.data.success) {
            Alert.alert('✅ Message Sent', response.data.message);
          } else {
            Alert.alert('⚠️ Payment Not Captured', response.data.message);
          }
        } catch (error) {
          console.error(error);
          Alert.alert('❌ Server Error', error?.response?.data?.message || error.message);
        }
      })
      .catch((error) => {
        Alert.alert('❌ Payment Failed', error.description);
      });
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button title="Pay ₹500" onPress={handlePayment} />
    </View>
  );
};

export default PaymentScreen;
