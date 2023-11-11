import React from "react";
import { NativeBaseProvider } from "native-base";
import Router from "./src/Router.js";

export default function App() {
  return (
    <NativeBaseProvider>
      <Router />
    </NativeBaseProvider>
  );
}