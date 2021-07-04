import React from 'react';
import {AppStack} from './src/routes';
import TaskContextProvider from './src/context/TaskContext';

const App = () => {
  return (
    <TaskContextProvider>
      <AppStack />
    </TaskContextProvider>
  );
};

export default App;
