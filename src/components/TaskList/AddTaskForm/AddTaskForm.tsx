import React, { FC, useEffect, useRef, useState } from 'react';
import './addTaskForm.scss';
import loadPhoto from '../../../assets/icons/loadPhoto.png';
import classNames from 'classnames';
import {
  ITask,
  ITaskAction,
  TaskActionEnum,
  taskPriority,
  taskPriorityEnum,
  TaskStatus,
} from '../../../store/reducers/tasks/taskTypes';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { useTypedSelector } from '../../../hooks/useTypeSelector';
import { IProjectAction, ProjectActionEnum } from '../../../store/reducers/projects/projectTypes';
import { useLocation } from 'react-router-dom';

interface IForm {
  close: () => void;
  status: TaskStatus.DONE | TaskStatus.DEVELOPMENT | TaskStatus.QUEUE;
}

export const AddTaskForm: FC<IForm> = ({ close, status }) => {
  const [image, setImage] = useState<File>();
  const [picture, setPicture] = useState<string | Blob>('');
  const [preview, setPreview] = useState<string | null>();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<taskPriority>(taskPriorityEnum.STANDARD);
  const [newStatus, setNewStatus] = useState<
    TaskStatus.DONE | TaskStatus.DEVELOPMENT | TaskStatus.QUEUE
  >(status);
  const [createDate, setCreateDate] = useState('');
  const [readyDate, setReadyDate] = useState('');
  const [newTask, setNewTask] = useState<ITask>();
  const [isCanAddSubTask, setIsCanAddSubTask] = useState(true);
  const { tasks } = useTypedSelector((state) => state.tasks);

  const { pathname } = useLocation();

  const projectId = Number(pathname.split('/').pop());

  const dispatch = useDispatch();

  useEffect(() => {
    setNewStatus(status);
  }, [status]);

  useEffect(() => {
    const today = new Date().toLocaleDateString('de-DE');

    setCreateDate(today);
  }, []);

  const dispatchNewTask = (dispatch: Dispatch<ITaskAction>, task: ITask) => {
    dispatch({ type: TaskActionEnum.ADD_TASK, payload: task });
  };
  const dispatchNewTaskToProject = (dispatch: Dispatch<IProjectAction>, task: ITask) => {
    dispatch({ type: ProjectActionEnum.ADD_NEWTASK_TOPROJECT, payload: { projectId, ...task } });
  };

  useEffect(() => {
    newTask && dispatchNewTask(dispatch, newTask);
    newTask && dispatchNewTaskToProject(dispatch, newTask);
  }, [newTask]);

  useEffect(() => {
    if (image != null) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  const getFile = (file: File): void => {
    if (file) {
      setImage(file);
      setPicture(file);
    }
  };

  const resetForm = () => {
    setDescription('');
    setNewStatus(status);
    setPicture('');
    setPriority(taskPriorityEnum.STANDARD);
    setName('');
    setReadyDate('');
  };

  const formRef = useRef<HTMLFormElement>(null);

  const addNewTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(formRef.current as HTMLFormElement);

    console.log(formData);

    const newTask: ITask = {
      description,
      status: newStatus,
      files: picture || '',
      priority,
      name,
      isCanAddSubTask: true,
      id: ++Object.keys(tasks).length,
      createDate,
      readyDate,
    };
    setNewTask(newTask);
    resetForm();

    setTimeout(() => close(), 400);
  };

  return (
    <div className={'AddTaskForm'}>
      <form onSubmit={(e) => addNewTask(e)}>
        <label htmlFor="name">Task Name</label>
        <input
          type="text"
          id={'name'}
          name={'name'}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required={true}
        />
        <label htmlFor="description">Task description</label>
        <textarea
          id={'description'}
          name={'description'}
          value={description}
          readOnly={false}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="patronymic">Priority</label>
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
          // defaultValue={status}
          onChange={(e) => setNewStatus(e.target.value as TaskStatus)}
        >
          <option value="QUEUE">QUEUE</option>
          <option value="DEVELOPMENT">DEVELOPMENT</option>
          <option value="DONE">DONE</option>
        </select>

        <label htmlFor="createDate">Create date</label>
        {''.length ? (
          <input
            type="date"
            id={'createDate'}
            name={'createDate'}
            value={'01.12.22'}
            onChange={(e) => setCreateDate(e.target.value)}
          />
        ) : (
          <input
            id={'createDate'}
            name={'createDate'}
            readOnly={true}
            type={'text'}
            value={createDate}
          />
        )}

        <label htmlFor="readyDate">Ready date:</label>
        <input
          type="date"
          id={'readyDate'}
          name={'readyDate'}
          value={readyDate}
          min={createDate}
          onChange={(e) => setReadyDate(e.target.value)}
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

        <label className={'labelPhoto'} htmlFor="photo">
          Фото
          <div
            className={classNames('photoBlock', {
              photoBlockPreview: preview,
            })}
            style={
              preview != null
                ? {
                    backgroundImage: `url(${preview})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                  }
                : {}
            }
          >
            <img src={loadPhoto} alt="loadPhoto" />
          </div>
          <input
            type="file"
            id={'photo'}
            name={'photo'}
            accept="image/png, image/gif, image/jpeg"
            multiple={true}
            onChange={(event) => {
              const target = event.target as HTMLInputElement;
              const file: File = (target.files as FileList)[0];
              getFile(file);
            }}
          />
        </label>
        {/* <div className={'buttonWrap'}> */}
        {/*  <button className={'addButton'} type={'submit'}> */}
        {/*    <span> Add Task</span> */}
        {/*  </button> */}
        {/*  <img src="https://i.cloudup.com/2ZAX3hVsBE-3000x3000.png" height="62" width="62" /> */}
        {/* </div> */}

        <div className="submitButton">
          <div className="buttonWrap">
            <button type={'submit'} className="btn addButton">
              <span>Submit</span>
              <img src="https://i.cloudup.com/2ZAX3hVsBE-3000x3000.png" height="62" width="62" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
