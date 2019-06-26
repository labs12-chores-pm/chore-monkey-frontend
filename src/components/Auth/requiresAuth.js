import React from 'react';
import axios from 'axios';

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
      const notLoggedIn = <div>Please login to see the dashboard</div>;
      return <> {token ? <Component {...this.props} /> : notLoggedIn} </>;
    }
  };
}


    
