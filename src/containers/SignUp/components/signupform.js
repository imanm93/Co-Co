import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, Divider, Button, Form } from 'semantic-ui-react';
import { reduxForm, formValueSelector, Field } from 'redux-form';
import { required, mandatoryCheckbox } from '../../../validators';
import inputFormField from '../../../components/InputFormField';
import checkboxFormField from '../../../components/CheckboxFormField';
import FilterBox from '../../../components/FilterBox';

import StudentEmail from './studentemail';
import StaffEmail from './staffemail';
import OtherEmail from './otheremail';

class SignUpForm extends Component {

  componentWillMount() {
    this.setState({
      courseId: 0,
      courseError: ''
    });
  }

  onSelectedServiceNeeded(value) {
    if (value) {
      this.setState({
        courseId: value.id,
        courseError: ''
      });
    }
    else {
      this.setState({
        courseId: 0,
        courseError: '*Please select an option from the dropdown'
      });
    }
  }

  genUserTypeFields(usertype) {
    switch (usertype) {
      case 'Staff':
        return <StaffEmail />
      case 'Other':
        return <OtherEmail />
      case 'Student':
        return <StudentEmail />
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
    newValues['graduationYear'] = values.graduationYear;
    newValues['sourceId'] = values.sourceId;
    delete newValues['degree'];
    if (this.state.courseId) { newValues['courseId'] = this.state.courseId; }
    if (values.acceptedWeeklyDigest) { newValues['acceptedWeeklyDigest'] = values.acceptedWeeklyDigest }
    //console.log(newValues);
    this.props.onSignUp(newValues, userType);
  }

  render() {
    const { handleSubmit, usertype } = this.props;
    const years = this.props.setupData.years.map(year => {
      return {
        key: year.id,
        value: year.id,
        text: year.value
      }
    });
    let courseDegrees = {};
    const courses = this.props.setupData.courses.map(course => {
      courseDegrees = Object.assign({}, courseDegrees, { [course.degree]: course.id });
      return course;
    });
    const courseDegreeOptions = Object.keys(courseDegrees).map(courseDegree => {
      return {
        key: courseDegree,
        value: courseDegree,
        text: courseDegree
      }
    });
    const signUpSources = this.props.setupData.signUpSources.map(source => {
      return {
        key: source.id,
        value: source.id,
        text: source.name
      };
    });
    return (
      <form onSubmit={handleSubmit(this.submit.bind(this))}>
        <Grid>
          <Grid.Column width={16} style={{ backgroundColor: '#FFF', padding: 0 }}>
            <div className='form-header'>Sign Up to Co & Co</div>
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column width={16} style={{ backgroundColor: '#FFF', padding: 0 }}>
            <Grid.Row>
              <Divider />
            </Grid.Row>
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column width={16} style={{ backgroundColor: '#FFF', padding: '0em 1em' }}>
            <div className='form-section-title'>1. General information</div>
            <Field
              name="userType"
              label='What type of user are you?'
              placeholder='What type of user are you?'
              component={inputFormField}
              options={[
                { text: 'Student', value: "Student" },
                { text: 'Staff', value: "Staff" },
                { text: 'Other', value: "Other" },
              ]}
              InputType={Form.Select}
              validate={[required]}
            />
            {this.genUserTypeFields(usertype)}
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column width={16} style={{ backgroundColor: '#FFF', padding: 0 }}>
            <Grid.Row>
              <Divider />
            </Grid.Row>
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column width={16} style={{ backgroundColor: '#FFF', padding: '0em 1em' }}>
            <div className='form-section-title'>3. The basics</div>
            <Grid.Row>
              <Grid>
                <Grid.Column width={8}>
                  <Field
                    name='firstName'
                    label='Your First Name'
                    placeholder='Firstname'
                    component={inputFormField}
                    validate={[required]}
                  />
                </Grid.Column>
                <Grid.Column width={8}>
                  <Field
                    name='lastName'
                    label='Your Last Name'
                    placeholder='Lastname'
                    component={inputFormField}
                    validate={[required]}
                  />
                </Grid.Column>
              </Grid>
            </Grid.Row>
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column width={16} style={{ backgroundColor: '#FFF', padding: 0 }}>
            <Grid.Row>
              <Divider />
            </Grid.Row>
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column width={16} style={{ backgroundColor: '#FFF', padding: '0em 1em' }}>
            <div className='form-section-title'>4. A bit about you</div>
            <Grid.Row>
              <Grid>
                <Grid.Column width={4}>
                  <Field
                    name='degree'
                    label='Degree'
                    placeholder='Please Choose'
                    component={inputFormField}
                    InputType={Form.Select}
                    options={courseDegreeOptions}
                    validate={[required]}
                  />
                </Grid.Column>
                <Grid.Column width={12}>
                  {this.props.degree &&
                    <div className='coandco-input-field'>
                      <div className='coandco-input-label'>Course</div>
                      <FilterBox
                        items={courses}
                        className='form-search'
                        single={true}
                        onSelectedItem={this.onSelectedServiceNeeded.bind(this)}
                        placeholder='Please choose'
                        onNoMatchFound={this.onSelectedServiceNeeded.bind(this)} />
                      {
                        this.state.courseId === 0 &&
                        <span style={{ color: '#E74C3C' }}>*this field is required</span>
                      }
                    </div>
                  }
                </Grid.Column>
              </Grid>
            </Grid.Row>
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column width={16} style={{ backgroundColor: '#FFF', padding: '0em 1em' }}>
            <Grid.Row>
              <Grid>
                <Grid.Column width={6}>
                  <Field
                    name='graduationYear'
                    label='When do you graduate?'
                    placeholder='Year'
                    component={inputFormField}
                    InputType={Form.Select}
                    options={years}
                    validate={[required]}
                  />
                  <div>*This is only for us and wont be published!</div>
                </Grid.Column>
                <Grid.Column width={2}>
                </Grid.Column>
                <Grid.Column width={8}>
                  <Field
                    name='sourceId'
                    label='How did you hear about us?'
                    placeholder='Please choose'
                    component={inputFormField}
                    InputType={Form.Select}
                    options={signUpSources}
                    validate={[required]}
                  />
                </Grid.Column>
              </Grid>
            </Grid.Row>
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column width={16} style={{ backgroundColor: '#FFF', padding: 0 }}>
            <Grid.Row>
              <Divider />
            </Grid.Row>
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column width={16} style={{ backgroundColor: '#FFF', padding: '0em 1em' }}>
            <Field
              toggle
              name="acceptedWeeklyDigest"
              label="I want to receive weekly digest of whats going on around ECA."
              component={checkboxFormField}
              InputType={Form.Checkbox}
            />
            <Field
              toggle
              name="acceptterms"
              label="I accept the"
              component={checkboxFormField}
              InputType={Form.Checkbox}
              validate={[mandatoryCheckbox]}
            />
            <a href="" onClick={this.props.onShowTandCs} style={{ position: 'absolute', left: '150px', top: '22px' }}>Terms & Conditions.</a>
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column width={16} style={{ backgroundColor: '#FFF', padding: 0 }}>
            <Grid.Row>
              <Divider />
            </Grid.Row>
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column width={16} style={{ backgroundColor: '#FFF', padding: 0 }}>
            <Grid.Row>
              {this.props.submitError && <p className="errorMessage"> <br />{this.props.submitError}</p>}
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
    const degree = selector(state, 'degree')
    return {
      usertype,
      degree
    }
  }
)(SignUpForm)

export default reduxForm({
  form: 'SignUpForm'
})(SignUpForm)
