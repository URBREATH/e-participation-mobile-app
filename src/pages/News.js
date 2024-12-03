import React from "react";
import { View, StyleSheet } from "react-native";
import TemplateCategory from "../components/templateCategory";
import categoryData from "../json/trendingNow";

const NewsForm = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TemplateCategory 
        navigation={navigation} 
        categoryData={categoryData} 
        category="News"
      />
    </View>
  );
};

export default NewsForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    backgroundColor: "#fff",
  },
});
