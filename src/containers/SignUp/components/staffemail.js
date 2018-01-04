import React, { Component } from 'react';
import { Field } from 'redux-form';
import inputFormField from '../../../components/InputFormField';
import { required, otherUniversityEmail, username } from '../../../validators';

class StaffEmail extends Component {

  render() {
    return(
      <div>
        <Field
          name='email'
          label='Your university staff email (@ed.ac.uk)'
          placeholder='e.g. s1352294@ed.ac.uk'
          component={inputFormField}
          validate={[required, otherUniversityEmail]}
        />
        <hr/>
        <div>And the formailities</div>
        <Field
          name='username'
          label='Choose a user name'
          placeholder='Username'
          component ={inputFormField}
          validate={[required, username]}
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

export default StaffEmail;
