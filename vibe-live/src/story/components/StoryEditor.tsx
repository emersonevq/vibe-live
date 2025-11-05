import React, { useState } from 'react';
import { View, StyleSheet, Image, Text as RNText } from 'react-native';
import type { StoryState } from '../types';
import DrawCanvas from './canvas/DrawCanvas';
import Toolbar from './ui/Toolbar';

type Props = {
  value?: StoryState;
  onChange?: (s: StoryState) => void;
  onExport?: (s: StoryState) => void;
};

export default function StoryEditor({ value, onChange }: Props) {
  const [local, setLocal] = useState<StoryState>(value || { media: undefined, elements: [] });
  const [activeTool, setActiveTool] = useState<string | undefined>(undefined);

  // minimal rendering: show media as background and draw canvas on top
  return (
    <View style={styles.container}>
      {local.media ? (
        <Image source={{ uri: local.media.uri }} style={styles.media} resizeMode="cover" />
      ) : (
        <View style={styles.empty}><RNText style={{ color: '#999' }}>Sem mídia selecionada</RNText></View>
      )}

      <DrawCanvas strokes={local.elements.filter(e => e.type === 'stroke') as any} onAddStroke={(s) => {
        const id = `stroke-${Date.now()}`;
        const el = { id, type: 'stroke', points: s.points, color: s.color, width: s.width } as any;
        setLocal(prev => ({ ...prev, elements: [...prev.elements, el] }));
        onChange && onChange({ ...local, elements: [...local.elements, el] });
      }} />

      <Toolbar
        tools={[{ id: 'draw', label: 'Desenhar' }, { id: 'text', label: 'Texto' }, { id: 'stickers', label: 'Stickers' }, { id: 'crop', label: 'Cortar' }]}
        active={activeTool}
        onSelect={(id) => setActiveTool(id)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  media: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
