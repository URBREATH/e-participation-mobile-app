// Index.js
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { getStores, StoreProvider } from "./stores/stores";
import { observer } from "mobx-react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CreateAccountScreen from "./pages/Signup";
import HomeScreen from "./pages/Root";
import WelcomeScreen from "./pages/Welcome";
import ProjectsScreen from "./pages/Projects";
import LoginScreen from "./pages/Login";
import Navigation from "./components/Navigation"; 
import Categories from "./components/Categories"; 
import SuccessScreen from "./components/SuccessScreen"; 
import 'react-native-get-random-values';

const Stack = createStackNavigator();

const Index = observer(() => {
  const mobxStores = getStores();

  useEffect(() => {
    mobxStores.mainStore.retrieveToken();
  }, []);

  return (
    <StoreProvider value={mobxStores}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen name="Root" component={HomeScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="CreateAccount" component={CreateAccountScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Main" component={Navigation} options={{ headerShown: false }}/>
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Projects" component={ProjectsScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="ArticleDetails" component={WelcomeScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Categories" component={Categories} options={{ headerShown: false }}/>
          <Stack.Screen name="SuccessScreen" component={SuccessScreen} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </StoreProvider>
  );
});

export default Index;
