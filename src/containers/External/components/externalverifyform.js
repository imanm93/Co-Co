import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Grid, Button, Dimmer, Loader } from 'semantic-ui-react';
import inputFormField from '../../../components/InputFormField';
import { required } from '../../../validators';

class ExternalVerifyForm extends Component {

  submit(values) {
    let newValues = {};
    newValues['email'] = values.email;
    this.props.verify(newValues);
  }

  render() {
    const { handleSubmit } = this.props;
    return(
      <form onSubmit={handleSubmit(this.submit.bind(this))}>
        <Grid>
            { this.props.isLoadingExternal &&
                <Dimmer active inverted>
                  <Loader />
                </Dimmer>
            }
            <Grid.Column width ={16}>
              <div>Verify your company</div>
              <a href='' onClick={() => this.props.redirectToRegister()}>
                Not registered? Click here to register!
              </a>
            </Grid.Column>
            <Grid.Column width={16}>
              <Grid.Row>
                <Field
                  name='email'
                  type='email'
                  label='Your contact email'
                  placeholder='your_email@domain'
                  component={inputFormField}
                  validate={[required]}
                />
              </Grid.Row>
              { this.props.verifyError &&
                <Grid.Row>
                  <div>{this.props.verifyError.split('=')[0]}</div>
                </Grid.Row>
              }
              <Grid.Row>
                <Button>Verify</Button>
              </Grid.Row>
            </Grid.Column>
        </Grid>
      </form>
    )
  }

}

export default reduxForm({
  form: 'ExternalVerifyForm'
})(ExternalVerifyForm)
