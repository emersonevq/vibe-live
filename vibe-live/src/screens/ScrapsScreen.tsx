import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { v4 as uuidv4 } from 'uuid';

type Scrap = {
  id: string;
  text: string;
  createdAt: number;
  author: string;
};

const ONE_HOUR = 60 * 60 * 1000;

const initial: Scrap[] = [
  { id: 's1', text: 'Alguém vem tomar um café?', createdAt: Date.now() - 20 * 60 * 1000, author: 'Ana' },
  { id: 's2', text: 'Boa ideia: meetup hoje 18h', createdAt: Date.now() - 70 * 60 * 1000, author: 'Carlos' }, // expired
  { id: 's3', text: 'Vendas batendo meta! 🎉', createdAt: Date.now() - 5 * 60 * 1000, author: 'Pedro' },
];

export default function ScrapsScreen() {
  const [scraps, setScraps] = useState<Scrap[]>(initial);
  const [text, setText] = useState('');

  useEffect(() => {
    const t = setInterval(() => {
      // remove expired scraps periodically
      setScraps((s) => s.filter((x) => Date.now() - x.createdAt < ONE_HOUR));
    }, 30 * 1000);
    return () => clearInterval(t);
  }, []);

  const visible = useMemo(() => scraps.filter((x) => Date.now() - x.createdAt < ONE_HOUR), [scraps]);

  const add = () => {
    if (!text.trim()) {
      Alert.alert('Escreva algo');
      return;
    }
    const newItem: Scrap = { id: uuidv4(), text: text.trim(), createdAt: Date.now(), author: 'Você' };
    setScraps((s) => [newItem, ...s]);
    setText('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerIcon}>📝</Text>
        <Text style={styles.title}>Scraps (temporários)</Text>
      </View>

      <View style={styles.composerCard}>
        <Text style={styles.composerLabel}>Compartilhe uma mensagem rápida</Text>
        <View style={styles.composer}>
          <TextInput value={text} onChangeText={setText} placeholder="Escreva um recado..." style={styles.input} placeholderTextColor="#9ca3af" />
          <TouchableOpacity style={styles.button} onPress={add}>
            <Text style={styles.buttonText}>➤</Text>
          </TouchableOpacity>
        </View>
      </View>

      {visible.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>📬</Text>
          <Text style={styles.emptyText}>Nenhum scrap ativo</Text>
          <Text style={styles.emptySubtext}>Scraps desaparecem após 1 hora</Text>
        </View>
      ) : (
        <FlatList
          data={visible}
          keyExtractor={(i) => i.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.authorAvatar}>
                  <Text style={styles.authorInitial}>{item.author[0]}</Text>
                </View>
                <View style={styles.cardMeta}>
                  <Text style={styles.cardAuthor}>{item.author}</Text>
                  <Text style={styles.cardTime}>{new Date(item.createdAt).toLocaleTimeString()}</Text>
                </View>
              </View>
              <Text style={styles.cardText}>{item.text}</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  headerIcon: { fontSize: 24, marginRight: 10 },
  title: { fontSize: 20, fontWeight: '700', color: '#111827' },
  composerCard: { backgroundColor: '#fff', margin: 12, padding: 16, borderRadius: 12, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } },
  composerLabel: { fontSize: 14, fontWeight: '600', color: '#6b7280', marginBottom: 10 },
  composer: { flexDirection: 'row', alignItems: 'center' },
  input: { flex: 1, backgroundColor: '#f9fafb', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10, fontSize: 14, marginRight: 8, color: '#111827' },
  button: { backgroundColor: '#2563EB', width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 },
  emptyIcon: { fontSize: 48, marginBottom: 16 },
  emptyText: { fontSize: 16, color: '#6b7280', fontWeight: '600' },
  emptySubtext: { fontSize: 13, color: '#9ca3af', marginTop: 4 },
  listContent: { padding: 12 },
  card: { backgroundColor: '#fff', padding: 14, borderRadius: 12, marginBottom: 10, elevation: 1, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 3, shadowOffset: { width: 0, height: 1 } },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  authorAvatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#2563EB', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  authorInitial: { color: '#fff', fontWeight: '700', fontSize: 14 },
  cardMeta: { flex: 1 },
  cardAuthor: { fontWeight: '700', fontSize: 14, color: '#111827' },
  cardTime: { color: '#9ca3af', fontSize: 12, marginTop: 2 },
  cardText: { fontSize: 14, color: '#374151', lineHeight: 20 },
});
