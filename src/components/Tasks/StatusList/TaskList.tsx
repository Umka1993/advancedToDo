import React, { FC, useEffect, useState } from 'react';
import './taskList.scss';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { useTypedSelector } from '../../../hooks/useTypeSelector';
import { ITask, TaskAction, TaskActionEnum } from '../../../store/reducers/tasks/taskTypes';
import { ITasksStatusSort } from '../../../types/types';
import { onDragEnd } from './helpers';
import { StatusBoard } from './StatusBoard/StatusBoard';

interface ITaskList {
  tasksStatusSort: ITasksStatusSort;
  columns: ItemColumn;
  setColumns: (arg: ItemColumn) => void;
}

type ItemColumn = Record<number, { name: string; items: ITask[] }>;

export const TaskList: FC<ITaskList> = ({ columns }) => {
  const dispatch = useDispatch();
  const { tasks } = useTypedSelector((state) => state.tasks);
  const [editedTask, setEditedTask] = useState<ITask>();

  useEffect(() => {
    editedTask && dispatchEditedStatus(dispatch, editedTask);
  }, [editedTask]);

  const dispatchEditedStatus = (dispatch: Dispatch<TaskAction>, task: ITask) => {
    dispatch({ type: TaskActionEnum.EDIT_TASK, payload: task });
  };

  const editStatusOnDrag = (result: DropResult) => {
    const taskAfterDrag = onDragEnd(result, columns, tasks);
    setEditedTask(taskAfterDrag);
  };

  return (
    <div className={'taskList'}>
      <div className={'taskList__wrap'}>
        <DragDropContext onDragEnd={(result) => editStatusOnDrag(result)}>
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  backgroundColor: 'lightgrey',
                  borderRadius: '10px'
                }}
                key={columnId}>
                <StatusBoard columnId={columnId} name={column.name} items={column.items} />
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
};
