import React, {useEffect, useState, useContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  View,
} from 'react-native';
import {TaskItem} from '../components/index';
import AppUtils from '../utils/AppUtils';
import {TaskContext} from '../context/TaskContext';

const TasksScreen = props => {
  const {tasks, removeTask} = useContext(TaskContext);
  const addTaskBtn = (
    <TouchableOpacity
      style={styles.addTaskBtn}
      onPress={() => props.navigation.navigate('AddTask')}>
      <Text>Add</Text>
    </TouchableOpacity>
  );

  //* SET HEADER FOR SCREEN
  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => addTaskBtn,
    });
  }, []);

  const deleteHandler = deleteItem => {
    removeTask(deleteItem);
  };

  const archiveHandler = archiveItem => {};

  const EmptyData = (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Empty data</Text>
    </View>
  );

  const List = (
    <FlatList
      data={tasks}
      keyExtractor={item => item._id}
      renderItem={({item}) => (
        <TaskItem
          item={item}
          onDelete={() => deleteHandler(item)}
          onArchive={() => archiveHandler(item)}
        />
      )}
    />
  );

  return (
    <SafeAreaView style={styles.screen}>
      {!AppUtils.isEmptyArray(tasks) ? List : EmptyData}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  addTaskBtn: {
    paddingHorizontal: 10,
  },
});

export default TasksScreen;
