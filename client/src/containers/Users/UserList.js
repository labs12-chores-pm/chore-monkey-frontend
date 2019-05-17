import React, { useState, useEffect } from 'react'

import { withFirebase } from '../Firebase'
import List from './List'

const UserList = ({ firebase }) => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val()
      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key
      }))
      setUsers(usersList)
      setLoading(false)
    })
    return () => {
      firebase.users().off()
    }
  }, [firebase])

  return (
    <List
      users={users}
      setUsers={setUsers}
      loading={loading}
      setLoading={setLoading}
    />
  )
}

export default withFirebase(UserList)
