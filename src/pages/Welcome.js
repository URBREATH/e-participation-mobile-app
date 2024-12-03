import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { observer } from "mobx-react";
import { useMobxStores } from "../stores/stores";

const WelcomeForm = ({ navigation }) => {
  const { mainStore, errorStore } = useMobxStores();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.logo} source={require("../../assets/logo.png")} />
        <Text style={styles.description}>
          Application for electronic submission of citizen’s requests regarding municipal issues
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.signinButton}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("CreateAccount")} style={styles.signupButton}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Improving People's Lives</Text>
        <Text style={styles.footerSubText}>Urban Connectivity Redefined</Text>
      </View>
    </View>
  );
};

export default observer(WelcomeForm);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3B2D5F",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: wp("55%"),
    height: wp("55%"),
    resizeMode: "contain",
  },
  description: {
    fontSize: 15,
    color: "#D3CCE3",
    textAlign: "center",
    paddingHorizontal: 25,
    marginTop: 40,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
    marginBottom: 20,
  },
  signinButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "transparent",
    borderColor: "#FFFFFF",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    height: 60,
    alignItems: "center",
  },
  signupButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#5F4BB6",
    justifyContent: "center",
    borderRadius: 5,
    marginLeft: 10,
    height: 60,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  footer: {
    position: "absolute",
    bottom: 40,
    alignItems: "center",
  },
  footerText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  footerSubText: {
    fontSize: 14,
    color: "#D3CCE3",
  },
});