import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { mmkvStorage } from '../state/storage';
import { Platform } from 'react-native';

// ✅ Replace with your actual local IP
const LOCAL_IP = '192.168.185.188';

// ✅ Helper to check if running on emulator (basic check for Android)
const isEmulator = () => {
  if (Platform.OS === 'android') {
    // Android emulator uses 10.0.2.2 to access host
    return true;
  }
  return false;
};

// ✅ Dynamically set URI
const uri =
  Platform.OS === 'ios'
    ? 'http://localhost:3000/api/graphql' // iOS Simulator
    : isEmulator()
    ? 'http://10.0.2.2:3000/api/graphql' // Android Emulator
    : `http://${LOCAL_IP}:3000/api/graphql`; // Real Android Device

const httpLink = createHttpLink({ uri });

const authLink = setContext((_, { headers }) => {
  const token = mmkvStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
