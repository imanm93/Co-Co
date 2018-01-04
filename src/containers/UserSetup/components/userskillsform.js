import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Button } from 'semantic-ui-react';
import SkillsForm from '../../../components/SkillsForm';

class UserSkillsForm extends Component {

  render() {
    return (
      <div>
        <SkillsForm streams={this.props.streams} skills={this.props.skills} updateSelectedSkills={this.props.updateSelectedSkills} />
        <Button onClick={() => this.props.onPrevious()}>Back to Profile Picture</Button>
        <Button onClick={() => this.props.onNext()}>Tell us what you like</Button>
      </div>
    )
  }

}

export default reduxForm({
  form: 'UserSkillsForm'
})(UserSkillsForm)
