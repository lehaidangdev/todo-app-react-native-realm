import React, {useState, createContext, useEffect} from 'react';
import Realm from 'realm';

//** REALM SECTION */
//* STEP*/
// 1. define object model aka schema
// 2. open connection
// 3. CRUD aka 'do something' with data
// 4. close connection

//* STEP 1  - Define Object model */
const taskSchema = {
  name: 'Task',
  properties: {
    _id: 'objectId',
    name: 'string',
    status: 'string',
  },
  primaryKeys: '_id',
};

//** CONTEXT SECTION  */
export const TaskContext = createContext();

const taskList = [
  {id: 1, name: 'Task 1', status: 'doing'},
  {id: 2, name: 'Task 2', status: 'done'},
  {id: 3, name: 'Task 3', status: 'archived'},
];

const TaskContextProvider = ({children}) => {
  const [tasks, setTasks] = useState(taskList);
  const addTask = task => {
    let newTask = {
      id: 4,
      name: task,
      status: 'doing',
    };
    let newTasks = [...tasks, newTask];
    setTasks(newTasks);
  };

  const removeTask = task => {
    let remained = tasks.filter(item => item !== task);
    setTasks(remained);
  };
  return (
    <TaskContext.Provider value={{tasks, addTask, removeTask}}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;
