import React, { useState } from 'react';
import firebase from '../../firebase/firebase.js';

const InviteUser = () => {
  const [email, setEmail] = useState('');
  const [showInput, toggleShowInput] = useState(false);

  async function sendInvite(e, email, groupId) {
    e.preventDefault();
    await firebase.sendEmailInvite(email, groupId);
    localStorage.setItem('emailForSignIn', email);
  }

  return (
    <>
      <button
        className="btn hvr-glow"
        onClick={() => toggleShowInput(prevState => !prevState)}
      >
        {showInput ? 'Cancel' : 'Invite User'}
      </button>
      {showInput && (
        <form
          onSubmit={e => {
            sendInvite(e, email, 1);
          }}
        >
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button type="submit" class="btn hvr-glow">
            Send
          </button>
        </form>
      )}
    </>
  );
};

export default InviteUser;
