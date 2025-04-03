import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NotesListScreen from '../screens/NotesListScreen';
import EditNoteScreen from '../screens/EditNoteScreen';
import AddNoteScreen from '../screens/AddNoteScreen';


const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="NotesList"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007BFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="NotesList" 
          component={NotesListScreen} 
          options={{ title: 'My Notes' }}
        />
        <Stack.Screen 
          name="AddNote" 
          component={AddNoteScreen} 
          options={{ title: 'Add Note' }}
        />
        <Stack.Screen 
          name="EditNote" 
          component={EditNoteScreen} 
          options={{ title: 'Edit Note' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;