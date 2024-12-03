import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, ScrollView,} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { observer } from "mobx-react-lite";
import { useMobxStores } from "../stores/stores";
import Comments from "../components/Comments";
import { stripHtmlTags, toggleComments, handleAddComment } from "../utils";

const ProposalsForm = ({ route, navigation }) => {
  const { mainStore } = useMobxStores();
  const processId = route?.params?.processId || null;
  const [proposals, setProposals] = useState([]);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [newComments, setNewComments] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [activeComments, setActiveComments] = useState({});

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await mainStore.fetchProposals();
        let extractedProposals = [];

        if (processId) {
          const process = response.find((proc) => proc.id === processId);
          if (process && process.components) {
            const proposalComponents = process.components.filter(
              (comp) => comp.type === "Proposals" && comp.proposals
            );
            extractedProposals = proposalComponents.flatMap((comp) =>
              comp.proposals.map((proposal) => ({
                id: proposal.id,
                title: stripHtmlTags(proposal.title),
                body: stripHtmlTags(proposal.body),
                publishedAt: proposal.publishedAt,
                voteCount: proposal.voteCount || 0,
                commentCount: proposal.commentCount || 0,
                comments: Array.isArray(proposal.comments) ? proposal.comments : [],
              }))
            );
          }
        } else {
          extractedProposals = response.flatMap((process) =>
            process.components
              .filter((comp) => comp.type === "Proposals" && comp.proposals)
              .flatMap((comp) =>
                comp.proposals.map((proposal) => ({
                  id: proposal.id,
                  title: stripHtmlTags(proposal.title),
                  body: stripHtmlTags(proposal.body),
                  publishedAt: proposal.publishedAt,
                  voteCount: proposal.voteCount || 0,
                  commentCount: proposal.commentCount || 0,
                  comments: Array.isArray(proposal.comments) ? proposal.comments : [],
                }))
              )
          );
        }

        setProposals(extractedProposals);
      } catch (error) {
        console.error("Error fetching Proposals:", error);
      }
    };

    fetchProposals();
  }, [processId, mainStore]);

  const handleSelectProposal = (proposal) => {
    setSelectedProposal(proposal);
  };

  const renderProposal = ({ item }) => (
    <View style={styles.cardContainer}>
      <TouchableOpacity style={styles.card} onPress={() => handleSelectProposal(item)}>
      <Text style={styles.cardTitle}>{item.title || "Untitled Proposal"}</Text>
        <Text style={styles.publishedDate}>
          Published At {new Date(item.publishedAt).toLocaleDateString()}
        </Text>
        <Text style={styles.cardBody}>
          {item.body || "No additional details provided."}
        </Text>
        <View style={styles.cardFooter}>
          <View style={styles.iconWithText}>
            <MaterialIcons name="thumb-up" size={18} color="#3B2D5F" />
            <Text style={styles.cardMeta}>{item.voteCount}</Text>
          </View>
          <TouchableOpacity
            style={styles.iconWithText}
            onPress={() => toggleComments(item.id, activeComments, setActiveComments)}
          >
            <MaterialIcons name="chat-bubble-outline" size={18} color="#3B2D5F" />
            <Text style={styles.cardMeta}>{item.comments.length}</Text>
          </TouchableOpacity>
        </View>
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
                  setSelectedProposal,
                  setNewComments,
                })
              }
            />
            )}
    </View>
  );  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Proposals</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search proposals ..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={proposals.filter(
          (proposal) =>
            proposal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            proposal.body.toLowerCase().includes(searchQuery.toLowerCase())
        )}
        keyExtractor={(item) => item.id}
        renderItem={renderProposal}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.noProposalsText}>No proposals available.</Text>
        }
      />
    </View>
  );
};

export default observer(ProposalsForm);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 70,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#3B2D5F",
    marginBottom: 25,
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchInput: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  listContainer: {
    paddingBottom: 16,
  },
  cardContainer: {
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3B2D5F",
  },
  publishedDate: {
    fontSize: 12,
    color: "#888",
    marginBottom: 8,
    marginTop: 8,
  },
  cardBody: {
    fontSize: 14,
    color: "#555",
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 8,
  },
  iconWithText: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 16,
  },
  cardMeta: {
    fontSize: 14,
    color: "#3B2D5F",
    marginLeft: 4,
    paddingRight:4,
  },
  noProposalsText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
  voteCount: {
    fontSize: 14,
    marginRight: 16,
    color: "#3B2D5F",
  },
  
});