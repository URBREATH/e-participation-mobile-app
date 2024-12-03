import React, { useRef } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { calculateRelativeDate } from "../utils";

const Comments = ({ comments, postId, newComments, setNewComments, handleAddComment }) => {
  const scrollViewRef = useRef(null);

  const scrollToInput = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 300);
  };

  return (
    <View style={styles.commentsContainer}>
      <ScrollView style={styles.commentsList} ref={scrollViewRef}>
        {comments.map((comment) => (
          <View key={comment.id} style={styles.commentItem}>
            <View style={styles.commentHeader}>
              <Text style={styles.commentAuthor}>{comment.author?.name || "Anonymous"}</Text>
              <Text style={styles.commentDate}>{calculateRelativeDate(comment.createdAt)}</Text>
            </View>
            <Text style={styles.commentText}>{comment.body}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.addCommentContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Add a comment..."
          value={newComments[postId] || ""}
          onFocus={scrollToInput}
          onChangeText={(text) =>
            setNewComments((prevComments) => ({
              ...prevComments,
              [postId]: text,
            }))
          }
        />
        {newComments[postId]?.trim() ? (
          <TouchableOpacity
            style={styles.sendButton}
            onPress={() => handleAddComment(postId)}
          >
            <MaterialIcons name="send" size={24} color="#6A1B9A" />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  commentsContainer: {
    marginBottom: 10,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  commentsList: {
    maxHeight: 200,
    marginBottom: 10,
  },
  commentItem: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
  },
  commentHeader: {
    flexDirection: "row",
  },
  commentAuthor: {
    fontWeight: "bold",
    color: "#3B2D5F",
    marginRight: 7,
  },
  commentDate: {
    fontSize: 12,
    color: "#888",
  },
  commentText: {
    fontSize: 14,
    color: "#4A4A4A",
  },
  addCommentContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  commentInput: {
    flex: 1,
    fontSize: 14,
    color: "#3B2D5F",
    marginRight: 10,
  },
  sendButton: {
    padding: 8,
    backgroundColor: "transparent",
  },
});

export default Comments;