import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Grid, Button, Dimmer, Loader, Divider } from 'semantic-ui-react';
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
          <Grid.Column width ={16} style={{ backgroundColor: '#FFF', boxShadow: '0 1px 3px 0 #979797', padding: 0 }}>
            <div className="form-header">Verify your company</div>
            <Grid.Row style={{ textAlign: 'center' }}>
              <a className="form-link" href='' onClick={() => this.props.redirectToRegister()}>
                Not registered? Click here to register!
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
            { this.props.isLoadingExternal &&
                <Dimmer active inverted>
                  <Loader />
                </Dimmer>
            }
            <Grid.Column width={16}>
              <Grid.Row>
                <Field
                  name='email'
                  type='email'
                  label='Your contact email'
                  placeholder='Please put your email here'
                  component={inputFormField}
                  validate={[required]}
                  dontPreventDefault={true}
                />
              </Grid.Row>
              { this.props.verifyError &&
                <Grid.Row>
                  <div>{this.props.verifyError.split('=')[0]}</div>
                </Grid.Row>
              }
            </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column width={16} style={{ backgroundColor: '#FFF', padding: 0 }}>
            <Divider />
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column width={16} style={{ backgroundColor: '#FFF', boxShadow: '0 1px 3px 0 #979797', textAlign: 'right' }}>
            <Button circular secondary>Verify</Button>
          </Grid.Column>
        </Grid>
      </form>
    )
  }

}

export default reduxForm({
  form: 'ExternalVerifyForm'
})(ExternalVerifyForm)
