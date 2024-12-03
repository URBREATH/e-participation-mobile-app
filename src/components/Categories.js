import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from '@expo/vector-icons'; 
import DropDownMenu from "../components/DropDownMenu"; 
import categoriesItems from "../json/categoriesHomePage";

const Categories = ({ navigation }) => {
    const handleCategoryPress = (category) => {
        navigation.navigate(category.category); 
    };

    return (
        <View style={styles.categoriesContainer}>
            <View style={styles.categoriesHeader}>
                <Text style={styles.categoriesTitle}>NBS CATEGORIES</Text>
                <DropDownMenu /> 
            </View>

            <View style={styles.gridContainer}>
                {categoriesItems.map((item, index) => {
                    if (index % 2 === 0) {
                        return (
                            <View key={index} style={styles.row}>
                                <TouchableOpacity style={styles.categoryButton} onPress={() => handleCategoryPress(item)}>
                                    <FontAwesome name={item.icon} size={24} color="white" /> 
                                    <Text style={styles.categoryText}>{item.title}</Text>
                                </TouchableOpacity>
                                {categoriesItems[index + 1] && (
                                    <TouchableOpacity style={styles.categoryButton} onPress={() => handleCategoryPress(categoriesItems[index + 1])}>
                                        <FontAwesome name={categoriesItems[index + 1].icon} size={24} color="white" /> 
                                        <Text style={styles.categoryText}>{categoriesItems[index + 1].title}</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        );
                    }
                    return null;
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    categoriesContainer: {
        marginTop: 30,
        backgroundColor: "white",
        width: "90%",
        padding: 12, 
        borderRadius: 10,
        marginBottom: 18,
        position: "relative", 
        alignSelf: 'center'
    },
    categoriesHeader: {
        zIndex: 1000, 
        flexDirection: "row",  
        marginBottom: 30,  
        position: "relative", 
        justifyContent: "space-between",
    },
    categoriesTitle: {
        paddingLeft: 12, 
        marginTop: 8,
        fontSize: 20, 
        fontWeight: "bold",
        color: "#4b0082",
        textAlign: "center", 
    },
    gridContainer: {
        flexDirection: "column",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between", 
        alignItems: "center",
        marginBottom: 15,
    },
    categoryButton: {
        flex: 0.48,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        marginHorizontal: 8,
        backgroundColor: "#4b0082",
        borderRadius: 10,
        height: 90,
    },
    categoryText: {
        marginTop: 5,
        color: "white",
        fontSize: 9, 
        fontWeight: "bold",
        textAlign: "center", 
    },
    error: {
        fontSize: 14,
        color: "red",
        marginTop: 10,
    },
});

export default Categories;