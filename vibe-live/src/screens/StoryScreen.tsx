import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StoryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stories</Text>
      <Text style={styles.note}>Placeholder para stories — implementação futura (mocked)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 12, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: '700' },
  note: { color: '#6b7280', marginTop: 8 },
});
