import React, { FC, useState } from 'react';

import './loadPhotoInput.scss';

import loadPhoto from '../../../../assets/icons/loadPhoto.png';
import { PhotoCollection } from '../PhotoCollection/PhotoCollection';
import { previewType } from '../../../../store/reducers/tasks/taskTypes';

interface ILoadPhotoInput {
  stateValue: previewType[];
  seStateValue: (arg: previewType[]) => void;
}

export const LoadPhotoInput: FC<ILoadPhotoInput> = ({ stateValue, seStateValue }) => {
  const [localState, setLocalState] = useState<previewType[]>(stateValue);

  const getFile = (file: FileList): void => {
    const newPreview: previewType[] = [];
    Object.values(file).forEach((item) => {
      const newItem: previewType = {
        name: item.name,
        preview: URL.createObjectURL(item),
      };

      newPreview.push(newItem);
    });
    setLocalState([...stateValue, ...newPreview]);
  };

  return (
    <div onBlur={() => seStateValue(localState)} className="photoField">
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
