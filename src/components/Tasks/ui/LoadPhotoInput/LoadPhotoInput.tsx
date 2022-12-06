import React, { ChangeEvent, FC, useEffect, useState } from 'react';

import './loadPhotoInput.scss';

import loadPhoto from '../../../../assets/icons/loadPhoto.png';
import { PhotoCollection } from '../PhotoCollection/PhotoCollection';
import { filesType } from '../../../../store/reducers/tasks/taskTypes';
import { fileFormatter } from './helpers';

interface ILoadPhotoInput {
  taskId?: number;
  setFiles: (arg: filesType[]) => void;
  files: filesType[];
}

export const LoadPhotoInput: FC<ILoadPhotoInput> = ({ files, setFiles }) => {
  const [localState, setLocalState] = useState<filesType[]>([]);

  useEffect(() => {
    setLocalState(files);
  }, [files]);

  const getFile = (uploadedFiles: ChangeEvent<HTMLInputElement>) => {
    const formattedImagesArr = fileFormatter(uploadedFiles, localState);
    setLocalState(formattedImagesArr);
  };

  return (
    <div onBlur={() => setFiles(localState)} className="photoField">
      <label className={'labelPhoto'} htmlFor="photo">
        Фото
        <img src={loadPhoto} alt="loadPhoto" />
        <input
          className={'uploadFileInput'}
          type="file"
          id={'photo'}
          name={'photo'}
          multiple={true}
          onChange={(event) => {
            getFile(event);
          }}
        />
      </label>
      <PhotoCollection stateValue={localState} />
    </div>
  );
};
