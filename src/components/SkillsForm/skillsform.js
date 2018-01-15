import React, { Component } from 'react';
import { Grid, Menu, Checkbox, Button } from 'semantic-ui-react';
import { dictToArray } from '../../utils/dictTransforms';
import FilterBox from '../FilterBox';
import styles from './skillsform.css';
import Chip from '../Chip';

class SkillsForm extends Component {

  componentWillMount() {
    this.setState({
      skills: this.props.streams[Object.keys(this.props.streams)[0]].skills,
      stream: Object.keys(this.props.streams)[0],
      selectedSkills: new Set()
    }, function() {
      if (this.props.selectedSkills) this.props.selectedSkills.map(id => {
        this.onSkillSelected('search', String(id));
      });
    });
  }

  onSkillSelected(type, value) {
    const selectedSkills = this.state.selectedSkills;
    if (selectedSkills.has(value) && type === 'check') { selectedSkills.delete(value) }
    else if (!selectedSkills.has(value)) { selectedSkills.add(value) }
    this.setState({
      selectedSkills: selectedSkills
    }, function () {
      this.props.updateSelectedSkills(this.state.selectedSkills);
    });
  }

  onSkillRemove(values) {
    this.onSkillSelected('check', values.id);
  }

  onStreamSelected(stream) {
    const skills = this.props.streams[stream].skills;
    this.setState({
      skills: skills
    });
  }

  genStreamItemsMenu() {
    return Object.keys(this.props.streams).map(stream => {
      const names = stream.split('|');
      return <Menu.Item key={"MenuItem" + stream} onClick={() => this.onStreamSelected(stream)}>
        { names.map(name => {
            return <div key={name}>{name}</div>
          })
        }
      </Menu.Item>
    })
  }

  genSkillsItemMenu() {
    return Object.keys(this.state.skills).map(skillId => {
      return <Menu.Item key={"MenuItem" + skillId}>
        { this.state.selectedSkills.has(skillId) &&
          <Checkbox label={this.state.skills[skillId]} onChange={() => this.onSkillSelected('check', skillId)} checked={true} /> }
        { !this.state.selectedSkills.has(skillId) &&
          <Checkbox label={this.state.skills[skillId]} onChange={() => this.onSkillSelected('check', skillId)} checked={false} /> }
      </Menu.Item>
    })
  }

  onSelectedItem(skill) {
    this.onSkillSelected('search', String(skill.id));
  }

  render() {
    const skillItems = dictToArray(this.props.skills);
    return(
      <div>
        <Grid style={{ margin: 0, padding: '2em' }}>
          <Grid.Column width={16} style={{ paddingBottom: 0 }}>
            <div className='coandco-skills-form-header'>Tell us what you are good at!</div>
            <div className='coandco-skills-form-description'>This allows us to notify you of the opportunities most relevant opportunities</div>
          </Grid.Column>
          <Grid.Column width={16} style={{ paddingBottom: 0 }}>
            <FilterBox items={skillItems} placeholder='Start typing a skill here ...' onSelectedItem={this.onSelectedItem.bind(this)} />
          </Grid.Column>
          <Grid.Column width={6} style={{ paddingRight: 0, paddingTop: 0 }}>
            <Menu vertical style={{ width: '100%', borderRadius: 0, maxHeight: '28em', overflowY: 'scroll', overflowX: 'hidden' }}>
              { this.genStreamItemsMenu() }
            </Menu>
          </Grid.Column>
          <Grid.Column width={10} style={{ paddingLeft: 0, paddingTop: 0 }}>
            <Menu vertical style={{ width: '100%', borderRadius: 0, maxHeight: '28em', overflowY: 'scroll' }}>
              { this.genSkillsItemMenu() }
            </Menu>
          </Grid.Column>
          <Grid.Column width={16}>
            {
              this.state.selectedSkills && [...this.state.selectedSkills].map(skillId => {
                return  <Chip key={"Chip" + skillId} item={{ id: skillId, name: this.props.skills[skillId] }} onRemove={this.onSkillRemove.bind(this)} />
              })
            }
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default SkillsForm;
