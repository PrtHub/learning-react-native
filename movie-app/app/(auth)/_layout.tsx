import { Stack } from "expo-router";
import React from "react";
import { StatusBar } from "react-native";

const AuthLayout = () => {
  return (
    <>
      <StatusBar hidden={true} />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade',
          animationDuration: 300,
        }}
      >
        <Stack.Screen name="sign-in" />
        <Stack.Screen name="sign-up" />
      </Stack>
    </>
  );
};

export default AuthLayout;
