import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList,} from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { observer } from "mobx-react-lite";
import { useMobxStores } from "../stores/stores";
import Comments from "../components/Comments";
import { stripHtmlTags, toggleComments, handleAddComment } from "../utils";

const BlogsForm = ({ route, navigation }) => {
  const { mainStore } = useMobxStores();
  const processId = route?.params?.processId || null;
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [newComments, setNewComments] = useState({});
  const [activeComments, setActiveComments] = useState({});

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await mainStore.fetchBlogs();
        let extractedBlogs = [];

        if (processId) {
          const process = response.find((proc) => proc.id === processId);
          if (process && process.components) {
            const blogComponents = process.components.filter(
              (comp) => comp.type === "Blogs" && comp.posts
            );
            extractedBlogs = blogComponents.map((comp) => ({
              id: comp.id,
              name: comp.name || "Untitled Blog",
              posts: comp.posts.map((post) => ({
                id: post.id,
                title: stripHtmlTags(post.title),
                body: stripHtmlTags(post.body),
                publishedAt: post.publishedAt,
                author: post.author?.id || "Unknown",
                comments: Array.isArray(post.comments) ? post.comments : [],
              })),
            }));
          }
        } else {
          extractedBlogs = response.flatMap((process) =>
            process.components
              .filter((comp) => comp.type === "Blogs" && comp.posts)
              .map((comp) => ({
                id: comp.id,
                name: comp.name.translation || "Untitled Blog",
                posts: comp.posts.map((edge) => ({
                  id: edge.id,
                  title: stripHtmlTags(edge.title),
                  body: stripHtmlTags(edge.body),
                  publishedAt: edge.publishedAt,
                  author: edge.author?.id || "Unknown",
                  comments: Array.isArray(edge.comments) ? edge.comments : [],
                })),
              }))
          );
        }

        setBlogs(extractedBlogs);
      } catch (error) {
        console.error("Error fetching Blogs:", error);
      }
    };

    fetchBlogs();
  }, [processId, mainStore]);

  const handleSelectBlog = (blog) => {
    setSelectedBlog(blog);
  };

  const renderBlogList = () => (
    <FlatList
      data={blogs}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.blogCard} onPress={() => handleSelectBlog(item)}>
          <View style={styles.cardContent}>
            <FontAwesome5 name="book" size={48} color="#3B2D5F" />
            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>{item.name || "Untitled Blog"}</Text>
              <Text style={styles.publishedDate}>
                {item.posts.length > 0
                  ? `First Post On ${new Date(item.posts[0].publishedAt).toLocaleDateString()}`
                  : "No Posts Available"}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.listContainer}
      ListEmptyComponent={<Text style={styles.noBlogsText}>No blogs available.</Text>}
    />
  );

  const renderPostList = () => (
    <View style={styles.postContainer}>
      <TouchableOpacity style={styles.backButton} onPress={() => setSelectedBlog(null)}>
        <MaterialIcons name="arrow-back" size={24} color="#3B2D5F" />
        <Text style={styles.backButtonText}>Blogs</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{selectedBlog.name}</Text>
      <FlatList
        data={selectedBlog.posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <TouchableOpacity style={styles.card}>
              <Text style={styles.cardTitle}>{item.title || "Untitled Post"}</Text>
              <Text style={styles.publishedDate}>
                Published On {new Date(item.publishedAt).toLocaleDateString()}
              </Text>
              <Text style={styles.cardBody}>
                {item.body || "No additional details provided."}
              </Text>
              <TouchableOpacity style={styles.iconWithText} onPress={() => toggleComments(item.id, activeComments, setActiveComments)}>
                <Text style={styles.cardMeta}>{item.comments.length}</Text>
                <MaterialIcons name="chat-bubble-outline" size={18} color="#3B2D5F" />
              </TouchableOpacity>
            </TouchableOpacity>
            {activeComments[item.id] && (
              <Comments
              comments={item.comments}
              postId={item.id}
              newComments={newComments}
              setNewComments={setNewComments}
              handleAddComment={(postId) =>
                handleAddComment({
                  postId,
                  newComments,
                  mainStore,
                  setSelectedBlog,
                  setNewComments,
                })
              }
            />
            )}
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {!selectedBlog ? (
        <>
          <Text style={styles.title}>Blogs</Text>
          {renderBlogList()}
        </>
      ) : (
        renderPostList()
      )}
    </View>
  );
};

export default observer(BlogsForm);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 70,
    backgroundColor: "#F7F8FA",
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
    color: "#3B2D5F",
    marginBottom: 25,
  },
  blogCard: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardText: {
    marginLeft: 16,
    flex: 1,
  },
  cardTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#3C6E71",
  },
  publishedDate: {
    fontSize: 12,
    color: "#7A7A7A",
    marginTop: 4,
  },
  iconWithText: {
    flexDirection: "row",
  },
  cardMeta: {
    fontSize: 15,
    color: "#3B2D5F",
    paddingRight:4,
  },
  postContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F7F8FA",
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardBody: {
    fontSize: 14,
    color: "#4A4A4A",
    marginBottom: 12,
    marginTop: 4,
    lineHeight: 20,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#4A4A4A",
  },
});
