import {
  useColorScheme,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import { Colors } from "../constants/color";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ThemedViewProps extends ViewProps {
  style?: ViewStyle;
  safeArea?: boolean;
}

const ThemedView = ({ style, safeArea = false, ...props }: ThemedViewProps) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme || "dark"];

  if (safeArea) {
    const insets = useSafeAreaInsets();
    const newStyle = { ...style, paddingTop: insets.top, paddingBottom: insets.bottom };

    return (
      <View
        style={[{ backgroundColor: theme.background }, newStyle]}
        {...props}
      />
    );
  }

  return (
    <View style={[{ backgroundColor: theme.background }, style]} {...props} />
  );
};

export default ThemedView;
