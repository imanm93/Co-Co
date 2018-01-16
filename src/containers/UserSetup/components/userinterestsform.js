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
          <Grid.Row style={{ padding: '2em' }}>
            <FiltersForm
              title={this.props.title}
              type={FilterTypes.TOPICS}
              types={this.props.topicTypes}
              updateSelection={this.props.updateTopicSelection}
              message={'Choose any topics from the list below to tell us what you like. Event suggestions are based on this.'}
            />
          </Grid.Row>
          <Grid.Row style={{ paddingTop: '1em' }}>
            <Grid>
              <Grid.Column width={7} style={{ backgroundColor: '#FFF' }}>
                <a href={'mailto:info@ed.ac.uk'}>Please email info@ed.ac.uk if you face any issues</a>
              </Grid.Column>
              <Grid.Column width={9} style={{ textAlign: 'right', backgroundColor: '#FFF' }}>
                <Button onClick={() => this.props.onPrevious()} circular style={{ backgroundColor: '#FFF', color: '#2A2A2A', border: '1px solid #2A2A2A' }}>Back to your skills</Button>
                <Button onClick={() => this.props.onNext()} circular secondary>Finish</Button>
              </Grid.Column>
            </Grid>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    )
  }

}

export default reduxForm({
  form: 'UserInterestsForm'
})(UserInterestsForm)
