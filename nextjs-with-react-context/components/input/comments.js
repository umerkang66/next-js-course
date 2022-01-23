import { useState } from 'react';
import { useEffect, useContext } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from '../../store/notification-context';

function Comments(props) {
  const { eventId } = props;

  const notificationContext = useContext(NotificationContext);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const res = await fetch('/api/comments/' + eventId);
      const data = await res.json();
      setComments(data.data);
    };

    if (showComments) {
      fetchComments();
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments(prevStatus => !prevStatus);
  }

  async function addCommentHandler(commentData) {
    notificationContext.showNotification({
      title: 'Sending comment...',
      message: 'Your comment is currently being sent',
      status: 'pending',
    });

    try {
      // commentData includes email, name, text
      // send data to API
      const res = await fetch(`/api/comments/${eventId}`, {
        method: 'POST',
        body: JSON.stringify(commentData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      notificationContext.showNotification({
        title: 'Success!',
        message: 'Successfully Stored Comment',
        status: 'success',
      });

      console.log(data);
    } catch (err) {
      notificationContext.showNotification({
        title: 'Error!',
        message: err.message || 'Something went wrong',
        status: 'error',
      });
    }
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments} />}
    </section>
  );
}

export default Comments;
