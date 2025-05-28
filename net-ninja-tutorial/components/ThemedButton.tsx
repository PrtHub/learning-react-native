import {
  Pressable,
  StyleSheet,
  ViewProps,
  ViewStyle,
} from "react-native";
import { Colors } from "../constants/color";

interface ThemedButtonProps extends ViewProps {
    style?: ViewStyle;
    onPress?: () => void;
}

const ThemedButton = ({ style, onPress, ...props }: ThemedButtonProps) => {

  return (
    <Pressable style={(pressed) => [
      styles.btn,
      pressed && styles.pressed,
      style
    ]} {...props} onPress={onPress}/>
  );
};

export default ThemedButton;

const styles = StyleSheet.create({
    btn: {
       backgroundColor: Colors.primary,
       paddingHorizontal: 20,
       paddingVertical: 10,
       borderRadius: 5,
       alignItems: 'center'
    },
    pressed: {
        opacity: 0.7
    }
});


