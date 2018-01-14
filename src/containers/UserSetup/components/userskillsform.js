import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Grid, Button } from 'semantic-ui-react';
import SkillsForm from '../../../components/SkillsForm';

class UserSkillsForm extends Component {

  render() {
    return (
      <Grid>
        <Grid.Column width={16} style={{ backgroundColor: '#FFF' }}>
          <Grid.Row>
            <SkillsForm streams={this.props.streams} skills={this.props.skills} updateSelectedSkills={this.props.updateSelectedSkills} />
          </Grid.Row>
          <Grid.Row style={{ padding: '0em 3em 3em', textAlign: 'right' }}>
            <Button onClick={() => this.props.onPrevious()} circular style={{ color: '#2A2A2A', backgroundColor: '#FFF', border: '1px solid #2A2A2A' }}>Back to Profile Picture</Button>
            <Button onClick={() => this.props.onNext()} circular secondary>Tell us what you like</Button>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    )
  }

}

export default reduxForm({
  form: 'UserSkillsForm'
})(UserSkillsForm)
