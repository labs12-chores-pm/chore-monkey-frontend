import React from 'react'

import AuthUserContext from './context'
import { withFirebase } from '../Firebase'
import axios from 'axios';

const URL = "http://chore-monkey.herokuapp.com"
// const URL = "http://localhost:9000"

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        authUser: JSON.parse(localStorage.getItem('authUser'))
      }
    }

    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          localStorage.setItem('authUser', JSON.stringify(authUser))
          console.log(authUser)
          const herokuDbUser = {
            name:   authUser.user,
            email:  authUser.email,
            uid:    authUser.uid
          }
          console.log(herokuDbUser);
          axios.post(`${URL}/api/users/`, herokuDbUser)
          .then(response => {
            console.log(`User ${herokuDbUser.name} succesfully added to Heroku Database with uid ${herokuDbUser.uid}`);
            console.log("Server:", response.data.message);
          })
          .catch(error => {
            console.log(error)
          })
          this.setState({ authUser })
        },
        () => {
          localStorage.removeItem('authUser')
          this.setState({ authUser: null })
        }
      )
    }

    componentWillUnmount() {
      this.listener()
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      )
    }
  }

  return withFirebase(WithAuthentication)
}

export default withAuthentication

