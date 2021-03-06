import React, { Component } from 'react';
import { Grid, Button, Form, Label, Icon, Dimmer, Loader, Modal } from 'semantic-ui-react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import inputFormField from '../../../components/InputFormField';
import singleFileUploadFormField from '../../../components/SingleFileUploadFormField';
import workExampleFormField from '../../../components/WorkExampleFormField';
import * as FilterTypes from '../../../constants/filters/filterTypes';
import styles from './editprofileform.css';
import Chip from '../../../components/Chip';

import BackgroundImage from './backgroundimage';
import SkillsForm from '../../../components/SkillsForm';
import FiltersForm from '../../../components/FiltersForm';

class EditProfileForm extends Component {

  submit(values) {
    let newValues = Object.assign({}, values);
    if (this.state.selectedSkills) newValues['skillIds'] = this.state.selectedSkills;
    if (this.state.selectedTopics) newValues['topicIds'] = this.state.selectedTopics;
    this.props.onSaveProfile(newValues);
  }

  componentWillMount() {
    this.setState({
      workExamples: this.props.profileEditData.workExamples,
      selectedSkills: this.props.profileEditData.skills,
      selectedTopics: this.props.profileEditData.topics,
      modalSkills: false,
      modalTopics: false
    });
  }

  updateSelectedSkills(skills) {
    this.setState({
      selectedSkills: [...skills]
    });
  }

  updateTopicSelection(topics) {
    this.setState({
      selectedTopics: topics
    });
  }

  removeSelectedSkill(skill) {
    this.setState({
      selectedSkills: this.state.selectedSkills.filter(s => s !== skill.id)
    });
  }

  removeSelectedTopic(topic) {
    this.setState({
      selectedTopics: this.state.selectedTopics.filter(t => t !== topic.id)
    });
  }

  onOpenModal(type) {
    switch (type) {
      case 'skills':
        this.setState({
          modalSkills: true
        })
        break;
      case 'topics':
        this.setState({
          modalTopics: true
        })
        break;
      default:
        break;
    }
  }

  onCloseModal(type) {
    switch (type) {
      case 'skills':
        this.setState({
          modalSkills: false
        })
        break;
      case 'topics':
        this.setState({
          modalTopics: false
        })
        break;
      default:
        break;
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return(
      <form onSubmit={handleSubmit(this.submit.bind(this))}>
        <Grid>
          { this.props.isLoadingProfile &&
            <Dimmer active inverted>
              <Loader />
            </Dimmer>
          }
          { this.props.isSavingProfile &&
            <Dimmer active inverted>
              <Loader />
            </Dimmer>
          }
          <Grid.Row centered>
            <Grid.Column width={16}>
              <Field
                name="coverPhotoUrl"
                component={BackgroundImage}
                buttonName="Upload a background image"
                backgroundImageUrl={this.props.profileEditData.coverPhotoUrl}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid style={{ margin: 0, cursor: 'pointer' }}>
          <Grid.Row centered style={{ padding: 0 }}>
            <Button type='submit' secondary className='coandco-edit-profile-save'><Icon name="checkmark" /> Confirm and Save</Button>
          </Grid.Row>
        </Grid>
        <Grid style={{ margin: 0, padding: '5em', backgroundColor: '#FFF' }}>
          <Grid.Row centered>
              <Grid.Column width={4}>
                <Field
                  name='profilePhotoUrl'
                  component={singleFileUploadFormField}
                />
              </Grid.Column>
              <Grid.Column width={8}>
                  <div className='coandco-edit-profile-section-title'>Your bio</div>
                  <div className='coandco-edit-profile-section-description'>This is your chance to tell others about you and convince them about connecting with you. Dont be shy and mention what makes you tick.</div>
                  <Field
                    rows={4}
                    label=''
                    name='bio'
                    placeholder=''
                    style={{ width: '100%' }}
                    InputType={Form.TextArea}
                    component={inputFormField}
                    initialvalue={this.props.profileEditData ? this.props.profileEditData.bio : ''}
                  />
              </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid style={{ margin: 0, padding: '5em', backgroundColor: '#DEDEDE', border: '20px solid #FFF' }}>
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
              { this.state.selectedSkills && this.state.selectedSkills.length > 0 &&
                    this.state.selectedSkills.map((skill, index) => {
                      return <Chip key={String(index)} item={{
                          id: skill,
                          name: this.props.skills[skill]
                        }}
                        onRemove={this.removeSelectedSkill.bind(this)}
                      />
                    })
              }
              <Button circular secondary floated="right" type='button' onClick={() => this.onOpenModal('skills')}>Add new skills</Button>
              <Modal open={this.state.modalSkills}>
                <SkillsForm
                  skills={this.props.skills}
                  streams={this.props.streams}
                  selectedSkills={this.state.selectedSkills}
                  updateSelectedSkills={this.updateSelectedSkills.bind(this)}
                />
                <Grid>
                  <Grid.Row style={{ padding: '2em 3em 3em' }}>
                    <Button circular secondary type='button' onClick={() => this.onCloseModal('skills')}>Update Skills</Button>
                  </Grid.Row>
                </Grid>
              </Modal>
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
              { this.state.selectedTopics && this.state.selectedTopics.length > 0 &&
                    this.state.selectedTopics.map((topic, index) => {
                      return <Chip key={String(index)} item={{
                          id: topic,
                          name: this.props.topicTypes[topic]
                        }}
                        onRemove={this.removeSelectedTopic.bind(this)}
                      />
                    })
              }
              <Button circular secondary floated="right" type='button' onClick={() => this.onOpenModal('topics')}>Add new interests</Button>
              <Modal open={this.state.modalTopics}>
                <FiltersForm
                  title={'Topics'}
                  type={FilterTypes.TOPICS}
                  types={this.props.topicTypes}
                  selectedFilters={this.state.selectedTopics}
                  updateSelection={this.updateTopicSelection.bind(this)}
                  message={'Choose any topics from the list below to tell us what you like. Event suggestions are based on this.'}
                />
                <Grid>
                  <Grid.Row style={{ padding: '2em 3em 3em' }}>
                    <Button circular secondary type='button' onClick={() => this.onCloseModal('topics')}>Update Topics</Button>
                  </Grid.Row>
                </Grid>
              </Modal>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column width={4}>
            </Grid.Column>
            <Grid.Column width={8}>
              <div className='coandco-edit-profile-section-title'>Links</div>
              <div className='coandco-edit-profile-section-description'>Add portfolio and social links for others see the full package.</div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column width={4}>
            </Grid.Column>
            <Grid.Column width={8}>
              { this.props.portfolioLinkItems && this.props.portfolioLinkItems.map((item) => {
                  return <div>
                    <i className={item.iconClass ? item.iconClass : 'fa fa-link'}></i> {item.label}
                    <Field
                      key={item.key}
                      name={item.name}
                      labelPosition="left"
                      validate={item.regex}
                      component={inputFormField}
                      placeholder={item.placeholder}
                    />
                  </div>
                })
              }
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid style={{ margin: 0, cursor: 'pointer' }}>
          <Grid.Row centered style={{ padding: 0 }}>
            <Button type='submit' secondary className='coandco-edit-profile-save'><Icon name="checkmark" /> Confirm and Save</Button>
          </Grid.Row>
        </Grid>
      </form>
    )
  }

}

export default reduxForm({
  form: 'EditProfileForm'
})(EditProfileForm)
