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
import loadPhoto from '../../../../assets/icons/loadPhoto.png';
import '../LoadPhotoInput/loadPhotoInput.scss';
import '../PhotoCollection/photoCollection.scss';
import classNames from 'classnames';
import filePreview from '../../../../assets/icons/icons8-file-64.png';

interface IForm {
  close: () => void;
  taskId?: number;
  setData: (arg: ITask) => void;
  status?: taskStatus;
}

export const ATaskForm: FC<IForm> = ({ taskId, close, setData, status }) => {
  const { tasks } = useTypedSelector((state) => state.tasks);
  const [preview, setPreview] = useState<previewType[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<taskPriority>(taskPriorityEnum.STANDARD);
  const [newStatus, setNewStatus] = useState<taskStatus>(TaskStatus.QUEUE);
  const [createDate, setCreateDate] = useState('');
  const [readyDate, setReadyDate] = useState('');
  const [isCanAddSubTask, setIsCanAddSubTask] = useState(true);
  // const [taskIdentification, setTaskIdentification] = useState()

  useEffect(() => {
    const today = new Date().toLocaleDateString('de-DE');
    setCreateDate(today);
  }, []);

  useEffect(() => {
    status && setNewStatus(status);
  }, [status]);

  useEffect(() => {
    console.log('1', taskId);

    if (taskId) {
      console.log('2', taskId);
      const { priority, name, createDate, isCanAddSubTask, files, description, readyDate, status } =
        tasks[taskId];

      setIsCanAddSubTask(isCanAddSubTask);
      setCreateDate(createDate);
      setName(name);
      setDescription(description);
      setPriority(priority);
      setNewStatus(status);
      readyDate && setReadyDate(readyDate);
      files && setPreview(files);
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
      files: preview,
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

  const getFile = (file: FileList): void => {
    const newPreview: previewType[] = [];
    Object.values(file).forEach((item) => {
      const newItem: previewType = {
        name: item.name,
        preview: URL.createObjectURL(item),
      };

      newPreview.push(newItem);
    });

    setPreview([...preview, ...newPreview]);
  };

  function isImage(filename: string) {
    function getExtension(filename: string) {
      const parts = filename.split('.');
      return parts[parts.length - 1];
    }

    const ext = getExtension(filename);
    switch (ext.toLowerCase()) {
      case 'jpg':
      case 'jpeg':
      case 'gif':
      case 'bmp':
      case 'png':
        return true;
    }
    return false;
  }

  const fileNameSlicer = (name: string) => {
    let sliced = name.slice(0, 6);
    if (sliced.length < name.length) {
      sliced += '...';
    }
    return sliced;
  };

  preview.map((i) => console.log(i));

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

        <div className="photoField">
          <label className={'labelPhoto'} htmlFor="photo">
            Фото
            <img src={loadPhoto} alt="loadPhoto" />
            <input
              type="file"
              id={'photo'}
              name={'photo'}
              multiple={true}
              onChange={(event) => {
                const target = event.target as HTMLInputElement;
                const file: FileList = target.files as FileList;

                getFile(file);
              }}
            />
          </label>

          {/* <PhotoCollection stateValue={localState} /> */}

          <div className="photoCollection">
            {preview.map((item) => (
              <div key={new Date().getMilliseconds()} className={'collectionItem'}>
                <div
                  className={classNames('photoBlock', { photoBlockPreview: true })}
                  style={
                    item.preview != null
                      ? {
                          backgroundImage: `url(${
                            isImage(item.name) ? item.preview : filePreview
                          })`,
                          backgroundPosition: 'center',
                          backgroundSize: 'cover',
                          backgroundRepeat: 'no-repeat',
                        }
                      : {}
                  }
                ></div>

                <span>{fileNameSlicer(item.name)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* <LoadPhotoInput stateValue={preview} seStateValue={setPreview} /> */}

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
