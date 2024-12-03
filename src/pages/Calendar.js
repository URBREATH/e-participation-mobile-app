import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";

const CalendarForm = ({ navigation }) => {
  const today = new Date().toISOString().split("T")[0]; 
  const [selectedDate, setSelectedDate] = useState(today);

  const formatDate = (dateString) => {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calendar</Text>

      <Calendar
        style={styles.calendar}
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: "#4b0082" },
        }}
        theme={{
          selectedDayBackgroundColor: "#4b0082",
          todayTextColor: "#4b0082",
          arrowColor: "#4b0082",
          monthTextColor: "#4b0082",
        }}
      />

      <Text style={styles.selectedDateText}>
        {selectedDate === today
          ? `${formatDate(selectedDate)}`
          : `${formatDate(selectedDate)}`}
      </Text>
    </View>
  );
};

export default CalendarForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 90,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#3B2D5F",
  },
  calendar: {
    borderRadius: 10,
    elevation: 3,
    paddingTop: 30,
  },
  selectedDateText: {
    fontSize: 21,
    color: "#4b0082",
    textAlign: "left",
    fontWeight: "bold",
    marginTop: 30,
  },
});