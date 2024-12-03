import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const SuccessScreenForm = ({ navigation, route }) => {
  const { page } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.successText}>Success!</Text>
      <View style={styles.iconContainer}>
        <MaterialIcons name="check-circle" size={150} color="white" />
      </View>
      <Text style={styles.message}>Thank you for your submission</Text>
      <Text style={styles.subMessage}>
        Together, we make our city a better place for everyone.
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.viewButton}
          onPress={() => navigation.navigate(page || "Proposals")} 
        >
          <Text style={styles.buttonText}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.viewButton}
          onPress={() => navigation.navigate("HomeForm")}
        >
          <Text style={styles.buttonText}>Return</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SuccessScreenForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  successText: {
    fontSize: 50,
    color: "#4b0082",
    fontWeight: "bold",
    marginTop: 60,
    marginBottom: 40,
  },
  iconContainer: {
    backgroundColor: "#4b0082",
    borderRadius: 80,
    padding: 6,
    marginBottom: 60,
  },
  message: {
    fontSize: 22,
    color: "#4b0082",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  subMessage: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  viewButton: {
    backgroundColor: "#4b0082",
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginRight: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});