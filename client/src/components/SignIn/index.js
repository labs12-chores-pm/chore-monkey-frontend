import React from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import { SignUpLink } from '../SignUp/SignUpLink'
import PasswordForgetLink from '../PasswordForget/PasswordForgetLink'
import { withFirebase } from '../../containers/Firebase'
import { SignInFormBase } from './SignInFormBase'
import { SignInGoogleBase } from './SignInGoogleBase'
import { SignInTwitterBase } from './SignInTwitterBase'
import { SignInFacebookBase } from './SignInFacebookBase'

const SignInPage = () => (
  <div>
    <h1>Sign In</h1>
    <SignInForm />
    <div style={{ display: 'flex' }}>
      <SignInGoogle />
      <SignInFacebook />
      <SignInTwitter />
    </div>
    <PasswordForgetLink />
    <SignUpLink />
  </div>
)

const SignInForm = compose(
  withRouter,
  withFirebase
)(SignInFormBase)

const SignInGoogle = compose(
  withRouter,
  withFirebase
)(SignInGoogleBase)

const SignInFacebook = compose(
  withRouter,
  withFirebase
)(SignInFacebookBase)

const SignInTwitter = compose(
  withRouter,
  withFirebase
)(SignInTwitterBase)

export default SignInPage

export { SignInForm, SignInGoogle, SignInFacebook, SignInTwitter }
