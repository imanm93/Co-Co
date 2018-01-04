import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'semantic-ui-react';
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
        <div>Verify your account</div>
        <hr/>
        <div>A bit about you</div>
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
        <hr/>
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
        <a href="" onClick={this.props.onShowTandCs}>Terms & Conditions.</a>
        <hr/>
        {this.props.submitError && <p className="errorMessage"> <br/>{this.props.submitError}</p>}
        <Button>Back to homepage</Button>
        <Button type="submit"> Get verified '>'</Button>
      </form>
    )
  }

}

const selector = formValueSelector('SignUpForm')
SignUpForm = connect(
  state => {
    const usertype = selector(state, 'usertype')
    return {
      usertype
    }
  }
)(SignUpForm)

export default reduxForm({
  form: 'SignUpForm'
})(SignUpForm)
