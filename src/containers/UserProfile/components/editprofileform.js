import React, { Component } from 'react';
import { Grid, Button, Form, Label } from 'semantic-ui-react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import inputFormField from '../../../components/InputFormField';
import singleFileUploadFormField from '../../../components/SingleFileUploadFormField';
import workExampleFormField from '../../../components/WorkExampleFormField';
import * as FilterTypes from '../../../constants/filters/filterTypes';
import Chip from '../../../components/Chip';
import ModalContainer from '../../../components/ModalContainer';
import SkillsForm from '../../../components/SkillsForm';
import FiltersForm from '../../../components/FiltersForm';

class EditProfileForm extends Component {

  submit(values) {
    console.log(values);
  }

  updateSelectedSkills() {
    // TODO: add skill
  }

  updateTopicSelection() {
    // TODO: add topics
  }

  // background image
  // profile picture & bio
  // skills
  // interests
  // work examples

  render() {
    const { handleSubmit } = this.props;
    return(
      <form onSubmit={handleSubmit(this.submit.bind(this))}>
        <Grid>
          <Grid.Row>
            <Field
              name='profilePhotoUrl'
              component={singleFileUploadFormField}
            />
            <Field
              name='bio'
              label=''
              placeholder=''
              component={inputFormField}
              InputType={Form.TextArea}
            />
          </Grid.Row>
          <Grid.Row>
            <FieldArray
              name="workExamples"
              component={workExampleFormField}
            />
          </Grid.Row>
          <Grid.Row>
          <h2>Tags</h2>
          <div>Add some tags to find new posts and events</div>
          </Grid.Row>
          <Grid.Row>
            <h4>Your skills</h4>
            { this.props.selectedSkills && this.props.selectedSkills.length > 0 &&
                  this.props.selectedSkills.map((item, index) => {
                    return <Chip key={String(index)} item={item} />
                  })
            }
            <ModalContainer buttonName="Add new skills" buttonProps={{ circular: true, secondary: true, floated: "right" }}>
              <SkillsForm streams={this.props.streams} skills={this.props.skills} updateSelectedSkills={this.updateSelectedSkills.bind(this)} />
            </ModalContainer>
          </Grid.Row>
          <Grid.Row>
            <h4>Your topics</h4>
            { this.props.selectedTopics && this.props.selectedTopics.length > 0 &&
                  this.props.selectedTopics.map((item, index) => {
                    return <Chip key={String(index)} item={item} />
                  })
            }
            <ModalContainer buttonName="Add new topics" buttonProps={{ circular: true, secondary: true, floated: "right" }}>
              <FiltersForm
                type={FilterTypes.TOPICS}
                title={'Topics'}
                types={this.props.topicTypes}
                updateSelection={this.updateTopicSelection.bind(this)}
                message={'Choose any topics from the list below to tell us what you like. Event suggestions are based on this.'}
              />
            </ModalContainer>
          </Grid.Row>
          <Grid.Row>
            <h2>Links</h2>
            <div>Add portfolio and social links for others see the full package.</div>
            { this.props.portfolioLinkItems && this.props.portfolioLinkItems.map((item) => {
                return <Field
                  key={item.key}
                  name={item.name}
                  labelPosition="left"
                  validate={item.regex}>
                  component={inputFormField}
                  placeholder={item.placeholder}
                  <Label basic>{item.label}</Label>
                </Field>
                })
            }
          </Grid.Row>
          <Button type='submit'>Confirm and Save</Button>
        </Grid>
      </form>
    )
  }

}

export default reduxForm({
  form: 'EditProfileForm'
})(EditProfileForm)
