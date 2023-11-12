import React from 'react'
import { NativeBaseProvider } from 'native-base'

import { AuthProvider } from './src/AuthProvider'
import Router from './src/Router'

export default function App() {
  return (
    <NativeBaseProvider>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </NativeBaseProvider>
  );
};