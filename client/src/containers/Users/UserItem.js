import React, { useState, useEffect } from 'react'

import { withFirebase } from '../Firebase'
import Item from './Item'

const UserItem = ({ match, location, firebase }) => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)
  const [id, setId] = useState('')

  useEffect(() => {
    if (user) {
      return
    }

    setLoading(true)

    firebase.user(match.params.id).on('value', snapshot => {
      setUser(snapshot.val())
      setLoading(false)
      setId(match.params.id)
    })

    return () => {
      firebase.user(match.params.id).off()
    }
  }, [firebase, match.params.id, user])

  const onSendPasswordResetEmail = () => firebase.doPasswordReset(user.email)

  return (
    <Item
      user={user}
      onSendPasswordResetEmail={onSendPasswordResetEmail}
      loading={loading}
      id={id}
    />
  )
}

export default withFirebase(UserItem)
