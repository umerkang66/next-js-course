import classes from './newsletter-registration.module.css';
import { useRef, useContext } from 'react';

import NotificationContext from '../../store/notification-context';

function NewsletterRegistration() {
  const emailInputRef = useRef();
  const notificationContext = useContext(NotificationContext);

  async function registrationHandler(event) {
    event.preventDefault();
    const email = emailInputRef.current.value;

    notificationContext.showNotification({
      title: 'Signing up...',
      message: 'Registering for newsletter',
      status: 'pending',
    });

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed the fetch the data');
      }

      await res.json();
      notificationContext.showNotification({
        title: 'Success!',
        message: 'Successfully Registered for newsletter',
        status: 'success',
      });
    } catch (err) {
      notificationContext.showNotification({
        title: 'Error!',
        message: err.message || 'Something went wrong',
        status: 'error',
      });
    }
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
