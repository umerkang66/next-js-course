import { useState } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');

  const submitFormHandler = async event => {
    event.preventDefault();
    const res = await axios.post('/api/feedback', {
      data: {
        email,
        feedback,
      },
    });

    console.log(res.data.feedback);
    setEmail('');
    setFeedback('');
  };

  const onInputChange = event => {
    if (event.target.localName === 'textarea') setFeedback(event.target.value);
    else if (event.target.localName === 'input') setEmail(event.target.value);
  };

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="umerEmailId">Your email address</label>
          <input
            type="email"
            id="umerEmailId"
            value={email}
            onChange={onInputChange}
          />
        </div>
        <div>
          <label htmlFor="umerFeedbackId">Your feedback</label>
          <textarea
            id="umerFeedbackId"
            value={feedback}
            onChange={onInputChange}
          />
        </div>
        <button>Send feedback</button>
      </form>
    </div>
  );
};

export default HomePage;
