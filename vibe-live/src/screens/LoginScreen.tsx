import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';

type Props = {
  onNavigate: (to: 'Login' | 'SignUp' | 'Home' | 'Chat', params?: { chatId?: string }) => void;
};

export default function LoginScreen({ onNavigate }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Placeholder: validate/email+password would be sent to backend
    onNavigate('Home');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: 'padding', android: undefined })}
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Vibe</Text>
        <Text style={styles.subtitle}>Entre com seu e-mail e senha</Text>

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

        <PrimaryButton title="Entrar" onPress={handleLogin} />

        <View style={styles.row}>
          <Text style={styles.text}>Não tem conta?</Text>
          <TouchableOpacity onPress={() => onNavigate('SignUp')}>
            <Text style={styles.link}> Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', padding: 20 },
  card: { backgroundColor: '#fff' },
  title: { fontSize: 36, fontWeight: '700', color: '#000', textAlign: 'center', marginBottom: 6 },
  subtitle: { fontSize: 14, color: '#444', textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, padding: 12, marginBottom: 12, backgroundColor: '#fff' },
  row: { flexDirection: 'row', justifyContent: 'center', marginTop: 12 },
  text: { color: '#444' },
  link: { color: '#16a34a', fontWeight: '600' },
});
