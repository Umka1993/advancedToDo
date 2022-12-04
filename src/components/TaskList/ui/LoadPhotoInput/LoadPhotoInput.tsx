import React, { FC, useEffect, useState } from 'react';

import './loadPhotoInput.scss';

import loadPhoto from '../../../../assets/icons/loadPhoto.png';
import { PhotoCollection } from '../PhotoCollection/PhotoCollection';
import { previewType } from '../../../../store/reducers/tasks/taskTypes';
import { useTypedSelector } from '../../../../hooks/useTypeSelector';

interface ILoadPhotoInput {
  taskId?: number;
  setStateValue: (arg: previewType[]) => void;
}

export const LoadPhotoInput: FC<ILoadPhotoInput> = ({ taskId, setStateValue }) => {
  const { tasks } = useTypedSelector((state) => state.tasks);
  const [localState, setLocalState] = useState<previewType[]>([]);

  useEffect(() => {
    if (taskId) {
      const { files } = tasks[taskId];
      setLocalState(files);
    }
  }, [taskId]);

  const getFile = (file: FileList): void => {
    const newPreview: previewType[] = [...localState];
    Object.values(file).forEach((item) => {
      const newItem: previewType = {
        name: item.name,
        preview: URL.createObjectURL(item),
      };
      newPreview.push(newItem);
    });
    setLocalState(newPreview);
  };

  return (
    <div onBlur={() => setStateValue(localState)} className="photoField">
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
      <PhotoCollection stateValue={localState} />
    </div>
  );
};
