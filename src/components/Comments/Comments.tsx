import React, { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import { ReactComponent as AddComment } from '../../assets/icons/add-svgrepo-com.svg';
import { commentCreator } from './helpers';
import { IComment } from '../../store/reducers/tasks/taskTypes';
import './comments.scss';

interface IComments {
  comments: IComment[];
  setEditedComments: (arg: IComment[]) => void;
}

export const Comments: FC<IComments> = ({ comments, setEditedComments }) => {
  const [inputValue, setInputValue] = useState('');
  const [justClicked, setJustClick] = useState(false);
  const [localState, setLocalState] = useState<IComment[]>([]);

  useEffect(() => {
    comments && setLocalState(comments);
  }, [comments]);

  const createSubtask = () => {
    setInputValue('');
    setJustClick((prevState) => !prevState);
    const newComments = commentCreator(localState, inputValue);
    newComments && setEditedComments(newComments);
    setTimeout(() => setJustClick(false), 300);
  };
  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (inputValue.length && e.code === 'Enter') {
      createSubtask();
    }
  };

  return (
    <div className={'comments'}>
      <div className="comments__wrapper">
        <div className="comments__scrollBlock">
          {localState.map((comment) => (
            <div className={'comments__item'} key={comment.id}>
              <span className={'comments__user'}>user</span>
              <span>{comment.content}</span>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className={'comments__input'}>
          <input
            onKeyUp={(e) => onKeyUp(e)}
            onChange={(e) => setInputValue(e.currentTarget.value)}
            value={inputValue}
            placeholder={'add comment...'}
            type="text"
            readOnly={false}
          />
          <button
            disabled={!inputValue}
            type={'button'}
            onClick={() => createSubtask()}
            className={classNames({
              justClick: justClicked,
            })}
          >
            <AddComment />
          </button>
        </div>
      </form>
    </div>
  );
};
