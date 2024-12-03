import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from '@expo/vector-icons'; 
import menuContent from "../json/dropDownMenuHomePage";  

const DropDownMenu = () => {
    const [dropdownVisible, setDropdownVisible] = useState(null);  

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);  
    };

    return (
        <View>
            <TouchableOpacity style={styles.hamburgerIcon} onPress={toggleDropdown}>
                <FontAwesome name="bars" size={24} color="#4b0082" />
            </TouchableOpacity>
                      
            {dropdownVisible && (
                <View style={styles.dropdownMenu}>
                    {menuContent.map((item, index) => (
                        <Text key={index} style={styles.dropdownItem}>
                            {item}
                        </Text>
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    hamburgerIcon: {
        position: "absolute",
        top: 10,
        right: 10,
    },
    dropdownMenu: {
        position: "absolute",
        top: 40,
        right: 5,
        backgroundColor: "white",
        borderRadius: 8,
        padding: 20,
        width: 200,
    },
    dropdownItem: {
        color: "#4b0082",
        paddingVertical: 10,
        fontSize: 14,
    },
    error: {
      fontSize: 14,
      color: "red",
      marginTop: 10,
    },
});

export default DropDownMenu;