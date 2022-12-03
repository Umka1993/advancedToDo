import React, { FC, useEffect, useState } from 'react';
import './taskForm.scss';
import {
  ITask,
  ITaskAction,
  TaskActionEnum,
  taskPriority,
  taskPriorityEnum,
  taskStatus,
  TaskStatus
} from '../../../store/reducers/tasks/taskTypes';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { useTypedSelector } from '../../../hooks/useTypeSelector';
import { IProjectAction, ProjectActionEnum } from '../../../store/reducers/projects/projectTypes';
import { useLocation } from 'react-router-dom';
import { Input } from '../ui/Input/Input';
import { Textarea } from '../ui/Textarea/Textarea';
import { LoadPhotoInput } from '../ui/LoadPhotoInput/LoadPhotoInput';

interface IForm {
  close: () => void;
  taskId?: number;
}

export interface previewType {
  name: string;
  preview: string;
}

export const TaskForm: FC<IForm> = ({ close, taskId }) => {
  const { tasks } = useTypedSelector((state) => state.tasks);

  const [picture, setPicture] = useState<string | Blob>('');
  const [preview, setPreview] = useState<previewType[]>([]);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<taskPriority>(taskPriorityEnum.STANDARD);
  const [newStatus, setNewStatus] = useState<taskStatus>(TaskStatus.QUEUE);
  const [createDate, setCreateDate] = useState('');
  const [readyDate, setReadyDate] = useState('');
  const [newTask, setNewTask] = useState<ITask>();
  const [isCanAddSubTask, setIsCanAddSubTask] = useState(true);

  console.log('render');

  const { pathname } = useLocation();

  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (taskId) {
  //     const { priority, name, createDate, isCanAddSubTask, files, description, readyDate, status } =
  //       tasks[taskId];
  //
  //     setIsCanAddSubTask(isCanAddSubTask);
  //     setCreateDate(createDate);
  //     setName(name);
  //     setDescription(description);
  //     setPriority(priority);
  //     setNewStatus(status);
  //     readyDate && setReadyDate(readyDate);
  //     files && setPicture(files);
  //   }
  // }, [taskId]);

  useEffect(() => {
    const today = new Date().toLocaleDateString('de-DE');

    setCreateDate(today);
  }, []);

  const dispatchNewTask = (dispatch: Dispatch<ITaskAction>, task: ITask) => {
    dispatch({ type: TaskActionEnum.ADD_TASK, payload: task });
  };
  const dispatchNewTaskToProject = (dispatch: Dispatch<IProjectAction>, task: ITask) => {
    const projectId = Number(pathname.split('/').pop());
    dispatch({ type: ProjectActionEnum.ADD_NEWTASK_TOPROJECT, payload: { projectId, ...task } });
  };

  useEffect(() => {
    // if (taskId) {
    //   console.log('dispatch edit task');
    // } else {
    newTask && dispatchNewTask(dispatch, newTask);
    newTask && dispatchNewTaskToProject(dispatch, newTask);
    // }
  }, [newTask]);

  const resetForm = () => {
    setDescription('');
    setNewStatus(TaskStatus.QUEUE);
    setPicture('');
    setPriority(taskPriorityEnum.STANDARD);
    setName('');
    setReadyDate('');
    setPreview([]);
  };

  const addNewTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTask: ITask = {
      description,
      status: newStatus,
      files: picture || '',
      priority,
      name,
      isCanAddSubTask: true,
      id: ++Object.keys(tasks).length,
      createDate,
      readyDate
    };

    setNewTask(newTask);
    resetForm();

    setTimeout(() => close(), 400);
  };
  return (
    <div className={'taskForm'}>
      <form onSubmit={(e) => addNewTask(e)}>
        <Input
          seStateValue={setName}
          type={'text'}
          id={'name'}
          name={'name'}
          stateValue={name}
          required={true}
          label={'Task Name'}
        />

        <Textarea
          seStateValue={setDescription}
          type={'text'}
          id={'description'}
          name={'description'}
          stateValue={description}
          required={false}
          label={'Task description'}
        />

        <label htmlFor="patronymic">Priority</label>
        <select
          id={'priority'}
          name={'priority'}
          value={priority}
          onChange={(e) => setPriority(e.target.value as taskPriority)}
          placeholder={'Select priority:'}>
          <option value="1">standard</option>
          <option value="2">height</option>
        </select>

        <label htmlFor="status">Status</label>
        <select
          id={'status'}
          name={'status'}
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value as TaskStatus)}>
          <option value="QUEUE">QUEUE</option>
          <option value="DEVELOPMENT">DEVELOPMENT</option>
          <option value="DONE">DONE</option>
        </select>

        <label htmlFor="createDate">Create date</label>
        <input
          id={'createDate'}
          name={'createDate'}
          readOnly={true}
          type={'text'}
          value={createDate}
        />

        <Input
          seStateValue={setReadyDate}
          type={'date'}
          id={'readyDate'}
          name={'readyDate'}
          stateValue={readyDate}
          required={false}
          label={'Ready date:'}
        />

        <div className="manageSubtasks">
          <p> allow adding subtasks</p>
          <label className="switch">
            <input
              type="checkbox"
              checked={isCanAddSubTask}
              onChange={() => setIsCanAddSubTask((prevState) => !prevState)}
            />
            <span className="slider round"></span>
          </label>
        </div>

        <LoadPhotoInput stateValue={preview} seStateValue={setPreview} />

        <div className="submitButton">
          <div className="buttonWrap">
            <button type={'submit'} className="btn addButton">
              <span>{taskId ? 'Edit task' : 'Add task'}</span>
              <img src="https://i.cloudup.com/2ZAX3hVsBE-3000x3000.png" height="62" width="62" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
