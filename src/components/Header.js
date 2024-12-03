import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View, Text, TouchableOpacity, Alert, Linking } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { observer } from "mobx-react";
import { useMobxStores } from "../stores/stores";
import * as Location from 'expo-location';

const Header = ({ onLogout }) => {
  const { mainStore } = useMobxStores();
  const [currentDate, setCurrentDate] = useState("");
  const [location, setLocation] = useState("Fetching location...");

  useEffect(() => {
    const date = new Date();
    const options = { day: "numeric", month: "long", year: "numeric" };
    setCurrentDate(date.toLocaleDateString("en-GB", options));
  }, []);

  useEffect(() => {
    const fetchLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          "Location Permission Required",
          "To access your location, please go to Settings and enable location permissions for this app.",
          [
            { text: "Cancel" },
            { text: "Open Settings", onPress: () => Linking.openSettings() }
          ]
        );
        setLocation("Location not available");
        return;
      }
    
      let loc = await Location.getCurrentPositionAsync({});
      const [address] = await Location.reverseGeocodeAsync({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
      setLocation(`${address.city}, ${address.country}`);
    };

    fetchLocation();
  }, []);

  const handleLogout = () => {
    mainStore.logout(mainStore.token);
  };

  return (
    <View>
      <View style={styles.header}>
        <Image style={styles.logo} source={require("../../assets/logo.png")} />
        <Text style={styles.title}>URBREATH</Text>

        <TouchableOpacity disabled={mainStore.logoutIsInProgress} style={styles.logoutButton} onPress={handleLogout}>
          <FontAwesome name="sign-out" size={18} color="white" />
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>{location}</Text>
      <Text style={styles.date}>{currentDate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: hp("8"),
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    position: 'relative',
  },
  logo: {
    width: wp("15"),
    height: wp("15"),
    resizeMode: "contain",
  },
  title: {
    paddingTop: hp("1"),
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  logoutButton: {
    position: 'absolute',
    right: 10, 
    top: hp("2"),
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
    alignSelf: 'center',
  },
  date: {
    fontSize: 12,
    color: "white",
    marginBottom: 20,
    alignSelf: 'center',
  },
});

export default observer(Header);
