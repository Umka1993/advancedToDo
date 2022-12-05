import React, { FC } from 'react';
import filePreview from '../../../../assets/icons/icons8-file-64.png';

import './photoCollection.scss';
import { filesType } from '../../../../store/reducers/tasks/taskTypes';
import classNames from 'classnames';
import { fileNameSlicer, isImage } from '../LoadPhotoInput/helpers';

interface IPhotoCollection {
  stateValue: filesType[];
}

export const PhotoCollection: FC<IPhotoCollection> = ({ stateValue }) => {
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
                      backgroundRepeat: 'no-repeat'
                    }
                  : {}
              }></div>
            <span>{fileNameSlicer(item.name)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
