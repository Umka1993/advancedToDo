import React, { FC, useEffect, useState } from 'react';
import { Input } from '../Input/Input';
import { Textarea } from '../Textarea/Textarea';
import {
  ITask,
  previewType,
  taskPriority,
  taskPriorityEnum,
  taskStatus,
  TaskStatus,
} from '../../../../store/reducers/tasks/taskTypes';
import { useTypedSelector } from '../../../../hooks/useTypeSelector';
import './taskForm.scss';
import '../LoadPhotoInput/loadPhotoInput.scss';
import '../PhotoCollection/photoCollection.scss';
import { LoadPhotoInput } from '../LoadPhotoInput/LoadPhotoInput';

interface IForm {
  close: () => void;
  taskId?: number;
  setData: (arg: ITask) => void;
  status?: taskStatus;
}

export const TaskForm: FC<IForm> = ({ taskId, close, setData, status }) => {
  const { tasks } = useTypedSelector((state) => state.tasks);
  const [preview, setPreview] = useState<previewType[]>();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<taskPriority>(taskPriorityEnum.STANDARD);
  const [newStatus, setNewStatus] = useState<taskStatus>(TaskStatus.QUEUE);
  const [createDate, setCreateDate] = useState('');
  const [readyDate, setReadyDate] = useState('');
  const [isCanAddSubTask, setIsCanAddSubTask] = useState(true);

  useEffect(() => {
    const today = new Date().toLocaleDateString('de-DE');
    setCreateDate(today);
  }, []);

  useEffect(() => {
    status && setNewStatus(status);
  }, [status]);

  useEffect(() => {
    if (taskId) {
      const { priority, name, createDate, isCanAddSubTask, description, readyDate, status } =
        tasks[taskId];

      setIsCanAddSubTask(isCanAddSubTask);
      setCreateDate(createDate);
      setName(name);
      setDescription(description);
      setPriority(priority);
      setNewStatus(status);
      readyDate && setReadyDate(readyDate);
    }
  }, [taskId]);

  const resetForm = () => {
    setDescription('');
    setNewStatus(TaskStatus.QUEUE);
    setPreview([]);
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
      files: preview ?? [],
      priority,
      name,
      isCanAddSubTask: true,
      id: taskId ?? ++Object.keys(tasks).length,
      createDate,
      readyDate,
    };

    setData(newTask);
    resetForm();

    setTimeout(() => close(), 400);
    setData(newTask);
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
          required={!taskId}
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

        <label htmlFor="priority">Priority</label>
        <select
          id={'priority'}
          name={'priority'}
          value={priority}
          onChange={(e) => setPriority(e.target.value as taskPriority)}
          placeholder={'Select priority:'}
        >
          <option value="1">standard</option>
          <option value="2">height</option>
        </select>

        <label htmlFor="status">Status</label>
        <select
          id={'status'}
          name={'status'}
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value as TaskStatus)}
        >
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
        <LoadPhotoInput taskId={taskId} setStateValue={setPreview} />

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
