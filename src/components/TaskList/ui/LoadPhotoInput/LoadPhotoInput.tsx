import React, { FC, useState } from 'react';
import classNames from 'classnames';
import loadPhoto from '../../../../assets/icons/loadPhoto.png';

interface ILoadPhotoInput {
  preview: string;
  stateValue: File;
  seStateValue: (arg: File) => void;
}

export const LoadPhotoInput: FC<ILoadPhotoInput> = ({ preview, stateValue, seStateValue }) => {
  const [localState, setLocalState] = useState<File>(stateValue);

  const getFile = (file: File): void => {
    if (file) {
      setLocalState(file);
    }
  };
  return (
    <>
      <label onBlur={() => seStateValue(localState)} className={'labelPhoto'} htmlFor="photo">
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
    </>
  );
};
