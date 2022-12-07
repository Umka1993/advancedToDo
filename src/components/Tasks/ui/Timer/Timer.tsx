import React, { FC, useEffect, useState } from 'react';
import { getInProgressTime } from './helpers';

interface ITimer {
  timeStartInProgress: string;
}

export const Timer: FC<ITimer> = ({ timeStartInProgress }) => {
  const [inProgressTime, setInprogressTime] = useState<string>();

  useEffect(() => {
    const interval = setInterval(
      () => setInprogressTime(getInProgressTime(timeStartInProgress)),
      1000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={'timer'}>
      <span>{inProgressTime}</span>
    </div>
  );
};
