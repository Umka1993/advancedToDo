import React, { FC, useEffect, useState } from 'react';
import { Comments } from '../../Comments/Comments';
import { IComment, TaskAction, TaskActionEnum } from '../../../store/reducers/tasks/taskTypes';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { useTypedSelector } from '../../../hooks/useTypeSelector';

interface IAddCommentsForm {
  taskId: number;
}
interface IEditedCommentsTask {
  taskId: number;
  comments: IComment[];
}

export const AddCommentsForm: FC<IAddCommentsForm> = ({ taskId }) => {
  const [editedComments, setEditedComments] = useState<IComment[]>();
  const [commentsByTaskId, setCommentsByTaskId] = useState<IComment[]>([]);
  const { tasks } = useTypedSelector((state) => state.tasks);
  const { comments } = tasks[taskId];

  useEffect(() => {
    if (taskId) {
      const { comments } = tasks[taskId];
      setCommentsByTaskId(comments);
    }
  }, [taskId, comments]);

  const dispatch = useDispatch();

  const dispatchAddComment = (dispatch: Dispatch<TaskAction>, comment: IEditedCommentsTask) => {
    return dispatch({ type: TaskActionEnum.ADD_COMMENT, payload: comment });
  };

  useEffect(() => {
    editedComments && dispatchAddComment(dispatch, { taskId, comments: editedComments });
  }, [editedComments]);

  return (
    <div className={'commentsForm'}>
      <Comments comments={commentsByTaskId} setEditedComments={setEditedComments} />
    </div>
  );
};
