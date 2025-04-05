import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  Modal,
} from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';
import {
  app,
  db,
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from '../firebase/config';
import { deleteDoc, doc, QuerySnapshot, updateDoc } from 'firebase/firestore';
const TodoAppScreen = () => {
  const [appTitle, setAppTitle] = useState(''); // 🌟 App Title Input
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    getShoppingList()
  },[] )

  const getShoppingList=async ()=>{
    let res=[] ;
    const querySnapshot = await getDocs(collection(db, "lists"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id ,doc.data()?.title);
      res.push( {
        id:doc.id,
        title:doc.data()?.title,
        completed: doc.data()?.completed,
      })

      console.log('response is ',res)
      setTodos(res)
    }); 
   
  }

  const addTodo = async () => {
    if (!title.trim()) return;
    const newTodo = {
      id: Date.now().toString(),
      title: title.trim(),
      completed: false,
    };
    setTodos([newTodo, ...todos]);
    setTitle('');
    console.log('title is ', title);
    try {
      const docRef = await addDoc(collection(db, 'lists'), {
        title: title,
        completed: false,
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const toggleTodo = id => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? {...todo, completed: !todo.completed} : todo,
      ),
    );
  };

  const deleteTodo = id => {
    Alert.alert('Delete Task', 'Are you sure?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        style: 'destructive',
        onPress:async () => {
          try {
            const todoRef = doc(db, 'lists', id); // Reference to the doc to delete
            await deleteDoc(todoRef);
            console.log('Document deleted with ID:', id);
          } catch (error) {
            console.error('Error deleting document:', error);
          }
        
          setTodos(prev => prev.filter(todo => todo.id !== id));
        },
      },
    ]);
  };

  const startEditTodo = todo => {
    setEditingTodo(todo);
    setEditText(todo.title);
    setModalVisible(true);
  };

const saveEditTodo = async () => {
  if (!editText.trim()) return;

  const updatedTodos = todos.map(todo =>
    todo.id === editingTodo.id ? { ...todo, title: editText } : todo,
  );

  setTodos(updatedTodos);
  console.log('updated to do is',editingTodo.id);


  try {
    const todoRef = doc(db, 'lists', editingTodo.id); // Reference the specific doc
    await updateDoc(todoRef, {
      title: editText, // Update the title field
    });
    console.log('Document updated with ID:', editingTodo.id);
  } catch (error) {
    console.error('Error updating document:', error);
  }
  setModalVisible(false);
  setEditingTodo(null);
  setEditText('');

  try {
    const todoRef = doc(db, 'lists', editingTodo.id);
    await updateDoc(todoRef, {
      title: editText,
    });
    console.log('Document updated');
  } catch (e) {
    console.error('Error updating document: ', e);
  }
};


  const renderItem = ({item}) => (
    <View style={[styles.todoItem, item.completed && styles.todoCompleted]}>
      <TouchableOpacity
        onPress={() => toggleTodo(item.id)}
        style={styles.todoTextWrapper}>
        <Text
          style={[styles.todoText, item.completed && styles.textStrikethrough]}>
          {item.title}
        </Text>
      </TouchableOpacity>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => startEditTodo(item)}>
          <Text>{'Edit'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => deleteTodo(item.id)}
          style={{marginLeft: 15}}>
          <Text>{'X'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* 🌟 App Title Input */}
      <TextInput
        value={appTitle}
        onChangeText={setAppTitle}
        style={styles.appTitleInput}
        placeholder="Enter app title"
      />

      {/* Task Input */}
      <View style={styles.inputContainer}>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Enter a task..."
          style={styles.input}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTodo}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Task List */}
      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.todoList}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No tasks yet. Add one!</Text>
        }
      />

      {/* Edit Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edit Task</Text>
            <TextInput
              value={editText}
              onChangeText={setEditText}
              style={styles.modalInput}
              placeholder="Update task"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.cancelBtn}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={saveEditTodo} style={styles.saveBtn}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: '#fff'},
  appTitleInput: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 5,
  },
  inputContainer: {flexDirection: 'row', marginBottom: 15},
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 45,
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: '#28a745',
    borderRadius: 8,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  addButtonText: {color: '#fff', fontWeight: 'bold'},
  todoList: {paddingBottom: 100},
  todoItem: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  todoCompleted: {
    backgroundColor: '#d4edda',
  },
  todoTextWrapper: {
    flex: 1,
  },
  todoText: {
    fontSize: 16,
  },
  textStrikethrough: {
    textDecorationLine: 'line-through',
    color: '#6c757d',
  },
  iconContainer: {
    flexDirection: 'row',
    marginLeft: 80,
    paddingRight: 10,
    columnGap: 30,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 30,
    fontStyle: 'italic',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    height: 40,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cancelBtn: {
    marginRight: 10,
  },
  cancelText: {
    color: '#888',
  },
  saveBtn: {
    backgroundColor: '#007bff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TodoAppScreen;
