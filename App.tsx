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

import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { client } from './src/graphQL/client';
import Navigation from './src/navigation/Navigation';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Navigation />
    </ApolloProvider>
  );
}
