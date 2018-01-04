import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Button } from 'semantic-ui-react';
import FiltersForm from '../../../components/FiltersForm';
import * as FilterTypes from '../../../constants/filters/filterTypes';

class UserInterestsForm extends Component {

  render() {
    return (
      <div>
        <FiltersForm
          type={FilterTypes.TOPICS}
          title={this.props.title}
          types={this.props.topicTypes}
          updateSelection={this.props.updateTopicSelection}
          message={'Choose any topics from the list below to tell us what you like. Event suggestions are based on this.'}
        />
        <Button onClick={() => this.props.onPrevious()}>Back to your skills</Button>
        <Button onClick={() => this.props.onNext()}>Finish</Button>
      </div>
    )
  }

}

export default reduxForm({
  form: 'UserInterestsForm'
})(UserInterestsForm)
