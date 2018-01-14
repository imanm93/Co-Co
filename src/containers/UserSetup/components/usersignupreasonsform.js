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
      <Grid style={{ backgroundColor: '#FFF' }}>
        <Grid.Row>
          <Grid.Column width ={16} style={{ backgroundColor: '#FFF', padding: 0 }}>
            <div className='form-header'></div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16} style={{ backgroundColor: '#FFF', padding: 0 }}>
            <Grid.Row>
              <Divider/>
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16} style={{ backgroundColor: '#FFF', padding: '2em 1em 0em' }}>
            <FiltersForm
              types={signUpReasons}
              title={this.props.title}
              type={FilterTypes.SIGN_UP_REASONS}
              updateSelection={this.updateSignUpSelection}
              validate={[required]}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16} style={{ backgroundColor: '#FFF', padding: '2em 1em 0em' }}>
            <div style={{ color: 'red' }}>* You must select at least one </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16} style={{ backgroundColor: '#FFF', padding: '2em 1em 0em', textAlign: 'right' }}>
            <Button onClick={() => this.props.onPrevious()} circular style={{ backgroundColor: '#FFF', color: '#2A2A2A', border: '1px solid #2A2A2A' }}>Back to your interests</Button>
            <Button onClick={() => this.moveNext()} circular secondary>Setup</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

}

export default reduxForm({
  form: 'UserSignUpReasonsForm'
})(UserSignUpReasonsForm)
