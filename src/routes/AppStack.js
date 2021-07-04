import React from 'react';
import 'react-native-gesture-handler';
import '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AddTaskScreen, TasksScreen} from '../screens/index';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tasks" component={TasksScreen} />
        <Stack.Screen name="AddTask" component={AddTaskScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
