import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { NativeRouter } from 'react-router-native';

import Router from './src/Router';
import { AuthProvider } from './src/AuthProvider';

export default function App() {
  return (
    <NativeBaseProvider>
      <AuthProvider>
        <NativeRouter>
          <Router />
        </NativeRouter>
      </AuthProvider>
    </NativeBaseProvider>
  );
};