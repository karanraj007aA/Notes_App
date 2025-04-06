import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNotes, deleteNote } from '../redux/actions.ts';
import NoteItem from '../components/NoteItem';
import LoadingIndicator from '../components/LoadingIndicator';

const NotesListScreen = ({ navigation } : { navigation: any }) => {
  const dispatch = useDispatch();
  const { notes, loading } = useSelector((state: any) => state.notes);

  useEffect(() => {
    dispatch(fetchNotes());
  }, []);

  const handleNotePress = (note: { id: string; title: string; content: string; }) => {
    navigation.navigate('EditNote', { note });
  };

  const handleNoteLongPress = (note: { id: string; title: string; content: string; }) => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          onPress: () => dispatch(deleteNote(note.id)),
          style: 'destructive' 
        },
      ]
    );
  };

  if (loading && notes.length === 0) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <NoteItem 
            note={item} 
            onPress={handleNotePress}
            onLongPress={handleNoteLongPress}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No notes yet. Add your first note!</Text>
          </View>
        }
      />
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => navigation.navigate('AddNote')}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  listContent: {
    padding: 15,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  addButtonText: {
    fontSize: 32,
    color: '#fff',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default NotesListScreen;