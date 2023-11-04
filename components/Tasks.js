import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import Checkbox from 'expo-checkbox';

const Tasks = ({ taskItems, setTaskItems }) => {
  const [editingTaskKey, setEditingTaskKey] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState('');

  const toggleCompleted = (key) => {
    setTaskItems((currentItems) =>
      currentItems.map((item) =>
        item.key === key ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const startEditing = (key, text) => {
    setEditingTaskKey(key);
    setEditedTaskText(text);
  };

  const saveEditedTask = (key) => {

    if (!editedTaskText) {
      alert('Item cannot be empty');
      return
    }

    setTaskItems((currentItems) =>
      currentItems.map((item) =>
        item.key === key ? { ...item, text: editedTaskText } : item
      )
    );
    setEditingTaskKey(null);
  };

  const deleteTask = (key) => {
    setTaskItems(currentItems => {
      return currentItems.filter(taskItems => taskItems.key !== key)
    });

    setEditingTaskKey(null);
  }

  return (
    <>
      {taskItems.length === 0 ? (
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 24,
            color: '#858383'
          }}
        >
          No todos
        </Text>
      ) : (
        taskItems.map((item) => {

          const isEditing = item.key === editingTaskKey;

          return (
            <View
              style={[
                styles.item,
                item.completed && { backgroundColor: '#232323' },
                isEditing && { backgroundColor: '#434343' }
              ]}
              key={item.key} >
              <View style={styles.itemLeft}>
                <Checkbox
                  style={styles.square}
                  value={item.completed}
                  onValueChange={() => toggleCompleted(item.key)}
                />
                {isEditing ? (
                  <TextInput
                    style={styles.editInput}
                    value={editedTaskText}
                    onChangeText={(text) => setEditedTaskText(text)}
                  />
                ) : (
                  <Text
                    style={[
                      styles.itemText,
                      item.completed && { textDecorationLine: 'line-through' }
                    ]}
                  >
                    {item.text}
                  </Text>
                )}
              </View>
              <View style={styles.itemActions}>
                {isEditing ? (
                  <TouchableOpacity
                    style={styles.saveButton}
                    onPress={() => saveEditedTask(item.key)}
                  >
                    <Text style={styles.actionText}>Save</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={[
                      styles.editButton,
                      item.completed && { backgroundColor: '#545353' }
                    ]}
                    disabled={item.completed}
                    onPress={() => startEditing(item.key, item.text)}
                  >
                    <Text style={[
                      styles.actionText,
                      item.completed && { color: '#d6d6d6' }
                    ]}
                    >
                      Edit
                    </Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleteTask(item.key)}
                >
                  <Image
                    source={require('../assets/trash.png')}
                    style={styles.image}
                  />
                </TouchableOpacity>
              </View>
            </View>
          );
        })
      )}
    </>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 20,
    height: 20,
  },
  item: {
    backgroundColor: '#272727',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  editInput: {
    fontWeight: 'bold',
    color: '#d6d6d6',
    width: 170,
    backgroundColor: '#525252'
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  actionText: {
    color: 'white',
    fontWeight: 'bold',
  },
  editButton: {
    width: 40,
    height: 30,
    backgroundColor: '#00C6E6',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    width: 40,
    height: 30,
    backgroundColor: '#52d14f',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    width: 20,
    height: 20,
    borderRadius: 5,
    marginRight: 15,
    borderWidth: 1,
    backgroundColor: '#d6d6d6'
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  itemText: {
    maxWidth: '80%',
    fontWeight: 'bold',
    color: '#d6d6d6'
  },
  deleteButton: {
    width: 40,
    height: 30,
    backgroundColor: 'red',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default Tasks;