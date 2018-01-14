import React, { Component } from 'react';
import { Field } from 'redux-form';
import { Grid, Divider } from 'semantic-ui-react';
import inputFormField from '../../../components/InputFormField';
import { required, username, studentUniversityEmail, otherEmail } from '../../../validators';

class StudentEmail extends Component {

  render() {
    return(
      <Grid>
        <Grid.Column width={8}>
          <Field
            name='email'
            type='email'
            label='Your university email (@ed.ac.uk)'
            placeholder='e.g. s1352294@ed.ac.uk'
            component={inputFormField}
            validate={[required, studentUniversityEmail]}
          />
        </Grid.Column>
        <Grid.Column width={8}>
          <Field
            name="recoveryEmail"
            type="email"
            label='Your recovery email'
            placeholder='For example: my_email@domain.com'
            component ={inputFormField}
            validate={[required, otherEmail]}
          />
        </Grid.Column>
        <Grid.Column width={16} style={{ padding: 0 }}>
          <Divider style={{ margin: 0 }} />
        </Grid.Column>
        <Grid.Column width={16} style={{ paddingBottom: 0 }}>
          <div className='form-section-title'>2. And the formalities</div>
        </Grid.Column>
        <Grid.Column width={8} style={{ paddingTop: 0 }}>
          <Field
            name='username'
            label='Choose a user name'
            placeholder='Username'
            component ={inputFormField}
            validate={[required, username]}
          />
        </Grid.Column>
        <Grid.Column width={8} style={{ paddingTop: 0 }}>
          <Field
            name='password'
            label='Password'
            placeholder='Make it stick'
            type="password"
            component ={inputFormField}
            validate={[required]}
          />
        </Grid.Column>
      </Grid>
    )
  }

}

export default StudentEmail;
