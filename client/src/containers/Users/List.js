import React from 'react'
import { Link } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'

const List = ({ loading, users, user }) => {
  return (
    <div>
      <h2>Users</h2>
      {loading && <div>Loading ...</div>}
      <ul>
        {users.map(user => (
          <li key={user.uid}>
            <span>
              <strong>ID:</strong> {user.uid}
            </span>
            <span>
              <strong>E-Mail:</strong> {user.email}
            </span>
            <span>
              <strong>Username:</strong> {user.username}
            </span>
            <span>
              <Link
                to={{
                  pathname: `${ROUTES.ADMIN}/${user.uid}`,
                  state: { user }
                }}
              >
                Details
              </Link>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default List
