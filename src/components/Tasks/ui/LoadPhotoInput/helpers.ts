import { ChangeEvent } from 'react';
import { filesType } from '../../../../store/reducers/tasks/taskTypes';

export const fileFormatter = (
  uploadedFiles: ChangeEvent<HTMLInputElement>,
  imagesArr: filesType[]
): filesType[] => {
  const target = uploadedFiles.target as HTMLInputElement;
  const file: FileList = target.files as FileList;

  const newPreview: filesType[] = [...imagesArr];

  Object.values(file).forEach((item) => {
    const newItem: filesType = {
      name: item.name,
      preview: URL.createObjectURL(item)
    };
    newPreview.push(newItem);
  });

  return newPreview;
};

export function isImage(filename: string) {
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

export const fileNameSlicer = (name: string) => {
  let sliced = name.slice(0, 6);
  if (sliced.length < name.length) {
    sliced += '...';
  }
  return sliced;
};
