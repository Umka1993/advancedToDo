import React from 'react';
import { NavLink } from 'react-router-dom';
import './projectList.scss';
import { useTypedSelector } from '../../hooks/useTypeSelector';

export const ProjectList = () => {
  const { projects } = useTypedSelector((state) => state.projects);

  return (
    <div className="projectList">
      <div className={'projectList__wrap'}>
        <h1>Project list:</h1>

        <ul>
          {projects.map((item) => (
            <li key={item.id}>
              <NavLink className={'projectList__item'} to={`/${item.id}`}>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
