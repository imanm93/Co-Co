import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { required } from '../../../validators';

import { Grid, Divider, Button, Form } from 'semantic-ui-react';
import inputFormField from '../../../components/InputFormField'

class UserBasicInfoForm extends Component {

  onSubmit(values) {
    this.props.updateBasicInfo(values);
    this.props.onNext();
  }

  render() {
    const { handleSubmit } = this.props;
    const years = this.props.setupData.years.map(year => {
      return {
        key: year.id,
        value: year.id,
        text: year.value
      }
    });
    const courses = this.props.setupData.courses.map(course => {
      return {
        key: course.id,
        value: course.id,
        text: course.degree + ' ' + course.name
      }
    });
    const signUpSources = this.props.setupData.signUpSources.map(source => {
      return {
        key: source.id,
        value: source.id,
        text: source.name
      };
    })
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Grid>
          <Grid.Column width ={16} style={{ backgroundColor: '#FFF', padding: 0 }}>
            <div className='form-header'>Step 1/4: Lets setup your account</div>
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
            <div className='form-section-title'>1. The Basics</div>
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
              <Divider/>
            </Grid.Row>
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column width={16} style={{ backgroundColor: '#FFF', padding: '0em 1em' }}>
            <div className='form-section-title'>2. A bit about you</div>
            <Grid.Row>
              <Grid>
                <Grid.Column width={16}>
                  <Field
                    name='courseId'
                    label='Your Course'
                    placeholder='Choose your course'
                    component={inputFormField}
                    InputType={Form.Select}
                    options={courses}
                    validate={[required]}
                  />
                </Grid.Column>
              </Grid>
            </Grid.Row>
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column width={16} style={{ backgroundColor: '#FFF', padding: '0em 1em' }}>
            <Grid.Row>
              <Grid>
                <Grid.Column width={4}>
                  <Field
                    name='graduationYear'
                    label='When do you graduate?'
                    placeholder='Year'
                    component={inputFormField}
                    InputType={Form.Select}
                    options={years}
                    validate={[required]}
                  />
                </Grid.Column>
                <Grid.Column width={4} style={{ paddingTop: '2.5em' }}>
                  This is only for us and wont be published!
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
              <Divider/>
            </Grid.Row>
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column style={{ backgroundColor: '#FFF', textAlign: 'right', paddingTop: 0 }}>
            <Grid.Row>
              <Button type='submit' circular secondary>Get Started <i className='fa fa-chevron-right'></i></Button>
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </form>
    )
  }

}

export default reduxForm({
  form: 'UserBasicInfoForm'
})(UserBasicInfoForm)
