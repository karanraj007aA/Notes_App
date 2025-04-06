import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

interface NoteItemProps {
  note: {
    id: string;
    title: string;
    content: string;
  };
  onPress: (note: NoteItemProps['note']) => void;
  onLongPress: (note: NoteItemProps['note']) => void;
}

const NoteItem = ({ note, onPress, onLongPress }: NoteItemProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(note)}
      onLongPress={() => onLongPress(note)}
    >
      <View style={styles.noteContainer}>
        <Text style={styles.title} numberOfLines={1}>{note.title}</Text>
        <Text style={styles.content} numberOfLines={2}>{note.content}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  noteContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  content: {
    fontSize: 14,
    color: '#666',
  },
});

export default NoteItem;