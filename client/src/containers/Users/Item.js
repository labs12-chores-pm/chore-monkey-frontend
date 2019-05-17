import React from 'react'

const Item = ({ match, loading, user, onSendPasswordResetEmail, id }) => (
  <div>
    <h2>User {id}</h2>
    {loading && <div>Loading ...</div>}

    {user && (
      <div>
        <span>
          <strong>ID:</strong> {id}
        </span>
        <span>
          <strong>E-Mail:</strong> {user.email}
        </span>
        <span>
          <strong>Username:</strong> {user.username}
        </span>
        <span>
          <button type="button" onClick={onSendPasswordResetEmail}>
            Send Password Reset
          </button>
        </span>
      </div>
    )}
  </div>
)

export default Item
