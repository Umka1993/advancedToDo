import React, { FC, ReactNode } from 'react';
import './layout.scss';

interface ILayout {
  children: ReactNode;
}

export const Layout: FC<ILayout> = ({ children }) => {
  return <div className="layout">{children}</div>;
};
