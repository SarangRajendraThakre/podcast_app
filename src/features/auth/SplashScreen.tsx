import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { resetAndNavigate } from '../../utils/NavigationUtils';
import { mmkvStorage } from '../../state/storage';
import { jwtDecode } from 'jwt-decode';
import { gql, useApolloClient } from '@apollo/client';

const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshToken($phone: String!, $refreshToken: String!) {
    refreshToken(phone: $phone, refreshToken: $refreshToken) {
      success
      message
      accessToken
      refreshToken
    }
  }
`;

const SplashScreen = () => {
  const client = useApolloClient();

  const isTokenValid = (token: string) => {
    try {
      const decoded: any = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp > currentTime;
    } catch (err) {
      return false;
    }
  };

useEffect(() => {
  const checkAndRefreshToken = async () => {
    const accessToken = mmkvStorage.getItem('accessToken');
    const refreshToken = mmkvStorage.getItem('refreshToken');


    const phone = mmkvStorage.getItem('phone');

    console.log('AccessToken:', accessToken);
    console.log('RefreshToken:', refreshToken);
    console.log('Phone:', phone);

    if (accessToken && isTokenValid(accessToken)) {
      console.log('Access token valid. Navigating to Home.');
      resetAndNavigate('UserBottomTab');
    } else if (refreshToken && isTokenValid(refreshToken)) {
      console.log('Access token invalid/expired, refreshing token...');
      try {
        const { data } = await client.mutate({
          mutation: REFRESH_TOKEN_MUTATION,
          variables: { phone, refreshToken },
        });
        console.log('Refresh token mutation response:', data);


        const newAccessToken = data.refreshToken.accessToken;
const newRefreshToken = data.refreshToken.refreshToken;

if (typeof newAccessToken === 'string' && typeof newRefreshToken === 'string') {
  mmkvStorage.setItem('accessToken', newAccessToken);
  mmkvStorage.setItem('refreshToken', newRefreshToken);
  console.log('Tokens refreshed and stored');
} else {
  console.error('Invalid token(s) received:', newAccessToken, newRefreshToken);
}

        if (data?.refreshToken?.success) {

         mmkvStorage.setItem('accessToken', data.refreshToken.accessToken); // ✅ 'token' is correct
         console.log( mmkvStorage.getItem('accessToken') , mmkvStorage.getItem('refreshToken'));
          mmkvStorage.setItem('refreshToken', data.refreshToken.refreshToken);
          console.log('Tokens refreshed successfully, navigating to Home.');
          resetAndNavigate('UserBottomTab');
        } 
        
        else {
          console.log('Refresh token failed. Navigating to Login.');
          resetAndNavigate('OtpAuth');
        }
      } catch (err) {
        console.error('Refresh token mutation error:', err);
        resetAndNavigate('OtpAuth');
      }
    } else {
      console.log('No valid tokens found. Navigating to Login.');
      resetAndNavigate('OtpAuth');
    }
  };

  const timeoutId = setTimeout(() => {
    checkAndRefreshToken();
  }, 1000);

  return () => clearTimeout(timeoutId);
}, []);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/icons/profile.jpeg')} style={styles.logoImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  logoImage: { width: 200, height: 200, resizeMode: 'contain' },
});

export default SplashScreen;
