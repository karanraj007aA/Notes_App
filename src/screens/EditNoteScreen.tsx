import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateNote } from '../redux/actions';
import NoteForm from '../components/NoteForm';

const EditNoteScreen = ({ route, navigation }) => {
  const { note } = route.params;
  const dispatch = useDispatch();

  const handleSubmit = (updatedNote) => {
    dispatch(updateNote({ id: note.id, ...updatedNote }));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <NoteForm 
        initialValues={{ title: note.title, content: note.content }}
        onSubmit={handleSubmit}
        buttonText="Update Note"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
});

export default EditNoteScreen;