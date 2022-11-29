import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProjectList } from './components/ProjectList/ProjectList';
import { Project } from './components/ProjectList/Project/Project';
import { useTypedSelector } from './hooks/useTypeSelector';

const App = () => {
  const { projects } = useTypedSelector((state) => state.projects);

  return (
    <>
      <BrowserRouter>
        <div className="app">
          <div className="container">
            <Routes>
              <Route path={'/'} element={<ProjectList />} />
              {projects?.map((item) => (
                <Route key={item.id} path={`/${item.id}`} element={<Project project={item} />} />
              ))}
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
