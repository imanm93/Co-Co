import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Grid, Button, Divider, Dimmer, Loader } from 'semantic-ui-react';
import { required } from '../../../validators';
import inputFormField from '../../../components/InputFormField';

class SignInForm extends Component {

  submit = (values) => {
    this.props.signInUser(values);
  }

  render() {
    const { handleSubmit } = this.props;
    return(
      <form onSubmit={handleSubmit(this.submit)}>
        <Grid centered>
          <Grid.Column width ={12} style={{ backgroundColor: '#FFF', padding: 0 }}>
            <div className='form-header'>Sign in to Co & Co</div>
          </Grid.Column>
        </Grid>
        <Grid centered>
          <Grid.Column width={12} style={{ backgroundColor: '#FFF', padding: 0 }}>
            <Grid.Row>
              <Divider/>
            </Grid.Row>
          </Grid.Column>
        </Grid>
        <Grid centered>
          { this.props.isSigningIn &&
            <Dimmer active inverted>
              <Loader/>
            </Dimmer>
          }
          <Grid.Column width={12} style={{ backgroundColor: '#FFF', boxShadow: '0 1px 3px 0 #979797', padding: '2em', paddingBottom: 0 }}>
            <Grid.Row>
              <Grid>
                <Grid.Column width={8}>
                  <Field
                    name='email'
                    type='text'
                    label='Email (@ed.ac.uk)'
                    placholder='Email'
                    validate={required}
                    component={inputFormField}
                  />
                </Grid.Column>
                <Grid.Column width={8}>
                  <Field
                    name='password'
                    type='password'
                    label='Password'
                    placholder='Password'
                    validate={required}
                    component={inputFormField}
                  />
                </Grid.Column>
              </Grid>
            </Grid.Row>
            <Grid.Row>
              <a href='' className='form-link'>Forgot Password?</a>
            </Grid.Row>
          </Grid.Column>
        </Grid>
        <Grid centered>
          <Grid.Column width={12} style={{ backgroundColor: '#FFF', padding: 0 }}>
            <Grid.Row>
              <Divider/>
            </Grid.Row>
          </Grid.Column>
        </Grid>
        { this.props.signInError &&
          <Grid centered>
            <Grid.Column width={12} style={{ backgroundColor: '#FFF', paddingTop: 0 }}>
              <Grid.Row style={{ padding: '1em', paddingBottom: 0 }}>
                <span style={{color:'#E74C3C'}}>*{this.props.signInError.errorMessage}</span>
              </Grid.Row>
            </Grid.Column>
          </Grid>
        }
        <Grid centered>
          <Grid.Column width={12} style={{ backgroundColor: '#FFF', paddingTop: 0 }}>
            <Grid.Row style={{ padding: '1em', paddingBottom: 0 }}>
              <Grid>
                <Grid.Column width={16} style={{ textAlign: 'right', paddingTop: 0 }}>
                  <Button circular className='coandco-btn-inverted' type='button'>Back to Homepage</Button>
                  <Button circular secondary type='submit'>Sign In</Button>
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
  form: 'SignInForm'
})(SignInForm);
