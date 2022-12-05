import React, { FC, useEffect, useState } from 'react';
import { Input } from '../Input/Input';
import { Textarea } from '../Textarea/Textarea';
import {
  filesType,
  ITask,
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
import { Select } from '../Select/Select';

interface IForm {
  close: () => void;
  taskId?: number;
  setData: (arg: ITask) => void;
  status?: taskStatus;
}

export const TaskForm: FC<IForm> = ({ taskId, close, setData, status }) => {
  const { tasks } = useTypedSelector((state) => state.tasks);
  const [localFiles, setLocalFiles] = useState<filesType[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [priority, setPriority] = useState<taskPriority>(taskPriorityEnum.STANDARD);
  const [newStatus, setNewStatus] = useState<taskStatus>(TaskStatus.QUEUE);

  const [createDate, setCreateDate] = useState(new Date().toLocaleDateString('de-DE'));
  const [readyDate, setReadyDate] = useState('');
  const [isCanAddSubTask, setIsCanAddSubTask] = useState(true);

  const optionsPriority: taskPriority[] = [taskPriorityEnum.STANDARD, taskPriorityEnum.HEIGHT];

  const statusOptions: taskStatus[] = [TaskStatus.QUEUE, TaskStatus.DEVELOPMENT, TaskStatus.DONE];

  useEffect(() => {
    status && setNewStatus(status);
  }, [status]);

  useEffect(() => {
    if (taskId) {
      const { priority, name, createDate, files, isCanAddSubTask, description, readyDate, status } =
        tasks[taskId];

      setIsCanAddSubTask(isCanAddSubTask);
      setCreateDate(createDate);
      setName(name);
      setDescription(description);
      setPriority(priority);
      setNewStatus(status);
      setLocalFiles(files);
      readyDate && setReadyDate(readyDate);
    }
  }, [taskId]);

  const resetForm = () => {
    setDescription('');
    setNewStatus(TaskStatus.QUEUE);
    setLocalFiles([]);
    setPriority(taskPriorityEnum.STANDARD);
    setName('');
    setReadyDate('');
  };

  const addNewTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTask: ITask = {
      description,
      status: newStatus,
      files: localFiles ?? [],
      priority,
      name,
      isCanAddSubTask: true,
      id: taskId ?? ++Object.keys(tasks).length,
      createDate,
      readyDate,
    };

    setData(newTask);

    setTimeout(() => close(), 400);
    setTimeout(() => resetForm(), 400);
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

        <Select<taskPriority>
          defaultValue={priority}
          labelName={'Priority'}
          options={optionsPriority}
          setOption={setPriority}
        />

        <Select<taskStatus>
          defaultValue={newStatus}
          labelName={'Status'}
          options={statusOptions}
          setOption={setNewStatus}
        />

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
        <LoadPhotoInput files={localFiles} taskId={taskId} setFiles={setLocalFiles} />

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
