import React from 'react';
import { Form, Divider, Header, Button, Dimmer, Loader, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { reduxForm, Field, getFormValues } from 'redux-form';
import FormContainer from '../../components/FormContainer';
import { connect } from 'react-redux';
import inputFormField from '../../components/InputFormField';
import * as actions from '../../actions';
import PropTypes from 'prop-types';

const RESET_PASSWORD_FORM = "resettPassword";

const required = value => (value ? undefined : 'this field is required');
const minLength = value =>
  value && !
    /^[a-zA-Z0-9(._)]{7,25}$/i.test(value) ?
    'Password must be between 7-25 characters long without special characters apart from "." and "_"' : undefined;
const equalTo = (value, allValues) => {
  return value !== allValues.password ? 'Password must match' : undefined;
}
class ResetPassword extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: 0,
      code: ""
    }
  }

  static contextTypes = {
    router: PropTypes.object
  }
  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const code = query.get('code').replace(/\s+/g, '+');;
    const userId = query.get('userId');
    if (!code && !userId) {
      this.props.history.push('/signin');
      return;
    }

    this.setState({
      userId: userId,
      code: code
    });
  }

  submit = (values) => {
    const callback = () => {
      setTimeout(() => {
        this.props.history.push('/signin');
      }, 1000)

    }
    this.props.resetPassword(this.state.code, this.state.userId, values.password, callback);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <FormContainer>
        <Form onSubmit={handleSubmit(this.submit)}>
          {this.props.isSending &&
            <Dimmer active inverted>
              <Loader />
            </Dimmer>
          }
          <Header as='h3'>Reset your password</Header>
          <Divider />
          <Field
            name="password"
            component={inputFormField}
            as={Form.Input}
            placeholder="New password"
            type="password"
            label="New password"
            validate={[required, minLength]} />


          <Field
            name="confirmpassword"
            component={inputFormField}
            as={Form.Input}
            placeholder="Confirm Password"
            type="password"
            label="Confirm password"
            validate={[required, minLength, equalTo]} />

          <div className="buttonRow">
            <Button className="WideBtn" primary>
              Reset
          </Button>
          </div>


          <Link to="/">Cancel</Link>


          {this.props.resetPasswordSuccess &&
            <Message positive style={{ textAlign: "center", boxShadow: "none" }}>
              <Message.Header>Your password has been reset successfuly</Message.Header>
            </Message>
          }
          {this.props.resetPasswordError &&
            <Message negative style={{ textAlign: "center", boxShadow: "none" }}>
              <Message.Header>{this.props.resetPasswordError}</Message.Header>
            </Message>
          }
        </Form>
      </FormContainer>
    )
  }
}

ResetPassword = reduxForm({
  form: RESET_PASSWORD_FORM
})(ResetPassword);

const mapStateToProps = (state) => {
  return {
    isSending: state.loaders.isLoadingResetPassword,
    resetPasswordError: state.errors.resetPasswordError,
    resetPasswordSuccess: state.success.resetPasswordSuccess
  }
}

export default connect(mapStateToProps, actions)(ResetPassword);
