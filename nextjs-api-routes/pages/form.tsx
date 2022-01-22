import { NextPage } from 'next';
import { FormEvent, useRef } from 'react';

const Form: NextPage = () => {
  const emailInputRef = useRef<any>();
  const feedbackInputRef = useRef<any>();

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    const bodyData = {
      email: enteredEmail,
      feedback: enteredFeedback,
    };

    // We don't have to write the localhost or https or something, it will send the request from the localhost, because both form and api are hosted on the same route
    await fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(bodyData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  return (
    <div>
      The Form Page
      <form onSubmit={submitForm}>
        <div>
          <label htmlFor="email">Your email address</label>
          <input type="email" name="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your feedback</label>
          <input
            type="text"
            name="feedback"
            id="feedback"
            ref={feedbackInputRef}
          />
        </div>
        <button type="submit">Send Feedback</button>
      </form>
    </div>
  );
};

export default Form;
