import React from 'react';
import axios from 'axios';
import {BrowserRouter as Router} from 'react-router-dom'

axios.interceptors.request.use(
  function(options) {
    options.headers.authorization = localStorage.getItem('user');
    return options; 
  },
  function(error) {
    return Promise.reject(error);
  }
);




export default function(Component) {
  return class Authenticated extends React.Component {
    render() {
      const token = localStorage.getItem('user');
      const notLoggedIn = <div>
        <h1>Please login first</h1>
        <button >Take me to the login!</button>
        </div>;
      return <> {token ? <Component {...this.props} /> : notLoggedIn} </>;
    }
  };
}


    
