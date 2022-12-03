import React, { FC, useEffect, useState } from 'react';

import './photoCollection.scss';
import { previewType } from '../../../../store/reducers/tasks/taskTypes';
import { CollectionItem } from '../CollectionItem/CollectionItem';

interface IPhotoCollection {
  stateValue: previewType[];
}

export const PhotoCollection: FC<IPhotoCollection> = ({ stateValue }) => {
  const [localState, setLocalState] = useState<previewType[]>(stateValue);

  useEffect(() => {
    setLocalState(stateValue);
  }, [stateValue, localState]);

  return (
    <div className="photoCollection">
      {localState.map((item, index) => (
        <div key={index}>
          <CollectionItem index={index} item={item} />
        </div>
      ))}
    </div>
  );
};
