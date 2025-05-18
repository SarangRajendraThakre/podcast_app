import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../utils/Constants';
import { screenHeight, screenWidth } from '../../utils/Scaling';
import CustomText from '../../components/ui/CustomText';
import { navigate } from '../../utils/NavigationUtils';

const LoginScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/icons/logo.png')}
        style={styles.logoImage}
      />

      <CustomText variant="h3" style={styles.header}>
  Register
</CustomText>


 <TextInput
  style={styles.input}
  placeholder="Name"
  placeholderTextColor={Colors.text}
  onChangeText={setName}
/>

   <TextInput
  style={styles.input}
  placeholder="Email"
  keyboardType='email-address'
  placeholderTextColor={Colors.text}
  onChangeText={setEmail}
/>

<TextInput
  style={styles.input}
  placeholderTextColor={Colors.inactive}
  placeholder="Password"
  secureTextEntry
  onChangeText={setPassword}
/>

<TouchableOpacity
  style={styles.button}
  onPress={()=>{}}

>
  <CustomText variant="h5" style={styles.buttonText}>
    {false ? 'Registering....' : 'Register'}
  </CustomText>
</TouchableOpacity>


<TouchableOpacity onPress={() => navigate('LoginScreen')}>
  <CustomText variant="h6" style={styles.signUpText}>
  Already have an account? Login
  </CustomText>
</TouchableOpacity>





    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
    alignItems: 'center',
    padding: 20,
  },
  header: {
    marginBottom: 20,
    color: Colors.text,
  },
  logoImage: {
    height: screenHeight * 0.15,
    marginTop: 50,
    width: screenWidth * 0.6,
    resizeMode: 'contain',
  },
  input: {
  width: '100%',
  height: 50,
  backgroundColor: Colors.backgroundLight,
  borderRadius: 8,
  paddingHorizontal: 15,
  color: Colors.text,
  marginBottom: 15,
},
button: {
  width: '100%',
  height: 50,
  backgroundColor: Colors.primary,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 8,
  marginTop: 10,
},
buttonText: {
  color: Colors.background,
},
signUpText: {
  marginTop: 15,
  color: Colors.primary,
},


});

export default LoginScreen