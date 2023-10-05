import { StatusBar } from 'expo-status-bar';
import { Image, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Tasks from './components/Tasks';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';


export default function App() {

  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);


  useEffect(() => {
    const loadTaskItems = async () => {
      const storedTaskItems = await AsyncStorage.getItem('taskItems');
      if (storedTaskItems !== null) {
        setTaskItems(JSON.parse(storedTaskItems));
      }
    };
    loadTaskItems();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('taskItems', JSON.stringify(taskItems));
  }, [taskItems]);

  const handleTask = () => {

    if (!task) {
      alert('Please add an item');
      return
    }

    Keyboard.dismiss();
    const newTask = {
      key: uuidv4(),
      text: task,
      completed: false,
    };

    setTaskItems((currentItems) => [...currentItems, newTask]);

    console.log(newTask)
    setTask('');

  }

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>
          Todo list
        </Text>
        <View style={styles.items}>
          <Tasks
            taskItems={taskItems}
            setTaskItems={setTaskItems}
          />
        </View>
      </View>
      <KeyboardAvoidingView style={styles.writeTaskWrapper} >
        <TextInput
          style={styles.input}
          placeholder="Add task here..."
          value={task}
          onChangeText={text => setTask(text)}
          placeholderTextColor="gray"
          color="white"
        />
        <TouchableOpacity onPress={() => handleTask()}>
          <View style={styles.addWrapper}>
            <Image source={require('./assets/plus.png')} />
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f1f1f',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#d6d6d6',
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#272727',
    borderRadius: 5,
    borderWidth: 0,
    width: 260,
  },
  addWrapper: {
    width: 50,
    height: 50,
    backgroundColor: '#272727',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 0,
  }
});
