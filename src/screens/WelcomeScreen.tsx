import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  // *** REMOVE PointerEvents FROM HERE ***
  // PointerEvents,
  Image,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

// Ensure these imports point to your .tsx files
import CustomTextInput from '../FormFilling/components/CustomTextInput';
import DropdownComponent from '../FormFilling/components/DropdownComponent';
import CustomCheckbox from '../FormFilling/components/CustomCheckbox';

interface GenderOption {
  label: string;
  value: string;
}

const WelcomeScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [dateOfBirth, setDateOfBirth] = useState<string>('');
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);

  const showDatePicker = (): void => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = (): void => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date: Date): void => {
    setDateOfBirth(date.toLocaleDateString()); // Format as desired
    hideDatePicker();
  };

  const handleLogin = (): void => {
    console.log('Login Pressed:', { email, password, rememberMe });
    // Implement login logic here
  };

  const handleForgotPassword = (): void => {
    console.log('Forgot Password Pressed');
    // Navigate to forgot password screen
  };

  const handleSignUp = (): void => {
    console.log('Sign Up Pressed');
    // Navigate to sign up screen
  };

  const genderOptions: GenderOption[] = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ];

  return (
    <ImageBackground
      // source={require('./assets/background-wave.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.headerContainer}>
            <Text style={styles.welcomeText}>Welcome Back!</Text>
            <Text style={styles.subHeaderText}>Sign in to continue</Text>
          </View>

          <View style={styles.formContainer}>
            <CustomTextInput
              icon="email-outline"
              placeholder="Email or Phone Number"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <CustomTextInput
              icon="lock-outline"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            {/* Date of Birth Input */}
            <TouchableOpacity onPress={showDatePicker} style={styles.dateInputWrapper}>
              <CustomTextInput
                icon="calendar"
                placeholder="Date of Birth"
                value={dateOfBirth}
                editable={false}
                // *** NO NEED FOR 'as PointerEvents' HERE ANYMORE ***
                pointerEvents='none'
              />
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirmDate}
              onCancel={hideDatePicker}
            />

            {/* Gender Dropdown */}
            <DropdownComponent
              data={genderOptions}
              placeholder="Select Gender"
              value={selectedGender}
              onSelect={setSelectedGender}
              icon="gender-male-female"
            />

            <View style={styles.optionsRow}>
              <CustomCheckbox
                label="Remember me"
                checked={rememberMe}
                onPress={() => setRememberMe(!rememberMe)}
              />
              <TouchableOpacity onPress={handleForgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>LOGIN</Text>
            </TouchableOpacity>

            <View style={styles.orSeparator}>
              <View style={styles.line} />
              <Text style={styles.orText}>OR</Text>
              <View style={styles.line} />
            </View>

            <View style={styles.socialButtonsContainer}>
              <TouchableOpacity style={styles.socialButton}>
                <Image
                  // source={require('./assets/google-logo.png')}
                  style={styles.socialIcon}
                />
                <Text style={styles.socialButtonText}>Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Image
                  // source={require('./assets/apple-logo.png')}
                 
                />
                <Text style={styles.socialButtonText}>Apple</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don't have an account? </Text>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.signUpLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  subHeaderText: {
    fontSize: 16,
    color: '#DDD',
  },
  formContainer: {
    backgroundColor: '#FFF',
    padding: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  dateInputWrapper: {
    marginBottom: 15,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#888',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#6A5ACD',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orSeparator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  orText: {
    marginHorizontal: 10,
    color: '#888',
    fontSize: 14,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    width: '48%',
    justifyContent: 'center',
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  socialButtonText: {
    fontSize: 16,
    color: '#333',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#1E1E1E',
  },
  signUpText: {
    color: '#DDD',
    fontSize: 15,
  },
  signUpLink: {
    color: '#6A5ACD',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;