import "./global.css";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

import { AuthProvider } from "@/context/auth";
import { SavedMoviesProvider } from "@/context/SavedMoviesContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <SavedMoviesProvider>
      <StatusBar hidden={true} />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade",
          animationDuration: 300,
        }}
        >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="movie/[id]" />
        <Stack.Screen name="(auth)" />
      </Stack>
      </SavedMoviesProvider>
    </AuthProvider>
  );
}
