import React, { FC } from 'react';

interface ITask {
  taskName: string;
}

export const Task: FC<ITask> = ({ taskName }) => {
  return (
    <div>
      <h1>{taskName} GGGGG</h1>
    </div>
  );
};
