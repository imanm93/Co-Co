import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Grid, Button, Divider } from 'semantic-ui-react';
import FiltersForm from '../../../components/FiltersForm';
import * as FilterTypes from '../../../constants/filters/filterTypes';
import { required } from '../../../validators';

class UserSignUpReasonsForm extends Component {

  componentWillMount() {
    this.setState({
      seletedCount: 0
    });
  }

  moveNext = ()=>{

    if(this.state.seletedCount == 0 ){
      return;
    }
    this.props.onNext();
  }

  updateSignUpSelection = (values)=>{
    this.setState({
      seletedCount: values.length
    });
    this.props.updateSignUpSelection(values);
  }

  render() {
    const signUpReasons = {}
    this.props.signUpReasons.map(reason => {
      signUpReasons[reason.id] = reason.name;
    });
    return (
      <Grid>
        <Grid.Column width={16} style={{ backgroundColor: '#FFF' }}>
          <Grid.Row>
            <FiltersForm
              title={this.props.title}
              message={'Pick all that apply'}
              types={signUpReasons}
              type={FilterTypes.SIGN_UP_REASONS}
              updateSelection={this.updateSignUpSelection}
            />
          </Grid.Row>
        </Grid.Column>
        <Grid.Column width={7} style={{ backgroundColor: '#FFF', padding: '2em 1em 1em' }}>
          <a href={'mailto:info@ed.ac.uk'}>Please email info@ed.ac.uk if you face any issues</a>
        </Grid.Column>
        <Grid.Column width={9} style={{ backgroundColor: '#FFF', padding: '2em 1em 1em', textAlign: 'right' }}>
          <Button onClick={() => this.props.onPrevious()} circular style={{ backgroundColor: '#FFF', color: '#2A2A2A', border: '1px solid #2A2A2A' }}>Back to your interests</Button>
          {
            this.props.selectedReasons && this.props.selectedReasons.length > 0 && this.props.selectedReasons[0] !== "" &&
              <Button onClick={() => this.moveNext()} circular secondary>Setup</Button>
          }
          {
            this.props.selectedReasons && this.props.selectedReasons.length === 1 && this.props.selectedReasons[0] === "" &&
              <Button disabled circular secondary>Setup</Button>
          }
          {
            !this.props.selectedReasons &&
            <Button disabled circular secondary>Setup</Button>
          }
        </Grid.Column>
      </Grid>
    )
  }

}

export default reduxForm({
  form: 'UserSignUpReasonsForm'
})(UserSignUpReasonsForm)
