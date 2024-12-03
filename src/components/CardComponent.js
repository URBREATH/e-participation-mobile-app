import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const CardComponent = ({ title, author, status, timeAgo, image }) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={image} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.status}>{status}</Text>
        <Text style={styles.status}>{author} • {timeAgo}</Text>
      </View>
    </View>
  );
};

export default CardComponent;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginVertical: 8,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3B2D5F",
    marginBottom: 4,
  },
  status: {
    fontSize: 14,
    color: "#757575",
  },
});
