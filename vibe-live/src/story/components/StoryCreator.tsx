import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import StoryEditor from './StoryEditor';
import MediaSelector from './MediaSelector';
import useStoryEditor from '../hooks/useStoryEditor';

export default function StoryCreator() {
  const editor = useStoryEditor();

  const handlePick = useCallback((media) => {
    if (media) editor.addMedia(media);
  }, [editor]);

  return (
    <View style={styles.container}>
      <MediaSelector onPick={handlePick} />
      <StoryEditor value={editor.state} onChange={(s) => editor.setState(s)} />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1 } });
