import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from "react-native";
import CheckBox from "expo-checkbox";
import { useMobxStores } from "../stores/stores";
import { observer } from "mobx-react";
import Ionicons from "react-native-vector-icons/Ionicons";

const SignupForm = ({ navigation }) => {
  const { mainStore } = useMobxStores();

  const [mail, setMail] = useState("");
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState(null);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const handleSignup = () => {
    if (!isTermsAccepted) {
      setError("You must accept the Terms of Service to sign up.");
      return;
    }
    if (!age || isNaN(age) || age < 0) {
      setError("Please enter a valid age.");
      return;
    }
    let values = {
      mail: mail,
      username: username,
      mobile: mobile,
      fullname: fullname,
      password: password,
      age: age,
    };
    mainStore.signup(values);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome</Text>
        <Text style={styles.subText}>Sign up to join</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} style={styles.icon} />
          <TextInput
            style={styles.input}
            value={fullname}
            onChangeText={setFullname}
            placeholder="Full Name"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} style={styles.icon} />
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Username"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="call-outline" size={20} style={styles.icon} />
          <TextInput
            style={styles.input}
            value={mobile}
            onChangeText={setMobile}
            placeholder="Phone number"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} style={styles.icon} />
          <TextInput
            style={[styles.input]}
            value={mail}
            onChangeText={setMail}
            placeholder="E-mail"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="people-outline" size={20} style={styles.icon} />
          <TextInput
            style={styles.input}
            value={age}
            onChangeText={setAge}
            placeholder="Age"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} style={styles.icon} />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry={true}
          />
        </View>

        <View style={styles.termsContainer}>
          <CheckBox
            value={isTermsAccepted}
            onValueChange={setIsTermsAccepted}
            style={styles.checkbox}
          />
          <Text style={styles.termsText}>I agree to the </Text>
          <TouchableOpacity>
            <Text style={styles.linkText}>Terms of Service</Text>
          </TouchableOpacity>
        </View>

        {error && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity onPress={handleSignup} style={styles.signupButton}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.alreadyText}>Have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.linkText}> Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default observer(SignupForm);

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
    height: 290,
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
    marginTop: 20,
    paddingHorizontal: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 26,
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
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  checkbox: {
    marginRight: 8,
  },
  termsText: {
    fontSize: 12,
    color: "#999",
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
  signupButton: {
    padding: 10,
    backgroundColor: "#3B2D5F",
    borderRadius: 5,
    alignItems: "center",
    alignSelf: "center",
    width: 350,
    height: 40,
    marginTop: 40,
  },
  signupText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
  alreadyText: {
    color: "#999",
    fontSize: 13,
  },
});
