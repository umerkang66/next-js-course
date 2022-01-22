import { useState } from 'react';
import { useEffect } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
  const { eventId } = props;

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
    console.log(data);
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
