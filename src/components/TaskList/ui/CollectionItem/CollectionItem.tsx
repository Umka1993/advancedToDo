import { previewType } from '../../../../store/reducers/tasks/taskTypes';
import classNames from 'classnames';
import filePreview from '../../../../assets/icons/icons8-file-64.png';
import React, { FC } from 'react';

interface ICollectionItem {
  index: number;
  item: previewType;
}

export const CollectionItem: FC<ICollectionItem> = ({ index, item }) => {
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
    <div key={index} className={'collectionItem'}>
      <div
        className={classNames('photoBlock', { photoBlockPreview: item.preview })}
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
  );
};
