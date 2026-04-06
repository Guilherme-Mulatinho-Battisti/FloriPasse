import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import AttractionsScreen from '../screens/AttractionsScreen';
import DetailScreen from '../screens/DetailScreen';
import InterestsScreen from '../screens/InterestsScreen';
import PassesScreen from '../screens/PassesScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function AttractionsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AttractionsList" component={AttractionsScreen} options={{ title: 'Atrações' }} />
      <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Detalhes' }} />
    </Stack.Navigator>
  );
}

function InterestsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="InterestsList" component={InterestsScreen} options={{ title: 'Meus Interesses' }} />
      <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Detalhes' }} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            const icons = {
              Home: 'home',
              Atrações: 'map',
              Interesses: 'heart',
              Passes: 'ticket',
            };
            return <Ionicons name={icons[route.name]} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#0077B6',
          tabBarInactiveTintColor: 'gray',
          headerStyle: { backgroundColor: '#0077B6' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Atrações" component={AttractionsStack} options={{ headerShown: false }} />
        <Tab.Screen name="Interesses" component={InterestsStack} options={{ headerShown: false }} />
        <Tab.Screen name="Passes" component={PassesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}