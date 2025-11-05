import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import { useAuth } from './auth';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomTabBar from './CustomTabBar';

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  Chat: { chatId: string; name?: string; avatarUrl?: string } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Feed"
        component={require('../screens/ScrapsScreen').default}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
          ),
          tabBarLabel: 'Feed',
        }}
      />

      <Tab.Screen
        name="Story"
        component={require('../screens/StoryScreen').default}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name={focused ? 'image' : 'image-outline'} size={size} color={color} />
          ),
          tabBarLabel: 'Stories',
        }}
      />

      <Tab.Screen
        name="Mensagens"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name={focused ? 'message-text' : 'message-text-outline'} size={size} color={color} />
          ),
          tabBarLabel: 'Mensagens',
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={require('../screens/ProfileScreen').default}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name={focused ? 'account' : 'account-outline'} size={size} color={color} />
          ),
          tabBarLabel: 'Perfil',
        }}
      />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  const { isSignedIn } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isSignedIn ? (
          <>
            <Stack.Screen name="Auth" component={AuthStack} />
          </>
        ) : (
          <>
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen name="Chat" component={ChatScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
}
