import { StyleSheet, Text, View } from "react-native";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import Spacer from "../../components/Spacer";
import { Link } from "expo-router";
import ThemedButton from "../../components/ThemedButton";

const Login = () => {

    const handleLogin = () => {
        console.log("Login");
    }


  return (
    <ThemedView style={styles.container}>
      <Spacer height={20} />

      <ThemedText style={styles.text} title>
        Login to your account
      </ThemedText>

      <Spacer height={40} />

      <ThemedButton onPress={handleLogin}>
        <Text style={{color: '#fff'}}>Login</Text>
      </ThemedButton>

      <Spacer height={20}/>

      <View style={styles.linkContainer}>
        <ThemedText>Don't have an account?</ThemedText>
        <Link href="/register">
          <ThemedText style={styles.link}>Register</ThemedText>
        </Link>
      </View>

      <Spacer height={20}/>

      <Link href="/">
          <ThemedText style={styles.link}>Go to Home</ThemedText>
        </Link>
    </ThemedView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  linkContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5
  },
  link: {
      fontWeight: "bold",
  },
});
