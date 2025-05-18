import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../utils/Constants';
import { screenHeight, screenWidth } from '../../utils/Scaling';
import CustomText from '../../components/ui/CustomText';
import { navigate } from '../../utils/NavigationUtils';
import { useMutation } from '@apollo/client';
import { REGISTER_MUTATION } from '../../graphQL/queries';

const RegisterScreen = () => {
  const [name , setName] = useState('');
    const [email, setEmail] = useState('');
const [password, setPassword] = useState('');


  const [register,{loading , error}] = useMutation(REGISTER_MUTATION)


const handleRegister = async () => {
  try {
    const lowerEmail = email.trim().toLowerCase(); // convert to lowercase

    const { data } = await register({
      variables: { name, email: lowerEmail, password },
    });

    if (data?.registerUser?.user) {
      Alert.alert('Registration Success', 'Login Now!');
      navigate('LoginScreen');
    }
  } catch (err) {
  if (err instanceof Error) {
    Alert.alert('Registration failed', error?.message || err.message);
  } else {
    Alert.alert('Registration failed', error?.message || 'Something went wrong.');
  }
}

};


  useEffect(() => {
  fetch('http://192.168.185.188:3000/api/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: '{ __typename }',
    }),
  })
    .then(res => res.json())
    .then(data => console.log('GraphQL response:', data))
    .catch(err => console.error('Network error:', err));
}, []);


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

{
  error && (
    <CustomText style={{color : 'red'}} >Error :  {error.message}</CustomText>
  )
}

<TouchableOpacity
  style={styles.button}
  onPress={handleRegister}
  disabled={loading}

>
  <CustomText variant="h5" style={styles.buttonText}>
    {loading ? 'Registering....' : 'Register'}
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

export default RegisterScreen