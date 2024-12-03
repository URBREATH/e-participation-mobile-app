import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { useMobxStores } from "../stores/stores";
import { observer } from "mobx-react";
import Ionicons from "react-native-vector-icons/Ionicons";

const LoginForm = ({ navigation }) => {
  const { mainStore } = useMobxStores(); // Use the store directly

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    setError(null); // Clear previous error

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      console.log("Attempting login...");
      await mainStore.login(email, password); // Call the login method

      const token = mainStore.token; // Access token directly from the store
      if (token) {
        console.log("Login Successful. Token:", token);
        navigation.navigate("Root"); // Navigate to the main screen
      } else {
        setError("Login failed. No token retrieved.");
      }
    } catch (error) {
      console.error("Login Error:", error.message);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome</Text>
        <Text style={styles.welcomeText}>back</Text>
        <Text style={styles.subText}>Sign in to continue</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} style={styles.icon} />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} style={styles.icon} />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry={true}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.forgotPasswordContainer}>
        <Text style={styles.linkText}>Forgot password?</Text>
      </TouchableOpacity>

      {error && (
        <Text style={styles.error}>
          <Ionicons name="warning-outline" size={16} color="red" /> {error}
        </Text>
      )}

      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.loginText}>Sign In</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.alreadyText}>Don’t have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("CreateAccount")}>
          <Text style={styles.linkText}> Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default observer(LoginForm);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#3B2D5F",
    paddingHorizontal: 20,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    height: 320,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#fff",
  },
  subText: {
    fontSize: 16,
    color: "#D3CCE3",
    marginTop: 5,
    marginBottom: 25,
  },
  formContainer: {
    marginTop: 40,
    paddingHorizontal: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 35,
  },
  icon: {
    marginRight: 10,
    color: "#aaa",
  },
  input: {
    flex: 1,
    height: Platform.OS === "ios" ? 35 : 40,
    fontSize: 14,
    color: "#333",
  },
  forgotPasswordContainer: {
    alignItems: "flex-start",
    paddingHorizontal: 30,
    marginVertical: 5,
    marginBottom: 20,
  },
  linkText: {
    color: "#3B2D5F",
    fontSize: 13,
  },
  error: {
    fontSize: 14,
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
  loginButton: {
    padding: 10,
    backgroundColor: "#3B2D5F",
    borderRadius: 5,
    alignItems: "center",
    alignSelf: "center",
    width: 350,
    height: 40,
    marginTop: 25,
  },
  loginText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 180,
  },
  alreadyText: {
    color: "#999",
    fontSize: 13,
  },
});
