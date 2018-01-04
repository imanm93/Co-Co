import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Button } from 'semantic-ui-react';
import singleFileUploadFormField from '../../../components/SingleFileUploadFormField'

class UserProfilePictureForm extends Component {

  submit(values) {
    this.props.updateProfilePicture(values);
    this.props.onNext();
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.submit.bind(this))}>
        <div>A profile picture will help your friends recognize you on Co & Co</div>
        <Field
          name='profilePhotoUrl'
          component={singleFileUploadFormField}
        />
        <Button onClick={() => this.props.onPrevious()}>Back to Profile</Button>
        <Button type='submit'>Tell us what you're good at >'</Button>
      </form>
    )
  }

}

export default reduxForm({
  form: 'UserProfilePictureForm'
})(UserProfilePictureForm)
