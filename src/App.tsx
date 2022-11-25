import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ProjectList } from './components/ProjectList/ProjectList';
import { TaskList } from './components/TaskList/TaskList';
import { Layout } from './components/Layout/Layout';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <div className="app">
          <Layout>
            <TaskList />
            <ProjectList />
          </Layout>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
