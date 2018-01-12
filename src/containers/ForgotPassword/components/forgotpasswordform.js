import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Grid, Button, Divider, Dimmer, Loader } from 'semantic-ui-react';
import { required } from '../../../validators';
import inputFormField from '../../../components/InputFormField';

class ForgotPasswordForm extends Component {

  submit = (values) => {
    this.props.onSend(values);
  }

  render() {
    const { onSend, onBack, handleSubmit, isSendingForgotPassword, forgotPasswordError } = this.props;
    return (
      <form onSubmit={handleSubmit(this.submit)}>
        <Grid centered>
          <Grid.Column width={12} style={{ backgroundColor: '#FFF', padding: 0 }}>
            <div className='form-header'>Forgot password</div>
          </Grid.Column>
        </Grid>
        <Grid centered>
          <Grid.Column width={12} style={{ backgroundColor: '#FFF', padding: 0 }}>
            <Grid.Row>
              <Divider />
            </Grid.Row>
          </Grid.Column>
        </Grid>
        <Grid centered>
          {isSendingForgotPassword &&
            <Dimmer active inverted>
              <Loader />
            </Dimmer>
          }
          <Grid.Column width={12} style={{ backgroundColor: '#FFF', boxShadow: '0 1px 3px 0 #979797', padding: '2em', paddingBottom: 0 }}>
            <Grid.Row>
              <Grid>
                <Grid.Column width={16}>
                  <Field
                    name='email'
                    type='text'
                    label='Email'
                    placholder='Email'
                    validate={required}
                    component={inputFormField}
                  />
                </Grid.Column>
              </Grid>
            </Grid.Row>
          </Grid.Column>
        </Grid>
        <Grid centered>
          <Grid.Column width={12} style={{ backgroundColor: '#FFF', padding: 0 }}>
            <Grid.Row>
              <Divider />
            </Grid.Row>
          </Grid.Column>
        </Grid>
        {forgotPasswordError &&
          <Grid centered>
            <Grid.Column width={12} style={{ backgroundColor: '#FFF', paddingTop: 0 }}>
              <Grid.Row style={{ padding: '1em', paddingBottom: 0 }}>
                <span style={{ color: '#E74C3C' }}>*{forgotPasswordError.message}</span>
              </Grid.Row>
            </Grid.Column>
          </Grid>
        }
        <Grid centered>
          <Grid.Column width={12} style={{ backgroundColor: '#FFF', paddingTop: 0 }}>
            <Grid.Row style={{ padding: '1em', paddingBottom: 0 }}>
              <Grid>
                <Grid.Column width={8} style={{ textAlign: 'left', paddingTop: 0 }}>
                  <Button circular className='coandco-btn-inverted' type='button' onClick={onBack} >Back</Button>
                </Grid.Column>
                <Grid.Column width={8} style={{ textAlign: 'right', paddingTop: 0 }}>
                  <Button circular secondary type='submit'>Send email</Button>
                </Grid.Column>
              </Grid>
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </form>
    )
  }

}

export default reduxForm({
  form: 'ForgotPasswordForm'
})(ForgotPasswordForm);
