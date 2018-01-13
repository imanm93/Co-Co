import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Grid, Divider, Button } from 'semantic-ui-react';
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
        <Grid>
          <Grid.Column width ={16} style={{ backgroundColor: '#FFF', padding: 0 }}>
            <div className='form-header'>Step 2/4: Put a face to the name</div>
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
          <Grid.Column width={16} style={{ backgroundColor: '#FFF', padding: '2em 1em 0em' }}>
            <div className='form-section-title' style={{ textAlign: 'center', fontWeight: 100 }}>A profile picture will help your friends recognize you</div>
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column width={16} style={{ backgroundColor: '#FFF', padding: '0em 1em 2em' }}>
            <Grid.Row>
              <Grid centered>
                <Grid.Column width={5}>
                  <Field
                    name='profilePhotoUrl'
                    component={singleFileUploadFormField}
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
          <Grid.Column width={16} style={{ backgroundColor: '#FFF', paddingTop: 0, textAlign: 'right' }}>
            <Button onClick={() => this.props.onPrevious()} className='coandco-btn-inverted'>Back to Profile</Button>
            <Button type='submit' circular secondary>Tell us what you're good at <i className='fa fa-chevron-right'></i></Button>
          </Grid.Column>
        </Grid>
      </form>
    )
  }

}

export default reduxForm({
  form: 'UserProfilePictureForm'
})(UserProfilePictureForm)
