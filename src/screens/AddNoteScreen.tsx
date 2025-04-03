import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { addNote } from '../redux/actions';
import NoteForm from '../components/NoteForm';

const AddNoteScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleSubmit = (note) => {

    console.log(note);
    dispatch(addNote(note));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <NoteForm 
        onSubmit={handleSubmit} 
        buttonText="Add Note"
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

export default AddNoteScreen;
