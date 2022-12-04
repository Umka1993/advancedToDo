import React, { FC } from 'react';
import filePreview from '../../../../assets/icons/icons8-file-64.png';

import './photoCollection.scss';
import { previewType } from '../../../../store/reducers/tasks/taskTypes';
import classNames from 'classnames';

interface IPhotoCollection {
  stateValue: previewType[];
}

export const PhotoCollection: FC<IPhotoCollection> = ({ stateValue }) => {
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

  return (
    <div className="photoCollection">
      {stateValue.map((item, index) => (
        <div key={index}>
          <div key={index} className={'collectionItem'}>
            <div
              className={classNames('photoBlock', { photoBlockPreview: true })}
              style={
                item.preview != null
                  ? {
                      backgroundImage: `url(${isImage(item.name) ? item.preview : filePreview})`,
                      backgroundPosition: 'center',
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                    }
                  : {}
              }
            ></div>

            <span>{fileNameSlicer(item.name)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
