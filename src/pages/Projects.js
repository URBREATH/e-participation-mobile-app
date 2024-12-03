import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import TemplateCategory from "../components/templateCategory";
import categoryData from "../json/trendingNow";

const ProjectsForm = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TemplateCategory 
        navigation={navigation} 
        categoryData={categoryData} 
        category="Projects"
      />
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("CreateProject")}>
        <MaterialIcons name="add" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default ProjectsForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    backgroundColor: "#fff",
  },
  addButton: {
    position: "absolute",
    bottom: 20, 
    right: 20, 
    backgroundColor: "#4b0082", 
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
});
