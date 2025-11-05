import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';

type Props = {
  onNavigate: (to: 'Login' | 'SignUp' | 'Home' | 'Chat', params?: { chatId?: string }) => void;
};

export default function SignUpScreen({ onNavigate }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    // Placeholder: signup flow
    onNavigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar conta</Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Senha"
        secureTextEntry
        style={styles.input}
      />

      <PrimaryButton title="Criar conta" onPress={handleSignUp} />

      <Text style={styles.note} onPress={() => onNavigate('Login')}>Já tem conta? Entrar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: '700', color: '#000', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, padding: 12, marginBottom: 12, backgroundColor: '#fff' },
  note: { color: '#16a34a', textAlign: 'center', marginTop: 12, fontWeight: '600' },
});
