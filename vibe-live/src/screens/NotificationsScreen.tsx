import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const DATA = [
  { id: 'n1', type: 'message', text: 'Ana enviou uma nova mensagem', time: 'agora' },
  { id: 'n2', type: 'like', text: 'Carlos curtiu sua publicação', time: '2 min' },
  { id: 'n3', type: 'follow', text: 'Julia começou a seguir você', time: '10 min' },
  { id: 'n4', type: 'mention', text: 'Pedro mencionou você em um comentário', time: '1 h' },
];

function IconByType({ type, color }: { type: string; color: string }) {
  switch (type) {
    case 'message':
      return <MaterialCommunityIcons name="message-text" size={20} color={color} />;
    case 'like':
      return <MaterialCommunityIcons name="heart" size={20} color={color} />;
    case 'follow':
      return <MaterialCommunityIcons name="account-plus" size={20} color={color} />;
    case 'mention':
      return <MaterialCommunityIcons name="at" size={20} color={color} />;
    default:
      return <MaterialCommunityIcons name="bell" size={20} color={color} />;
  }
}

export default function NotificationsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="bell" size={24} color="#16a34a" />
        <Text style={styles.title}>Notificações</Text>
      </View>

      <FlatList
        data={Array.isArray(DATA) ? DATA : []}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ padding: 12 }}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.iconWrap}>
              <IconByType type={item.type} color="#16a34a" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemText}>{item.text}</Text>
              <Text style={styles.itemTime}>{item.time}</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={22} color="#9ca3af" />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  title: { fontSize: 20, fontWeight: '700', color: '#111827', marginLeft: 10 },
  item: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 14, borderRadius: 12, marginBottom: 10 },
  iconWrap: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#dcfce7', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  itemText: { fontSize: 14, color: '#111827', fontWeight: '600' },
  itemTime: { fontSize: 12, color: '#6b7280', marginTop: 2 },
});
