import React, { Component } from 'react';
import { Grid, Button, Dimmer, Loader } from 'semantic-ui-react';
import { reduxForm, Field } from 'redux-form';
import singleFileUploadFormField from '../../../components/SingleFileUploadFormField';
import inputFormField from '../../../components/InputFormField';
import { required } from '../../../validators';

class ExternalSignUpForm extends Component {

  submit(values) {
    let newValues = {}
    newValues['logo'] = values.logo;
    newValues['companyWebsite'] = values.companyWebsite;
    newValues['name'] = values.name;
    newValues['contactEmail'] = values.contactEmail;
    newValues['contactName'] = values.contactName;
    this.props.register(newValues);
  }

  render() {
    const { handleSubmit } = this.props;
    return(
      <form onSubmit={handleSubmit(this.submit.bind(this))}>
        <Grid>
            {
              this.props.isLoadingExternal &&
                <Dimmer active inverted>
                  <Loader/>
                </Dimmer>
            }
            <Grid.Column width ={16}>
              <div>Register your company</div>
              <a href='' onClick={() => this.props.redirectToVerify()}>
                Already registered? Click here to skip this step!
              </a>
            </Grid.Column>
            <Grid.Column width={4}>
              <Field
                name='logo'
                component={singleFileUploadFormField}
              />
            </Grid.Column>
            <Grid.Column width={12}>
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
              { this.props.registerError &&
                <Grid.Row>
                  <div>{this.props.registerError}! Simply verify and post by click
                      <a href='' onClick={() => this.props.redirectToVerify()}>
                        here
                      </a>
                  </div>
                </Grid.Row>
              }
              <Grid.Row>
                <Button>Back to Homepage</Button>
                <Button>Register</Button>
              </Grid.Row>
            </Grid.Column>
        </Grid>
      </form>
    )
  }

}

export default reduxForm({
  form: 'ExternalSignUpForm'
})(ExternalSignUpForm)
