import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { observer } from "mobx-react-lite";
import { useMobxStores } from "../stores/stores";

const CategoryForm = ({ navigation, category }) => {
  const { mainStore } = useMobxStores();

  useEffect(() => {
    if (category === "Processes") {
      mainStore.fetchProcesses();
    } else if (category === "Assemblies") {
      mainStore.fetchAssemblies();
    }
  }, [mainStore, category]);

  const items =
    category === "Processes"
      ? mainStore.processes || []
      : mainStore.assemblies || [];

  const sortedItems = [...items].sort((a, b) => (b.promoted ? 1 : 0) - (a.promoted ? 1 : 0));

  const defaultImage = require("../../assets/defaultProcess.png")

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.listContainer}>
        <Text style={styles.title}>
          {category === "Processes" ? "Participatory Processes" : "Assemblies"}
        </Text>
        {sortedItems.length > 0 ? (
          sortedItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.itemContainer}
              onPress={() =>
                navigation.navigate("CategoryDetails", { item, category })
              }
            >
              <Image
                source={
                  item.heroImage && item.heroImage !== "No hero image"
                    ? { uri: item.heroImage }
                    : defaultImage
                }
                style={styles.heroImage}
              />

              <View style={styles.textContent}>
                <View style={styles.titleRow}>
                  <Text style={styles.itemTitle}>{item.title || "Untitled"}</Text>
                  {item.promoted && (
                    <View style={styles.promotedBadge}>
                      <Text style={styles.promotedText}>Promoted</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.itemDescription}>
                  {item.shortDescription
                    ? item.shortDescription.replace(/<[^>]*>/g, "")
                    : "No description available"}
                </Text>
                {category === "Processes" && (
                  <View style={styles.stepsContainer}>
                    <MaterialIcons name="directions-walk" size={16} color="#555" />
                    <Text style={styles.stepsText}>
                      {item.steps && item.steps.length > 0
                        ? item.steps.map((step) => step.title).join(", ")
                        : "No steps"}
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.emptyText}>
            No {category === "Processes" ? "processes" : "assemblies"} available
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

export default observer(CategoryForm);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 90,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#3B2D5F",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: "row",
    marginVertical: 7,
    marginHorizontal: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    elevation: 3,
    alignItems: "stretch",
    overflow: "hidden",
  },
  heroImage: {
    width: "35%",
    aspectRatio: 1,
    resizeMode: "cover",
  },
  textContent: {
    flex: 1,
    padding: 8,
    justifyContent: "center",
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4b0082",
    flex: 1,
    marginRight: 10,
  },
  promotedBadge: {
    backgroundColor: "#D3D3D3",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  promotedText: {
    color: "#4b0082",
    fontSize: 12,
    fontWeight: "bold",
  },
  itemDescription: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  stepsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  stepsText: {
    fontSize: 14,
    color: "#555",
    marginLeft: 5,
    flexWrap: "wrap",
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
});