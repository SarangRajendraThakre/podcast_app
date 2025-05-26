import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { mmkvStorage } from '../state/storage';
import { Platform } from 'react-native';

const isEmulator = () => {
  return Platform.OS === 'android';
};

const LOCAL_IP = '192.168.205.188'; // 🔁 Replace with your PC's IP

// const uri =
//   Platform.OS === 'ios'
//     ? 'http://localhost:3000/api/graphql'
//     : __DEV__
//     ? `http://${LOCAL_IP}:3000/api/graphql`
//     : 'https://your-production-api.com/api/graphql';


const uri =
  Platform.OS === 'ios'
    ? 'https://api.kavyaagri.in/'
    : __DEV__
    ? `https://api.kavyaagri.in/`
    : 'https://api.kavyaagri.in/';

console.log('Apollo GraphQL URI =>', uri);

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
