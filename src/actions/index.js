

// Submit email and password to server
export function signinUser({ email, password }) {

  // This is how we get direct access to the dispatch function in Redux
  // Return a function from the action creator with the parameter 'dispatch'
  // This is enabled with the npm package 'redux-thunk'
  // which gives us arbitrary access to the dispatch method
  return function (dispatch) {

    // If request is good...
    // - Update state to indicate user is authenticated
    // - Save the JWT token
    // - redirect to the route '/feature'


    // If request is bad...
    // - show an error to the user
  };
}