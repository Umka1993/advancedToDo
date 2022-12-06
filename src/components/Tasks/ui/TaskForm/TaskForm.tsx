import React, { FC, useEffect, useState } from 'react';
import { Input } from '../Input/Input';
import { Textarea } from '../Textarea/Textarea';
import {
  filesType,
  ISubTask,
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
import { SubTasks } from '../../SubTasks/SubTasks';
import classNames from 'classnames';
import { Timer } from '../Timer/Timer';

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

  const [createDate, setCreateDate] = useState<string>(new Date().toString());
  const [readyDate, setReadyDate] = useState('');
  const [isCanAddSubTask, setIsCanAddSubTask] = useState(true);
  const [subTasks, setSubTasks] = useState<ISubTask[]>([]);
  const [isNameEmpty, setIsNameEmpty] = useState<boolean>();
  const [isInProgress, setIsInProgress] = useState(false);

  const optionsPriority: taskPriority[] = [taskPriorityEnum.STANDARD, taskPriorityEnum.HEIGHT];

  const statusOptions: taskStatus[] = [TaskStatus.QUEUE, TaskStatus.DEVELOPMENT, TaskStatus.DONE];

  useEffect(() => {
    status && setNewStatus(status);
  }, [status]);

  useEffect(() => {
    name && setIsNameEmpty(false);
  }, [name]);

  useEffect(() => {
    if (taskId) {
      const {
        priority,
        name,
        createDate,
        subTasks,
        files,
        isCanAddSubTask,
        description,
        readyDate,
        status,
      } = tasks[taskId];

      setIsCanAddSubTask(isCanAddSubTask);
      setCreateDate(createDate);
      setName(name);
      setDescription(description);
      setPriority(priority);
      setNewStatus(status);
      setLocalFiles(files);
      setSubTasks(subTasks);
      setIsInProgress(status === TaskStatus.DEVELOPMENT);
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

  const addNewTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    !name && setIsNameEmpty((prevState) => !prevState);

    if (name) {
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
        subTasks,
      };

      setData(newTask);

      setTimeout(() => close(), 400);
      setTimeout(() => resetForm(), 400);
    }
  };

  return (
    <div className={'taskForm'}>
      <h3>Task number:{taskId}</h3>
      {isInProgress && (
        <div className={'taskForm__inProgress'}>
          Time in progress:
          <Timer createDate={createDate} />
        </div>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className={'required'}>
          <Input
            seStateValue={setName}
            type={'text'}
            id={'name'}
            name={'name'}
            stateValue={name}
            label={'Task Name'}
          />
          {isNameEmpty && <span>Name is required</span>}
        </div>

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

        <div className={'inputWrapper'}>
          <label htmlFor="createDate">Create date</label>
          <input
            id={'createDate'}
            name={createDate}
            readOnly={true}
            type={'text'}
            value={new Date(createDate).toLocaleString('de-DE')}
          />
        </div>

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

        <SubTasks setSubtasks={setSubTasks} subTasks={subTasks} />

        <div className={'submitButton'}>
          <div
            className={classNames('', {
              buttonWrap: name,
              disabledButton: !name,
            })}
          >
            <button type={'button'} className="btn addButton" onClick={(e) => addNewTask(e)}>
              <span>{taskId ? 'Edit task' : 'Add task'}</span>
              <img src="https://i.cloudup.com/2ZAX3hVsBE-3000x3000.png" height="62" width="62" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
