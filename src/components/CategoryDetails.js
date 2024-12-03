import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity, ImageBackground,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const CategoryDetailsForm = ({ route, navigation }) => {
  const { item, category } = route.params;

  const isProcess = category === "Processes";

  const componentIcons = {
    Accountability: "account-balance",
    Blogs: "rss-feed",
    Budgets: "attach-money",
    Debates: "forum",
    Meetings: "event",
    Pages: "description",
    Proposals: "emoji-objects",
    Sortitions: "shuffle",
    Surveys: "poll",
  };

  const handleEdit = () => {
    Alert.alert("Edit", `Edit ${category}: ${item.title}`);
  };

  const handleDelete = () => {
    Alert.alert("Delete", `Are you sure you want to delete this ${category}?`, [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => console.log("Deleted") },
    ]);
  };

  const navigateToComponent = (componentName, processId) => {
    const screenName = componentName;
    console.log("Process ID ",processId)
    navigation.navigate(screenName, processId={processId});
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={28} color="#4b0082" />
        </TouchableOpacity>
        <View style={styles.actions}>
          <TouchableOpacity onPress={handleEdit} style={styles.actionButton}>
            <MaterialIcons name="edit" size={24} color="#4b0082" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete} style={styles.actionButton}>
            <MaterialIcons name="delete" size={24} color="#4b0082" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.headerContent}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.badgeContainer}>
          {item.promoted && (
            <View style={styles.promotedBadge}>
              <Text style={styles.badgeText}>Promoted</Text>
            </View>
          )}
          { item.hashtag && (
          <View style={styles.slugBadge}>
            <Text style={styles.slugText}>#{item.hashtag}</Text>
          </View>
          )}
        </View>
      </View>

      <ScrollView style={styles.detailsScroll}>
        <View style={styles.detailscontainer}>
        <Text style={styles.sectionTitle}>
          About this {isProcess ? "process" : "assembly"}
        </Text>
        <Text style={styles.description}>
          {item.shortDescription.replace(/<[^>]*>/g, "")}
        </Text>
        <Text style={styles.bodyText}>
          {item.description.replace(/<[^>]*>/g, "")}
        </Text>

        <View style={styles.detailsGrid}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>What is decided</Text>
            <Text style={styles.detailValue}>{item.participatoryScope || "N/A"}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Who participates</Text>
            <Text style={styles.detailValue}>{item.target || "N/A"}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>How is it decided</Text>
            <Text style={styles.detailValue}>{item.participatoryStructure || "N/A"}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Scope</Text>
            <Text style={styles.detailValue}>{item.metaScope || "N/A"}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Organization Area</Text>
            <Text style={styles.detailValue}>{item.localArea || "N/A"}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Promoter Group</Text>
            <Text style={styles.detailValue}>{item.developerGroup || "N/A"}</Text>
          </View>
        </View>
        </View>

        {item.components && item.components.length > 0 && (
          <>
            <Text style={styles.componentSectionTitle}>Components</Text>
            <View style={styles.componentsContainer}>
              {item.components.map((component, index) => {
                const iconName = componentIcons[component.type] || "help-outline";
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.componentItem}
                    onPress={() => navigateToComponent(component.type, item.id)}
                  >
                    <View style={styles.componentButton}>
                      <MaterialIcons name={iconName} size={26} color="#fff" />
                    </View>
                    <Text style={styles.componentText}>{component.type}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        )}

        <Text style={styles.reference}>
          Reference: {item.reference || "N/A"}
        </Text>
      </ScrollView>
    </View>
  );
};

export default CategoryDetailsForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#fffff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  actions: {
    flexDirection: "row",
  },
  actionButton: {
    marginLeft: 15,
  },
  headerContent: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#4b0082",
    marginBottom: 20,
  },
  badgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  promotedBadge: {
    backgroundColor: "#E6E6FA",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    marginRight: 10,
  },
  slugBadge: {
    backgroundColor: "#D3D3D3",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
  },
  badgeText: {
    color: "#4b0082",
    fontWeight: "bold",
    fontSize: 14,
  },
  slugText: {
    color: "#555",
    fontSize: 14,
  },
  detailsScroll: {
    flex: 1,
    paddingHorizontal: 20,
  },
  detailscontainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#ffff",
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#4b0082",
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  bodyText: {
    fontSize: 14,
    marginBottom: 40,
    color: "#555",
  },
  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  detailItem: {
    width: "45%",
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "black",
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    color: "#333",
  },
  componentSectionTitle: {
    fontSize: 16,
    fontWeight: "normal",
    marginBottom: 10,
    color: "#4b0082",
  },
  componentsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginVertical: 10,
  },
  componentItem: {
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom: 20,
  },
  componentButton: {
    width: 55,
    height: 55,
    backgroundColor: "#4b0082",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },
  componentText: {
    color: "#4b0082",
    fontSize: 12,
    textAlign: "center",
  },
  reference: {
    marginTop: 20,
    fontSize: 12,
    color: "#555",
    textAlign: "center",
  },
});