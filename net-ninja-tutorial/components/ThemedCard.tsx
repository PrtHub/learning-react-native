import {
  StyleSheet,
  useColorScheme,
  View,
  ViewProps,
} from "react-native";
import { Colors } from "../constants/color";

const ThemedCard = ({ style, ...props }: ViewProps) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme || "dark"];

  return (
    <View style={[{ backgroundColor: theme.uiBackground }, styles.card, style]} {...props} />
  );
};

export default ThemedCard;

const styles = StyleSheet.create({
    card: {
        padding: 20,
        borderRadius: 10,
        marginVertical: 10
    },
});


