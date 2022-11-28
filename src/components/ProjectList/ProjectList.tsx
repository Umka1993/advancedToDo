import React from 'react';
import { NavLink } from 'react-router-dom';
import './projectList.scss';
import { useTypedSelector } from '../../hooks/useTypeSelector';

export const ProjectList = () => {
  const { projectList } = useTypedSelector((state) => state.projects);

  return (
    <div className="projectList">
      <div className="container">
        <div className={'projectList__wrap'}>
          <h1>Project list:</h1>
          <ul>
            {projectList.map((item) => (
              <li key={item.id}>
                <NavLink className={'projectList__item'} to={item.path}>
                  {item.projectName}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
