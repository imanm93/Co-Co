import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { reduxForm, Field } from 'redux-form';
import inputFormField from '../../../components/InputFormField';

class EditProfileForm extends Component {

  submit(values) {
    console.log(values);
  }

  // background image
  // profile picture
  // skills
  // interests
  // work examples

  render() {
    const { handleSubmit } = this.props;
    return(
      <form onSubmit={handleSubmit(this.submit.bind(this))}>
        <Field
          name='bio'
          label=''
          placeholder=''
          component={inputFormField}
          InputType={Form.TextArea}
        />
        <Button type='submit'>Save</Button>
      </form>
    )
  }

}

export default reduxForm({
  form: 'EditProfileForm'
})(EditProfileForm)
