import React from "react";
import { View, StyleSheet } from "react-native";
import TemplateCategory from "../components/templateCategory";
import categoryData from "../json/trendingNow";

const NearMeForm = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TemplateCategory 
        navigation={navigation} 
        categoryData={categoryData} 
        category="Near Me"
      />
    </View>
  );
};

export default NearMeForm;

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
