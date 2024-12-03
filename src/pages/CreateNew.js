import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import topicsOfProposals from "../json/topicsOfProposals";
import topicsOfReports from "../json/topicsOfReports";

const GOOGLE_API_KEY = 'AIzaSyDFu5Ph0eRWdWkA04HzOQ_4Eee1iUdEB0w';

const steps = [
  { label: "Location", icon: "place" },
  { label: "Topic", icon: "lightbulb-outline" },
  { label: "Details", icon: "description" },
  { label: "Photo", icon: "photo-camera" },
];

const CreateForm = ({ navigation, route }) => {
  const { category = "Proposal" } = route.params || {}; 

  const [currentStep, setCurrentStep] = useState(0);
  const [location, setLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [photo, setPhoto] = useState(null);

  const topicsData = category === "Proposal" ? topicsOfProposals : topicsOfReports[0]?.categories || [];

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    })();
  }, []);

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigation.navigate("SuccessScreen", { page: category });
    }
  };

  const handleLocationSelect = (data, details) => {
    const { lat, lng } = details.geometry.location;
    setLocation({
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
  };

  const filteredTopics =
    category === "Proposal"
      ? topicsData
          .map((category) => ({
            ...category,
            topics: category.topics.filter((topic) =>
              topic.toLowerCase().includes(searchQuery.toLowerCase())
            ),
          }))
          .filter((category) => category.topics.length > 0)
      : topicsData.filter((topic) =>
          topic.toLowerCase().includes(searchQuery.toLowerCase())
        );

  const pickImageFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access the camera was denied.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (result.assets && result.assets.length > 0) {
      setPhoto(result.assets[0].uri);
    }
  };

  const takePhotoWithCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access the camera was denied.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) setPhoto(result.uri);
  };

  const skipAndSubmit = () => {
    navigation.navigate(category === "Proposal" ? "Proposals" : "Reports");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={28} color="#4b0082" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {`CREATE NEW ${category.toUpperCase()}`}
        </Text>
      </View>

      <View style={styles.stepsContainer}>
        {steps.map((step, index) => (
          <View key={index} style={styles.step}>
            <View
              style={[
                styles.stepIndicator,
                index === currentStep && styles.stepIndicatorActive,
              ]}
            >
              <MaterialIcons
                name={step.icon}
                size={24}
                color={index === currentStep ? "white" : "#4b0082"}
              />
            </View>
            <Text
              style={[
                styles.stepLabel,
                index === currentStep && styles.stepLabelActive,
              ]}
            >
              {step.label.toUpperCase()}
            </Text>
          </View>
        ))}
      </View>

      {currentStep === 0 && (
        <View style={styles.mapSection}>
          <MapView
            style={StyleSheet.absoluteFillObject}
            region={location}
            showsUserLocation={true}
          >
            {location && <Marker coordinate={location} />}
          </MapView>
          <GooglePlacesAutocomplete
            placeholder="Search for location"
            onPress={handleLocationSelect}
            query={{
              key: GOOGLE_API_KEY,
              language: "en",
            }}
            fetchDetails={true}
            styles={{
              container: { position: "absolute", top: 10, width: "100%", zIndex: 2 },
              textInputContainer: styles.searchInputContainer,
              textInput: styles.searchInput,
              listView: styles.suggestionsList,
            }}
            enablePoweredByContainer={false}
          />
        </View>
      )}

    {currentStep === 1 && (
      <View style={styles.topicSelection}>
        {category === "Proposal" && (
          <TextInput
            style={styles.searchInput}
            placeholder="Search Topic"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        )}

        <FlatList
          data={filteredTopics}
          keyExtractor={(item, index) =>
            typeof item === "string" ? `${item}-${index}` : item.category
          }
          renderItem={({ item }) => {
            if (category === "Proposal") {
              return (
                <View>
                  <Text style={styles.categoryTitle}>{item.category}</Text>
                  {item.topics.map((topic, idx) => (
                    <TouchableOpacity
                      key={idx}
                      style={[
                        styles.topicButton,
                        selectedTopic === topic && styles.topicButtonSelected,
                      ]}
                      onPress={() => setSelectedTopic(topic)}
                    >
                      <Text
                        style={[
                          styles.topicText,
                          selectedTopic === topic && styles.topicTextSelected,
                        ]}
                      >
                        {topic}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              );
            } else {
              return (
                <TouchableOpacity
                  style={[
                    styles.topicButton,
                    selectedTopic === item && styles.topicButtonSelected,
                  ]}
                  onPress={() => setSelectedTopic(item)}
                >
                  <Text
                    style={[
                      styles.topicText,
                      selectedTopic === item && styles.topicTextSelected,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            }
          }}
        />
      </View>
    )}

      {currentStep === 2 && (
        <View style={styles.detailsSection}>
          <Text style={styles.detailsTitle}>
            Share the description of your {category}.
          </Text>
          <TextInput
            style={styles.descriptionInput}
            placeholder="Add your description here.."
            multiline={true}
            textAlignVertical="top"
          />
        </View>
      )}

      {currentStep === 3 && (
        <View style={styles.photoSection}>
          <View style={styles.photoOptions}>
            <TouchableOpacity
              style={styles.photoOption}
              onPress={takePhotoWithCamera}
            >
              <MaterialIcons name="camera-alt" size={90} color="#4b0082" />
              <Text style={styles.optionLabel}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.photoOption}
              onPress={pickImageFromGallery}
            >
              <MaterialIcons name="photo" size={90} color="#4b0082" />
              <Text style={styles.optionLabel}>Gallery</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.skipButton} onPress={skipAndSubmit}>
            <Text style={styles.skipText}>Skip & Submit</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.buttonContainer}>
        {currentStep > 0 && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setCurrentStep(currentStep - 1)}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.nextButton} onPress={goToNextStep}>
          <Text style={styles.nextButtonText}>
            {currentStep < steps.length - 1 ? "Next" : "Submit"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 80,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "#4b0082",
    textAlign: "center",
  },
  stepsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 40,
    marginBottom: 20,
  },
  step: {
    alignItems: "center",
  },
  stepIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  stepIndicatorActive: {
    backgroundColor: "#4b0082",
    borderColor: "#4b0082",
  },
  stepLabel: {
    fontSize: 12,
    color: "#757575",
    marginTop: 5,
  },
  stepLabelActive: {
    color: "#4b0082",
  },
  mapSection: {
    flex: 1,
    marginHorizontal: 20,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 15,
    position: 'relative',
  },
  searchInputContainer: {
    width: "95%",
    zIndex: 2,
    paddingLeft: 20,
    justifyContent: "center",
  },
  searchInput: {
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    padding: 10,
    fontSize: 16,
    color: "#333",
  },
  suggestionsList: {
    zIndex: 3,
    padding: 8,
  },
  topicSelection: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4b0082",
    marginTop: 20,
    marginBottom: 15,
  },
  topicButton: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 10,
  },
  topicButtonSelected: {
    borderColor: "#4b0082",
    backgroundColor: "#E6E6FA",
  },
  topicText: {
    fontSize: 14,
    color: "#757575",
  },
  topicTextSelected: {
    color: "#4b0082",
    fontWeight: "bold",
  },
  detailsSection: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  detailsTitle: {
    fontSize: 16,
    color: "#4b0082",
    marginBottom: 20,
  },
  descriptionInput: {
    height: 430,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    padding: 25,
    fontSize: 16,
    backgroundColor: "#f8f8f8",
    color: "#333",
  },  
  photoSection: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  choosePhotoText: {
    fontSize: 22,
    color: "#4b0082",
    marginBottom: 90,
  },
  photoOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginBottom: 60,
  },
  photoOption: {
    alignItems: "center",
  },
  optionLabel: {
    color: "#4b0082",
    fontSize: 14,
    marginTop: 8,
  },
  skipButton: {
    borderColor: "#4b0082",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  skipText: {
    color: "#4b0082",
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    flex: 1,
    backgroundColor: "#E0E0E0",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginRight: 10,
  },
  backButtonText: {
    color: "#757575",
    fontSize: 16,
    fontWeight: "bold",
  },
  nextButton: {
    flex: 1,
    backgroundColor: "#4b0082",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
  },
  nextButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});