import React from 'react';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { NativeRouter } from 'react-router-native';

import Router from './src/Router';
import { AuthProvider } from './src/AuthProvider';

export default function App() {
  const theme = extendTheme({
    colors: {
      primary: {
        50: "#f2f9ed",
        100: "#dcedd0",
        200: "#c8dfb7",
        300: "#b3cf9f",
        400: "#9dc183",
        500: "#93b37b",
        600: "#88a473",
        700: "#7d936d",
        800: "#727f6a",
        900: "#686b65",
      }
    },
  });

  return (
    <NativeBaseProvider theme={theme}>
      <AuthProvider>
        <NativeRouter>
          <Router />
        </NativeRouter>
      </AuthProvider>
    </NativeBaseProvider>
  );
};