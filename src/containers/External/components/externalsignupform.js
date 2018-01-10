import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { required } from '../../../validators';
import inputFormField from '../../../components/InputFormField';
import { Grid, Button, Dimmer, Loader, Label, Divider } from 'semantic-ui-react';
import singleFileUploadFormField from '../../../components/SingleFileUploadFormField';

class ExternalSignUpForm extends Component {

  submit(values) {
    let newValues = {}
    newValues['name'] = values.name;
    newValues['logo'] = values.logo;
    newValues['contactName'] = values.contactName;
    newValues['contactEmail'] = values.contactEmail;
    newValues['companyWebsite'] = values.companyWebsite;
    this.props.register(newValues);
  }

  render() {
    const { handleSubmit } = this.props;
    return(
      <form onSubmit={handleSubmit(this.submit.bind(this))}>
        <Grid>
          <Grid.Column width ={16} style={{ backgroundColor: '#FFF', padding: 0 }}>
            <div className='form-header'>Register your external body</div>
            <Grid.Row style={{ textAlign: 'center' }}>
              <a
                className='form-link'
                href=''
                onClick={() => this.props.redirectToVerify()}>
                  Already registered? Click here to skip this step!
              </a>
            </Grid.Row>
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column width ={16} style={{ backgroundColor: '#FFF', padding: 0 }}>
            <Divider />
          </Grid.Column>
        </Grid>
        <Grid style={{ backgroundColor: '#FFF', boxShadow: '0 1px 3px 0 #979797' }}>
            {
              this.props.isLoadingExternal &&
                <Dimmer active inverted>
                  <Loader/>
                </Dimmer>
            }
            <Grid.Column width={9}>
              <Grid.Row>
              <Field
                name='name'
                label='External body name'
                placeholder=''
                component={inputFormField}
                validate={[required]}
              />
              <Field
                name='companyWebsite'
                label='External body website'
                placeholder='e.g. www.myCompany.com'
                component={inputFormField}
                validate={[required]}
              />
              </Grid.Row>
              <Grid.Row>
              <Field
                name='contactName'
                label='Full Name'
                placeholder='e.g. Firstname Lastname'
                component={inputFormField}
                validate={[required]}
              />
              <Field
                name='contactEmail'
                type='email'
                label='Your contact email'
                placeholder='your_email@domain'
                component={inputFormField}
                validate={[required]}
              />
              </Grid.Row>
            </Grid.Column>
            <Grid.Column width={7}>
              <Field
                name='logo'
                component={singleFileUploadFormField}
              />
            </Grid.Column>
            { this.props.registerError &&
              <Grid.Column width={16} style={{ paddingTop: 0 }}>
                  <Grid.Row>
                    <Label basic color='red' style={{ width: '100%' }}>
                        {this.props.registerError + '!Simply verify and post by click ' }
                        <a href='' onClick={() => this.props.redirectToVerify()}>
                          here
                        </a>
                    </Label>
                  </Grid.Row>
              </Grid.Column>
            }
            <Grid.Column width ={16} style={{ backgroundColor: '#FFF', padding: 0 }}>
              <Divider />
            </Grid.Column>
            <Grid.Column width={16} style={{ paddingTop: 0 }} textAlign='right' verticalAlign='middle'>
              <Button circular className='coandco-btn-inverted' type='button' onClick={() => this.props.redirectToHome()}>Back to Homepage</Button>
              <Button circular secondary type='submit'>Register</Button>
            </Grid.Column>
        </Grid>
      </form>
    )
  }

}

export default reduxForm({
  form: 'ExternalSignUpForm'
})(ExternalSignUpForm)
