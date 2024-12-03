import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ImageBackground } from "react-native";
import { observer } from "mobx-react-lite";
import { useMobxStores } from "../stores/stores";
const image = require("../../assets/defaultProcess.png");
import { MaterialIcons } from "@expo/vector-icons";


const SurveysForm = ({ route, navigation }) => {
  const { mainStore } = useMobxStores();
  const processId = route?.params?.processId || null;
  const [surveys, setSurveys] = useState([]);
  const [expandedSurveyIndex, setExpandedSurveyIndex] = useState(null);

  const stripHtmlTags = (html) => (html ? html.replace(/<[^>]*>/g, "") : "No text");

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await mainStore.fetchSurveys();

        let extractedSurveys = [];

        if (processId) {
          const process = response.find((proc) => proc.id === processId);

          if (process && process.components) {
            const surveyComponents = process.components.filter(
              (comp) => comp.name === "Survey" && comp.surveys
            );

            extractedSurveys = surveyComponents.flatMap((comp) =>
              comp.surveys.map((survey) => ({
                id: survey.id,
                title: stripHtmlTags(survey.questionnaire.title),
                description: stripHtmlTags(survey.questionnaire.description),
                createdAt: survey.questionnaire.createdAt,
                updatedAt: survey.questionnaire.updatedAt,
                questions: survey.questionnaire.questions.map((q) => ({
                  id: q.id,
                  body: stripHtmlTags(q.body),
                  answerOptions: q.answerOptions.map((option, idx) => ({
                    id: `${q.id}-${idx}`,
                    text: `${option}`,
                    selected: false,
                  })),
                })),
                tos: stripHtmlTags(survey.questionnaire.tos),
              }))
            );
          }
        } else {
          extractedSurveys = response.flatMap((process) =>
            process.components
              .filter((comp) => comp.name === "Survey" && comp.surveys)
              .flatMap((comp) =>
                comp.surveys.map((survey) => ({
                  id: survey.id,
                  title: stripHtmlTags(survey.questionnaire.title),
                  description: stripHtmlTags(survey.questionnaire.description),
                  createdAt: survey.questionnaire.createdAt,
                  updatedAt: survey.questionnaire.updatedAt,
                  questions: survey.questionnaire.questions.map((q) => ({
                    id: q.id,
                    body: stripHtmlTags(q.body),
                    answerOptions: q.answerOptions.map((option, idx) => ({
                      id: `${q.id}-${idx}`,
                      text: `${option}`,
                      selected: false,
                    })),
                  })),
                  tos: stripHtmlTags(survey.questionnaire.tos),
                }))
              )
          );
        }

        setSurveys(extractedSurveys);

        if (extractedSurveys.length === 1) {
          setExpandedSurveyIndex(0);
        }
      } catch (error) {
        console.error("Error fetching surveys:", error);
      }
    };

    fetchSurveys();
  }, [processId, mainStore]);

  const toggleSurveyExpansion = (index) => {
    setExpandedSurveyIndex(index === expandedSurveyIndex ? null : index);
  };

  const toggleAnswerSelection = (surveyIndex, questionIndex, optionId) => {
    setSurveys((prevSurveys) =>
      prevSurveys.map((survey, i) =>
        i === surveyIndex
          ? {
              ...survey,
              questions: survey.questions.map((q, j) =>
                j === questionIndex
                  ? {
                      ...q,
                      answerOptions: q.answerOptions.map((option) =>
                        option.id === optionId
                          ? { ...option, selected: !option.selected }
                          : option
                      ),
                    }
                  : q
              ),
            }
          : survey
      )
    );
  };

  const handleSubmit = (surveyId) => {
    const survey = surveys.find((s) => s.id === surveyId);
    if (survey) {
      navigation.navigate("SuccessScreen", { page: "Survey" });
    }
  };

  const renderSurvey = ({ item, index }) => (
    <View style={styles.container}>
    <View key={item.id} style={styles.surveyCard}>
      <Text style={styles.surveyTitle}>{item.title || "Untitled Survey"}</Text>
      <Text style={styles.surveyMeta}>
        Last Updated At: {new Date(item.updatedAt).toLocaleDateString()}
      </Text>
      <Text style={styles.surveyDescription}>
        {item.description || "No description available"}
      </Text>

      <TouchableOpacity
        onPress={() => toggleSurveyExpansion(index)}
        style={styles.expandButton}
      >
        <Text style={styles.expandButtonText}>
          {expandedSurveyIndex === index ? "Hide Questions" : "Show Questions"}
        </Text>
      </TouchableOpacity>

      {expandedSurveyIndex === index && (
        <View>
          <Text style={styles.tos}>{item.tos || "No terms of service available"}</Text>
          {item.questions.map((question, qIndex) => (
            <View key={question.id} style={styles.questionContainer}>
              <Text style={styles.questionText}>{question.body}</Text>
              <FlatList
                data={question.answerOptions}
                keyExtractor={(option) => option.id}
                renderItem={({ item: option }) => (
                  <TouchableOpacity
                    style={[
                      styles.optionButton,
                      option.selected && styles.optionButtonSelected,
                    ]}
                    onPress={() => toggleAnswerSelection(index, qIndex, option.id)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        option.selected && styles.optionTextSelected,
                      ]}
                    >
                      {option.text}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          ))}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => handleSubmit(item.id)}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
    </View>
  );

  return processId ? (
    <ImageBackground source={image} resizeMode="cover" style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={28} color="#4b0082" />
        </TouchableOpacity>
      </View>
      <View style={{ justifyContent: "flex-start", paddingTop: 30,}}>
      <FlatList
        data={surveys}
        keyExtractor={(item) => item.id}
        renderItem={renderSurvey}
        ListEmptyComponent={
          <Text style={styles.noSurveysText}>No surveys available for this process.</Text>
        }
      />
      </View>
    </ImageBackground>
  ) : (
    <FlatList
      data={surveys}
      keyExtractor={(item) => item.id}
      renderItem={renderSurvey}
      ListEmptyComponent={
        <Text style={styles.noSurveysText}>No surveys available.</Text>
      }
    />
  );
};

export default observer(SurveysForm);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 30,
    paddingTop: 10,
  },
  header: {
    paddingTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  surveyCard: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e6e6e6",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  surveyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4b0082",
    marginBottom: 10,
  },
  surveyDescription: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  surveyMeta: {
    fontSize: 12,
    color: "#888",
    marginBottom: 10,
  },
  expandButtonText: {
    color: "#4b0082",
    fontWeight: "bold",
  },
  tos: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
    marginBottom: 10,
    marginTop: 10,
  },
  expandButton: {
    marginTop: 10,
  },
  questionContainer: {
    marginTop: 20,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4b0082",
    marginBottom: 12,
  },
  optionButton: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  optionButtonSelected: {
    borderColor: "#4b0082",
    backgroundColor: "#E6E6FA",
  },
  optionText: {
    fontSize: 14,
    color: "#757575",
  },
  optionTextSelected: {
    color: "#4b0082",
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: "#4b0082",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  submitButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  noSurveysText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
});