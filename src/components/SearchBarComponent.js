import React, { useState } from "react";
import { SearchBar } from 'react-native-elements';
import { View, StyleSheet } from "react-native";

const SearchBarComponent = () => {
  const [search, setSearch] = useState("");
  const handleSearch = () => {
    let values = { search };
    mainStore.search(values);
  };

  return (
    <View>
        <SearchBar 
            placeholder="Search anything"
            onChangeText={setSearch} 
            value={search}
            placeholderTextColor={"white"}
            mode={"bar"}
            containerStyle={styles.searchContainer} 
            inputContainerStyle={styles.inputContainer} 
            inputStyle={styles.searchBarInputContainer} 
        />
  </View>
  );
};

const styles = StyleSheet.create({
    searchContainer: {
      alignSelf: 'center',
      marginTop: 10,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#4b0082",
      borderRadius: 5,
      width: "90%",  
      height: 40,  
      borderWidth: 0,
    },
    inputContainer: {
      alignSelf: 'center',
      backgroundColor: "#4b0082",
      borderRadius: 5,
      width: "100%",  
      height: 20,  
      borderWidth: 0,
    },
    searchBarInputContainer: {
      fontSize: 13,
      color: "white",
    },
    error: {
      fontSize: 14,
      color: "red",
      marginTop: 10,
    },
});
  
export default SearchBarComponent;