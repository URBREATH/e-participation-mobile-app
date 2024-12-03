import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeForm from "../pages/Home";
import ProjectsForm from "../pages/Projects";
import NewsForm from "../pages/News";
import PollsForm from "../pages/Polls";
import AssembliesForm from "../pages/Assemblies";
import ProposalsForm from "../pages/Proposals";
import BlogsForm from "../pages/Blogs";
import MeetingsForm from "../pages/Meetings";
import SurveysForm from "../pages/Surveys";
import ProcessesForm from "../pages/Processes";
import CategoryDetailsForm from "../components/CategoryDetails";
import CategoryForm from "../components/CategoryPage";
import CreateForm from "../pages/CreateNew";
import CalendarForm from "../pages/Calendar";
import NearMeForm from "../pages/NearMe";
import ReportsForm from "../pages/Reports";
import SuccessScreenForm from "../components/SuccessScreen";
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeForm" component={HomeForm} />
      <Stack.Screen name="Projects" component={ProjectsForm} />
      <Stack.Screen name="Assemblies" component={AssembliesForm} />
      <Stack.Screen name="Proposals" component={ProposalsForm} initialParams={{ processId: null }}/>
      <Stack.Screen name="Reports" component={ReportsForm} />
      <Stack.Screen name="Surveys" component={SurveysForm} initialParams={{ processId: null }} />
      <Stack.Screen name="Meetings" component={MeetingsForm} initialParams={{ processId: null }} />
      <Stack.Screen name="Blogs" component={BlogsForm} initialParams={{ processId: null }} />
      <Stack.Screen name="CategoryForm" component={CategoryForm} initialParams={{ category: null }} />
      <Stack.Screen name="Processes" component={ProcessesForm} />
      <Stack.Screen name="CategoryDetails" component={CategoryDetailsForm} initialParams={{ category: null }}/>
      <Stack.Screen name="News" component={NewsForm} />
      <Stack.Screen name="Create" component={CreateForm} initialParams={{ category: null }}/>
      <Stack.Screen name="SuccessScreen" component={SuccessScreenForm} />
    </Stack.Navigator>
  );
}

function PollStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Polls" component={PollsForm} />
      <Stack.Screen name="Survey" component={SurveysForm} initialParams={{ processId: null }} />
      <Stack.Screen name="SuccessScreen" component={SuccessScreenForm} />
    </Stack.Navigator>
  );
}

function CalendarStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Calendar" component={CalendarForm} />
    </Stack.Navigator>
  );
}

function NearStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="NearMe" component={NearMeForm} />
    </Stack.Navigator>
  );
}

const Navigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: { backgroundColor: "#4b0082" },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="HOME" 
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" color={color} size={size} />
          ),
        }}  
      />
      <Tab.Screen 
        name="NEAR ME" 
        component={NearStack} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="globe" color={color} size={size} />
          ),
        }}  
      />
      <Tab.Screen 
        name="CALENDAR" 
        component={CalendarStack} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="calendar-today" color={color} size={size} />
          ),
        }}  
      />
      <Tab.Screen 
        name="POLLS" 
        component={PollStack} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="list" color={color} size={size} />
          ),
        }}  
      />
    </Tab.Navigator>
  );
};

export default Navigation;