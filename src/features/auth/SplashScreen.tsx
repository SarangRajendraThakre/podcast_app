import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

import { resetAndNavigate } from '../../utils/NavigationUtils';
import { mmkvStorage } from '../../state/storage';


const SplashScreen = () => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const token = mmkvStorage.getItem('accessToken');
      const phone = mmkvStorage.getItem('phone');

      if (token && phone) {
        resetAndNavigate('Home', { phone });
      } else {
        resetAndNavigate('Login');
      }
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
