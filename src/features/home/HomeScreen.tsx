import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { gql, useMutation } from '@apollo/client';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { mmkvStorage } from '../../state/storage';


const LOGOUT = gql`
  mutation Logout($phone: String!) {
    logout(phone: $phone) {
      success
      message
    }
  }
`;


type Props = NativeStackScreenProps<RootStackParamList>;

const HomeScreen: React.FC<Props> = ({ navigation, route }) => {

const phone =  mmkvStorage.getItem('phone');

console.log(phone);


  const [logout, { loading }] = useMutation(LOGOUT);

const handleLogout = async () => {
  try {
    const { data } = await logout({ variables: { phone } });
    if (data.logout.success) {
      // ✅ Remove access token from storage
      mmkvStorage.removeItem('accessToken');

      Alert.alert('Success', data.logout.message);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } else {
      Alert.alert('Error', data.logout.message);
    }
  } catch (error: any) {
    Alert.alert('Error', error.message || 'Something went wrong');
  }
};

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>
        Welcome to Home Screen!
      </Text>
      <Button title={loading ? 'Logging out...' : 'Logout'} onPress={handleLogout} disabled={loading} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
