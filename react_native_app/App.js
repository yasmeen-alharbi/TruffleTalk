// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, View } from 'react-native';
// // import { config } from '@gluestack-ui/config'; // Optional if you want to use default theme

// export default function App() {
//   return (
//     <NativeBaseProvider>
//       <View style={styles.container}>
//         <Text>Open up App.js to start working on your app!</Text>
//         <StatusBar style="auto" />
//       </View>
//     </NativeBaseProvider>
//   );
// }
import React from "react";
import { NativeBaseProvider, Box } from "native-base";

export default function App() {
  return (
    <NativeBaseProvider>
      <Box>Hello world</Box>
    </NativeBaseProvider>
  );
}