import { StatusBar } from 'expo-status-bar';
import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Tasks from './components/Tasks';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


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
    setTaskItems([...taskItems, task]);
    setTask('');
  }

  const completedTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }

  return (
    <View style={styles.container}>
      {/* <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" /> */}

      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>
          TASKS
        </Text>
        <View style={styles.items}>
          {taskItems.map((task, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => completedTask(index)}>
                <Tasks text={task} />
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
      <KeyboardAvoidingView
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder='Write task'
          value={task}
          onChangeText={text => setTask(text)}
        />

        <TouchableOpacity onPress={() => handleTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  }
});
