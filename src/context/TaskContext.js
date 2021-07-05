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
export const TASK_SCHEMA = 'Task';
const TaskSchema = {
  name: TASK_SCHEMA,
  properties: {
    _id: 'uuid',
    name: 'string',
    status: 'string',
  },
  primaryKey: '_id',
};

//* Define connection
const databaseOptions = {
  path: 'myrealapp',
  schema: [TaskSchema],
};

//** CONTEXT SECTION  */
export const TaskContext = createContext();

// const taskList = [
//   {id: 1, name: 'Task 1', status: 'doing'},
//   {id: 2, name: 'Task 2', status: 'done'},
//   {id: 3, name: 'Task 3', status: 'archived'},
// ];

const TaskContextProvider = props => {
  const [tasks, setTasks] = useState([]);
  //** Opening and closing connection */
  useEffect(() => {
    // if (!AppUtils.isNull(realm)) {
    //   getTasks();
    // }
    getTasks();
  }, []);

  // const openConnection = async () => {
  //   const connectedRealm = await Realm.open(databaseOptions);
  //   if (!AppUtils.isNull(connectedRealm)) {
  //     setRealm(connectedRealm);
  //   }
  // };

  // const closeConnection = async () => {
  //   realm.close();
  // };

  const getTasks = () => {
    Realm.open(databaseOptions)
      .then(realm => {
        let allTasks = realm.objects(TASK_SCHEMA);
        debugger;
        setTasks([...allTasks]);
      })
      .catch(err => {});
  };

  const addTask = task => {
    let newTask = {
      _id: new UUID(),
      name: task,
      status: 'open',
    };
    Realm.open(databaseOptions)
      .then(realm => {
        let createdTask;
        realm.write(() => {
          createdTask = realm.create(TASK_SCHEMA, newTask);
          setTasks([...tasks, createdTask]);
        });
      })
      .catch(err => {});
  };

  const removeTask = task => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          // Delete the task from the realm.
          realm.delete(task);
        });
        let remained = tasks.filter(item => item !== task);
        setTasks(remained);
      })
      .then(err => {});
  };

  return (
    <TaskContext.Provider value={{tasks, addTask, removeTask}}>
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;
