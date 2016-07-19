import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
  
  handleFormSubmit(formProps) {
    // call action creator to sign up user
    this.props.signupUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Ooops! </strong>{this.props.errorMessage}
        </div>
      );
    }
  }
  
  render() {
    const {
      handleSubmit,
      fields: { email, password, passwordConfirm }
    } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <input className="form-control" {...email} />
          {
            email.touched &&
            email.error &&
            <div className="error">{email.error}</div>
          }
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input type="password" className="form-control" {...password} />
          {
            password.touched && 
            password.error && 
            <div className="error">{password.error}</div>
          }
        </fieldset>
        <fieldset className="form-group">
          <label>Confirm Password:</label>
          <input type="password" className="form-control" {...passwordConfirm} />
          {
            passwordConfirm.touched &&
            passwordConfirm.error &&
            <div className="error">Please enter a password confirmation</div>
          }
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign Up</button>
      </form>
    );
  }
}

// validate is a helper function from reduxForm
function validate(formProps) {
  const errors = {};

  ['email', 'password', 'passwordConfirm'].forEach(elem => {
      if (!formProps[elem]) errors[elem] = `Please enter your ${elem}`
    });

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'passwords must match';
  }

  return errors;
}

// Grabs state.auth and passes to this.props - in this case error -> errorMessage
function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate
}, mapStateToProps, actions)(Signup);