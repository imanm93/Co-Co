import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Button } from 'semantic-ui-react';
import { required } from '../../../validators';
import inputFormField from '../../../components/InputFormField';

class SignInForm extends Component {

  submit = (values) => {
    this.props.signInUser(values);
  }

  render() {
    const { handleSubmit } = this.props;
    return(
      <form onSubmit={handleSubmit(this.submit)}>
        <h3>Sign in to Co & Co</h3>
        <hr />
        <Field
          name='email'
          type='text'
          label='Email (@ed.ac.uk)'
          placholder='Email'
          validate={required}
          component={inputFormField}
        />
        <Field
          name='password'
          type='password'
          label='Password'
          placholder='Password'
          validate={required}
          component={inputFormField}
        />
        <Button type='submit'>Sign In</Button>
      </form>
    )
  }

}

export default reduxForm({
  form: 'SignInForm'
})(SignInForm);
