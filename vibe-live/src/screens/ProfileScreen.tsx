import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image source={{ uri: 'https://randomuser.me/api/portraits/men/75.jpg' }} style={styles.coverImage} />
          <View style={styles.avatarContainer}>
            <Image source={{ uri: 'https://randomuser.me/api/portraits/men/75.jpg' }} style={styles.avatar} />
          </View>
        </View>

        <View style={styles.profileInfo}>
          <Text style={styles.name}>Usuário Visitante</Text>
          <Text style={styles.status}>🎵 Ouvindo: Nothing for now</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>📝</Text>
            <Text style={styles.sectionTitle}>Sobre</Text>
          </View>
          <Text style={styles.sectionText}>Perfil mockado para demonstração do aplicativo.</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>⚙️</Text>
            <Text style={styles.sectionTitle}>Configurações</Text>
          </View>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Editar perfil</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Privacidade</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Notificações</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { height: 160, backgroundColor: '#2563EB', position: 'relative' },
  coverImage: { width: '100%', height: 160, resizeMode: 'cover', opacity: 0.3 },
  avatarContainer: { position: 'absolute', bottom: -40, left: '50%', marginLeft: -50 },
  avatar: { width: 100, height: 100, borderRadius: 50, borderWidth: 4, borderColor: '#fff' },
  profileInfo: { marginTop: 50, alignItems: 'center', paddingHorizontal: 16, paddingBottom: 16, backgroundColor: '#fff' },
  name: { fontSize: 22, fontWeight: '700', color: '#111827', marginBottom: 4 },
  status: { fontSize: 14, color: '#6b7280', textAlign: 'center' },
  section: { backgroundColor: '#fff', marginTop: 12, padding: 16 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  sectionIcon: { fontSize: 20, marginRight: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#111827' },
  sectionText: { color: '#6b7280', fontSize: 14, lineHeight: 20 },
  option: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  optionText: { fontSize: 15, color: '#111827' },
  chevron: { fontSize: 20, color: '#9ca3af' },
});
