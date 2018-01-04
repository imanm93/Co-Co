import React, { Component } from 'react';
import { Field } from 'redux-form';
import inputFormField from '../../../components/InputFormField';
import { required, username, studentUniversityEmail, otherEmail } from '../../../validators';

class StudentEmail extends Component {

  render() {
    return(
      <div>
        <Field
          name='email'
          type='email'
          label='Your university email (@ed.ac.uk)'
          placeholder='e.g. s1352294@ed.ac.uk'
          component={inputFormField}
          validate={[required, studentUniversityEmail]}
        />
        <Field
          name="recoveryEmail"
          type="email"
          label='Your recovery email'
          placeholder='For example: my_email@domain.com'
          component ={inputFormField}
          validate={[required, otherEmail]}
        />
        <hr/>
        <div>And the formalities</div>
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

export default StudentEmail;
