// // App.tsx
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { SafeAreaView } from 'react-native';
// import Todos from './src/Crud_Using_tanstack/Todos';
// import PaymentScreen from './src/PaymentScreen';

// const queryClient = new QueryClient();

// export default function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <SafeAreaView style={{ flex: 1 }}>
//         {/* <Todos /> */}

//     <PaymentScreen/>

//       </SafeAreaView>
//     </QueryClientProvider>
//   );
// }

// import React from 'react';
// import { ApolloProvider } from '@apollo/client';
// import { client } from './src/graphQL/client';
// import Navigation from './src/navigation/Navigation';

// export default function App() {
//   return (
//     <ApolloProvider client={client}>
//       <Navigation />
//     </ApolloProvider>
//   );
// }

//////////////////////////////

// import { OTPWidget } from "@msg91comm/sendotp-react-native";
// import { useEffect, useState } from "react";
// import { Text, TextInput, TouchableOpacity, View, StyleSheet, Alert } from "react-native";

// const widgetId = "35657768534f303531353530";
// const tokenAuth = "453113TyMCtqefD3V682e7c9cP1";

// const App = () => {
//     useEffect(() => {
//         OTPWidget.initializeWidget(widgetId, tokenAuth);
//     }, []);

//     const [number, setNumber] = useState('');

//     const handleSendOtp = async () => {
//         if (number.length < 10) {
//             Alert.alert("Enter a valid phone number");
//             return;
//         }

//         const data = {
//             identifier: number.startsWith("91") ? number : `91${number}`,
//             channel: 'whatsapp' // 👈 request WhatsApp delivery
//         };

//         try {
//             const response = await OTPWidget.sendOTP(data);
//             console.log("OTP send response:", response);

//             if (response.type === "success") {
//                 Alert.alert("OTP sent to WhatsApp", number);
//             } else {
//                 Alert.alert("Failed", response.message || "Could not send OTP");
//             }
//             console.log("Full response:", JSON.stringify(response, null, 2));

//         } catch (error: any) {
//             console.error("OTP error:", error);
//             Alert.alert("Error", error.message || "Failed to send OTP");
//         }
//     };

//     return (
//         <View style={{ padding: 20 }}>
//             <TextInput
//                 placeholder='Enter number'
//                 value={number}
//                 keyboardType='numeric'
//                 style={{ backgroundColor: '#ededed', margin: 10, padding: 10 }}
//                 onChangeText={setNumber}
//             />
//             <TouchableOpacity
//                 style={styles.button}
//                 onPress={handleSendOtp}
//             >
//                 <Text style={{ color: 'white' }}>
//                     Send OTP via WhatsApp
//                 </Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     button: {
//         backgroundColor: 'green',
//         padding: 12,
//         margin: 10,
//         borderRadius: 6,
//         alignItems: 'center'
//     }
// });

// export default App;

/////////////////////// on boarding

// import React, { useEffect, useState } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import OnboardingScreen from './src/screens/OnboardingScreen';
// import HomeScreen from './src/screens/HomeScreen';
// import { MMKV } from 'react-native-mmkv';

// const storage = new MMKV();

// export type RootStackParamList = {
//   OnboardingScreen: undefined;
//   HomeScreen: undefined;
// };

// const Stack = createStackNavigator<RootStackParamList>();

// const App: React.FC = () => {
//   const [isAppFirstLaunched, setIsAppFirstLaunched] = useState<boolean | null>(null);

//   useEffect(() => {
//     const checkFirstLaunch = () => {
//       const appData = storage.getString('isAppFirstLaunched');
//       if (appData === undefined) {
//         setIsAppFirstLaunched(true);
//         storage.set('isAppFirstLaunched', 'false');
//       } else {
//         setIsAppFirstLaunched(false);
//       }
//     };

//     checkFirstLaunch();
//   }, []);

//   if (isAppFirstLaunched === null) {
//     return null; // or a loading spinner
//   }

//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         {isAppFirstLaunched && <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />}
//         <Stack.Screen name="HomeScreen" component={HomeScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;

// test of fonts

// import React from 'react';
// import { Text, View } from 'react-native';

// const App = () => {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' , backgroundColor:'green'   }}>
//   <Text style={{ fontFamily: 'AncizarSerif-Italic-VariableFont_wght', fontSize: 50 }}>
//         Hello with Satoshi!
//       </Text>
//     </View>
//   );
// };

