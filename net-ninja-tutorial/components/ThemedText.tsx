import React, { useMemo } from "react";
import {
  Text,
  TextStyle,
  useColorScheme,
  ViewProps,
} from "react-native";
import { Colors } from "../constants/color";

interface ThemedTextProps extends Omit<ViewProps, "style"> {
  style?: TextStyle;
  title?: boolean;
}

const ThemedText = ({ style, title = false, ...props }: ThemedTextProps) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme || "dark"];

  const textColor = title ? theme.title : theme.text;

  return <Text style={[{ color: textColor }, style]} {...props} />;
};

export default ThemedText;
