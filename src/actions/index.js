import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_DATA
} from './types';

const API_URL = 'http://localhost:3090';

export function signinUser({ email, password }) {

  // This is how we get direct access to the dispatch function in Redux
  // Return a function from the action creator with the parameter 'dispatch'
  // This is enabled with the npm package 'redux-thunk'
  // which gives us arbitrary access to the dispatch method
  return function (dispatch) {
    
    // Submit email and password to server
    axios.post(`${API_URL}/signin`, { email, password })
      .then(response => {
        // If request is good...
        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });

        // - Save the JWT in localStorage
        localStorage.setItem('token', response.data.token);

        // - redirect to the route '/feature'
        browserHistory.push('/feature');
      })
      .catch(() => {
        // If request is bad...
        // - show an error to the user
        dispatch(authError('Bad Login Info'));
      });
  };
}

export function signupUser({ email, password }) {

  // Use redux-thunk
  return function(dispatch) {

    // Submit email and password to the server
    axios.post(`${API_URL}/signup`, { email, password })
      .then(response => {
        // Good request
        dispatch({ type: AUTH_USER });

        // Update JWT
        localStorage.setItem('token', response.data.token);

        // redirect
        browserHistory.push('/feature');
      })
      .catch(response => {
        dispatch(authError(response.response.data.error));
      });
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser() {
  // delete localStorage
  localStorage.removeItem('token');
  // run action
  return { type: UNAUTH_USER };
}

// Make API request to root url of api
export function fetchMessage() {
  return function(dispatch) {
    axios.get(API_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_DATA,
          payload: response.data.message
        })
      });
  }
}

// Redux Promise Pattern

// export function fetchMessage() {
//   const request = axios.get(API_URL, {
//     headers: { authorization: localStorage.getItem('token')}
//   });
//
//   return {
//     type: FETCH_DATA,
//     payload: request
//   };
// }