// export default App;

//

// import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import Routes from './src/src/navigations/Routes'

// const App = () => {
//   return (
//    <Routes/>
//   )
// }

// export default App





// // const styles = StyleSheet.create({})
// import { View, Text, Image, StyleSheet } from 'react-native';
// import React from 'react';

// // For the "</>" icon, we'll use a Text component for simplicity.
// // For a real app, consider using react-native-vector-icons as discussed previously.
// // import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// const App = () => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.card}>
//         {/* Top Section: Hello and Code Icon */}
//         <View style={styles.topSection}>
//           <Text style={styles.helloTextSmall}>Hello</Text>
//           {/* Using a Text component for the icon for simplicity.
//               Replace with a proper icon library component like:
//               <Icon name="code-tags" size={20} color="#888" />
//           */}
//           <Text style={styles.codeIcon}>&lt;/&gt;</Text>
//         </View>

//         {/* Main Content Section: Name, Website, and Profile Image */}
//         <View style={styles.mainContent}>
//           <View style={styles.textColumn}>
//             <Text style={styles.greetingText}>
//               <Text style={{ color: '#FFB86B' }}>Hello,</Text>{' '} {/* Simulating gradient with two colors */}
//               <Text style={{ color: '#A06EE7' }}>I'm</Text>{' '}
//               <Text style={{ color: '#E199F6' }}>Burak</Text>
//             </Text>
//             <Text style={styles.websiteText}>burakerenoglu.com</Text>
//           </View>
//           <Image
//             source={{ uri: 'https://i.ibb.co/hZ2v1w2/avatar.png' }} // Replace with actual image URL or local asset
//             style={styles.profileImage}
//           />
//         </View>

//         {/* Description Text */}
//         <Text style={styles.descriptionText}>
//           I'm an UI/UX designer for 15 years.
//           I've made designs for <Text style={styles.highlightText}>Starbucks</Text>,
//           <Text style={styles.highlightText}> Unilever</Text>, <Text style={styles.highlightText}>Emirates</Text> and some
//           startups.
//         </Text>
//       </View>
//     </View>
//   );
// };

// export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#1E1E1E', // Dark background for the overall screen
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   card: {
//     margin: 20,
//     width: 350, // Increased width slightly to accommodate content
//     // height: 280, // Let height be determined by content using minHeight or auto
//     minHeight: 280, // Minimum height for better consistency
//     backgroundColor: '#2A2E35', // Darker background for the card
//     padding: 25, // Increased padding
//     borderRadius: 20, // More rounded corners
//     // iOS shadow
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 8 }, // Larger shadow for more depth
//     shadowOpacity: 0.4,
//     shadowRadius: 10,
//     // Android shadow
//     elevation: 15, // Larger elevation for more depth
//     justifyContent: 'space-between', // Distribute content vertically
//   },
//   topSection: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20, // Space below this section
//   },
//   helloTextSmall: {
//     color: '#D1D1D1', // Light grey
//     fontSize: 14,
//     fontWeight: '500',
//   },
//   codeIcon: {
//     color: '#888', // Grey for the icon
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   mainContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between', // Push text to left, image to right
//     marginBottom: 20,
//   },
//   textColumn: {
//     flex: 1, // Allow text to take available space
//     marginRight: 15, // Space between text and image
//   },
//   greetingText: {
//     fontSize: 30, // Larger font size
//     fontWeight: 'bold',
//     // For a true gradient, you would need a library or SVG text.
//     // These colors are an approximation.
//   },
//   websiteText: {
//     color: '#888', // Grey
//     fontSize: 14,
//     textDecorationLine: 'underline',
//     marginTop: 5,
//   },
//   profileImage: {
//     width: 70, // Fixed size for the image
//     height: 70,
//     borderRadius: 35, // Half of width/height for a perfect circle
//     borderWidth: 2, // Optional border
//     borderColor: '#7E6BE7', // Border color to match gradient
//   },
//   descriptionText: {
//     color: '#D1D1D1', // Light grey
//     fontSize: 16,
//     lineHeight: 24, // Spacing between lines
//   },
//   highlightText: {
//     fontWeight: 'bold',
//     color: '#FFFFFF', // White for highlighted words
//   },
// });

