import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { uiConfig } from '../../firebase/uiconfig';
import sendToDB from './sendToDB';
import axios from 'axios';

class SocialLogins extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false
    };
  }

  async componentDidMount() {
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      let email = localStorage.getItem('emailForSignIn');

      if (!email) {
        email = window.prompt('Please provide your email for confirmation.');
      }
      try {
        const result = await firebase
          .auth()
          .signInWithEmailLink(email, window.location.href);
        axios.post('https://chore-monkey.herokuapp.com/api/groupmembers', {
          userId: result.user.uid,
          groupId: parseInt(window.location.search.split('?')[0].split('=')[1])
        });
      } catch (err) {
        console.error(err.message);
      }
    }
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user });
    });
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    if (!this.state.isSignedIn) {
      return (
        <div>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div>
      );
    }
    sendToDB();
    return <div>{this.props.history.push('/dashboard')}</div>;
  }
}

export default withRouter(SocialLogins);
