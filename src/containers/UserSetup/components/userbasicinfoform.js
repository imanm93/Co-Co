import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { required } from '../../../validators';

import { Button, Form } from 'semantic-ui-react';
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
        <Field
          name='firstName'
          label='Your First Name'
          placeholder='Firstname'
          component={inputFormField}
          validate={[required]}
        />
        <Field
          name='lastName'
          label='Your Last Name'
          placeholder='Lastname'
          component={inputFormField}
          validate={[required]}
        />
        <hr/>
        <Field
          name='courseId'
          label='Your Course'
          placeholder='Choose your course'
          component={inputFormField}
          InputType={Form.Select}
          options={courses}
          validate={[required]}
        />
        <Field
          name='graduationYear'
          label='When do you graduate?'
          placeholder='Year'
          component={inputFormField}
          InputType={Form.Select}
          options={years}
          validate={[required]}
        />
        <Field
          name='sourceId'
          label='How did you hear about us?'
          placeholder='Please choose'
          component={inputFormField}
          InputType={Form.Select}
          options={signUpSources}
          validate={[required]}
        />
        <Button type='submit'>Get Started '>'</Button>
      </form>
    )
  }

}

export default reduxForm({
  form: 'UserBasicInfoForm'
})(UserBasicInfoForm)
