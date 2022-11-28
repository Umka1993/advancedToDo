import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProjectList } from './components/ProjectList/ProjectList';
import { Project } from './components/ProjectList/Project/Project';
import { useTypedSelector } from './hooks/useTypeSelector';

const App = () => {
  const { projectList } = useTypedSelector((state) => state.projects);

  return (
    <>
      <BrowserRouter>
        <div className="app">
          <Routes>
            <Route path={'/'} element={<ProjectList />} />

            {projectList?.map((item) => (
              <Route
                key={item.id}
                path={`${item.path}`}
                element={<Project projectItemName={item.projectName} />}
              />
            ))}
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
