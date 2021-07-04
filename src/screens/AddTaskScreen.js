import React, {useState, useContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import {TaskContext} from '../context/TaskContext';
import AppUtils from '../utils/AppUtils';

const AddTaskScreen = props => {
  const {addTask} = useContext(TaskContext);
  const [inputText, setInputText] = useState('');

  const addBtn = (
    <TouchableOpacity style={styles.addBtn} onPress={() => addHandler()}>
      <Text style={{color: '#FFF', fontSize: 18}}>Add</Text>
    </TouchableOpacity>
  );

  const addHandler = () => {
    addTask(inputText);
    props.navigation.goBack();
  };

  const taskInput = (
    <TextInput
      style={styles.input}
      placeholder="Which you want to do?"
      onChangeText={text => setInputText(text)}
    />
  );
  return (
    <SafeAreaView style={styles.screen}>
      {taskInput}
      {!AppUtils.isEmpty(inputText) && addBtn}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    margin: 10,
    backgroundColor: '#e5e5e5',
    padding: 20,
    width: '90%',
  },
  addBtn: {
    backgroundColor: '#48cae4',
    width: '20%',
    height: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});

export default AddTaskScreen;
