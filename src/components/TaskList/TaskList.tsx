import React from 'react';
import './taskList.scss';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';

const taskList = [
  { id: 1, taskName: 'design', path: '/design' },

  { id: 2, taskName: 'layout', path: '/layout' },

  { id: 3, taskName: 'development', path: '/development' }
];

export const TaskList = () => {
  const { pathname } = useLocation();

  return (
    <div className="TaskList">
      <div className="TaskList__wrap">
        <NavLink
          className={classNames('TaskList__item', {
            activeItem: pathname === '/design'
          })}
          to={'/design'}
          end={true}>
          Design
        </NavLink>

        <NavLink
          className={classNames('TaskList__item', {
            activeItem: pathname === '/layout'
          })}
          to={'/layout'}
          end={true}>
          Layout
        </NavLink>

        <NavLink
          className={classNames('TaskList__item', {
            activeItem: pathname === '/development'
          })}
          to={'/development'}
          end={true}>
          Development
        </NavLink>
      </div>
    </div>
  );
};
