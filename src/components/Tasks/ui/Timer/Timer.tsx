import React, { FC, useEffect, useState } from 'react';
import { getInProgressTime } from '../TaskForm/helpers';

interface ITimer {
  createDate: string;
}

export const Timer: FC<ITimer> = ({ createDate }) => {
  const [inProgressTime, setInprogressTime] = useState<string>();

  useEffect(() => {
    const interval = setInterval(() => setInprogressTime(getInProgressTime(createDate)), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={'timer'}>
      <span>{inProgressTime}</span>
    </div>
  );
};
