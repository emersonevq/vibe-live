import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const STORIES = [
  { id: '1', name: 'Ana Silva', avatarUrl: 'https://randomuser.me/api/portraits/women/65.jpg', hasStory: true },
  { id: '2', name: 'Julia Oliveira', avatarUrl: 'https://randomuser.me/api/portraits/women/68.jpg', hasStory: true },
  { id: '3', name: 'Mariana Costa', avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg', hasStory: true },
  { id: '4', name: 'Roberto Silva', avatarUrl: 'https://randomuser.me/api/portraits/men/22.jpg', hasStory: false },
  { id: '5', name: 'Carlos Santos', avatarUrl: 'https://randomuser.me/api/portraits/men/34.jpg', hasStory: true },
];

export default function StoryScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerIcon}>📸</Text>
        <Text style={styles.title}>Stories</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storiesRow} contentContainerStyle={styles.storiesContent}>
        <TouchableOpacity style={styles.addStoryCard}>
          <View style={styles.addStoryCircle}>
            <Text style={styles.addStoryIcon}>+</Text>
          </View>
          <Text style={styles.storyName}>Seu Story</Text>
        </TouchableOpacity>

        {STORIES.map((story) => (
          <TouchableOpacity key={story.id} style={styles.storyCard}>
            <View style={[styles.storyCircle, story.hasStory && styles.storyCircleActive]}>
              <Image source={{ uri: story.avatarUrl }} style={styles.storyAvatar} />
            </View>
            <Text style={styles.storyName} numberOfLines={1}>{story.name.split(' ')[0]}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.content}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>🌟</Text>
          <Text style={styles.emptyTitle}>Nenhum story recente</Text>
          <Text style={styles.emptySubtitle}>Compartilhe momentos com seus amigos</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  headerIcon: { fontSize: 24, marginRight: 10 },
  title: { fontSize: 20, fontWeight: '700', color: '#111827' },
  storiesRow: { backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  storiesContent: { paddingHorizontal: 12, paddingVertical: 16 },
  addStoryCard: { alignItems: 'center', marginRight: 16, width: 70 },
  addStoryCircle: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#e0e7ff', alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: '#2563EB', marginBottom: 6 },
  addStoryIcon: { fontSize: 28, color: '#2563EB', fontWeight: '700' },
  storyCard: { alignItems: 'center', marginRight: 16, width: 70 },
  storyCircle: { width: 64, height: 64, borderRadius: 32, padding: 3, marginBottom: 6 },
  storyCircleActive: { borderWidth: 3, borderColor: '#2563EB' },
  storyAvatar: { width: '100%', height: '100%', borderRadius: 29 },
  storyName: { fontSize: 12, color: '#374151', textAlign: 'center' },
  content: { flex: 1 },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 },
  emptyIcon: { fontSize: 64, marginBottom: 16 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: '#111827', marginBottom: 6 },
  emptySubtitle: { fontSize: 14, color: '#6b7280', textAlign: 'center' },
});
