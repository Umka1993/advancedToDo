import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './goBack.scss';
import goBackArrow from '../../assets/icons/arrow.png';

export const GoBack = () => {
  const [backPath, setBackPath] = useState<string>(' ');
  const { pathname } = useLocation();

  useEffect(() => {
    !backPath && setBackPath(pathname.split('/').splice(-1, 1).toString());
  }, []);

  return (
    <>
      <NavLink to={`/${backPath}`} className="goBackButton">
        <img src={goBackArrow} alt="go back" />
      </NavLink>
    </>
  );
};
