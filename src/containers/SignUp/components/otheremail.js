import React, { Component } from 'react';
import { Field } from 'redux-form';
import { required, otherEmail } from '../../../validators';
import inputFormField from '../../../components/InputFormField';

class OtherEmail extends Component {

  render() {
    return(
      <div>
        <Field
          label="First Name"
          name="firstName"
          placeholder='Your first name'
          component ={inputFormField}
          validate={[required]}
        />
        <Field
          label="Last Name"
          name="lastName"
          placeholder='Your last name'
          component ={inputFormField}
          validate={[required]}
        />
        <hr/>
        <div>And the formalities</div>
        <Field
          name='email'
          label='Your email'
          placeholder='e.g. my_email@domain.com'
          component={inputFormField}
          validate={[required, otherEmail]}
        />
        <Field
          name='password'
          label='Password'
          placeholder='Make it stick'
          type="password"
          component ={inputFormField}
          validate={[required]}
        />
      </div>
    )
  }

}

export default OtherEmail;
