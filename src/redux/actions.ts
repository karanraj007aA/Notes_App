import { firestore } from 'firebase/firestore';
import { 
  ADD_NOTE, 
  UPDATE_NOTE, 
  DELETE_NOTE, 
  SET_NOTES,
  SET_LOADING,
  SET_ERROR,
  SET_APP_TITLE
} from './types';

export const fetchNotes = () => {
  return async (dispatch: React.Dispatch<any>) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const notesRef = firestore().collection('notes');
      const snapshot = await notesRef.orderBy('createdAt', 'desc').get();
      
      const notes: Array<{ id: string; title: string; content: string; createdAt: string; }> = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        notes.push({
          id: doc.id,
          title: data.title,
          content: data.content,
          createdAt: data.createdAt,
        });
      });
      
      dispatch({ type: SET_NOTES, payload: notes });
    } catch (error) {
      dispatch({ type: SET_ERROR, payload: error.message });
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };
};

export const addNote = (note: { title: string; content: string; }) => {
  return async (dispatch: React.Dispatch<any>) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const timestamp = firestore.FieldValue.serverTimestamp();
      const data = {
        title: note.title,
        content: note.content,
        createdAt: timestamp,
      };
      
      const notesRef = firestore().collection('notes');
      const docRef = await notesRef.add(data);
      
      dispatch({ 
        type: ADD_NOTE, 
        payload: {
          id: docRef.id,
          ...data,
          createdAt: new Date().toISOString() // Temporary timestamp until server value is synced
        } 
      });
    } catch (error) {
      dispatch({ type: SET_ERROR, payload: error.message });
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };
};

export const updateNote = (note: { id: string; title: string; content: string; }) => {
  return async (dispatch: React.Dispatch<any>) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const { id, title, content } = note;
      const timestamp = firestore.FieldValue.serverTimestamp();
      
      await firestore()
        .collection('notes')
        .doc(id)
        .update({
          title,
          content,
          updatedAt: timestamp
        });
      
      dispatch({ type: UPDATE_NOTE, payload: note });
    } catch (error) {
      dispatch({ type: SET_ERROR, payload: error.message });
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };
};

export const deleteNote = (id: string) => {
  return async (dispatch: React.Dispatch<any>) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      await firestore()
        .collection('notes')
        .doc(id)
        .delete();
      
      dispatch({ type: DELETE_NOTE, payload: id });
    } catch (error) {
      dispatch({ type: SET_ERROR, payload: error.message });
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };
};

export const setAppTitle = (title: string) => ({
  type: SET_APP_TITLE,
  payload: title,
});