import { StyleSheet, Text, View } from "react-native";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import Spacer from "../../components/Spacer";
import { Link } from "expo-router";
import ThemedButton from "../../components/ThemedButton";

const Register = () => {

    const handleRegister = () => {
        console.log("Register");
    }

  return (
    <ThemedView style={styles.container}>
      <Spacer height={20} />

      <ThemedText style={styles.text} title>
        Create an account
      </ThemedText>

      <Spacer height={40} />

      <ThemedButton onPress={handleRegister}>
        <Text style={{color: '#fff'}}>Register</Text>
      </ThemedButton>

      <Spacer height={20}/>

      <View style={styles.linkContainer}>
        <ThemedText>Already have an account?</ThemedText>
        <Link href="/login">
          <ThemedText style={styles.link}>Login</ThemedText>
        </Link>
      </View>
    </ThemedView>
  );
};

export default Register;

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
