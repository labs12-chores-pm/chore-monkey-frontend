import React from 'react'
import * as ROUTES from '../../constants/routes'
import * as SIGNINCONSTS from '../../constants/SignIn'

export const SignInTwitterBase = ({ history, firebase }) => {
  const onSubmit = async e => {
    e.preventDefault()

    try {
      const socialAuthUser = await firebase.doSignInWithTwitter()
      return firebase.user(socialAuthUser.user.uid).set({
        username: socialAuthUser.additionalUserInfo.profile.name,
        email: socialAuthUser.additionalUserInfo.profile.email,
        roles: {}
      })
    } catch (e) {
      if (e.code === SIGNINCONSTS.ERROR_CODE_ACCOUNT_EXISTS) {
        e.message = SIGNINCONSTS.ERROR_MSG_ACCOUNT_EXISTS
      }
      console.error(e.code, e.message)
    } finally {
      history.push(ROUTES.HOME)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <button type="submit">
        <i className="fab fa-twitter fa-2x" />
      </button>
    </form>
  )
}
