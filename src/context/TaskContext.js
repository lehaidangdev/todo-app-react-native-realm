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
    _id: 'string',
    name: 'string',
    status: 'string',
  },
  primaryKey: '_id',
};

//* Define connection
const databaseOptions = {
  path: 'app.realm',
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
    // if (AppUtils.isNull(realm)) {
    //   openConnection();
    // }
    return () => {
      // debugger;
      // closeConnection();
    };
  }, []);

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
        let allTasks = realm.object(TASK_SCHEMA);
        setTasks(allTasks);
      })
      .catch(err => {});
  };

  const addTask = task => {
    // let newTask = {
    //   id: 4,
    //   name: task,
    //   status: 'doing',
    // };
    // let newTasks = [...tasks, newTask];
    // setTasks(newTasks);
    Realm.open(databaseOptions)
      .then(realm => {
        let createdTask;
        realm.write(() => {
          createdTask = realm.create('Task', {
            _id: new UUID().toString(),
            name: task,
            status: 'open',
          });
          setTasks([...tasks, createdTask]);
          // if (!AppUtils.isNull(createdTask)) {
          //   debugger;
          //   //setTasks([...tasks, createdTask]);
          //   getTasks();
          // }
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
