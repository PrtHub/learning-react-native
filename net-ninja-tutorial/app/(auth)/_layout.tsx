import { Stack } from "expo-router";
import { StyleSheet, useColorScheme } from "react-native";
import { Colors } from "../../constants/color";
import { StatusBar } from "expo-status-bar";

const AuthLayout = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme || "dark"]

  console.log(colorScheme);

  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
         animation: 'none',
         headerShown: false,
        }}
      />
    </>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({});
