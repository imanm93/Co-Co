import React from 'react';
import { connect } from 'react-redux';
import { Grid, Dimmer, Loader } from 'semantic-ui-react';
import * as actions from '../../actions/accountActions';

import SignUpForm from './components/signupform';
import FormContainer from '../../components/FormContainer';
import TermsAndConditionsModal from '../../components/TermsAndConditionsModal';

class SignUp extends React.Component {

  componentWillMount() {
    this.setState({
      showTermsConditions: false
    })
  }

  onShowTandCs = (e) => {
    e.preventDefault();
    this.setState({ showTermsConditions: true });
  }

  onHideTandCs = (e) => {
    this.setState({ showTermsConditions: false });
  }

  onSignUp(values, userType) {
    this.props.signUpUser(values, userType, this.props);
  }

  render() {
    return(
      <FormContainer>
        { this.props.isSigningUp &&
            <Dimmer active inverted>
              <Loader />
            </Dimmer>
        }
        <SignUpForm onSignUp={this.onSignUp.bind(this)} onShowTandCs={this.onShowTandCs.bind(this)} submitError={this.props.signUpError} />
        <TermsAndConditionsModal open={this.state.showTermsConditions} onClose={this.onHideTandCs.bind(this)}  />
      </FormContainer>
    )
  }

}

function mapStateToProps(state) {
  return {
    isSigningUp: state.loaders.isSigningUp,
    signUpError: state.errors.signUpError
  }
}

export default connect(mapStateToProps, actions)(SignUp)
