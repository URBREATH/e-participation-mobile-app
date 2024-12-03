import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import MapView, { Marker, Callout } from "react-native-maps";
import CardComponent from "./CardComponent";

const TemplateCategory = ({ navigation, categoryData, category }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [isMapView, setIsMapView] = useState(category === "Near Me");
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const filteredItems = categoryData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "All" || item.status === filter;
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status) => {
    let iconName, backgroundColor;
    switch (status) {
      case "Completed":
        iconName = "thumb-up";
        backgroundColor = "#4CAF50";
        break;
      case "In Progress":
        iconName = "access-time";
        backgroundColor = "#2196F3";
        break;
      case "New":
        iconName = "chat";
        backgroundColor = "#9C27B0";
        break;
      default:
        iconName = "info";
        backgroundColor = "#757575";
    }
    return (
      <View style={[styles.iconCircle, { backgroundColor }]}>
        <MaterialIcons name={iconName} size={22} color="white" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{category}</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => setIsMapView(false)}>
            <MaterialIcons
              name="format-list-bulleted"
              size={28}
              color={!isMapView ? "#3B2D5F" : "#757575"}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsMapView(true)} style={styles.icon}>
            <MaterialIcons
              name="map"
              size={28}
              color={isMapView ? "#3B2D5F" : "#757575"}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={`Search ${category}`}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setIsFilterVisible(!isFilterVisible)}
        >
          <Text style={styles.filterText}>Filters</Text>
        </TouchableOpacity>
      </View>

      {isFilterVisible && (
        <View style={styles.filterButtons}>
          {["All", "Completed", "In Progress", "New"].map(status => (
            <TouchableOpacity
              key={status}
              style={[
                styles.statusButton,
                filter === status ? styles.selectedStatusButton : null
              ]}
              onPress={() => setFilter(status)}
            >
              <Text style={filter === status ? styles.selectedStatusText : styles.statusText}>
                {status.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {isMapView ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.9838,
            longitude: 23.7275,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          {filteredItems.map((item, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: item.location.latitude,
                longitude: item.location.longitude,
              }}
            >
              <View style={styles.iconMarker}>
                {getStatusIcon(item.status)}
              </View>
              <Callout tooltip>
                <View style={styles.calloutContainer}>
                  <View style={styles.calloutTextContainer}>
                    <CardComponent
                      title={item.title}
                      author={item.author}
                      timeAgo={item.timeAgo}
                      status={item.status}
                      image={require("../../assets/trending.png")}
                    />
                  </View>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {filteredItems.map((item, index) => (
            <CardComponent
              key={index}
              title={item.title}
              author={item.author}
              timeAgo={item.timeAgo}
              status={item.status}
              image={require("../../assets/trending.png")}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default TemplateCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#3B2D5F",
  },
  iconContainer: {
    flexDirection: "row",
  },
  icon: {
    marginLeft: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginRight: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#3B2D5F",
    borderRadius: 8,
  },
  filterText: {
    color: "white",
    fontWeight: "600",
  },
  filterButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  statusButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#E0E0E0",
  },
  selectedStatusButton: {
    backgroundColor: "#3B2D5F",
  },
  statusText: {
    color: "#757575",
    fontWeight: "600",
  },
  selectedStatusText: {
    color: "white",
    fontWeight: "600",
  },
  scrollContainer: {
    paddingBottom: 16,
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
  iconMarker: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  calloutContainer: {
    flexDirection: "row",
    width: 300,
    padding: 10,
    borderRadius: 10,
  },
  calloutTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
});