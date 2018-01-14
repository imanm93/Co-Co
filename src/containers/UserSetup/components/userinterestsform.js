import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Grid, Button } from 'semantic-ui-react';
import FiltersForm from '../../../components/FiltersForm';
import * as FilterTypes from '../../../constants/filters/filterTypes';

class UserInterestsForm extends Component {

  render() {
    return (
      <Grid>
        <Grid.Column width={16} style={{ backgroundColor: '#FFF' }}>
          <Grid.Row>
            <FiltersForm
              title={this.props.title}
              type={FilterTypes.TOPICS}
              types={this.props.topicTypes}
              updateSelection={this.props.updateTopicSelection}
              message={'Choose any topics from the list below to tell us what you like. Event suggestions are based on this.'}
            />
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16} style={{ textAlign: 'right' }}>
              <Button onClick={() => this.props.onPrevious()} circular style={{ backgroundColor: '#FFF', color: '#2A2A2A', border: '1px solid #2A2A2A' }}>Back to your skills</Button>
              <Button onClick={() => this.props.onNext()} circular secondary>Finish</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    )
  }

}

export default reduxForm({
  form: 'UserInterestsForm'
})(UserInterestsForm)
