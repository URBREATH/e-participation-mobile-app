import React from "react";
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import CardComponent from "../components/CardComponent";
import articlesData from "../json/trendingNow";

const TrendingNow = ({ navigation }) => {
  const recentArticles = articlesData.slice(-4);

  const renderArticle = ({ item, index }) => {
    if (index === 0) {
      return (
        <TouchableOpacity style={styles.featuredCard} onPress={() => navigation.navigate("News", { item })}>
          <Image source={require("../../assets/trending.png")} style={styles.featuredImage} />
          <View style={styles.featuredContent}>
            <Text style={styles.featuredTitle}>{item.title}</Text>
            <Text style={styles.featuredAuthor}>{item.author} • {item.timeAgo}</Text>
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <CardComponent title={item.title} author={item.author} timeAgo={item.timeAgo} status={item.status} image={require("../../assets/trending.png")} />
    );
  };

  return (
    <View style={styles.trendingContainer}>
      <View style={styles.header}>
        <Text style={styles.trendingTitle}>Trending Now</Text>
        <TouchableOpacity onPress={() => navigation.navigate("News")}>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>
      <FlatList data={recentArticles} renderItem={renderArticle} keyExtractor={(item, index) => index.toString()}/>
    </View>
  );
};

export default TrendingNow;

const styles = StyleSheet.create({
  trendingContainer: {
    backgroundColor: "#fff",
    width: "90%",
    padding: 18,
    borderRadius: 10,
    alignSelf: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  trendingTitle: {
    fontSize: 20,
    color: "#4b0082",
    marginBottom: 8,
  },
  seeAll: {
    fontSize: 14,
    color: "#4b0082",
  },
  featuredCard: {
    marginBottom: 16,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#000",
  },
  featuredImage: {
    width: "100%",
    height: 180,
  },
  featuredContent: {
    padding: 12,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  featuredAuthor: {
    fontSize: 14,
    color: "#FFFFFF",
  },
});