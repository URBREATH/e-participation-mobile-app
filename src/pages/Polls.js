import React, { useEffect, useState } from "react";
import { Text, StyleSheet, FlatList, SafeAreaView, ImageBackground } from "react-native";
import { useMobxStores } from "../stores/stores";
import { observer } from "mobx-react";
import Surveys from "../pages/Surveys";
import Header from "../components/Header";

const image = require("../../assets/image.png");

const PollsForm = ({ navigation }) => {
  const { mainStore } = useMobxStores();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [mainStore]);

  const sections = [
    { key: "Header", component: <Header/> },
    { key: "Surveys", component: <Surveys navigation={navigation} processId={null} /> },
  ];

  if (isLoading) {
    return (
      <ImageBackground source={image} resizeMode="cover" style={{ flex: 1 }}>
        <SafeAreaView style={styles.loadingContainer}>
          <Text style={styles.loading}>Loading...</Text>
        </SafeAreaView>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={image} resizeMode="cover" style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
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

export default observer(PollsForm);

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
    paddingBottom: 10,
    paddingHorizontal: 10
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loading: {
    fontSize: 18,
    color: "#4b0082",
    textAlign: "center",
    marginTop: 20,
  },
});