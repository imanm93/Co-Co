import React, { Component } from 'react';
import { Grid, Button, Form, Label, Icon } from 'semantic-ui-react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import inputFormField from '../../../components/InputFormField';
import singleFileUploadFormField from '../../../components/SingleFileUploadFormField';
import workExampleFormField from '../../../components/WorkExampleFormField';
import * as FilterTypes from '../../../constants/filters/filterTypes';
import Chip from '../../../components/Chip';

import BackgroundImage from './backgroundimage';
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

  // {this.props.profileViewData.bio ? this.props.profileViewData.bio : ""}

  render() {
    const { handleSubmit } = this.props;
    return(
      <form onSubmit={handleSubmit(this.submit.bind(this))}>
        <Grid>
          <Grid.Row centered>
            <Grid.Column width={16}>
              <Field
                name="coverPhotoUrl"
                component={BackgroundImage}
                buttonName="Upload a background image"
                backgroundImageUrl={this.props.profileViewData.coverPhotoUrl}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid style={{ margin: 0, marginTop: '0.5em', padding: '5em', backgroundColor: '#FFF' }}>
          <Grid.Row centered>
              <Grid.Column width={4}>
                <Field
                  name='profilePhotoUrl'
                  component={singleFileUploadFormField}
                />
              </Grid.Column>
              <Grid.Column width={8}>
                  <div>Your bio</div>
                  <div>This is your chance to tell others about you and convince them about connecting with you. Dont be shy and mention what makes you tick.</div>
                  <Field
                    name='bio'
                    label=''
                    placeholder=''
                    component={inputFormField}
                    InputType={Form.TextArea}
                  />
              </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid style={{ margin: 0, padding: '5em', backgroundColor: '#DEDEDE' }}>
          <Grid.Row centered>
            <div className='coandco-edit-profile-section-header'>Upload Work Examples</div>
          </Grid.Row>
          <Grid.Row centered>
            <FieldArray
              name="workExamples"
              component={workExampleFormField}
            />
          </Grid.Row>
        </Grid>
        <Grid style={{ margin: 0, padding: '5em', backgroundColor: '#FFF' }}>
          <Grid.Row centered>
            <Grid.Column width={4}>
            </Grid.Column>
            <Grid.Column width={8}>
              <div className='coandco-edit-profile-section-title'>Skills</div>
              <div className='coandco-edit-profile-section-description'>Add your skills to make sure you see the right opportunities</div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column width={4}>
            </Grid.Column>
            <Grid.Column width={8} style={{ backgroundColor: '#DEDEDE', padding: '2em' }}>
              { this.props.selectedSkills && this.props.selectedSkills.length > 0 &&
                    this.props.selectedSkills.map((item, index) => {
                      return <Chip key={String(index)} item={item} />
                    })
              }
              <ModalContainer buttonName="Add new skills" buttonProps={{ circular: true, secondary: true, floated: "right" }}>
                <SkillsForm streams={this.props.streams} skills={this.props.skills} updateSelectedSkills={this.updateSelectedSkills.bind(this)} />
              </ModalContainer>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column width={4}>
            </Grid.Column>
            <Grid.Column width={8}>
              <div className='coandco-edit-profile-section-title'>Interests</div>
              <div className='coandco-edit-profile-section-description'>Add your interests to let others know what youre interested in</div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column width={4}>
            </Grid.Column>
            <Grid.Column width={8} style={{ backgroundColor: '#DEDEDE', padding: '2em' }}>
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
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column width={4}>
            </Grid.Column>
            <Grid.Column width={8}>
              <div className='coandco-edit-profile-section-header'>Links</div>
              <div className='coandco-edit-profile-section-description'>Add portfolio and social links for others see the full package.</div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column width={4}>
            </Grid.Column>
            <Grid.Column width={8}>
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
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid style={{ margin: 0, backgroundColor: '#DEDEDE' }}>
          <Grid.Row centered>
            <Button circular secondary type='submit'><Icon name="checkmark" /> Confirm and Save</Button>
          </Grid.Row>
        </Grid>
      </form>
    )
  }

}

export default reduxForm({
  form: 'EditProfileForm'
})(EditProfileForm)
