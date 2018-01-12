import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Grid, Button } from 'semantic-ui-react';
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
        <FiltersForm
          types={signUpReasons}
          title={this.props.title}
          type={FilterTypes.SIGN_UP_REASONS}
          updateSelection={this.updateSignUpSelection}
          validate={[required]}
        />
        <div> You must select at least one </div>
        <br/>
        <Button onClick={() => this.props.onPrevious()}>Back to your interests</Button>
        <Button onClick={() => this.moveNext()}>Setup</Button>
      </Grid>
    )
  }

}

export default reduxForm({
  form: 'UserSignUpReasonsForm'
})(UserSignUpReasonsForm)
