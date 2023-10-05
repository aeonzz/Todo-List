import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import Checkbox from 'expo-checkbox';

const Tasks = ({ taskItems, setTaskItems }) => {

  const toggleCompleted = (key) => {
    setTaskItems((currentItems) =>
      currentItems.map((item) =>
        item.key === key ? { ...item, completed: !item.completed } : item
      )
    );
  };
  const completed = (key) => {
    console.log(key);
  }

  const deleteTask = (key) => {
    setTaskItems(currentItems => {
      return currentItems.filter(taskItems => taskItems.key !== key)
    })
  }

  return (
    <>
      {taskItems.length === 0 ? (
        <Text style={{fontWeight: 'bold', fontSize: 24, color: '#858383' }}>no todos</Text>
      ) : (
        taskItems.map(item => {
          return (
            <View
              style={[
                styles.item,
                item.completed && { backgroundColor: '#232323' }
              ]}
              key={item.key} >
              <View style={styles.itemLeft}>
                <Checkbox
                  style={styles.square}
                  value={item.completed}
                  onValueChange={() => toggleCompleted(item.key)} />
                <Text
                  style={[
                    styles.itemText,
                    item.completed && { textDecorationLine: 'line-through' }
                  ]}
                >
                  {item.text}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteTask(item.key)}>
                <Image
                  source={require('../assets/trash.png')}
                  style={styles.image}
                />
              </TouchableOpacity>
            </View>
          )
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
    width: 60,
    height: 30,
    backgroundColor: 'red',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default Tasks;