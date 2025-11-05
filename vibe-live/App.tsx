import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import HomeScreen from './src/screens/HomeScreen';
import ChatScreen from './src/screens/ChatScreen';

type Screen = 'Login' | 'SignUp' | 'Home' | 'Chat';

export default function App() {
  const [screen, setScreen] = useState<Screen>('Login');
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);

  const navigate = (to: Screen, params?: { chatId?: string }) => {
    if (to === 'Chat' && params?.chatId) setCurrentChatId(params.chatId);
    setScreen(to);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        {screen === 'Login' && (
          <LoginScreen onNavigate={navigate} />
        )}
        {screen === 'SignUp' && (
          <SignUpScreen onNavigate={navigate} />
        )}
        {screen === 'Home' && (
          <HomeScreen onNavigate={navigate} />
        )}
        {screen === 'Chat' && currentChatId && (
          <ChatScreen chatId={currentChatId} onNavigate={navigate} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  inner: { flex: 1 },
});
