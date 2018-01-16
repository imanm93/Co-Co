import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
          <Grid.Column width={12}>
            { this.props.isSigningIn &&
              <Dimmer active inverted>
                <Loader/>
              </Dimmer>
            }
            <Grid>
              <Grid.Column width ={16} style={{ backgroundColor: '#FFF', padding: 0 }}>
                <div className='form-header'>Sign in to Co & Co</div>
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
              <Grid.Column width={16} style={{ backgroundColor: '#FFF', padding: '2em', paddingBottom: 0 }}>
                <Grid.Row>
                  <Grid>
                    <Grid.Column width={8} style={{ paddingRight: 0 }}>
                      <Field
                        name='email'
                        type='text'
                        label='Email (@ed.ac.uk)'
                        placholder='Email'
                        validate={required}
                        component={inputFormField}
                      />
                    </Grid.Column>
                    <Grid.Column width={8} style={{ paddingLeft: 0 }}>
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
                  <Link to='/forgotpassword'>
                    <a href='' className='form-link'>Forgot Password?</a>
                  </Link>
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
            { this.props.signInError &&
              <Grid centered>
                <Grid.Column width={16} style={{ backgroundColor: '#FFF', paddingTop: 0 }}>
                  <Grid.Row style={{ padding: '1em', paddingBottom: 0 }}>
                    <span style={{color:'#E74C3C'}}>*{this.props.signInError.errorMessage}</span>
                  </Grid.Row>
                </Grid.Column>
              </Grid>
            }
            <Grid>
              <Grid.Column width={16} style={{ backgroundColor: '#FFF', paddingTop: 0 }}>
                <Grid.Row style={{ padding: '1em', paddingBottom: 0 }}>
                  <Grid>
                    <Grid.Column width={7}>
                      <a href={'mailto:info@ed.ac.uk'}>Please email info@ed.ac.uk if you face any issues</a>
                    </Grid.Column>
                    <Grid.Column width={9} style={{ textAlign: 'right', paddingTop: 0 }}>
                      <Link to='/'>
                        <Button type='button' circular className='coandco-btn-inverted'>Back to Homepage</Button>
                      </Link>
                      <Button type='submit' circular secondary>Sign In</Button>
                    </Grid.Column>
                  </Grid>
                </Grid.Row>
              </Grid.Column>
            </Grid>
          </Grid.Column>
        </Grid>
      </form>
    )
  }

}

export default reduxForm({
  form: 'SignInForm'
})(SignInForm);
