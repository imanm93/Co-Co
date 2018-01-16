import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, Divider, Button, Form } from 'semantic-ui-react';
import { reduxForm, formValueSelector, Field } from 'redux-form';
import { required, mandatoryCheckbox } from '../../../validators';
import inputFormField from '../../../components/InputFormField';
import checkboxFormField from '../../../components/CheckboxFormField';

import StudentEmail from './studentemail';
import StaffEmail from './staffemail';
import OtherEmail from './otheremail';

class SignUpForm extends Component {

  genUserTypeFields(usertype) {
    switch(usertype) {
      case 'Student':
        return <StudentEmail />
      case 'Staff':
        return <StaffEmail />
      case 'Other':
        return <OtherEmail />
      default:
        return <StudentEmail />
    }
  }

  submit(values) {
    let newValues = {};
    const userType = values.userType;
    newValues['email'] = values.email;
    newValues['password'] = values.password;
    newValues['userName'] = values.username;
    newValues['firstName'] = values.firstName ? values.firstName : null;
    newValues['lastName'] = values.lastName ? values.lastName : null;
    newValues['recoveryEmail'] = values.recoveryEmail ? values.recoveryEmail : null;
    if (values.acceptedWeeklyDigest) { newValues['acceptedWeeklyDigest'] = values.acceptedWeeklyDigest }
    this.props.onSignUp(newValues, userType);
  }

  render() {
    const { handleSubmit, usertype } = this.props;
    return (
      <form onSubmit={handleSubmit(this.submit.bind(this))}>
        <Grid>
          <Grid.Column width ={16} style={{ backgroundColor: '#FFF', padding: 0 }}>
            <div className='form-header'>Sign Up to Co & Co</div>
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column width={16} style={{ backgroundColor: '#FFF', padding: 0 }}>
            <Grid.Row>
              <Divider/>
            </Grid.Row>
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column width={16} style={{ backgroundColor: '#FFF', padding: '0em 1em' }}>
            <div className='form-section-title'>1. A bit about you</div>
            <Field
            name="userType"
            label='What type of user are you?'
            placeholder='What type of user are you?'
            component={inputFormField}
            options={[
              {text:'Student', value:"Student"},
              {text:'Staff', value:"Staff"},
              {text:'Other', value:"Other"},
            ]}
            InputType={Form.Select}
            validate={[required]}
            />
            { this.genUserTypeFields(usertype) }
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column width={16} style={{ backgroundColor: '#FFF', padding: 0 }}>
            <Grid.Row>
              <Divider/>
            </Grid.Row>
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column width={16} style={{ backgroundColor: '#FFF', padding: '0em 1em' }}>
            <Field
              toggle
              name = "acceptedWeeklyDigest"
              label="I want to receive weekly digest of whats going on around ECA."
              component ={checkboxFormField}
              InputType={Form.Checkbox}
            />
            <Field
              toggle
              name = "acceptterms"
              label="I accept the"
              component ={checkboxFormField}
              InputType={Form.Checkbox}
              validate={[mandatoryCheckbox]}
            />
            <a href="" onClick={this.props.onShowTandCs} style={{ position: 'absolute', left: '150px', top: '22px' }}>Terms & Conditions.</a>
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column width={16} style={{ backgroundColor: '#FFF', padding: 0 }}>
            <Grid.Row>
              <Divider/>
            </Grid.Row>
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column width={16} style={{ backgroundColor: '#FFF', padding: 0 }}>
            <Grid.Row>
              {this.props.submitError && <p className="errorMessage"> <br/>{this.props.submitError}</p>}
            </Grid.Row>
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column width={7} style={{ backgroundColor: '#FFF', paddingLeft: '1em' }}>
            <a href={'mailto:info@ed.ac.uk'}>Please email info@ed.ac.uk if you face any issues</a>
          </Grid.Column>
          <Grid.Column width={9} style={{ backgroundColor: '#FFF', padding: '1em', textAlign: 'right' }}>
            <Link to='/'>
              <Button type='button' circular className='coandco-btn-inverted'>Back to Homepage</Button>
            </Link>
            <Button type="submit" circular secondary> Get verified <i className='fa fa-chevron-right'></i></Button>
          </Grid.Column>
        </Grid>
      </form>
    )
  }

}

const selector = formValueSelector('SignUpForm')
SignUpForm = connect(
  state => {
    const usertype = selector(state, 'userType')
    return {
      usertype
    }
  }
)(SignUpForm)

export default reduxForm({
  form: 'SignUpForm'
})(SignUpForm)
