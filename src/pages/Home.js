import React from "react";
import { Text, StyleSheet, FlatList, SafeAreaView, ImageBackground } from "react-native";
import SearchBarComponent from "../components/SearchBarComponent";
import Categories from "../components/Categories";
import TrendingNow from "../components/TrendingNow";
import Header from "../components/Header";

const image = require("../../assets/image.png");

const HomeForm = ({ navigation }) => {
  const sections = [
    { key: "Header", component: <Header /> },
    { key: "SearchBar", component: <SearchBarComponent /> },
    { key: "Categories", component: <Categories navigation={navigation} /> },
    { key: "TrendingNow", component: <TrendingNow navigation={navigation} /> },
  ];

  return (
    <ImageBackground source={image} resizeMode="cover" style={{ flex: 1 }}>
      <SafeAreaView>
        <FlatList
          data={sections}
          renderItem={({ item }) => item.component}
          keyExtractor={(item) => item.key}
          contentContainerStyle={styles.scrollViewContainer}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default HomeForm;

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
    paddingBottom: 20,
  },
});