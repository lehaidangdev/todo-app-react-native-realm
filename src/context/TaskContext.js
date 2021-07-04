import React, {useState, createContext, useEffect} from 'react';
import Realm from 'realm';
import 'react-native-get-random-values';
const {UUID} = Realm.BSON;
import AppUtils from '../utils/AppUtils.js';

//** REALM SECTION */
//* STEP*/
// 1. define object model aka schema
// 2. open connection
// 3. CRUD aka 'do something' with data
// 4. close connection

//* STEP 1  - Define Object model */
const TaskSchema = {
  name: 'Task',
  properties: {
    _id: 'string',
    name: 'string',
    status: 'string',
  },
  primaryKey: '_id',
};

//** CONTEXT SECTION  */
export const TaskContext = createContext();

// const taskList = [
//   {id: 1, name: 'Task 1', status: 'doing'},
//   {id: 2, name: 'Task 2', status: 'done'},
//   {id: 3, name: 'Task 3', status: 'archived'},
// ];

const TaskContextProvider = ({children}) => {
  const [tasks, setTasks] = useState([]);
  //** Opening and closing connection */
  const [realm, setRealm] = useState(null);

  useEffect(() => {
    if (AppUtils.isNull(realm)) {
      openConnection();
    }
    return () => {
      // debugger;
      // closeConnection();
    };
  }, []);

  useEffect(() => {
    if (!AppUtils.isNull(realm)) {
      getTasks();
    }
  }, [realm]);

  const openConnection = async () => {
    const connectedRealm = await Realm.open({
      path: 'myrealm',
      schema: [TaskSchema],
    });
    if (!AppUtils.isNull(connectedRealm)) {
      setRealm(connectedRealm);
    }
  };

  const closeConnection = async () => {
    realm.close();
  };

  const getTasks = () => {
    try {
      const retrivedTasks = realm.objects('Task');
      if (!AppUtils.isNull(retrivedTasks)) {
        setTasks(retrivedTasks);
      }
    } catch (error) {
      //Catch trường hợp objects chưa khởi tạo và null
      console.log(error);
    }
  };

  const addTask = task => {
    // let newTask = {
    //   id: 4,
    //   name: task,
    //   status: 'doing',
    // };
    // let newTasks = [...tasks, newTask];
    // setTasks(newTasks);
    let createdTask;
    realm.write(() => {
      createdTask = realm.create('Task', {
        _id: new UUID().toString(),
        name: task,
        status: 'open',
      });
      if (!AppUtils.isNull(createdTask)) {
        setTasks([...tasks, createdTask]);
      }
    });
  };

  const removeTask = task => {
    realm.write(() => {
      // Delete the task from the realm.
      realm.delete(task);
    });
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
